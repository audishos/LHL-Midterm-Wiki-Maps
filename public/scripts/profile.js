function deleteFavourite(deleteContainer) {

  $.ajax({
    url: "/maps/" + deleteContainer.data("map-id") + "/favourites",
    type: "DELETE",
    success: function(result) {
      deleteContainer.remove();
    },
    error: function(error) {
      console.error(error);
    }
  });

}

$( function() {
  $("#fav-container .fa-trash").on("click", function(ev) {
    // deleting a favourite via clicking the trash icon
    ev.preventDefault();
    ev.stopPropagation();

    deleteFavourite($(ev.target).closest(".fav-row"));

  });
});
