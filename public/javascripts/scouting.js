var startingPos=false, mobility=false, gearField, gearLoad, gearGround, ballField, ballLoad, auto=0, AutoForm = {},
    autoprefLift, prefport1 = 0, prefport2 = 0, prefport3 = 0, autoGearPickup = 0, autoPickup=false, teleGearsAcquired = 0,
    teleGearsScored = 0, station=4, matchNumber=7, teamNumber=188, TeleForm = {} , hangDavit, timestamp, timeEnd, FormForm ={}, submit = {},
    ballGround, pressure = 0 , groundPickup = false, gearsAcquired = 0, gearsScored = 0, prefLift, ballsScored =0,
    autoHigh = 0, autoLow = 0, autoGear = 0, teleHigh = 0, teleLow = false, hangDuration, hang = false;

window.onload = function(){
  document.getElementById("gearsAcquiredlbl").innerHTML = gearsAcquired;
  document.getElementById("gearsScoredlbl").innerHTML = gearsScored;
  document.getElementById("pressurelbl").innerHTML = pressure;
  document.getElementById("ballScoredlbl").innerHTML = ballsScored;



  document.getElementById("stationlbl").innerHTML = "Red 1";
  document.getElementById("teamNumberlbl").innerHTML = "188";
  document.getElementById("matchNumberlbl").innerHTML = "7";
  station = "r1";


/*  hideDiv(endgame);
  hideDiv(telebtn);
  hideDiv(port);
  hideDiv(pickup);
  hideDiv(ballscore);
*/}

function hidePos(){
var empty = "";
document.getElementById("startingPosdiv").innerHTML = " ";
auto++;
}

function startLoad(){
if(startingPos == false){
  startingPos = document.getElementById("loadPos").value;
  console.log(startingPos);
  document.getElementById("loadPos").style.background = '#00ff12';
} else{
  startingPos = document.getElementById("loadPos").value;
  console.log(startingPos);
  document.getElementById("loadPos").style.background = '#00ff12';
  document.getElementById("middlePos").style.background = '#dddddd';
  document.getElementById("boilerPos").style.background = '#dddddd';
}
}
function startMid(){
if(startingPos == false){
  startingPos = document.getElementById("middlePos").value;
  console.log(startingPos);
  document.getElementById("middlePos").style.background = '#00ff12';
}else {
  startingPos = document.getElementById("middlePos").value;
  console.log(startingPos);
  document.getElementById("middlePos").style.background = '#00ff12';
  document.getElementById("loadPos").style.background = '#dddddd';
  document.getElementById("boilerPos").style.background = '#dddddd';
}
}
function startBoiler(){
if(startingPos == false){
  startingPos = document.getElementById("boilerPos").value;
  console.log(startingPos);
  document.getElementById("boilerPos").style.background = '#00ff12';
}else {
  startingPos = document.getElementById("boilerPos").value;
  console.log(startingPos);
  document.getElementById("boilerPos").style.background = '#00ff12';
  document.getElementById("loadPos").style.background = '#dddddd';
  document.getElementById("middlePos").style.background = '#dddddd';
}
}

function autoMobility(){
mobility = true;
document.getElementById("mobilitydiv").style.display = 'none';
console.log("mobility = " + mobility);
auto++;
}
function gearField(){
groundPickup = true;
teleGearsAcquired++;
gearsAcquired++;
document.getElementById("gearsAcquiredlbl").innerHTML = gearsAcquired;
console.log("gear field");
}
function ballField(){
groundPickup = true;
console.log("ball field");
}
function autogearField(){
autoGearPickup ++;
teleGearsAcquired++;
gearsAcquired++;
document.getElementById("gearsAcquiredlbl").innerHTML = gearsAcquired;
console.log("auto gear field");
}
function autoballField(){
autoPickup = true;
console.log("auto ball field");
}
function gearLoad(){
teleGearsAcquired++;
gearsAcquired++;
document.getElementById("gearsAcquiredlbl").innerHTML = gearsAcquired;
console.log("gear HUMAN");
}

function ballLoad(){
console.log("balls HUMAN");
}
function autoport1(){
if(gearsAcquired >= gearsScored){
    console.log("gear scored port1");
    autoGear++;
    gearsScored++;
    document.getElementById("gearsScoredlbl").innerHTML = gearsScored;
    autoprefLift = "port1";
}
}
function autoport2(){
if(gearsAcquired >= gearsScored){
    console.log("gear scored port2");
    autoGear++;
    gearsScored++;
    document.getElementById("gearsScoredlbl").innerHTML = gearsScored;
    autoprefLift = "port2";
}
}
function autoport3(){
if(gearsAcquired >= gearsScored){
    console.log("gear scored port3");
    autoGear++;
    gearsScored++;
    document.getElementById("gearsScoredlbl").innerHTML = gearsScored;
    autoprefLift = "port3";
}
}
function port1(){
if(teleGearsAcquired >= teleGearsScored){
    console.log("gear scored port1");
    gearsScored++;
    teleGearsScored++;
    document.getElementById("gearsScoredlbl").innerHTML = gearsScored;
    prefport1++;
}
}
function port2(){
if(teleGearsAcquired >= teleGearsScored){
  console.log("gear scored port2");
  gearsScored++;
  teleGearsScored++;
  document.getElementById("gearsScoredlbl").innerHTML = gearsScored;
  prefport2++;
}
}
function port3(){
if(teleGearsAcquired >= teleGearsScored){
  console.log("gear scored port3");
  gearsScored++;
  teleGearsScored++;
  document.getElementById("gearsScoredlbl").innerHTML = gearsScored;
  prefport3++;
}
}
function scoreHigh(){
console.log("Scored 3 High");
ballsScored+= 3;
teleHigh+= 3;
pressure ++;
document.getElementById("ballScoredlbl").innerHTML = ballsScored;
document.getElementById("pressurelbl").innerHTML = pressure;
}
function scoreLow(){
console.log("Scored 5 Low");
ballsScored += 5;
teleLow += 5;
pressure += 5/9;
document.getElementById("ballScoredlbl").innerHTML = ballsScored;
document.getElementById("pressurelbl").innerHTML = pressure;
}
function autoScoreHigh(){
console.log("Scored 1 High");
ballsScored+= 1;
autoHigh+= 1;
pressure ++;
document.getElementById("ballScoredlbl").innerHTML = ballsScored;
document.getElementById("pressurelbl").innerHTML = pressure;
}
function autoScoreLow(){
console.log("Scored 5 Low");
ballsScored += 1;
autoLow += 5;
pressure += 5/3;
document.getElementById("ballScoredlbl").innerHTML = ballsScored;
document.getElementById("pressurelbl").innerHTML = pressure;
}

function hangtime() {
  timeEnd = new Date()
  hangDuration = (timeEnd - timestamp)/1000;
  console.log("hang ended " + hangDuration);
}
function hangSuccess() {
  hang = true;
  console.log("successful hang");
}

function hang1() {
  timestamp = new Date()
  console.log(timestamp+"hangstarted");
}
function hang2() {
  timestamp = new Date()
  console.log( timestamp +"hangstarted");
}
function hang3() {
  hang = true;
  timestamp = new Date()
  console.log( timestamp +"hangstarted");
}

function getformid(){
return ((matchNumber-1) * 6) + getStation();
}
function getStation(){
if(station == "r1"){
  return 1;
}
if(station == "r2"){
  return 2;
}
if(station == "r3"){
  return 3;
}
if(station == "b1"){
  return 4;
}
if(station == "b2"){
  return 5;
}
if(station == "b3"){
  return 6;
}
return false;
}
function getPrefLift() {
  if(prefport1 > prefport2 && prefport1 > prefport3){
    return 1;
  } else if (prefport2 > prefport1 && prefport2 > prefport3) {
    return 2;
  } else if (prefport3 > prefport2 && prefport3 > prefport1) {
    return 3;
  } else if (prefport1 == prefport2 && prefport1 == prefport3) {
    return 123;
  } else if (prefport1 == prefport3) {
    return 13;
  } else if (prefport2 == prefport3) {
    return 23;
  } else if (prefport1 == prefport2) {
    return 12;
  }
  else {
    return 0;
  }
}

function updategearlbl(){
  document.getElementById("gearlbl").innerHTML = document.getElementById("gearBot").value;
}
function updateshotlbl(){
  document.getElementById("shotlbl").innerHTML = document.getElementById("shotBot").value;
}
function updatedeflbl(){
  document.getElementById("defendlbl").innerHTML = document.getElementById("defendBot").value;
}

/*function hideDiv(divId) {
  document.getElementById(divId).style.display = none;
}
function showDiv(divId) {
  document.getElementById(divId).style.display = block;
}*/
function scoreAuto(){

  document.getElementById("endgame").style.display = 'block';
  document.getElementById("telebtn").style.display = 'block';
  document.getElementById("port").style.display = 'block';
  document.getElementById("pickup").style.display = 'block';
  document.getElementById("ballScore").style.display = 'block';


  document.getElementById("mobilitydiv").style.display = 'none';
  document.getElementById("startingPosdiv").style.display = 'none';
  document.getElementById("autoBallScore").style.display = 'none';
  document.getElementById("autoPickupdiv").style.display = 'none';
  document.getElementById("autoport").style.display = 'none';
  document.getElementById("autobtn").style.display = 'none';

/*  showDiv(endgame);
  showDiv(telebtn);
  showDiv(port);
  showDiv(pickup);
  showDiv(ballscore);

  hideDiv(mobilitydiv);
  hideDiv(startingPosdiv);
  hideDiv(autoBallScore);
  hideDiv(autoPickupdiv);
  hideDiv(autoport);
  hideDiv(autobtn);
*/
  AutoForm["form_id"] = getformid();
  AutoForm["team_number"] = teamNumber;
  AutoForm["match_number"] = matchNumber;
  //document.getElementById("autoBallScore").innerHTML = "";
//  document.getElementById("autoPickupdiv").innerHTML = "";
  //document.getElementById("autoport").innerHTML = "";
//  document.getElementById("mobilitydiv").innerHTML = "";
  //document.getElementById("autobtn").innerHTML = "";
  AutoForm["starting_pos"] = startingPos;
  AutoForm["auto_mobility"] = mobility;
  AutoForm["auto_ball_pickup"] = autoPickup;
  AutoForm["auto_high"] = autoHigh;
  AutoForm["auto_low"] = autoLow;
  AutoForm["auto_gear"] = autoGear;
  AutoForm["auto_gear_pickup"] = autoGearPickup;
  AutoForm["auto_pref_lift"] = autoprefLift;
  console.log(AutoForm);
  window.sessionStorage.setItem("autoForm", JSON.stringify(AutoForm));

}

function scoreTele(){
  document.getElementById("endgame").style.display = 'none';
  document.getElementById("telebtn").style.display = 'none';
  document.getElementById("port").style.display = 'none';
  document.getElementById("pickup").style.display = 'none';
  document.getElementById("ballScore").style.display = 'none';

  document.getElementById("misc").style.display = 'block';

  TeleForm["form_id"] = getformid();
  TeleForm["team_number"] = teamNumber;
  TeleForm["match_number"] = matchNumber;

  TeleForm["pressure"] = pressure;
  TeleForm["tele_high"] = teleHigh;
  TeleForm["ground_pickup"] = groundPickup;
  TeleForm["tele_low"] = teleLow;
  TeleForm["gears_acquired"] = teleGearsAcquired;
  TeleForm["gears_scored"] = teleGearsScored;
  TeleForm["pref_lift"] = getPrefLift();
  TeleForm["hang_duration"] = hangDuration;
  TeleForm["hang"] = hang;
  TeleForm["hang_davit"]=hangDavit;

  console.log(TeleForm);
  window.sessionStorage.setItem("teleForm", JSON.stringify(TeleForm));
}

function scoreForm(){

  FormForm["form_id"] = getformid();
  FormForm["team_number"] = teamNumber;
  FormForm["match_number"] = matchNumber;

  FormForm["gear_bot"] = document.getElementById("gearBot").value;
  FormForm["shot_bot"] = document.getElementById("shotBot").value;
  FormForm["defend_bot"] = document.getElementById("defendBot").value;
  FormForm["comments"] = document.getElementById("commentsinput").value;

  console.log(TeleForm);
  window.sessionStorage.setItem("teleForm", JSON.stringify(TeleForm));

  document.getElementById("misc").style.display = 'none';

  document.getElementById("next").style.display = 'block';

  sendData();
}
function sendData() {
  prepData();
  //post request here
}
function prepData() {
  submit["auto"] = AutoForm;
  submit["tele"] = TeleForm;
  submit["form"] = FormForm;
}
function nextMatch() {
  //server request for math number ++
}
