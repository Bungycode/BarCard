const router = require("express").Router();
const { Liquid, Drink, Mixing } = require("../../models");

router.post("/", async (req, res) => {
  try {
    console.log("inside drinkRoutes.js recipe post request");
    const { drink_name, instructions, is_alcoholic, liquid_ids } = req.body;
    if (liquid_ids.length === 0) {
      console.log("made it here");

      throw new Error("Must select a drink type");
    }
    console.log("made it here 1")

    const drinkData = await Drink.create({
      drink_name,
      instructions,
      is_alcoholic,
      user_id: req.session.user_id,
    });
    console.log("made it here 2")

    if (drinkData) {
    console.log("made it here 3")

      liquid_ids.forEach(async (liquid_id) => {
        await Mixing.create({
          drink_id: drinkData.dataValues.id,
          liquid_id,
        });
      });
    }
    console.log("made it here 4")

    res.status(200).json({ drinkData });
    console.log("made it here 5")

  } catch (err) {
    console.log("Recipe is not submitting!");
    res.status(400).json(err);
  }
});

router.post("/ingredient", async (req, res) => {
  try {
    const liquidData = await Liquid.create({
      ...req.body,
    });

    res.status(200).json(liquidData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
