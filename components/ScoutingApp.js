'use strict';

const e = React.createElement;
const {
  AppBar,
  Avatar,
  Button,
  colors,
  createMuiTheme,
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

class GameState {
  
}
class Cycle {
  constructor(robot, match, matchPhase){
    this.robot = robot;
    this.match = match;
    this.matchPhase =  matchPhase;
    this.gamePiece = undefined;
    this.pickup = undefined;
    this.score = undefined;
    this.level = undefined;
    this.success = undefined;
    this.timer = undefined;
    this.time = undefined;
  }
}
class Hab {
  constructor(robot, match, matchPhase) {
    this.robot = robot;
    this.match = match;
    this.matchPhase = matchPhase;
    this.level = undefined;
    this.success = undefined;
    this.timer = undefined;
    this.time = undefined;
  }
}

class ScoutingApp extends React.Component {

  getGamePieceAsset = (gamePiece) => {
    const assetMap = {none: '/assets/pictures/no_game_piece.jpg', hatch: '/assets/pictures/hatch.jpg', cargo: '/assets/pictures/cargo.jpg'};
    return assetMap[gamePiece];
  }

  getScoringAreaAsset = (scoringArea) => {
    const scoringShip = scoringArea.includes('rocket') ? 'rocket_ship' : 'cargo_ship';
    const assetMap = {'rocket_ship': '/assets/pictures/rocket_ship.jpg', 'cargo_ship': '/assets/pictures/cargo_ship.jpg'}
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
      scoutingSize: 550,
      tabPosition : 2,
      matchNumber: matchNumber,
      teamNumber: teamNumber,
      station: station,
      flipped: flipped,
      color : station.includes('b') ? 'blue' : 'red',
      scoutingBg: this.getBackgroundAsset(station, flipped),
      canTele: false,
      matchPhase: 'sandstorm', // sandstorm, tele
      gamePiece: undefined, //none, hatch, cargo
      cycle: new Cycle(teamNumber, matchNumber, 'sandstorm'),
      hab: new Hab(teamNumber, matchNumber, 'sandstorm'),
      habs: [],
      cycles: []
    };
  }


  tabClicked = (event, tabPosition) => {
    if (tabPosition == 3) {
      const {cycle, hab, habs} = this.state;
      const currTime = (new Date()).getTime();
      this.setState({
        matchPhase: 'tele',
        cycle: {...cycle, matchPhase: 'tele', timer: currTime},
        hab: new Hab(this.props.teamNumber, this.props.matchNumber, 'tele'),
      });
      if (habs.length == 0) {
        hab.success = 'none';
        hab.time = undefined;
        hab.timer = undefined;
        this.setState({habs: [hab]});
      }
    }
    this.setState({tabPosition});
  }

  mobilityClicked = () => {
    const {hab} = this.state;
    hab.success = 'scored';
    hab.time = (new Date()).getTime() - hab.timer;
    hab.timer = undefined;
    this.setState({hab: new Hab(this.props.teamNumber, this.props.matchNumber, 'tele'), habs: [hab]});
  }

  canTele = () => {
    const {matchPhase, cycle, hab, habs} = this.state;
    return matchPhase == 'tele' || habs.length > 0 || (hab.level !== undefined && cycle.gamePiece != undefined && hab.timer !== undefined);
  }

  habClicked = (level) => {
    const {hab} = this.state;
    this.setState({hab: {...hab, level: level}})
  }

  startTimer = () => {
    const {cycle, hab} = this.state;
    const currTime = (new Date()).getTime();
    this.setState({cycle: {...cycle, timer: currTime}, hab: {...hab, timer: currTime}})
  }

  pickup = (gamePiece, source) => {
    const {matchPhase, cycle} = this.state;
    const isAuto = matchPhase === 'sandstorm';
    this.setState({cycle: {...cycle, gamePiece: gamePiece, pickup: source}});
  }
  
  score = (scoringArea) => {
    const {cycle, cycles} = this.state;
    const isAttempted = cycle.success === 'attempted' && cycle.score === scoringArea;
    if (!isAttempted) {
      this.setState({cycle: {...cycle, score: scoringArea, success: 'attempted'}});
    }else {
      const newCycle = new Cycle(this.props.robot, this.props.matchNumber, this.state.matchPhase);
      cycle.success = 'success';
      cycles.push(cycle)
      this.setState({cycle: newCycle, cycles})
    }
  }

  renderButtons = () => {
    const {scoutingSize, color, 
      matchPhase, cycle, cycles, hab, habs} = this.state;

    const flipped = this.state.flipped ^ color === 'blue';
    const isAuto = matchPhase === 'sandstorm';
    const isTele = !isAuto;
    const timerStarted = hab.timer !== undefined;
    const mobilityDone = habs.length > 0;
    
    const carryingNone = cycle.gamePiece === 'none';
    const carryingCargo = cycle.gamePiece === 'cargo';
    const carryingHatch = cycle.gamePiece === 'hatch'; 
    
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
    
    const scoreButtons = (isAuto && mobilityDone || isTele) && cycle.gamePiece != undefined && cycle.gamePiece != 'none'
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
      const gamePiece = isPickedUp && cycle.gamePiece == primary ? secondary : primary;
      const pickupProps = {onClick:() => this.pickup(gamePiece, key), variant:isPickedUp?'contained':'outlined'};
      return createScoutingButton(key, top, left, width, height, text, pickupProps);
    };
      
    const pickups = ((isAuto && cycles.length > 0) || isTele)
      && [createPickupButton('top-hp', 25, 25, 150, 100, 'hp', 'hatch', 'cargo'),
      createPickupButton('bot-hp', 425, 25, 150, 100, 'hp', 'hatch', 'cargo'),
      createPickupButton('floor', 25, 225, 150, 500, 'floor', 'cargo', 'hatch')];

    return [ ...preloads, ...mobilityButtons, ...habButtons, ...scoreButtons, ...pickups];
  }

  createInfoItem = (primaryAsset, secondaryAsset, primary, secondary, tertiary, key) => {
    return  <ListItem alignItems='flex-start' key={key++}>
      {primaryAsset !== '' && <Avatar className='padding-s' src={primaryAsset}/>}
      {secondaryAsset !== '' && <Avatar className='padding-s' src={secondaryAsset}/>}
      <ListItemText
        primary={primary}
        secondary={<React.Fragment>
          <Typography component="span" color="textPrimary">{secondary}</Typography>
          {tertiary}
        </React.Fragment>}/>
    </ListItem>;
  }

  renderHabs = () => {
    const {habs} = this.state;
    var infoKey = 0;
    return (habs.map(hab => {
      const habScored = (hab.matchPhase === 'tele' ? '' : 'mobility: ') + hab.success;
      return this.createInfoItem('', '', 'Level ' + hab.level, hab.matchPhase, habScored, infoKey++)
    }));
  }

  renderCycles = () => {
    const {cycles} = this.state;
    var infoKey = 0;
    return ([...cycles].reverse().map(cycle => this.createInfoItem(this.getGamePieceAsset(cycle.gamePiece), this.getScoringAreaAsset(cycle.score), cycle.score, cycle.pickup, cycle.success, infoKey++)));
  }

  render() {
    // console.log(this.state);
    const theme = this.createTheme();
    const {  } = this.props;
    const {appBarHeight, scoutingSize, teamNumber, station, matchNumber, tabPosition, scoutingBg,
          canTele, matchPhase, cycle, hab} = this.state;
    const {gamePiece} = cycle;
    return <MuiThemeProvider theme={theme}>
        <AppBar position="static" style={{height: appBarHeight}}>
          <Tabs value={tabPosition} onChange={this.tabClicked}>
            <Tab label={'Match: ' + matchNumber} disabled={true}/>
            <Tab label={'Station: ' + station} disabled={true}/>
            <Tab label="Sandstorm" disabled={matchPhase !== 'sandstorm'}/>
            <Tab label="Tele" disabled={!this.canTele()}/>
            <Tab label="Defence" />
            <Tab label="Submit" />
          </Tabs>
        </AppBar>
        {(tabPosition === 2 || tabPosition == 3) &&
          <div style={{height: scoutingSize, overflow: 'hidden'}}>
            <div id='info-column'>
              <div id='state-info' style={{borderColor: theme.palette.primary.main}}>
                <Typography variant='h5' className='f-left' color='primary'>{teamNumber}</Typography>
                <img src={this.getGamePieceAsset(gamePiece)} id='game-piece-img'></img>
              </div>
              <List style={{maxHeight: scoutingSize-100, overflow: 'auto'}}>
              {this.renderCycles()}
              {this.renderHabs()}
              </List>
            </div>
            <div id='scouting-column' style={{height: scoutingSize}}>
              {this.renderButtons()}
              <img className='fill' src={scoutingBg}/>
            </div>
            <div className='clear'/>
          </div>}
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
      left: flipped ? scoutingSize - (left + width) : left
    }
  }
  
  render() {
    const{text, top, width, height, buttonProps} = this.props;
    const {left} = this.state;
    return (
      <Button 
        color='primary'
        style={
          {top: top,
          left: left,
          width: width,
          height: height,
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