'use strict';

const e = React.createElement;
const {
  AppBar,
  Avatar,
  Button,
  colors,
  createMuiTheme,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpandMoreIcon,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MuiThemeProvider,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
      alliance_data : {
        red:{
          r1:{
            team : 188,
            matches : {
              match: 1,
              cycles : [
                piece ='cargo',
                pickup = 'floor',
                score = 'top-cargo',
                level = 1,
                success = 'success',
                time = '1458'
              ]
              
            }
          }
        },
        blue:{

        }
      },
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
          team : 88,
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
          team :910,
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
          team : 785,
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

  renderRows = (th) => {
    const theme = th;
    const {data} = this.state;
    var stations = ['r1','r2','r3','b1','b2','b3']
    return stations.map(station => {
      const team = data[station];
      return (
      <TableRow key={team.team} >
        <TableCell id='table-cell' style={{backgroundColor:theme.palette.primary.main,
           color:'white'}}>{team.team}</TableCell>
        <TableCell id='table-cell'>{team.matches}</TableCell>
        <TableCell id='table-cell'>{team.ssLevel}</TableCell>
        <TableCell id='table-cell'>{team.ssHatch}</TableCell>
        <TableCell id='table-cell'>{team.ssCargo}</TableCell>
        <TableCell id='table-cell'>{team.shipHatch}</TableCell>
        <TableCell id='table-cell'>{team.rocketHatch}</TableCell>
        <TableCell id='table-cell'>{team.shipCargo}</TableCell>
        <TableCell id='table-cell'>{team.rocketCargo}</TableCell>
        <TableCell id='table-cell'>{team.defense}</TableCell>
        <TableCell id='table-cell'>{team.hab}</TableCell>
      </TableRow>);
    });
  }

  // renderTeams = (alliance) => {
    
  // }
  
  render() {
    const theme = this.createTheme();
    const {appBarHeight, matchNumber, tabPosition} = this.state;
    const imgheight = 50;
    
    return <MuiThemeProvider theme={theme}>
        <AppBar position="static" style={{height: appBarHeight}}>
          <Tabs value={tabPosition} onChange={this.tabClicked}>
            <Tab label={'Match: ' + matchNumber} />
            <Tab label="Red" disabled={true}/>
            <Tab label="Blue" disabled={true}/>
          </Tabs>
        </AppBar>
        {(tabPosition === 0) &&
          <div style={{height: 470}}>
            <Paper>
              <Table id='tb'>
                <TableHead  >
                  <TableRow  style={{maxHeight: appBarHeight}}>
                    <TableCell id='table-cell'>Team</TableCell>
                    <TableCell id='table-cell'>Matches</TableCell>
                    <TableCell id='table-cell'>Mobility</TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.sandstorm}/><img className='table-icon' src={GamePieceAsset.hatch}/></TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.sandstorm}/><img className='table-icon' src={GamePieceAsset.cargo}/></TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.cargo_ship}/><img className='table-icon' src={GamePieceAsset.hatch}/></TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.cargo_ship}/><img className='table-icon' src={GamePieceAsset.cargo}/></TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.rocket_ship}/><img className='table-icon' src={GamePieceAsset.hatch}/></TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.rocket_ship}/><img className='table-icon' src={GamePieceAsset.cargo}/></TableCell>
                    <TableCell id='table-cell'>Cycles</TableCell>
                    <TableCell id='table-cell'>Climb</TableCell>
                    <div className='clear'/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.renderRows(theme)}
                </TableBody>
              </Table>
            </Paper>
            <div className='clear'/>
          </div>}
          {/* {(tabPosition === 1) && 
            <div style={{height: 470}}>
              renderTeams('red')
            </div>
          }
          {(tabPosition === 2) && 
            <div style={{height: 470}}>
              renderTeams('blue')
            </div>
          } */}
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