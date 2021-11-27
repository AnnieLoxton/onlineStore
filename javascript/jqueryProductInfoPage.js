//This script will only be linked on Product Info pages.

$(document).ready(function(){
  //Chained function to fade in image + animate the border on page load.
  $("#productImage").hide().fadeIn(2000).animate({borderWidth: "2px"}, "fast");
  
  //Function to hide/show product features.
  $("#toggle").click(function(){
    $("#hide").toggle();
  });
});