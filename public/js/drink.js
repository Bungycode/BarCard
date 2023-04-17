const newRecipeHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const drink_name = document.querySelector("#drink").value.trim();
  const instructions = document.querySelector("#drink_instructions").value;
  const liquid_ids = getLiquidIds();
  const is_alcoholic = $("#is_alcoholic").is(":checked") ? "true" : "false";
console.log("right here")
  if (drink_name && liquid_ids && instructions) {
    // Send a POST request to the API endpoint
    console.log("before post request")
    const response = await fetch("/api/drinks/", {
      method: "POST",
      body: JSON.stringify({
        drink_name,
        is_alcoholic,
        liquid_ids,
        instructions,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response)
    if (response.ok) {
      // If successful, redirect the browser to the account page
      document.location.replace("/search");
    } else {
      alert(response.statusText);
    }
  }
};

const viewRecipeHandler = async (event) => {
  console.log("hit a button");
  document.location.replace("/search");
};

function getLiquidIds() {
  const liquidList = document.getElementsByClassName("liquid-list");
  const liquid_ids = [];
  for (var i = 0; i < liquidList.length; i++) {
    if (liquidList[i].checked) {
      liquid_ids.push(liquidList[i].id);
    }
  }
  return liquid_ids;
}

const deleteRecipeHandler = async (event) => {
  event.preventDefault();

  const url = "/api/drinks/" + $(this).attr("data-drink-id");
  // Send a DELETE request to the API endpoint
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  document.location.reload();
};

const updateRecipeHandler = async (event) => {
  event.preventDefault();

  const drink_name = document.querySelector("#drink").value.trim();
  const instructions = document.querySelector("#drink_instructions").value;
  const liquid_ids = getLiquidIds();
  // Figure out how to use this to have drinks loading on the page as favorited if they have been marked a favorite?
  const is_alcoholic = $("#is_alcoholic").is(":checked") ? "true" : "false";
  const url = "/api/drinks/" + $(this).attr("data-drink-id");

  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      drink_name,
      is_alcoholic,
      liquid_ids,
      instructions,
    }),
    headers: { "Content-Type": "application/json" },
  });

  document.location.reload();
};

document
  .querySelector("#new-recipe-button")
  .addEventListener("click", newRecipeHandler);

// $(".update_btn").on("click", updateRecipeHandler);
// $(".delete_btn").on("click", deleteRecipeHandler);
