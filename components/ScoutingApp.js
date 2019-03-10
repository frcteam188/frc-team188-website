'use strict';

const e = React.createElement;
const {
  AppBar,
  Button,
  colors,
  createMuiTheme,
  Grid,
  MuiThemeProvider,
  Paper,
  Tabs,
  Tab,
  Typography,
  withStyles,
} = window['material-ui'];

class ScoutingApp extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      'tabPosition' : 0,
      'matchNumber': this.props.matchNumber,
      'teamNumber': this.props.teamNumber,
      'station': this.props.station,
      'flipped': this.props.flipped,
      'color' : this.props.station.includes('b') ? 'blue' : 'red',
      'scoutingBg': this.getBackgroundAsset(this.props.station, this.props.flipped),
      'authDone': false,
      'startingLevel': 'none',
      'matchPhase': 'sandstorm', // sandstorm, tele
      'gamePiece': undefined, //none, hatch, cargo
      'cycles': []
    };
  }
  
  getBackgroundAsset = (station, flipped) => {
    return station.includes('b') 
            ? flipped ? '/assets/pictures/scouting_blue_left.png' : '/assets/pictures/scouting_blue_right.png'
            : flipped ? '/assets/pictures/scouting_red_right.png' : '/assets/pictures/scouting_red_left.png';
  }

  habClicked = (level) => {
    this.setState({startingLevel:level})
  }

  pickup = (gamePiece, source) => {
    const {matchPhase} = this.state;
    const isAuto = matchPhase === 'sandstorm';
    this.setState({gamePiece: gamePiece});
  }

  renderButtons = (scoutingSize) => {

    const {color, matchPhase, gamePiece, startingLevel} = this.state;

    const flipped = this.state.flipped ^ color === 'blue';
    const isAuto = matchPhase === 'sandstorm';
    const isTele = !isAuto;
    const preloaded = gamePiece != undefined;
    const carryingCargo = gamePiece === 'cargo';
    const carryingHatch = gamePiece === 'hatch';

    const createScoutingButton = (top, left, width, height, text, buttonProps) => {
      return e(ScoutingButton, {top: top, left: left, width: width, height: height, scoutingSize: scoutingSize, flipped: flipped, text: text, buttonProps: buttonProps});
    };

    const preloads = [
      createScoutingButton(25, 25, 125, 100, 'Hatch', {onClick:() => this.pickup('hatch', 'preload'), variant:carryingHatch?'contained':'outlined'}),
      createScoutingButton(425, 25, 125, 100, 'Cargo', {onClick:() => this.pickup('cargo', 'preload'), variant:carryingCargo?'contained':'outlined'})
    ]

    const lowHab = createScoutingButton(145, 80, 85, 260, 'LV-1', {onClick:() => this.habClicked(1), variant:startingLevel===1?'contained':'outlined'});
    const middleHabTop = createScoutingButton(165, 0, 80, 65, 'LV-2', {onClick:() => this.habClicked(2), variant:startingLevel===2?'contained':'outlined'});
    const middleHabBottom= createScoutingButton(320, 0, 80, 65, 'LV-2', {onClick:() => this.habClicked(2), variant:startingLevel===2?'contained':'outlined'});
    const highHab = createScoutingButton(230, 0, 80, 90, 'LV-3', {onClick:() => this.habClicked(3), variant:startingLevel===3?'contained':'outlined'});


    const showMobility = startingLevel !== 'none' && preloaded;
    const mobility = createScoutingButton(25, 180, 125, 500, 'Mobility', {onClick:undefined, variant:'outlined', disabled: !showMobility});

    const habButtons = [lowHab, middleHabTop, middleHabBottom, (isTele && highHab)];

    return [...preloads, ...habButtons, mobility];
  }

  render() {
    const {  } = this.props;
    const {teamNumber, station, color, matchNumber, tabPosition, scoutingBg,
          autoDone, matchPhase, gamePiece} = this.state;
    const appBarHeight = 50, scoutingSize = 550;
    
    return <MuiThemeProvider theme={this.createTheme()}>
        <AppBar position="static" style={{height: appBarHeight}}>
          <Tabs value={tabPosition} onChange={(event, tabPosition) => {this.setState({ tabPosition })}}>
            <Tab label="Sandstorm" />
            <Tab label="Tele" disabled={!autoDone}/>
            <Tab label="Defence" />
            <Tab label="Submit" />
            <Tab label={'Match: ' + matchNumber} disabled={true}/>
            <Tab label={'Team: ' + teamNumber} disabled={true}/>
            <Tab label={'Station: ' + station} disabled={true}/>
          </Tabs>
        </AppBar>

        {(tabPosition === 0 || tabPosition == 1) &&
          <div style={{height: scoutingSize}}>
            <div id='info-column'></div>
            <div id='scouting-column' style={{height: scoutingSize}}>
              {this.renderButtons(scoutingSize)}
              <img className='fill-v' src={scoutingBg}/>
              
            </div>
            <div className='clear'/>
          </div>}
         {/* {tabPosition === 2 && <TabContainer>Item Three</TabContainer>} */}
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
          useNextVariants: true,
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