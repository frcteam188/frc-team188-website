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

class TeamView extends React.Component {
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
      
  constructor(props) {
    super(props);
    const {teamNumber, data} = this.props;
    this.state = {
        appBarHeight: 50,
        scoutingSize: 475,
        tabPosition : 0,
        teamNumber: teamNumber,
        color : 'red',
        data : data
    };
    console.log(this.state.data);
  }


  tabClicked = (event, tabPosition) => {
    this.setState({tabPosition});
  }

//   renderList = () => {
//       const {cycles} = this.state.data;
//       var infoKey = 0;

//     }
  renderCycles = () => {
    const {data} = this.state;
    data.sort((a, b) => {
        return a.id - b.id;
    });
    var infoKey = 0;
    return ([...data].map(cycle => {
      const cycleTime = (cycle.time/1000).toFixed(2);
      const primary = 'match:'+cycle.match + ' ' + cycle.success;
      const secondary = 'time: ' + cycleTime +'s';
      const tertiary = cycle.phase + ' on ' + cycle.score + ' at ' + cycle.level;
      return this.createInfoItem(
        [this.getPickupAsset(cycle.pickup), this.getGamePieceAsset(cycle.piece), this.getScoringAreaAsset(cycle.score)],
        primary, secondary, tertiary, infoKey++);
    }));
  }
  createInfoItem = (assets, primary, secondary, tertiary, key) => {
    return  [<ListItem style={{maxWidth: 400}} alignItems='flex-start' key={key++}>
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
  render() {
    const theme = this.createTheme();
    const {appBarHeight, teamNumber, tabPosition, scoutingSize} = this.state;
    const imgheight = 50;
    
    return <MuiThemeProvider theme={theme}>
        <AppBar position="static" style={{height: appBarHeight}}>
          <Tabs value={tabPosition} onChange={this.tabClicked}>
            <Tab label={'Team: ' + teamNumber} />
            <Tab label="Red" disabled={true}/>
            <Tab label="Blue" disabled={true}/>
          </Tabs>
        </AppBar>
        {(tabPosition === 0) &&
          <div style={{height: scoutingSize, float: 'left'}}>
            <Paper>
                <List style={{maxHeight: 475, overflow: 'auto'}}>
                {this.renderCycles()}
                </List>
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
const App = (TeamView)  