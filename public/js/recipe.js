let starRating = 0;
$(".fa-star").on("click", function () {
  var newstarRating = $(this).attr("id");
  starRating = newstarRating;
  $(this).addClass("checked");
  var array = [];
  $(this)
    .siblings()
    .each(function (idx, el) {
      array.push(el.id);
      // console.log(newstarRating);

      if (newstarRating > el.id) {
        // console.log(el.id);
        $(el).addClass("checked");
      } else if (newstarRating < el.id) {
        $(el).removeClass("checked");
      }
    });

  return starRating;
});

let favoritedRecipe = [];
// const localFavoritedRecipes =
//   localStorage.getItem("myFavoritedRecipes"
// );
// console.log(localFavoritedRecipes);
// if (localFavoritedRecipes) {
//   favoritedRecipe.push(JSON.parse(localFavoritedRecipes))
//   console.log(favoritedRecipe);
//   $(favoritedRecipe).each(function (idx, el) {
//     console.log(el);
//     console.log(this)
//     $(this).addClass("favorited");
//     console.log($(el).addClass("favorited"));
//   });
// }
$(".favorite-button").on("click", function () {
  console.log(this);
  const isFavorited = $(this).hasClass("favorited");
  if (!isFavorited) {
    console.log(this);
    $(this).removeClass("unfavorited").addClass("favorited");
    console.log("is currently favorited");
    favoritedRecipe.push(this);
    console.log(favoritedRecipe);
    return localStorage.setItem("myFavoritedRecipes", favoritedRecipe);
  } else {
    $(this).removeClass("favorited").addClass("unfavorited");
    console.log("not currently favorited");
    favoritedRecipe.splice(this, 1);
    console.log(favoritedRecipe);
    return localStorage.setItem("myFavoritedRecipes", favoritedRecipe);
  }
});

const openRecipeHandler = async (event) => {
  const drinkId = event.target.getAttribute("data-drink-id");
  document.location.replace(`/recipe/${drinkId}`);
};

const submitReviewHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const review_content = document.querySelector("#review-text-area").value;
  const drink_id = event.target.getAttribute("data-drink-id");

  if (review_content && starRating != 0) {
    const response = await fetch("/api/reviews/", {
      method: "POST",
      body: JSON.stringify({
        review_content,
        drink_id,
        starRating,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the account page
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const removeFavoritedRecipe = async (e) => {
  console.log(e.target.value)
}

document.querySelectorAll(".favorited").forEach((favoriteDrink) => {
  favoriteDrink.addEventListener("click", () => {
    console.log("Hello world!");
  });
});

document.querySelectorAll(".drink").forEach((item) => {
  item.addEventListener("click", openRecipeHandler);
});

const postReview = document.querySelector("#review-submit-button");

if (postReview) {
  postReview.addEventListener("click", submitReviewHandler);
}
