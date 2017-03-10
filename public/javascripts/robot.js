var robot;
var index = 0;
var years  = ['2016', '2015'];
var robotYear;
$(document).ready(function() {
  robot = $('#robot');
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
  robotYear = years[index];
}

function getRobotYear(){
  return robotYear;
}
