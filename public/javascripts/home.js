var feature;
var index = 0;
var imgurls  = ['assets/pictures/circuit.png', 'assets/pictures/188-logo.png'];
var navbarPic;
$(document).ready(function() {
  feature = $('#feature-pic');
  next();
});

function prev(){
  index = (index === 0) ? imgurls.length - 1 : index - 1;
  update();
}

function next(){
  index = (index === imgurls.length - 1) ? 0 : index + 1;
  update();
}
function update(){
  $(feature).hide();
  $(feature).attr("style", 'background-image: url(' + imgurls[index] + ');');
  $(feature).show();
}
