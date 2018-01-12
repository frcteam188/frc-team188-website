var feature;
var index = 0;
var imgurls  = [
  'https://imgur.com/yOyiT3I.jpg',
  'https://imgur.com/8wOW3da.jpg',
  'https://imgur.com/oBTNqst.jpg',
  'https://imgur.com/kGVRzns.jpg',
  'https://imgur.com/DjZ3OJd.jpg'];
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
