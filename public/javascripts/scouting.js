var startingPos=false, mobility=false, park = false, carried = false,
    nocarried = 0, comments = "",
    auto=0,
    auto_robot_action = [],
    tele_robot_action = [],
    hangAttempt = false, hangSuccess = false, hangState = 0,
    autoprefLift=0, prefport1 = 0, prefport2 = 0, prefport3 = 0,
    autoCubePickup = 0, autoPickup=false, telecubesAcquired = 0,
    telecubesScored = 0, station, matchNumber=0, teamNumber=0,
    hangDavit=1, timestamp, timeLap, timeDurr=0,
    submit = {}, exchangeAttempt = 0,
    ballGround, pressure = 0 ,
    human_load_far = 0, human_load_near = 0,
    cubesAcquired = 0, cubesScored = 0, prefLift, ballsScored =0,
    cubeAttempt1 = 0, cubeAttempt2 = 0 , cubeAttempt3 = 0, cubeAttempt4 = 0,
    auto_pyramid = 0, auto_ground = 0,
    auto_switch_far_attempt = 0, auto_switch_near_attempt =0, auto_scale_far_attempt = 0, auto_scale_near_attempt = 0,
    auto_switch_far_scored = 0, auto_switch_near_scored =0, auto_scale_far_scored = 0, auto_scale_near_scored = 0,
    auto_exchange_attempt = 0,auto_exchange_scored = 0,
    teleCube_attempt = 0, teleCube_scored = 0, tele_exchange_attempt = 0,tele_exchange_scored = 0,
    own_switch_near_attempt =0, own_switch_far_attempt =0, opp_switch_far_attempt =0, opp_switch_near_attempt =0, scale_near_attempt =0, scale_far_attempt = 0,
    own_switch_near_scored =0, own_switch_far_scored =0, opp_switch_far_scored =0, opp_switch_near_scored =0, scale_near_scored =0, scale_far_scored = 0,
    tele_switch_attempt = 0
    tele_switch_scored = 0
    tele_scale_attempt = 0
    tele_scale_scored = 0
    tele_opp_switch_attempt = 0
    tele_opp_switch_scored = 0
    zone_1 =0, zone_2 =0, zone_3 =0, zone_4 =0, teleCubePickup =0,
    port1State = 0, port2State = 0, port3State = 0, davit1State = 0,
    davit2State = 0, davit3State = 0, gearBot =0,
    shotBot =0, defendBot =0, autoHigh = 0, autoCube_attempt = 0, autoCube_scored = 0,
    teleHigh = 0, teleLow = 0,  statecol = "#00ff12",
    defcol  = "#ddd", holdingCube=true, timer = 0;


function updateStation(st) {
  station = st;
  station = document.getElementById("stationlbl").textContent;
  console.log(station.charAt(0));
}
window.onload = function(){
  document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
  document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
  document.getElementById("holdingCube").innerHTML = holdingCube;

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
  if(x=="switch"){
    switchBot = b0.value;
    console.log(x + switchBot);
  } else if (x=="scale") {
    scaleBot = b0.value;
    console.log(x + scaleBot);
  } else if (x=="exchange") {
    exchangeBot = b0.value;
    console.log(x + exchangeBot);
  } else if (x=="nocarried") {
    nocarried = b0.value;
    console.log(x + nocarried);
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
  console.log("def" + defendBot);
  console.log(document.getElementById("commentsinput").value);
}

function startTimer(){
    timestamp = new Date();
    var tempbtn = document.getElementById("countdownbtn")
    tempbtn.style.background = statecol;
    tempbtn.innerHTML = "timerRunning    Reset" ;
    timer++;

}

function startFar(){
  if(startingPos == false){
    startingPos = document.getElementById("farPos").value;
    console.log(startingPos);
    document.getElementById("farPos").style.background = statecol;
  } else if(startingPos != "far"){
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
  }else if (startingPos != "middle") {
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
  }else if (startingPos != "near") {
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
    auto_pyramid++;
    holdingCube=true;
    document.getElementById("holdingCube").innerHTML = holdingCube;
    document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
    console.log("auto cube acquired pyramid");
    timeLap = new Date()
    timeDurr = (timeLap - timestamp)/1000;
    var temp = "pyramid " + timeDurr;
    auto_robot_action.push(temp);
    console.log(auto_robot_action);
  }
}
function autoGround(){
  if(autoCubePickup < 5){
    resetPlatforms();
    autoCubePickup ++;
    cubesAcquired++;
    auto_ground++;
    holdingCube=true;
    document.getElementById("holdingCube").innerHTML = holdingCube;
    document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
    console.log("auto cube acquired ground");
    timeLap = new Date()
    timeDurr = (timeLap - timestamp)/1000;
    var temp = "ground pickup " + timeDurr;
    auto_robot_action.push(temp);
    console.log(auto_robot_action);
  }
}
function autoExchange(){
  if(holdingCube){
    if (exchangeAttempt == 0) {
      resetPlatforms();
      cubeAttempt1 = 1;
      exchangeAttempt++;
      auto_exchange_attempt++;
      autoCube_attempt++;
      document.getElementById("autoExchange").style.background = '#FFEB3B';
      document.getElementById("autoExchange").innerHTML = "Atmpt";
      console.log("Auto Attmpted Exchange");
    } else if (exchangeAttempt == 1) {
      resetPlatforms();
      document.getElementById("autoExchange").style.background = statecol;
      document.getElementById("autoExchange").innerHTML = "Scored";
      exchangeAttempt = 0;
      autoCube_scored++;
      cubesScored++;
      auto_exchange_scored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      //autoprefLift = "port1";
      holdingCube=false;
      document.getElementById("holdingCube").innerHTML = holdingCube;
      console.log("Auto Exchange Scored");
      timeLap = new Date()
      timeDurr = (timeLap - timestamp)/1000;
      var temp = "exchange " + timeDurr;
      auto_robot_action.push(temp);
      console.log(auto_robot_action);
    }
  }
}
function autoSwitchFar(){
  if(holdingCube){
    if (cubeAttempt1 == 0) {
      resetPlatforms();
      cubeAttempt1 = 1;
      auto_switch_far_attempt++;
      autoCube_attempt++;
      document.getElementById("autoSwitchFar").style.background = '#FFEB3B';
      document.getElementById("autoSwitchFar").innerHTML = "Attempt";
      console.log("Attmpted Swith Far");
    } else if (cubeAttempt1 == 1) {
      resetPlatforms();
      document.getElementById("autoSwitchFar").style.background = statecol;
      document.getElementById("autoSwitchFar").innerHTML = "Scored";
      autoCube_scored++;
      cubesScored++;
      auto_switch_far_scored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      holdingCube=false;
      document.getElementById("holdingCube").innerHTML = holdingCube;
      console.log("auto cube scored switch far");
      timeLap = new Date()
      timeDurr = (timeLap - timestamp)/1000;
      var temp = "switch far " + timeDurr;
      auto_robot_action.push(temp);
      console.log(auto_robot_action);
    }
  }
}
function autoSwitchNear(){
  if(holdingCube){
      if (cubeAttempt2 == 0) {
        resetPlatforms();
        cubeAttempt2 = 1;
        auto_switch_near_attempt++;
        autoCube_attempt++
        document.getElementById("autoSwitchNear").style.background = '#FFEB3B';
        document.getElementById("autoSwitchNear").innerHTML = "Attempt";
        console.log("attmpted Switch Near");
      } else if (cubeAttempt2 == 1) {
        resetPlatforms();
        document.getElementById("autoSwitchNear").style.background = statecol;
        document.getElementById("autoSwitchNear").innerHTML = "Scored";
        autoCube_scored++;
        cubesScored++;
        auto_switch_near_scored++;
        document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
        //autoprefLift = "port2";
        holdingCube=false;
        document.getElementById("holdingCube").innerHTML = holdingCube;
        console.log("auto cube scored switch near");
        timeLap = new Date()
        timeDurr = (timeLap - timestamp)/1000;
        var temp = "switch near " + timeDurr;
        auto_robot_action.push(temp);
        console.log(auto_robot_action);
      }
  }
}

function autoScaleFar(){
  if(holdingCube){
    if (cubeAttempt3 == 0) {
      resetPlatforms();
      cubeAttempt3 = 1;
      auto_scale_far_attempt++;
      autoCube_attempt++;
      document.getElementById("autoScaleFar").style.background = '#FFEB3B';
      document.getElementById("autoScaleFar").innerHTML = "Attempt";
      console.log("attmpted scale far");
    } else if (cubeAttempt3 == 1) {
      resetPlatforms();
      document.getElementById("autoScaleFar").style.background = statecol;
      document.getElementById("autoScaleFar").innerHTML = "Scored";
      autoCube_scored++;
      cubesScored++;
      auto_scale_far_scored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      //autoprefLift = "port3";
      holdingCube=false;
      document.getElementById("holdingCube").innerHTML = holdingCube;
      console.log("gear scored scale far");
      timeLap = new Date()
      timeDurr = (timeLap - timestamp)/1000;
      var temp = "scale far " + timeDurr;
      auto_robot_action.push(temp);
      console.log(auto_robot_action);
    }
  }
}
function autoScaleNear(){
  if(holdingCube){
    if (cubeAttempt4 == 0) {
      resetPlatforms();
      cubeAttempt4 = 1;
      auto_scale_near_attempt++;
      autoCube_attempt++;
      document.getElementById("autoScaleNear").style.background = '#FFEB3B';
      document.getElementById("autoScaleNear").innerHTML = "Attempt";
      console.log("attmpted scale near");
    } else if (cubeAttempt4 == 1) {
      resetPlatforms();
      document.getElementById("autoScaleNear").style.background = statecol;
      document.getElementById("autoScaleNear").innerHTML = "Scored";
      autoCube_scored++;
      cubesScored++;
      auto_scale_near_scored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      //autoprefLift = "port3";
      holdingCube=false;
      document.getElementById("holdingCube").innerHTML = holdingCube;
      console.log("gear scored scale near");
      timeLap = new Date()
      timeDurr = (timeLap - timestamp)/1000;
      var temp = "scale near " + timeDurr;
      auto_robot_action.push(temp);
      console.log(auto_robot_action);
    }
  }
}





















function ownSwitchFar(){
  if(holdingCube){
    if (cubeAttempt1 == 0) {
      resetPlatforms();
      cubeAttempt1 = 1;
      own_switch_far_attempt++;
      tele_switch_attempt++;
      teleCube_attempt++;
      document.getElementById("ownSwitchFar").style.background = '#FFEB3B';
      document.getElementById("ownSwitchFar").innerHTML = "Attempt";
      console.log("Attmpted Swith Far");
    } else if (cubeAttempt1 == 1) {
      resetPlatforms();
      document.getElementById("ownSwitchFar").style.background = statecol;
      document.getElementById("ownSwitchFar").innerHTML = "Scored";
      teleCube_scored++;
      cubesScored++;
      own_switch_far_scored++;
      tele_switch_scored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      holdingCube=false;
      document.getElementById("holdingCube").innerHTML = holdingCube;
      console.log("tele: cube scored switch far");
      tele_robot_action.push("own switch far");
      console.log(auto_robot_action);
    }
  }
}
function ownSwitchNear(){
  if(holdingCube){
      if (cubeAttempt2 == 0) {
        resetPlatforms();
        cubeAttempt2 = 1;
        own_switch_near_attempt++;
        tele_switch_attempt++;
        teleCube_attempt++;
        document.getElementById("ownSwitchNear").style.background = '#FFEB3B';
        document.getElementById("ownSwitchNear").innerHTML = "Attempt";
        console.log("attmpted Switch Near");
      } else if (cubeAttempt2 == 1) {
        resetPlatforms();
        document.getElementById("ownSwitchNear").style.background = statecol;
        document.getElementById("ownSwitchNear").innerHTML = "Scored";
        teleCube_scored++;
        cubesScored++;
        own_switch_near_scored++;
        tele_switch_scored++;
        document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
        holdingCube=false;
        document.getElementById("holdingCube").innerHTML = holdingCube;
        console.log("tele: cube scored switch near");
        tele_robot_action.push("own switch near");
        console.log(auto_robot_action);
      }
  }
}

function oppSwitchFar(){
  if(holdingCube){
    if (cubeAttempt5 == 0) {
      resetPlatforms();
      cubeAttempt5 = 1;
      opp_switch_far_attempt++;
      tele_opp_switch_attempt++;
      teleCube_attempt++;
      document.getElementById("oppSwitchFar").style.background = '#FFEB3B';
      document.getElementById("oppSwitchFar").innerHTML = "Attempt";
      console.log("Attmpted Swith Far");
    } else if (cubeAttempt5 == 1) {
      resetPlatforms();
      document.getElementById("oppSwitchFar").style.background = statecol;
      document.getElementById("oppSwitchFar").innerHTML = "Scored";
      teleCube_scored++;
      cubesScored++;
      opp_switch_far_scored++;
      tele_opp_switch_scored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      holdingCube=false;
      document.getElementById("holdingCube").innerHTML = holdingCube;
      console.log("tele: cube scored switch far");
      tele_robot_action.push("opp switch far");
      console.log(auto_robot_action);
    }
  }
}
function oppSwitchNear(){
  if(holdingCube){
      if (cubeAttempt6 == 0) {
        resetPlatforms();
        cubeAttempt6 = 1;
        opp_switch_near_attempt++;
        tele_opp_switch_attempt++;
        teleCube_attempt++;
        document.getElementById("oppSwitchNear").style.background = '#FFEB3B';
        document.getElementById("oppSwitchNear").innerHTML = "Attempt";
        console.log("attmpted Switch Near");
      } else if (cubeAttempt6 == 1) {
        resetPlatforms();
        document.getElementById("oppSwitchNear").style.background = statecol;
        document.getElementById("oppSwitchNear").innerHTML = "Scored";
        teleCube_scored++;
        cubesScored++;
        opp_switch_near_scored++;
        tele_opp_switch_scored++;
        document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
        holdingCube=false;
        document.getElementById("holdingCube").innerHTML = holdingCube;
        console.log("tele: cube scored switch near");
        tele_robot_action.push("opp switch near");
        console.log(auto_robot_action);
      }
  }
}
function scaleFar(){
  if(holdingCube){
    if (cubeAttempt3 == 0) {
      resetPlatforms();
      cubeAttempt3 = 1;
      scale_far_attempt++;
      tele_scale_attempt++;
      teleCube_attempt++;
      document.getElementById("scaleFar").style.background = '#FFEB3B';
      document.getElementById("scaleFar").innerHTML = "Attempt";
      console.log("attmpted scale far");
    } else if (cubeAttempt3 == 1) {
      resetPlatforms();
      document.getElementById("scaleFar").style.background = statecol;
      document.getElementById("scaleFar").innerHTML = "Scored";
      teleCube_scored++;
      tele_scale_scored++;
      cubesScored++;
      scale_far_scored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      //autoprefLift = "port3";
      holdingCube=false;
      document.getElementById("holdingCube").innerHTML = holdingCube;
      console.log("gear scored scale far");
      tele_robot_action.push("scale far");
      console.log(auto_robot_action);
    }
  }
}
function scaleNear(){
  if(holdingCube){
    if (cubeAttempt4 == 0) {
      resetPlatforms();
      cubeAttempt4 = 1
      scale_near_attempt++;
      tele_scale_attempt++;
      teleCube_attempt++;
      document.getElementById("scaleNear").style.background = '#FFEB3B';
      document.getElementById("scaleNear").innerHTML = "Attempt";
      console.log("attmpted scale near");
    } else if (cubeAttempt4 == 1) {
      resetPlatforms();
      document.getElementById("scaleNear").style.background = statecol;
      document.getElementById("scaleNear").innerHTML = "Scored";
      teleCube_scored++;
      tele_scale_scored++;
      cubesScored++;
      scale_near_scored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      //autoprefLift = "port3";
      holdingCube=false;
      document.getElementById("holdingCube").innerHTML = holdingCube;
      console.log("gear scored scale near");
      tele_robot_action.push("scale near");
      console.log(auto_robot_action);
    }
  }
}
function teleExchange(){
  if(holdingCube){
    if (exchangeAttempt == 0) {
      resetPlatforms();
      cubeAttempt1 = 1;
      exchangeAttempt++;
      tele_exchange_attempt++;
      teleCube_attempt++;
      document.getElementById("exchange").style.background = '#FFEB3B';
      document.getElementById("exchange").innerHTML = "Atmpt";
      console.log("Attmpted Exchange");
    } else if (exchangeAttempt == 1) {
      resetPlatforms();
      document.getElementById("exchange").style.background = statecol;
      document.getElementById("exchange").innerHTML = "Scored";
      exchangeAttempt = 0;
      teleCube_scored++;
      cubesScored++;
      tele_exchange_scored++;
      document.getElementById("cubesScoredlbl").innerHTML = cubesScored;
      holdingCube=false;
      document.getElementById("holdingCube").innerHTML = holdingCube;
      console.log("Tele Exchange Scored");
      tele_robot_action.push("exchange");
      console.log(auto_robot_action);
    }
  }
}


function zone1(){
    resetPlatforms();
    teleCubePickup ++;
    cubesAcquired++;
    zone_1++;
    holdingCube=true;
    document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
    document.getElementById("holdingCube").innerHTML = holdingCube;
    console.log("zone 1: cube acquired pyramid");
    tele_robot_action.push("zone 1");
    console.log(auto_robot_action);
}

function zone2(){
    resetPlatforms();
    teleCubePickup ++;
    cubesAcquired++;
    zone_2++;
    holdingCube=true;
    document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
    document.getElementById("holdingCube").innerHTML = holdingCube;
    console.log("zone 2: cube acquired pyramid");
    tele_robot_action.push("zone 2");
    console.log(auto_robot_action);
}

function zone3(){
    resetPlatforms();
    teleCubePickup ++;
    cubesAcquired++;
    zone_3++;
    holdingCube=true;
    document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
    document.getElementById("holdingCube").innerHTML = holdingCube;
    console.log("zone 3: cube acquired pyramid");
    tele_robot_action.push("zone 3");
    console.log(auto_robot_action);
}

function zone4(){
    resetPlatforms();
    teleCubePickup ++;
    cubesAcquired++;
    zone_4++;
    holdingCube=true;
    document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
    document.getElementById("holdingCube").innerHTML = holdingCube;
    console.log("zone 4: cube acquired pyramid");
    tele_robot_action.push("zone 4");
    console.log(auto_robot_action);
  }

function humanLoadFar(){
    resetPlatforms();
    teleCubePickup ++;
    cubesAcquired++;
    human_load_far++;
    holdingCube=true;
    document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
    document.getElementById("holdingCube").innerHTML = holdingCube;
    console.log("humanLoad: cube acquired far");
    tele_robot_action.push("human Load Far");
    console.log(auto_robot_action);
}


function humanLoadNear(){
    resetPlatforms();
    teleCubePickup ++;
    cubesAcquired++;
    human_load_near++;
    holdingCube=true;
    document.getElementById("cubesAcquiredlbl").innerHTML = cubesAcquired;
    document.getElementById("holdingCube").innerHTML = holdingCube;
    console.log("humanLoad: cube acquired near");
    tele_robot_action.push("human Load Near");
    console.log(auto_robot_action);
}


function changePark(){
  if(park){
    park = false;
    document.getElementById("parkbtn").style.background = defcol;
  } else {
    park = true;
    document.getElementById("parkbtn").style.background = statecol;
  }
  console.log("park = " + park);
}
function changeCarried(){
  if(carried){
    carried = false;
    document.getElementById("carriedbtn").style.background = defcol;
  } else {
    carried = true;
    document.getElementById("carriedbtn").style.background = statecol;
  }
  console.log("Carried = " + carried);
}

function resetPlatforms() {
  cubeAttempt3 = 0;
  cubeAttempt2 = 0;
  cubeAttempt1 = 0;
  cubeAttempt4 = 0;
  cubeAttempt5 = 0;
  cubeAttempt6 = 0;
  exchangeAttempt = 0;
  document.getElementById("autoSwitchFar").style.background = defcol;
  document.getElementById("autoSwitchFar").innerHTML = "";
  document.getElementById("autoSwitchNear").style.background = defcol;
  document.getElementById("autoSwitchNear").innerHTML = "";
  document.getElementById("autoScaleFar").style.background = defcol;
  document.getElementById("autoScaleFar").innerHTML = "";
  document.getElementById("autoScaleNear").style.background = defcol;
  document.getElementById("autoScaleNear").innerHTML = "";
  document.getElementById("autoExchange").style.background = defcol;
  document.getElementById("autoExchange").innerHTML = "";


  document.getElementById("ownSwitchFar").style.background = defcol;
  document.getElementById("ownSwitchFar").innerHTML = "";
  document.getElementById("ownSwitchNear").style.background = defcol;
  document.getElementById("ownSwitchNear").innerHTML = "";
  document.getElementById("oppSwitchFar").style.background = defcol;
  document.getElementById("oppSwitchFar").innerHTML = "";
  document.getElementById("oppSwitchNear").style.background = defcol;
  document.getElementById("oppSwitchNear").innerHTML = "";
  document.getElementById("scaleFar").style.background = defcol;
  document.getElementById("scaleFar").innerHTML = "";
  document.getElementById("scaleNear").style.background = defcol;
  document.getElementById("scaleNear").innerHTML = "";
  document.getElementById("exchange").style.background = defcol;
  document.getElementById("exchange").innerHTML = "";
}
function hang() {
  if (hangState == 0) {
    hangState++;
    hangAttempt = true;
    hangbtn.style.background = statecol;
    hangbtn.innerHTML = "Attempt";
    console.log("hang Attempt: " + hangAttempt);
  }else if (hangState == 1) {
    hangState = 2;
    hangSuccess = true;
    hangbtn.style.background = statecol;
    hangbtn.innerHTML = "Success";
    console.log("hang Success: " + hangSuccess);
  } else {
    hangbtn.style.background = defcol;
    hangbtn.innerHTML = "Hang";
    hangAttempt = false;
    hangSuccess = false;
    hangState = 0;
    console.log("hang: " + hangState);
  }
}

function getformid(){
  //console.log(((matchNumber-1) * 6) + getStation());
  var temp = matchNumber + " " + teamNumber;
  return (temp);
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
  document.getElementById("bg").style.visibility = 'visible';
  //document.getElementById("ballScoredlbl").innerHTML = autoHigh;
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
  console.log(JSON.stringify(AutoForm));
  window.sessionStorage.setItem("autoForm", JSON.stringify(AutoForm));
}
function showTele() {
    //scoreAuto();
    document.getElementById("autodiv").style.display = 'none';
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
    document.getElementById("bg").style.visibility = 'visible';
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
  document.getElementById("miscdiv").style.color = 'black';

  document.getElementById("submitbtn").style.display = 'block';
  document.getElementById("modelbl").innerHTML = "MISC MODE";
  document.getElementById("modelbl").style.background = "#d50000";
  document.getElementById("modebtmlbl").style.background = "#d50000";
  document.getElementById("showauto").style.border = '0px';
  document.getElementById("showtele").style.border = '0px';
  document.getElementById("showform").style.border = '2px';
  document.getElementById("bg").style.visibility = 'hidden';



  //scoreTele();
}
function scoreForm(){
  // FormForm["form_id"] = getformid();
  // FormForm["team_number"] = teamNumber;
  // FormForm["match_number"] = matchNumber;
  //
  // FormForm["gear_bot"] = gearBot;
  // FormForm["shot_bot"] = shotBot;
  // FormForm["defend_bot"] = defendBot;
  comments =  document.getElementById("commentsinput").value;

  //console.log(TeleForm);
  //window.sessionStorage.setItem("teleForm", JSON.stringify(TeleForm));

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
  //submitpref();
  document.getElementById("submitbtn").disabled=true;
  $.post("scouting/submitMatchData",submit);

  nextMatch();
}
function submitpref(id){
  sumbit = window.localStorage.getItem(id);
  $.post("scouting/api/sendData",submit);
  alert( id+ " submited");
}
function prepData() {
  // submit.starting_pos = startingPos;
  // submit.mobility = mobility;
  submit = {
    "matchNumber" : matchNumber,
    "teamNumber" : teamNumber,
    "tournament" : "york",

    "cubesAcquired" : cubesAcquired,
    "cubesScored" : cubesScored,

    "starting_pos" : startingPos,
    "mobility" : mobility,

    "autoPyramid" : auto_pyramid,
    "autoGround" : auto_ground,
    "autoCubePickup" : autoCubePickup,
    "autoExchangeAttempt" : auto_exchange_attempt,
    "autoExchangeScored" : auto_exchange_scored,
    "autoSwitchFarAttempt" : auto_switch_far_attempt,
    "autoSwitchFarScored" : auto_switch_far_scored,
    "autoSwitchNearAttempt" : auto_switch_near_attempt,
    "autoSwitchNearScored" : auto_switch_near_scored,
    "autoScaleFarAttempt" : auto_scale_far_attempt,
    "autoScaleFarScored" : auto_scale_far_scored,
    "autoScaleNearAttempt" : auto_scale_near_attempt,
    "autoScaleNearScored" : auto_scale_near_scored,
    "autoCubeAttempt" : autoCube_attempt,
    "autoCubeScored" : autoCube_scored,
    "autoRobotAction" : auto_robot_action,

    "ownSwitchFarAttempt" : own_switch_far_attempt,
    "ownSwitchFarScored" : own_switch_far_scored,
    "ownSwitchNearAttempt" : own_switch_near_attempt,
    "ownSwitchNearScored" : own_switch_near_scored,
    "scaleFarAttempt" : scale_far_attempt,
    "scaleFarScored" : scale_far_scored,
    "scaleNearAttempt" : scale_near_attempt,
    "scaleNearScored" : scale_near_scored,
    "oppSwitchFarAttempt" : opp_switch_far_attempt,
    "oppSwitchFarScored" : opp_switch_far_scored,
    "oppSwitchNearAttempt" : opp_switch_near_attempt,
    "oppSwitchNearScored" : opp_switch_near_scored,
    "teleExchangeAttempt" : tele_exchange_attempt,
    "teleExchangeScored" : tele_exchange_scored,
    "teleSwitchAttempt" : tele_switch_attempt,
    "teleSwitchScored" : tele_switch_scored,
    "teleScaleAttempt" : tele_scale_attempt,
    "teleScaleScored" : tele_scale_scored,
    "teleOppSwitchAttempt" : tele_opp_switch_attempt,
    "teleOppSwitchScored" : tele_opp_switch_scored,
    "telePickup" : {"1": zone_1, "2":zone_2, "3":zone_3, "4":zone_4 ,"humanLoadNear" : human_load_near, "humanLoadFar" : human_load_far},
    "teleCubePickup" : teleCubePickup,
    "teleCubeAttempt" : teleCube_attempt,
    "teleCubeScored" : teleCube_scored,
    "teleRobotAction" : tele_robot_action,

    "park" : park,
    "carried" : carried,
    "hangAttempt" : hangAttempt,
    "hangSuccess" : hangSuccess,
    "noCarried" : nocarried,
    "comments" : comments,

    }








  // submit.auto = AutoForm;
  // submit.tele = TeleForm;
  // submit.form = FormForm;
  window.sessionStorage.setItem("submit", JSON.stringify(submit));
  window.localStorage.setItem(getformid(), JSON.stringify(submit));
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
