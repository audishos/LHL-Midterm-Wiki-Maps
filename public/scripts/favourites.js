const loadFavourites = () => {
  $.get("/api/users/favourites")
  .done( (favourites) => {
    //jquery to add favourites to page
  });
};

$( () => {
  loadFavourites();
});
