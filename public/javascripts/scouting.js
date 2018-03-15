var startingPos=false, mobility=false,
    gearField, gearLoad, gearGround, ballField, ballLoad, auto=0,
    AutoForm = {},
    autoprefLift=0, prefport1 = 0, prefport2 = 0, prefport3 = 0,
    autoCubePickup = 0, autoPickup=false, telecubesAcquired = 0,
    telecubesScored = 0, station, matchNumber=0, teamNumber=0,
    TeleForm = {} , hangDavit=1, timestamp, timeEnd,
    FormForm ={}, submit = {},
    ballGround, pressure = 0 , groundPickup = false,
    cubesAcquired = 0, cubesScored = 0, prefLift, ballsScored =0,
    cubeAttempt1 = 0, cubeAttempt2 = 0 , cubeAttempt3 = 0, cubeAttempt4 = 0,
    autoPyramid = 0, autoGround = 0, autoSwitchFar = 0, autoSwitchNear =0,
    autoScaleFar = 0, autoScaleNear = 0,
    port1State = 0, port2State = 0, port3State = 0, davit1State = 0,
    davit2State = 0, davit3State = 0, hangDavit = 0, gearBot =0,
    shotBot =0, defendBot =0, autoHigh = 0, autoLow = 0, autoCube = 0,
    teleHigh = 0, teleLow = 0, hangDuration=0, hang = false, statecol = "#00ff12",
    defcol  = "#ddd", holdingCube=true;


function updateStation(st) {
  station = st;
  station = document.getElementById("stationlbl").textContent;
  console.log(station.charAt(0));
}
window.onload = function(){
  document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
  document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
  //document.getElementById("pressurelbl").innerHTML = pressure;
  //document.getElementById("ballScoredlbl").innerHTML = autoHigh;
  //document.getElementById("ballScoredLowlbl").innerHTML = autoLow;

  if(station.charAt(0) == 'b'){
    document.getElementById("pagestyle").setAttribute("href", "../assets/generated-css/scoutingblue.css");
  }

  matchNumber = parseInt(document.getElementById("matchNumberlbl").textContent);
  teamNumber = parseInt(document.getElementById("teamNumberlbl").textContent);

}

function setValue(b0,b1,b2,x) {
  b0.style.background = statecol;
  b1.style.background = defcol;
  b2.style.background = defcol;
  if(x=="gear"){
    gearBot = b0.value;
    console.log(gearBot);
  } else if (x=="shot") {
    shotBot = b0.value;
    console.log(shotBot);
  } else if (x=="low") {
    teleLow = b0.value;
    console.log(teleLow);
  }
}
function setDefValue(b0,b1,b2,b3,b4,b5) {
  b0.style.background = statecol;
  b1.style.background = defcol;
  b2.style.background = defcol;
  b3.style.background = defcol;
  b4.style.background = defcol;
  b5.style.background = defcol;

  defendBot = b0.value;
  console.log(defendBot);
}



function startFar(){
  if(startingPos == false){
    startingPos = document.getElementById("farPos").value;
    console.log(startingPos);
    document.getElementById("farPos").style.background = statecol;
  } else{
    startingPos = document.getElementById("farPos").value;
    console.log(startingPos);
    document.getElementById("farPos").style.background = statecol;
    document.getElementById("middlePos").style.background = defcol;
    document.getElementById("nearPos").style.background = defcol;
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
    document.getElementById("nearPos").style.background = defcol;
    document.getElementById("farPos").style.background = defcol;
  }
}
function startNear(){
  if(startingPos == false){
    startingPos = document.getElementById("nearPos").value;
    console.log(startingPos);
    document.getElementById("nearPos").style.background = statecol;
  }else {
    startingPos = document.getElementById("nearPos").value;
    console.log(startingPos);
    document.getElementById("nearPos").style.background = statecol;
    document.getElementById("farPos").style.background = defcol;
    document.getElementById("middlePos").style.background = defcol;
  }
}


function changeMobility(){
  //resetPlatforms();
  if(mobility){
    mobility = false;
    document.getElementById("mobibtn").style.background = defcol;
  } else {
    mobility = true;
    document.getElementById("mobibtn").style.background = statecol;
  }
  console.log("mobility = " + mobility);
}

function autoPyramid(){
  if(autoCubePickup < 5){
    resetPlatforms();
    autoCubePickup ++;
    cubesAcquired++;
    autoPyramid++;
    holdingCube=true;
    document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
    console.log("auto cube acquired pyramid");
  }
}
function autoGround(){
  if(autoCubePickup < 5){
    resetPlatforms();
    autoCubePickup ++;
    cubesAcquired++;
    autoGround++;
    holdingCube=true;
    document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
    console.log("auto cube acquired pyramid");
  }
}

function autoSwitchFar(){
  if(holdingCube){
    if (cubeAttempt1 == 0) {
      resetPlatforms();
      cubeAttempt1 = 1;
      document.getElementById("autoSwitchFar").style.background = '#FFEB3B';
      document.getElementById("autoSwitchFar").innerHTML = "Attempt";
      console.log("Attmpted Swith Far");
    } else if (cubeAttempt1 == 1) {
      resetPlatforms();
      document.getElementById("autoSwitchFar").style.background = statecol;
      document.getElementById("autoSwitchFar").innerHTML = "Scored";
      autoCube++;
      cubesScored++;
      autoSwitchFar++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      //autoprefLift = "port1";
      holdingCube=false;
      console.log("auto cube scored switch far");
    }
  }
}
function autoSwitchNear(){
  if(holdingCube){
      if (cubeAttempt2 == 0) {
        resetPlatforms();
        cubeAttempt2 = 1;
        document.getElementById("autoSwitchNear").style.background = '#FFEB3B';
        document.getElementById("autoSwitchNear").innerHTML = "Attempt";
        console.log("attmpted Switch Near");
      } else if (cubeAttempt2 == 1) {
        resetPlatforms();
        document.getElementById("autoSwitchNear").style.background = statecol;
        document.getElementById("autoSwitchNear").innerHTML = "Scored";
        autoCube++;
        cubesScored++;
        autoSwitchNear++;
        document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
        //autoprefLift = "port2";
        holdingCube=false;
        console.log("auto cube scored switch near");
      }
  }
}
function autoScaleFar(){
  if(holdingCube){
    if (cubeAttempt3 == 0) {
      resetPlatforms();
      cubeAttempt3 = 1;
      document.getElementById("autoScaleFar").style.background = '#FFEB3B';
      document.getElementById("autoScaleFar").innerHTML = "Attempt";
      console.log("attmpted scale far");
    } else if (cubeAttempt3 == 1) {
      resetPlatforms();
      document.getElementById("autoScaleFar").style.background = statecol;
      document.getElementById("autoScaleFar").innerHTML = "Scored";
      autoCube++;
      cubesScored++;
      autoScaleFar++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      //autoprefLift = "port3";
      holdingCube=false;
      console.log("gear scored scale far");
    }
  }
}
function autoScaleNear(){
  if(holdingCube){
    if (cubeAttempt4 == 0) {
      resetPlatforms();
      cubeAttempt4 = 1;
      document.getElementById("autoScaleNear").style.background = '#FFEB3B';
      document.getElementById("autoScaleNear").innerHTML = "Attempt";
      console.log("attmpted scale near");
    } else if (cubeAttempt4 == 1) {
      resetPlatforms();
      document.getElementById("autoScaleNear").style.background = statecol;
      document.getElementById("autoScaleNear").innerHTML = "Scored";
      autoCube++;
      cubesScored++;
      autoScaleNear++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      //autoprefLift = "port3";
      holdingCube=false;
      console.log("gear scored scale near");
    }
  }
}



function gearLoad(){
  resetPlatforms();
  resetDavit();
  telecubesAcquired++;
  cubesAcquired++;
  holdingCube=true;
  document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
  console.log("gear HUMAN");
}

function ballLoad(){
  resetPlatforms();
  resetDavit();
  console.log("balls HUMAN");
}
function gearField(){
  resetPlatforms();
  resetDavit();
  groundPickup = true;
  telecubesAcquired++;
  cubesAcquired++;
  holdingCube=true;
  document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
  console.log("gear field");
}
function ballField(){
  resetPlatforms();
  resetDavit();
  //btn.style.background = statecol;
  groundPickup = true;
  console.log("ball field");
}
function port1(){
  if(holdingCube){
    if (cubeAttempt1 == 0) {
      resetPlatforms();
      resetDavit();
      cubeAttempt1 = 1;
      document.getElementById("port1").style.background = '#FFEB3B';
      document.getElementById("port1").innerHTML = "Attempt";
      console.log("attmpted port 1");
    } else if (cubeAttempt1 == 1) {
      resetPlatforms();
      resetDavit();
      document.getElementById("port1").style.background = statecol;
      document.getElementById("port1").innerHTML = "Scored";
      telecubesScored++;
      cubesScored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      holdingCube=false;
      console.log("gear scored port1");
    }
  }
}
function port2(){
  if(holdingCube){
    if (cubeAttempt2 == 0) {
      resetPlatforms();
      resetDavit();
      cubeAttempt2 = 1;
      document.getElementById("port2").style.background = '#FFEB3B';
      document.getElementById("port2").innerHTML = "Attempt";
      console.log("attmpted port 2");
    } else if (cubeAttempt2 == 1) {
      resetPlatforms();
      resetDavit();
      document.getElementById("port2").style.background = statecol;
      document.getElementById("port2").innerHTML = "Scored";
      telecubesScored++;
      cubesScored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      autoprefLift = "port2";
      holdingCube=false;
      console.log("gear scored port2");
    }
  }
}
function port3(){
  if(holdingCube){
    if (cubeAttempt3 == 0) {
      resetPlatforms();
      resetDavit();
      cubeAttempt3 = 1;
      document.getElementById("port3").style.background = '#FFEB3B';
      document.getElementById("port3").innerHTML = "Attempt";
      console.log("attmpted port 3");
    } else if (cubeAttempt3 == 1) {
      resetPlatforms();
      resetDavit();
      document.getElementById("port3").style.background = statecol;
      document.getElementById("port3").innerHTML = "Scored";
      telecubesScored++;
      cubesScored++;
      prefport3++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      autoprefLift = "port3";
      holdingCube=false;
      console.log("gear scored port3");
    }
  }
}
function resetPlatforms() {
  cubeAttempt3 = 0;
  cubeAttempt2 = 0;
  cubeAttempt1 = 0;
  document.getElementById("autoSwitchFar").style.background = defcol;
  document.getElementById("autoSwitchFar").innerHTML = "";
  document.getElementById("autoSwitchNear").style.background = defcol;
  document.getElementById("autoSwitchNear").innerHTML = "";
  document.getElementById("autoScaleFar").style.background = defcol;
  document.getElementById("autoScaleFar").innerHTML = "";
  document.getElementById("autoScaleNear").style.background = defcol;
  document.getElementById("autoScaleNear").innerHTML = "";

  document.getElementById("ownSwitchFar").style.background = defcol;
  document.getElementById("ownSwitchFar").innerHTML = "";
  document.getElementById("ownSwitchNear").style.background = defcol;
  document.getElementById("ownSwitchNear").innerHTML = "";
  document.getElementById("ownSwitchFar").style.background = defcol;
  document.getElementById("ownSwitchFar").innerHTML = "";
  document.getElementById("ownSwitchNear").style.background = defcol;
  document.getElementById("ownSwitchNear").innerHTML = "";
  document.getElementById("scaleFar").style.background = defcol;
  document.getElementById("scaleFar").innerHTML = "";
  document.getElementById("scaleNear").style.background = defcol;
  document.getElementById("scaleNear").innerHTML = "";

}
function scoreHigh(){
  resetPlatforms();
  resetDavit();
  console.log("Scored 3 High");
  teleHigh+= 3;
  pressure ++;
  document.getElementById("ballScoredlbl").innerHTML = teleHigh;
  document.getElementById("pressurelbl").innerHTML = pressure;
}
function autoScoreHigh(){
  resetPlatforms();

  console.log("Scored 1 High");
  autoHigh ++;
  pressure ++;
  document.getElementById("ballScoredlbl").innerHTML = autoHigh;
  document.getElementById("pressurelbl").innerHTML = pressure;
}
function autoScoreLow(){
  resetPlatforms();

    console.log("Scored 3 Low");
    ballsScored += 3;
    autoLow += 3;
    pressure += 1;
    document.getElementById("ballScoredLowlbl").innerHTML = autoLow;
    document.getElementById("pressurelbl").innerHTML = pressure;
}

function hang1(davit) {
  resetPlatforms();
  if (davit1State == 0) {
    resetDavit();
    davit1State = 1;
    davit.style.background = '#FFEB3B';
    davit.innerHTML = "St";
    timestamp = new Date()
    console.log(timestamp+"hangstarted");
  }else if (davit1State == 1) {
    resetDavit();
    davit1State = 2;
    davit.style.background = '#EF5350';
    davit.innerHTML = "End";
    timeEnd = new Date()
    hangDuration = (timeEnd - timestamp)/1000;
    console.log("hang ended " + hangDuration);
  } else {
    resetDavit();
    davit.style.background = statecol;
    davit.innerHTML = "OK";
    hang = true;
    hangDavit = 1;
    console.log("successful hang on" + hangDavit);
  }
}
function hang2(davit) {
  resetPlatforms();
  if (davit2State == 0) {
    resetDavit();
    davit2State = 1;
    davit.style.background = '#FFEB3B';
    davit.innerHTML = "St";
    timestamp = new Date()
    console.log(timestamp+"hangstarted");
  }else if (davit2State == 1) {
    resetDavit();
    davit2State = 2;
    davit.style.background = '#EF5350';
    davit.innerHTML = "End";
    timeEnd = new Date()
    hangDuration = (timeEnd - timestamp)/1000;
    console.log("hang ended " + hangDuration + "  "+davit2State);
  } else {
    resetDavit();
    davit.style.background = statecol;
    davit.innerHTML = "OK";
    hang = true;
    hangDavit = 2;
    console.log("successful hang on "+hangDavit);
  }
}
function hang3(davit) {
  resetPlatforms();
  if (davit3State == 0) {
    resetDavit();
    davit3State = 1;
    davit.style.background = '#FFEB3B';
    davit.innerHTML = "St";
    timestamp = new Date()
    console.log(timestamp+"hangstarted");
  }else if (davit3State == 1) {
    resetDavit();
    davit3State = 2;
    davit.style.background = '#EF5350';
    davit.innerHTML = "End";
    timeEnd = new Date()
    hangDuration = (timeEnd - timestamp)/1000;
    console.log("hang ended " + hangDuration);
  } else {
    resetDavit();
    davit.style.background = statecol;
    davit.innerHTML = "OK";
    hang = true;
    hangDavit = 3;
    console.log("successful hang on " + hangDavit);
  }
}
function resetDavit() {
  davit1State = 0;
  davit2State = 0;
  davit3State = 0;
  document.getElementById("davit1").style.background = '#000';
  document.getElementById("davit1").innerHTML = "";
  document.getElementById("davit2").style.background = '#000';
  document.getElementById("davit2").innerHTML = "";
  document.getElementById("davit3").style.background = '#000';
  document.getElementById("davit3").innerHTML = "";
}
function getformid(){
  return (providedid);
//return ((matchNumber-1) * 6) + getStation();
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

function showAuto() {
  document.getElementById("autodiv").style.display = 'block';
  document.getElementById("telediv").style.display = 'none';
  document.getElementById("miscdiv").style.display = 'none';
  document.getElementById("submitbtn").style.display = 'none';
  document.getElementById("modelbl").innerHTML = "AUTO MODE";
  document.getElementById("modelbl").style.background = "#FFD600";
  document.getElementById("modebtmlbl").style.background = "#FFD600";
  document.getElementById("ballScoredlbl").innerHTML = autoHigh;
  //document.getElementById("ballScoredLowlbl").style.display = 'block';
  //document.getElementById("LowBall").style.display = 'block';
  document.getElementById("showauto").style.border = '2px';
  document.getElementById("showtele").style.border = '0px';
  document.getElementById("showform").style.border = '0px';

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
  AutoForm["auto_gear_pickup"] = autoCubePickup;
  AutoForm["auto_pref_lift"] = autoprefLift;
  AutoForm["auto_gear"] = autoCube;
  console.log(AutoForm);
  window.sessionStorage.setItem("autoForm", JSON.stringify(AutoForm));
}
function showTele() {
    //scoreAuto();
    //document.getElementById("autodiv").style.display = 'none';
    document.getElementById("telediv").style.display = 'block';
    document.getElementById("miscdiv").style.display = 'none';
    document.getElementById("submitbtn").style.display = 'none';
    document.getElementById("modelbl").innerHTML = "TELE MODE";
    document.getElementById("modelbl").style.background = "#00c853";
    document.getElementById("modebtmlbl").style.background = "#00c853";
    //document.getElementById("ballScoredlbl").innerHTML = teleHigh;
    //document.getElementById("ballScoredLowlbl").style.display = 'none';
    //document.getElementById("LowBall").style.display = 'none';
    //scoreAuto();
    document.getElementById("showauto").style.border = '0px';
    document.getElementById("showtele").style.border = '2px';
    document.getElementById("showform").style.border = '0px';
}
function scoreTele(){


  TeleForm["form_id"] = getformid();
  TeleForm["team_number"] = teamNumber;
  TeleForm["match_number"] = matchNumber;

  TeleForm["pressure"] = pressure;
  TeleForm["ground_pickup"] = groundPickup;
  TeleForm["tele_high"] = teleHigh;
  TeleForm["tele_low"] = teleLow;
  TeleForm["gears_acquired"] = telecubesAcquired;
  TeleForm["gears_scored"] = telecubesScored;
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
  document.getElementById("submitbtn").style.display = 'block';
  document.getElementById("modelbl").innerHTML = "MISC MODE";
  document.getElementById("modelbl").style.background = "#d50000";
  document.getElementById("modebtmlbl").style.background = "#d50000";
  document.getElementById("showauto").style.border = '0px';
  document.getElementById("showtele").style.border = '0px';
  document.getElementById("showform").style.border = '2px';



  scoreTele();
}
function scoreForm(){

  FormForm["form_id"] = getformid();
  FormForm["team_number"] = teamNumber;
  FormForm["match_number"] = matchNumber;

  FormForm["gear_bot"] = gearBot;
  FormForm["shot_bot"] = shotBot;
  FormForm["defend_bot"] = defendBot;
  //FormForm["comments"] = document.getElementById("commentsinput").value;

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
  submitpref();
  $.post("scouting/api/sendData",submit);
  nextMatch();
}
function submitpref(id){
  sumbit = window.localStorage.getItem(id);
  $.post("scouting/api/sendData",submit);
  alert( id+ " submited");
}
function prepData() {
  submit.auto = AutoForm;
  submit.tele = TeleForm;
  submit.form = FormForm;
  window.sessionStorage.setItem("submit", JSON.stringify(submit));
  window.localStorage.setItem(getformid(),submit);
  console.log(submit);
}
function nextMatch() {
  matchNumber++;
  var url = 'scouting?matchNumber='+matchNumber+'&station='+station;
  window.location.href=url;

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
function get(path, callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}
