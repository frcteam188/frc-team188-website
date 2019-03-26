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

const SCOUTING_ASSETS = '/assets/pictures/scouting2019/';
const PickupAsset =  
  {floor: SCOUTING_ASSETS +'floor.png', hp: SCOUTING_ASSETS+ 'human.png', preload: SCOUTING_ASSETS + 'preload.png'};
const GamePieceAsset = 
  {none: SCOUTING_ASSETS + 'no_game_piece.jpg', hatch: SCOUTING_ASSETS + 'hatch.png', cargo: SCOUTING_ASSETS + 'cargo.png'};
const ScoringAreaAsset = 
  {rocket_ship: SCOUTING_ASSETS + 'red_rocket_ship.png', cargo_ship: SCOUTING_ASSETS + 'red_cargo_ship.png', dropped: SCOUTING_ASSETS + 'dropped.png'}

class PitStrat extends React.Component {
  constructor(props) {
    super(props);
    const {matchNumber, data} = this.props;
    // console.log(props)
    this.state = {
      appBarHeight: 50,
      scoutingSize: 475,
      tabPosition : 0,
      matchNumber: matchNumber,
      color : 'red',
      data : data
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
    // var stations = ['r1','r2','r3','b1','b2','b3']\
    console.log(data[0])
    return data.map(team => {
     return (
      <TableRow key={team.robot} >
        <TableCell id='table-cell' style={{backgroundColor:team.station.includes('r') ? theme.palette.primary.main : theme.palette.secondary.main,
           color:'white'}}>{team.robot}</TableCell>
        {/* <TableCell id='table-cell'>{team.station}</TableCell> */}
        <TableCell id='table-cell'>{team.mobility}</TableCell>
        <TableCell id='table-cell'>{team.sandstorm_hatch}</TableCell>
        <TableCell id='table-cell'>{team.sandstorm_cargo}</TableCell>
        <TableCell id='table-cell'>{team.cargo_hatch}</TableCell>
        <TableCell id='table-cell'>{team.cargo_cargo}</TableCell>
        <TableCell id='table-cell'>{team.rocket_hatch}</TableCell>
        <TableCell id='table-cell'>{team.rocket_cargo}</TableCell>
        {/* <TableCell id='table-cell'>average</TableCell> */}
        <TableCell id='table-cell'>{team.climb}</TableCell>
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
            <Tab label="Blue" />
          </Tabs>
        </AppBar>
        {(tabPosition === 0) &&
          <div style={{height: 470}}>
            <Paper>
              <Table id='tb'>
                <TableHead  >
                  <TableRow  style={{maxHeight: appBarHeight}}>
                    <TableCell id='table-cell'>Team</TableCell>
                    {/* <TableCell id='table-cell'>Matches</TableCell> */}
                    <TableCell id='table-cell'>Mobility</TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.sandstorm}/><img className='table-icon' src={GamePieceAsset.hatch}/></TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.sandstorm}/><img className='table-icon' src={GamePieceAsset.cargo}/></TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.cargo_ship}/><img className='table-icon' src={GamePieceAsset.hatch}/></TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.cargo_ship}/><img className='table-icon' src={GamePieceAsset.cargo}/></TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.rocket_ship}/><img className='table-icon' src={GamePieceAsset.hatch}/></TableCell>
                    <TableCell id='table-cell'><img className='table-icon' src={ScoringAreaAsset.rocket_ship}/><img className='table-icon' src={GamePieceAsset.cargo}/></TableCell>
                    {/* <TableCell id='table-cell'>Cycles</TableCell> */}
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