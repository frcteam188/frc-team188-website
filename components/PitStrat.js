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

const PickupAsset =  
  {floor: '/assets/pictures/floor.png', hp: '/assets/pictures/human.png', preload: '/assets/pictures/preload.png'} ;
const GamePieceAsset = 
  {none: '/assets/pictures/no_game_piece.jpg', hatch: '/assets/pictures/hatch.jpg', cargo: '/assets/pictures/cargo.jpg'};
const ScoringAreaAsset = 
  {rocket_ship: '/assets/pictures/rocket_ship.jpg', cargo_ship: '/assets/pictures/cargo_ship.jpg', sandstorm: '/assets/pictures/sandstorm.jpeg'};

class PitStrat extends React.Component {
  constructor(props) {
    super(props);
    const {matchNumber} = this.props;
    // console.log(props)
    this.state = {
      appBarHeight: 50,
      scoutingSize: 475,
      tabPosition : 0,
      matchNumber: matchNumber,
      color : 'red',
      data : {
        r1: {
          team : 188,
          matches: 2,
          ssLevel: 1,
          ssHatch : 1,
          ssCargo: 1,
          rocketHatch: 1,
          rocketCargo: 2,
          shipHatch: 1,
          shipCargo: 2,
          defense : '-',
          hab: 3
        },
        r2: {
          team : 610,
          matches: 2,
          ssLevel: 2,
          ssHatch : 0,
          ssCargo: 1,
          rocketHatch: 3,
          rocketCargo: 2,
          shipHatch: 5,
          shipCargo: 2,
          defense : '-',
          hab: 3
        },
        r3: {
          team : 7885,
          matches: 2,
          ssLevel: 1,
          ssHatch : 1,
          ssCargo: 0,
          rocketHatch: 0,
          rocketCargo: 2,
          shipHatch: 0,
          shipCargo: 2,
          defense : 0,
          hab: 3
        },
        b1: {
          team : 188,
          matches: 2,
          ssLevel: 1,
          ssHatch : 1,
          ssCargo: 1,
          rocketHatch: 1,
          rocketCargo: 2,
          shipHatch: 1,
          shipCargo: 2,
          defense : '-',
          hab: 3
        },
        b2: {
          team : 610,
          matches: 2,
          ssLevel: 2,
          ssHatch : 0,
          ssCargo: 1,
          rocketHatch: 3,
          rocketCargo: 2,
          shipHatch: 5,
          shipCargo: 2,
          defense : '-',
          hab: 3
        },
        b3: {
          team : 7885,
          matches: 2,
          ssLevel: 1,
          ssHatch : 1,
          ssCargo: 0,
          rocketHatch: 0,
          rocketCargo: 2,
          shipHatch: 0,
          shipCargo: 2,
          defense : 0,
          hab: 3
        },
      }
    };
  }


  tabClicked = (event, tabPosition) => {
    if (tabPosition == 3 && this.state.matchPhase !== 'tele') {
      const {cycle, hab, habs} = this.state;
      this.setState({
        matchPhase: 'tele',
        cycle: {...cycle, matchPhase: 'tele', timer: this.getCurrTime()},
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

  renderRows = () => {
    const {data} = this.state;
    var stations = ['r1','r2','r3','b1','b2','b3']
    return stations.map(station => {
      const team = data[station];
      return (
      <tr key={team.team}>
        <td>{team.team}</td>
        <td>{team.matches}</td>
        <td>{team.ssLevel}</td>
        <td>{team.ssHatch}</td>
        <td>{team.ssCargo}</td>
        <td>{team.shipHatch}</td>
        <td>{team.rocketHatch}</td>
        <td>{team.shipCargo}</td>
        <td>{team.rocketCargo}</td>
        <td>{team.defense}</td>
        <td>{team.hab}</td>
      </tr>);
    });

    
  }

  
  render() {
    const theme = this.createTheme();
    const {appBarHeight, matchNumber, tabPosition} = this.state;
    const imgheight = 50;
    
    return <MuiThemeProvider theme={theme}>
        <AppBar position="static" style={{height: appBarHeight}}>
          <Tabs value={tabPosition} onChange={this.tabClicked}>
            <Tab label={'Match: ' + matchNumber} />
            <Tab label="Red"/>
            <Tab label="Blue"/>
          </Tabs>
        </AppBar>
        {(tabPosition === 0) &&
          <div style={{height: 470}}>
            <table id='tb' className='sortable'>
              <thead  >
                <tr style={{maxHeight: appBarHeight}}>
                  <th>Team</th>
                  <th>Matches</th>
                  <th>Mobility</th>
                  <th><img className='table-icon' src={ScoringAreaAsset.sandstorm}/><img className='table-icon' src={GamePieceAsset.hatch}/></th>
                  <th><img className='table-icon' src={ScoringAreaAsset.sandstorm}/><img className='table-icon' src={GamePieceAsset.cargo}/></th>
                  <th><img className='table-icon' src={ScoringAreaAsset.cargo_ship}/><img className='table-icon' src={GamePieceAsset.hatch}/></th>
                  <th><img className='table-icon' src={ScoringAreaAsset.cargo_ship}/><img className='table-icon' src={GamePieceAsset.cargo}/></th>
                  <th><img className='table-icon' src={ScoringAreaAsset.rocket_ship}/><img className='table-icon' src={GamePieceAsset.hatch}/></th>
                  <th><img className='table-icon' src={ScoringAreaAsset.rocket_ship}/><img className='table-icon' src={GamePieceAsset.cargo}/></th>
                  <th>Cycles</th>
                  <th>Climb</th>
                  <div className='clear'/>
                </tr>
                  
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </table>
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
            vlight: primaryColor[200],
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

class teamRow extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    render (
      <tr>
        <td>{team.team}</td>
        <td>{team.matches}</td>
        <td>{team.ssLevel}</td>
        <td>{team.ssHatch}</td>
        <td>{team.ssCargo}</td>
        <td>{team.shipHatch}</td>
        <td>{team.rocketHatch}</td>
        <td>{team.shipCargo}</td>
        <td>{team.rocketCargo}</td>
        <td>{team.defense}</td>
        <td>{team.hab}</td>
      </tr>
    );
  }
}
const App = (PitStrat)  