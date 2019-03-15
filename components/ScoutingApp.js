'use strict';

const e = React.createElement;
const {
  AppBar,
  Avatar,
  Button,
  colors,
  createMuiTheme,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MuiThemeProvider,
  Tabs,
  Tab,
  Typography,
  withStyles,
} = window['material-ui'];

class Cycle {
  constructor(robot, match, phase) {
    this.robot = robot;
    this.match = match;
    this.phase =  phase;
    this.piece = undefined;
    this.pickup = undefined;
    this.score = undefined;
    this.level = undefined;
    this.success = undefined;
    this.timer = undefined;
    this.time = undefined;
  }
}
class Hab {
  constructor(robot, match, phase) {
    this.robot = robot;
    this.match = match;
    this.phase = phase;
    this.level = 0;
    this.success = undefined;
    this.timer = undefined;
    this.time = undefined;
  }
}

class Defence {
  constructor(robot, match, phase) {
    this.type = undefined; // pin, drop piece 
    this.success = undefined; // foul, success
  }
}

class ScoutingApp extends React.Component {

  getPickupAsset = (pickup) => {
    const pickupArea = pickup && (pickup.includes('hp') ? 'hp' : pickup);
    const assetMap = {floor: '/assets/pictures/floor.png', hp: '/assets/pictures/human.png', preload: '/assets/pictures/preload.png'}
    return assetMap[pickupArea];
  }

  getGamePieceAsset = (gamePiece) => {
    const assetMap = {none: '/assets/pictures/no_game_piece.jpg', hatch: '/assets/pictures/hatch.jpg', cargo: '/assets/pictures/cargo.jpg'};
    return assetMap[gamePiece];
  }

  getScoringAreaAsset = (scoringArea) => {
    const scoringShip = scoringArea && (scoringArea.includes('rocket') ? 'rocket_ship' : scoringArea.includes('cargo') ? 'cargo_ship' : 'dropped');
    const assetMap = {rocket_ship: '/assets/pictures/rocket_ship.jpg', cargo_ship: '/assets/pictures/cargo_ship.jpg', dropped: '/assets/pictures/dropped.jpg'}
    return assetMap[scoringShip];
  }
  
  getBackgroundAsset = (station, flipped) => {
    return station.includes('b') 
            ? flipped ? '/assets/pictures/scouting_blue_left.png' : '/assets/pictures/scouting_blue_right.png'
            : flipped ? '/assets/pictures/scouting_red_right.png' : '/assets/pictures/scouting_red_left.png';
  }
  constructor(props) {
    super(props);
    const {matchNumber, teamNumber, station, flipped} = this.props;
    // console.log(props)
    this.state = {
      appBarHeight: 50,
      scoutingSize: 475,
      tabPosition : 2,
      matchNumber: matchNumber,
      teamNumber: teamNumber,
      station: station,
      flipped: flipped,
      color : station.includes('b') ? 'blue' : 'red',
      matchPhase: 'sandstorm', // sandstorm, tele
      cycle: new Cycle(teamNumber, matchNumber, 'sandstorm'),
      hab: new Hab(teamNumber, matchNumber, 'sandstorm'),
      habs: [],
      cycles: []
    };
  }


  tabClicked = (event, tabPosition) => {
    if (tabPosition == 3 && this.state.matchPhase !== 'tele') {
      const {cycle, hab, habs} = this.state;
      this.setState({
        matchPhase: 'tele',
        cycle: {...cycle, phase: 'tele', timer: this.getCurrTime()},
        hab: new Hab(this.props.teamNumber, this.props.matchNumber, 'tele'),
      });
      if (habs.length == 0) {
        hab.success = 'none';
        hab.time = undefined;
        hab.timer = undefined;
        this.setState({habs: [hab]});
      }
    }
    // if (tabPosition === 5) {
    //   this.submitMatch();
    // }
    this.setState({tabPosition});
  }

  mobilityClicked = () => {
    const {hab} = this.state;
    hab.success = 'scored';
    // hab.time = this.getCurrTime() - hab.timer;
    hab.timer = undefined;
    this.setState({hab: new Hab(this.props.teamNumber, this.props.matchNumber, 'tele'), habs: [hab]});
  }

  canTele = () => {
    const {matchPhase, cycle, hab, habs} = this.state;
    return matchPhase == 'tele' || habs.length > 0 || (hab.level !== undefined && cycle.piece != undefined && hab.timer !== undefined);
  }

  habClicked = (level) => {
    const {matchPhase, hab, habs} = this.state;
    console.log(hab);
    console.log(hab);
    const isAttempted = hab.success === 'attempted' && hab.level === level;
    const isTele = matchPhase === 'tele';
    if (isTele && isAttempted) {
        hab.success = 'scored';
        // hab.time = this.getCurrTime() - hab.timer;
        hab.timer = undefined;
        habs.push(hab);
        this.setState({habs: habs, hab: new Hab(this.props.teamNumber, this.props.matchNumber, 'tele')});
    } else {
        this.setState({hab: {...hab, level: level, success: 'attempted', timer: isTele ? this.getCurrTime() : hab.timer}});
    }
  }

  getCurrTime = () => (new Date()).getTime();
  startTimer = () => {
    const {cycle, hab} = this.state;
    this.setState({cycle: {...cycle, timer: this.getCurrTime()}, hab: {...hab, timer: this.getCurrTime()}})
  }

  pickup = (gamePiece, source) => {
    const {cycle} = this.state;
    this.setState({cycle: {...cycle, piece: gamePiece, pickup: source, timer: this.getCurrTime()}});
  }
  
  score = (scoringArea) => {
    const {cycle, cycles} = this.state;
    const isAttempted = cycle.success === 'attempted' && cycle.score === scoringArea;
    const level = scoringArea.includes('high') ? 3 : scoringArea.includes('mid') ? 2 : 1;
    if (!isAttempted && scoringArea !== 'dropped') {
      this.setState({cycle: {...cycle, score: scoringArea, success: 'attempted', level}});
    }else {
      const newCycle = new Cycle(this.props.teamNumber, this.props.matchNumber, this.state.matchPhase);
      if (scoringArea === 'dropped') {
        if (cycle.success !== 'attempted'){
          cycle.success = 'dropped';
          cycle.score = 'dropped';
          cycle.level = 0;
        }
      } else {
        cycle.success = 'success';
      }
      
      cycle.time =  this.getCurrTime() - cycle.timer;
      cycle.timer = undefined;
      cycles.push(cycle)
      this.setState({cycle: newCycle, cycles})
    }
  }



  submitMatch = (useKey=undefined) => {
    const {matchNumber, teamNumber, station, cycles, habs} = this.state;
    const formKey = matchNumber+':'+teamNumber;
    const matchData = useKey !== undefined 
      ? window.localStorage.getItem(useKey)
      : JSON.stringify({
        matchNumber,
        teamNumber,
        station,
        cycles,
        habs
      });
    window.sessionStorage.setItem(formKey,matchData);
    window.localStorage.setItem(formKey, matchData);
    fetch('/scouting/submitMatchData', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: matchData
    }).then(response => {
      if(useKey === undefined) {
        var url = 'scouting?matchNumber='+(parseInt(matchNumber)+1)+'&station='+station;
        window.location.href=url;
      }
    }); 
    
  }

  renderSubmitPage = () => {
    const {scoutingSize} = this.state;
    const buttons = [];
    for (var i = 0; i < window.localStorage.length; i++) {
      const formKey = window.localStorage.key(i) 
      const rowCount = 8, x = i%rowCount, y = Math.floor(i/rowCount)+1;
      buttons.push(
      <ScoutingButton {...{top: 80*y, left: x*100+20, scoutingSize, text: formKey, key: formKey,
        buttonProps: {id:'prev-match-button', onClick: () => this.submitMatch(formKey), variant: 'contained'}}}/>
      );
    }
  return [
    ...buttons,
    <ScoutingButton {...{top: 450, left: 750, width: 150, height: 75, scoutingSize, text: 'Submit', key: 'submit', buttonProps: {onClick: () => this.submitMatch(), variant: 'contained'}}}/>
  ];

  }

  createDroppedButton = () => {
    const {scoutingSize, cycle} = this.state;
    const gamePiece = cycle.piece;
    return (gamePiece == 'hatch' || gamePiece === 'cargo')
      && <ScoutingButton {...{top: 65, left: 5, width: 75, height: 40, scoutingSize, text: 'Drop', buttonProps: {onClick: () => this.score('dropped'), variant: 'contained'}}}/>;
  }

  renderButtons = () => {
    const {scoutingSize, color, tabPosition,
      matchPhase, cycle, cycles, hab, habs} = this.state;

    const flipped = this.state.flipped ^ color === 'blue';
    const isAuto = matchPhase === 'sandstorm';
    const isTele = !isAuto;
    const timerStarted = hab.timer !== undefined;
    const mobilityDone = habs.length > 0;
    
    const carryingNone = cycle.piece === 'none';
    const carryingCargo = cycle.piece === 'cargo';
    const carryingHatch = cycle.piece === 'hatch'; 
    
    const createScoutingButton = (key, top, left, width, height, text, buttonProps) => {
      return <ScoutingButton {...{key, top, left, width, height, text, buttonProps, flipped, scoutingSize}}/>;
    };

    const preloads = isAuto && cycles.length == 0
      && [createScoutingButton('hatch-preload', 25, 25, 150, 100, 'Hatch', {onClick:() => this.pickup('hatch', 'preload'), variant:carryingHatch?'contained':'outlined'}),
        createScoutingButton('cargo-preload', 425, 25, 150, 100, 'Cargo', {onClick:() => this.pickup('cargo', 'preload'), variant:carryingCargo?'contained':'outlined'}),
        createScoutingButton('no-preload', 450, 225, 150, 75, 'No Preload', {onClick: () => this.pickup('none', 'preload'), variant:carryingNone?'contained':'outlined'})];
    
    const mobilityButtons = !mobilityDone 
      && [createScoutingButton('timer-start', 105, 400, 100, 75, 'Start Timer', {onClick:() => this.startTimer(), variant:timerStarted?'contained':'outlined'}),
      createScoutingButton('mobility', 25, 225, 150, 410, 'Mobility', {onClick:this.mobilityClicked, variant:'outlined', disabled: !this.canTele()})];

    const habButtons = (isTele || habs.length == 0)
      && [createScoutingButton('low-hab', 145, 100, 100, 260, 'LV-1', {onClick:() => this.habClicked(1), variant:hab.level===1?'contained':'outlined'}),
      createScoutingButton('top-mid-hab', 165, 0, 100, 65, 'LV-2', {onClick:() => this.habClicked(2), variant:hab.level===2?'contained':'outlined'}),
      createScoutingButton('bot-mid-hab', 320, 0, 100, 65, 'LV-2', {onClick:() => this.habClicked(2), variant:hab.level===2?'contained':'outlined'}),
      isTele && createScoutingButton('high-hab', 230, 0, 100, 90, 'LV-3', {onClick:() => this.habClicked(3), variant:hab.level===3?'contained':'outlined'})];

    const createScoringButton = (key, top, left, width, height, text) => {
      const isAttempted = cycle.success === 'attempted' && cycle.score === key;
      return createScoutingButton(key, top, left, width, height, text, {onClick:() => this.score(key), variant:isAttempted?'contained':'outlined'})
    };
    
    const scoreButtons = (isAuto && mobilityDone || isTele) && cycle.piece != undefined && cycle.piece != 'none'
      && [createScoringButton('top-rocket-low', 50, 450, 60, 60, 'L'),
      createScoringButton('top-rocket-mid', 50, 510, 60, 60, 'M'),
      createScoringButton('top-rocket-high', 50, 570, 60, 60, 'H'),
      createScoringButton('bot-rocket-low', 440, 450, 60, 60, 'L'),
      createScoringButton('bot-rocket-mid', 440, 510, 60, 60, 'M'),
      createScoringButton('bot-rocket-high', 440, 570, 60, 60, 'H'),
      createScoringButton('top-cargo', 180, 520, 125, 50, ''),
      createScoringButton('front-cargo', 230, 400, 55, 90, ''),
      createScoringButton('bot-cargo', 320, 520, 125, 50, '')];

    const createPickupButton = (key, top, left, width, height, text, primary, secondary) => {
      const isPickedUp = cycle.pickup === key;
      const gamePiece = isPickedUp && cycle.piece == primary ? secondary : primary;
      const pickupProps = {onClick:() => this.pickup(gamePiece, key), variant:isPickedUp?'contained':'outlined'};
      return createScoutingButton(key, top, left, width, height, text, pickupProps);
    };
      
    const pickups = ((isAuto && cycles.length > 0) || isTele)
      && [createPickupButton('top-hp', 25, 25, 150, 100, 'hp', 'hatch', 'cargo'),
      createPickupButton('bot-hp', 425, 25, 150, 100, 'hp', 'hatch', 'cargo'),
      createPickupButton('floor', 25, 225, 150, 500, 'floor', 'cargo', 'hatch')];

    return habs.length < 2 && [...preloads, ...mobilityButtons, ...habButtons, ...scoreButtons, ...pickups];
  }

  createInfoItem = (assets, primary, secondary, tertiary, key) => {
    return  [<ListItem alignItems='flex-start' key={key++}>
      <ListItemText
        primary={primary}
        secondary={<React.Fragment>
          <Typography component="span" color="textPrimary">{secondary}</Typography>
          {tertiary}
        </React.Fragment>}/>
        {assets.map(asset => <Avatar className='padding-s' src={asset}/>)}
        </ListItem>, <Divider key='div'/>];
  }

  renderHab = (index) => {
    const {habs} = this.state;
    if (habs.length <= index) return;
    const hab = habs[index]
    const habScored = (hab.phase === 'tele' ? 'climb: ' : 'mobility: ') + hab.success + (hab.time ? (': ' + (hab.time/1000).toFixed(2)) : '');
    return this.createInfoItem([], 'Level ' + hab.level, hab.phase, habScored, 0)
    
  }

  renderCycles = () => {
    const {cycles} = this.state;
    var infoKey = 0;
    return ([...cycles].reverse().map(cycle => {
      const cycleTime = (cycle.time/1000).toFixed(2);
      return this.createInfoItem(
        [this.getPickupAsset(cycle.pickup), this.getGamePieceAsset(cycle.piece), this.getScoringAreaAsset(cycle.score)],
        cycle.success, cycleTime, cycle.phase, infoKey++);
    }));
      
  }

  render() {
    // console.log(this.state);
    const theme = this.createTheme();
    const {flipped} = this.props;
    const {appBarHeight, scoutingSize, teamNumber, station, matchNumber, tabPosition,
      matchPhase, cycle, hab} = this.state;
    const {pickup, piece, score} = cycle;
    
    return <MuiThemeProvider theme={theme}>
        <AppBar position="static" style={{height: appBarHeight}}>
          <Tabs value={tabPosition} onChange={this.tabClicked}>
            <Tab label={'Match: ' + matchNumber} disabled={true}/>
            <Tab label={'Station: ' + station} disabled={true}/>
            <Tab label="Sandstorm" disabled={matchPhase !== 'sandstorm'}/>
            <Tab label="Tele" disabled={!this.canTele()}/>
            <Tab label="Defence" disabled={true}/>
            <Tab label="Submit"/>
          </Tabs>
        </AppBar>
        {(tabPosition === 2 || tabPosition == 3) &&
          <div style={{height: scoutingSize, overflow: 'hidden'}}>
            <div id='info-column'>
              <div id='state-info' style={{borderColor: theme.palette.primary.main, position: 'relative'}}>
                <Typography variant='h5' className='f-left' color='primary'>{teamNumber}</Typography>
                {this.createDroppedButton()}
                <img src={this.getScoringAreaAsset(score)} id='game-piece-img'></img>
                <img src={this.getGamePieceAsset(piece)} id='game-piece-img'></img>
                <img src={this.getPickupAsset(pickup)} id='game-piece-img'></img>
              </div>
              <List style={{width: '100%', maxHeight: scoutingSize-100, overflow: 'auto'}}>
              {this.renderHab(1)}
              {this.renderCycles()}
              {this.renderHab(0)}
              </List>
            </div>
            <div id='scouting-column' style={{height: scoutingSize}}>
              {this.renderButtons()}
              <img className='fill' src={this.getBackgroundAsset(station, flipped)}/>
            </div>
            <div className='clear'/>
          </div>}
          {(tabPosition == 5) &&
            <div>
              {this.renderSubmitPage()}
            </div>
          }

    </MuiThemeProvider>;
    };
  
    createTheme() {
      var primaryColor = colors.red, secondaryColor = colors.blue;
      if (this.state.color === 'blue') {
        primaryColor = colors.blue;
        secondaryColor = colors.red;
      }
      return createMuiTheme({
        palette: {
          primary: {
            light: primaryColor[300],
            main: primaryColor[500],
            dark: primaryColor[700],
          },
          secondary: {
            light: secondaryColor[300],
            main: secondaryColor[500],
            dark: secondaryColor[700],
          }
        },
        typography: {
          useNextVariants: true
        }
      });
    }
}

class ScoutingButton extends React.Component {
  constructor(props) {
    super(props)
    const {left, width, scoutingSize, flipped} = props;
    this.state = {
      left: flipped ? 650 - (left + width) : left
    }
  }
  
  render() {
    const{text, top, width, height, buttonProps, scoutingSize} = this.props;
    const yScaleFactor = scoutingSize/550;
    const {left} = this.state;
    return (
      <Button 
        color='primary'
        style={
          {top: top * yScaleFactor,
          left: left,
          width: width,
          height: height * yScaleFactor,
          minWidth: 0,
          borderWidth: 2,
          position: 'absolute',
          display: 'block'}}
        {...buttonProps}>
        {text}
      </Button>
    );
  }
}
const App = (ScoutingApp)  