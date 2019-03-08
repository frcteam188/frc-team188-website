'use strict';

const e = React.createElement;
const {
  AppBar,
  Button,
  colors,
  createMuiTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  MuiThemeProvider,
  Tabs,
  Tab,
  Toolbar,
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
      'station': this.props.station};
  }
  handleTabChange = (event, tabPosition) => {
    this.setState({ tabPosition });
  };

  render() {
    const { classes } = this.props;
    const { teamNumber, station, matchNumber, tabPosition } = this.state;
  
    return <MuiThemeProvider theme={theme} className={classes.root}>
       <AppBar position="static">
          <Tabs value={tabPosition} onChange={this.handleTabChange}>
            <Tab label="Sandstorm" />
            <Tab label="Tele" />
            <Tab label="Submit" />
            <Tab label={'Match: ' + matchNumber} disabled='true'/>
            <Tab label={'Team: ' + teamNumber} disabled='true'/>
            <Tab label={'Station: ' + station} disabled='true'/>
          </Tabs>
        </AppBar>
        {(tabPosition === 0 || tabPosition == 1) && <TabContainer>Item One</TabContainer>}
        {tabPosition === 2 && <TabContainer>Item Three</TabContainer>}
    </MuiThemeProvider>
  }
}

class Scouting extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    // return
  }
}

const TabContainer = props => 
  (<Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );


const theme = createMuiTheme({
  palette: {
    primary: {
      light: colors.red[300],
      main: colors.red[500],
      dark: colors.red[700],
    },
    secondary: {
      light: colors.blue[300],
      main: colors.blue[500],
      dark: colors.blue[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  }
});

const App = withStyles(styles)(ScoutingApp)