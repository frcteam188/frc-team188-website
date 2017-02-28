var startingPos=false, mobility=false, gearField, gearLoad, gearGround, ballField, ballLoad, auto=0, AutoForm = {},
    autoprefLift=0, prefport1 = 0, prefport2 = 0, prefport3 = 0, autoGearPickup = 0, autoPickup=false, teleGearsAcquired = 0,
    teleGearsScored = 0, station, matchNumber=0, teamNumber=0, TeleForm = {} , hangDavit=1, timestamp, timeEnd, FormForm ={}, submit = {},
    ballGround, pressure = 0 , groundPickup = false, gearsAcquired = 0, gearsScored = 0, prefLift, ballsScored =0,
    autoHigh = 0, autoLow = 0, autoGear = 0, teleHigh = 0, teleLow = false, hangDuration=0, hang = false, statecol = "#00ff12" , defcol  = "#ddd";

function updateStation(st) {
  station = st;
  station = document.getElementById("stationlbl").textContent;
  console.log(station);
}
window.onload = function(){
  document.getElementById("gearsAcquiredlbl").innerHTML = gearsAcquired;
  document.getElementById("gearsScoredlbl").innerHTML = gearsScored;
  document.getElementById("pressurelbl").innerHTML = pressure;
  document.getElementById("ballScoredlbl").innerHTML = ballsScored;

  matchNumber = parseInt(document.getElementById("matchNumberlbl").textContent);
}


function startLoad(){
if(startingPos == false){
  startingPos = document.getElementById("loadPos").value;
  console.log(startingPos);
  document.getElementById("loadPos").style.background = statecol;
} else{
  startingPos = document.getElementById("loadPos").value;
  console.log(startingPos);
  document.getElementById("loadPos").style.background = statecol;
  document.getElementById("middlePos").style.background = defcol;
  document.getElementById("boilerPos").style.background = defcol;
}
}
function startMid(){
if(startingPos == false){
  startingPos = document.getElementById("middlePos").value;
  console.log(startingPos);
  document.getElementById("middlePos").style.background = statecol;
}else {
  startingPos = document.getElementById("middlePos").value;
  console.log(startingPos);
  document.getElementById("middlePos").style.background = statecol;
  document.getElementById("loadPos").style.background = defcol;
  document.getElementById("boilerPos").style.background = defcol;
}
}
function startBoiler(){
if(startingPos == false){
  startingPos = document.getElementById("boilerPos").value;
  console.log(startingPos);
  document.getElementById("boilerPos").style.background = statecol;
}else {
  startingPos = document.getElementById("boilerPos").value;
  console.log(startingPos);
  document.getElementById("boilerPos").style.background = statecol;
  document.getElementById("loadPos").style.background = defcol;
  document.getElementById("middlePos").style.background = defcol;
}
}

function autoMobility(){
mobility = true;
document.getElementById("mobizone").style.display = 'none';
document.getElementById("mobismall").style.display = 'block';
document.getElementById("mobismall").style.background = statecol;
document.getElementById("mobismall").innerHTML = 'Mobility True';

console.log("mobility = " + mobility);
}
function changeMobility(){
  if(mobility){
    mobility = false;
    document.getElementById("mobismall").style.background = defcol;
    document.getElementById("mobismall").innerHTML = 'Mobility false';
  } else {
    mobility = true;
    document.getElementById("mobismall").style.background = statecol;
    document.getElementById("mobismall").innerHTML = 'Mobility True';
  }
console.log("mobility = " + mobility);
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

function showAuto() {
  document.getElementById("autodiv").style.display = 'block';
  document.getElementById("telediv").style.display = 'none';
  document.getElementById("miscdiv").style.display = 'none';
}
function scoreAuto(){

  AutoForm["form_id"] = getformid();
  AutoForm["team_number"] = teamNumber;
  AutoForm["match_number"] = matchNumber;

  AutoForm["starting_pos"] = startingPos;
  AutoForm["mobility"] = mobility;
  AutoForm["auto_ball_pickup"] = autoPickup;
  AutoForm["auto_high"] = autoHigh;
  AutoForm["auto_low"] = autoLow;
//  AutoForm["auto_gear"] = autoGear;
  AutoForm["auto_gear_pickup"] = autoGearPickup;
  AutoForm["auto_pref_lift"] = autoprefLift;
  console.log(AutoForm);
  window.sessionStorage.setItem("autoForm", JSON.stringify(AutoForm));
}
function showTele() {
    scoreAuto();
    document.getElementById("autodiv").style.display = 'none';
    document.getElementById("telediv").style.display = 'block';
    document.getElementById("miscdiv").style.display = 'none';

}
function scoreTele(){


  TeleForm["form_id"] = getformid();
  TeleForm["team_number"] = teamNumber;
  TeleForm["match_number"] = matchNumber;

  TeleForm["pressure"] = pressure;
  TeleForm["ground_pickup"] = groundPickup;
  TeleForm["tele_high"] = teleHigh;
  TeleForm["tele_low"] = teleLow;
  TeleForm["gears_acquired"] = teleGearsAcquired;
  TeleForm["gears_scored"] = teleGearsScored;
  TeleForm["pref_lift"] = getPrefLift();
  TeleForm["hang"] = hang;
  TeleForm["hang_duration"] = hangDuration;
  TeleForm["hang_davit"]=hangDavit;

  console.log(TeleForm);
  window.sessionStorage.setItem("teleForm", JSON.stringify(TeleForm));
}
function showForm() {
  document.getElementById("autodiv").style.display = 'none';
  document.getElementById("telediv").style.display = 'none';
  document.getElementById("miscdiv").style.display = 'block';
  scoreTele();
}
function scoreForm(){

  FormForm["form_id"] = getformid();
  FormForm["team_number"] = teamNumber;
  FormForm["match_number"] = matchNumber;

  FormForm["gear_bot"] = document.getElementById("gearBot").value;
  FormForm["shot_bot"] = document.getElementById("shotBot").value;
  FormForm["defend_bot"] = document.getElementById("defendBot").value;
//  FormForm["comments"] = document.getElementById("commentsinput").value;

  console.log(TeleForm);
  window.sessionStorage.setItem("teleForm", JSON.stringify(TeleForm));

  sendData();
}
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
         }
    }
    document.body.appendChild(form);
    form.submit();
}
function sendData() {
  prepData();
  $.post("scouting/api/sendData",submit);
  nextMatch();
}
function prepData() {
  submit.auto = AutoForm;
  submit.tele = TeleForm;
  submit.form = FormForm;
  window.sessionStorage.setItem("submit", JSON.stringify(submit));
  console.log(submit);
}
function nextMatch() {
  matchNumber++;
  var url = 'scouting?matchNumber='+matchNumber+'&station='+station;
  window.location.href=url;
}
