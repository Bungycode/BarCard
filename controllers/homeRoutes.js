const router = require("express").Router();
const emoticon = require("emoticon.js");
const { Liquid, Drink, User, Review, Mixing } = require("../models");
const withAuth = require("../utils/auth.js");
const format_date = require("../utils/helpers.js");

const path = require("path");

router.get("/testing", async (req, res) => {
  try {
    const drinkData = await Drink.findOne({
      where: {
        drink_name: "Tropicalia",
      },
    });
    const drink = drinkData.get({ plain: true });
    res.render("jsButtonTestPage", drink);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", (req, res) => {
  try {
    res.render("frontpage", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/account", withAuth, async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Drink }],
//     });

//     if (userData.drinks.length !== 0) {
//       const recipes = userData.drinks.map((drink) =>
//         drink.get({ plain: true })
//       );
//       res.render("account", {
//         recipes,
//       });
//     } else {
//       res.render("account", {
//         username: userData.dataValues.username,
//         logged_in: req.session.logged_in,
//       });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/newrecipe", withAuth, async (req, res) => {
  try {
    const liquidData = await Liquid.findAll();

    // Serialize data so the template can read it
    const liquids = liquidData.map((liquid) => liquid.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("newrecipe", {
      liquids,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/recipe/:id", async (req, res) => {
  const recipeDataWithReviews = await Drink.findByPk(req.params.id, {
    include: [
      { model: User, attributes: ["username"] },
      {
        model: Review,
        include: { model: User, attributes: ["username"] },
      },
    ],
  });

  const recipeDataWithMixing = await Drink.findByPk(req.params.id, {
    include: [{ model: Mixing }],
  });

  const liquidIdArray = [];
  recipeDataWithMixing.mixings.forEach((mix) => {
    // for each mix I want to find the liquid name and put it into an array
    liquidIdArray.push(mix.liquid_id);
  });

  const liquidNamesArray = [];
  liquidIdArray.forEach(async (liquid) => {
    const singleLiquid = await Liquid.findByPk(liquid);
    liquidNamesArray.push(singleLiquid.dataValues.name);
  });

  // Serialize data so the template can read it
  const drink = recipeDataWithReviews.get({ plain: true });

  res.render("viewrecipe", {
    drink,
    liquidNamesArray,
    logged_in: req.session.logged_in,
  });
});

router.get("/newingredient", withAuth, (req, res) => {
  try {
    res.render("newingredient", { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search", withAuth, async (req, res) => {
  try {
    const recipeData = await Drink.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((drink) => drink.get({ plain: true }));
    const emoticons = recipes.map(() => emoticon());

    // Pass serialized data and session flag into template
    res.render("search", {
      recipes,
      logged_in: req.session.logged_in,
      // using extra npm library here
      emoticons,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Left off here at 3:52 AM 4/15/2023. Have to get the drinks to populate to the favorite recipes page and refresh self how this back-end part works again. After this you will be trying to render only the drinks with the "favorited" class on them.
router.get("/favoriterecipes", withAuth, async (req, res) => {
  try {
    const favoriteRecipeData = await Drink.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    const favoriteRecipes = favoriteRecipeData.map((drink) =>
      drink.get({ plain: true })
    );
    const emoticons = favoriteRecipes.map(() => emoticon());

    console.log("success 1");
    // console.log(
    //   await Drink.findAll({
    //     include: [{ model: User, attributes: ["username"] }],
    //   })
    // );
    // console.log(favoriteRecipeData.map((drink) => { if (drink === favoriteRecipeData[1]) {return console.log(drink) } else { console.log(drink, 'does not equal martini')}}))
    // console.log(favoriteRecipeData[0].dataValues.is_favorite)
    res.render("favoriterecipes", {
      favoriteRecipes,
      logged_in: req.session.logged_in,
      emoticons,
    });
    // console.log("success 2");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
