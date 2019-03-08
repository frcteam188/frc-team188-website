'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
var _window$materialUi = window['material-ui'],
    AppBar = _window$materialUi.AppBar,
    Button = _window$materialUi.Button,
    colors = _window$materialUi.colors,
    createMuiTheme = _window$materialUi.createMuiTheme,
    CssBaseline = _window$materialUi.CssBaseline,
    Dialog = _window$materialUi.Dialog,
    DialogActions = _window$materialUi.DialogActions,
    DialogContent = _window$materialUi.DialogContent,
    DialogContentText = _window$materialUi.DialogContentText,
    DialogTitle = _window$materialUi.DialogTitle,
    Icon = _window$materialUi.Icon,
    MuiThemeProvider = _window$materialUi.MuiThemeProvider,
    Tabs = _window$materialUi.Tabs,
    Tab = _window$materialUi.Tab,
    Toolbar = _window$materialUi.Toolbar,
    Typography = _window$materialUi.Typography,
    withStyles = _window$materialUi.withStyles;

var ScoutingApp = function (_React$Component) {
  _inherits(ScoutingApp, _React$Component);

  function ScoutingApp(props) {
    _classCallCheck(this, ScoutingApp);

    var _this = _possibleConstructorReturn(this, (ScoutingApp.__proto__ || Object.getPrototypeOf(ScoutingApp)).call(this, props));

    _this.handleTabChange = function (event, tabPosition) {
      _this.setState({ tabPosition: tabPosition });
    };

    console.log(props);
    _this.state = {
      'tabPosition': 0,
      'matchNumber': _this.props.matchNumber,
      'teamNumber': _this.props.teamNumber,
      'station': _this.props.station };
    return _this;
  }

  _createClass(ScoutingApp, [{
    key: 'render',
    value: function render() {
      var classes = this.props.classes;
      var _state = this.state,
          teamNumber = _state.teamNumber,
          station = _state.station,
          matchNumber = _state.matchNumber,
          tabPosition = _state.tabPosition;


      return React.createElement(
        MuiThemeProvider,
        { theme: theme, className: classes.root },
        React.createElement(
          AppBar,
          { position: 'static' },
          React.createElement(
            Tabs,
            { value: tabPosition, onChange: this.handleTabChange },
            React.createElement(Tab, { label: 'Sandstorm' }),
            React.createElement(Tab, { label: 'Tele' }),
            React.createElement(Tab, { label: 'Submit' }),
            React.createElement(Tab, { label: 'Match: ' + matchNumber, disabled: 'true' }),
            React.createElement(Tab, { label: 'Team: ' + teamNumber, disabled: 'true' }),
            React.createElement(Tab, { label: 'Station: ' + station, disabled: 'true' })
          )
        ),
        (tabPosition === 0 || tabPosition == 1) && React.createElement(
          TabContainer,
          null,
          'Item One'
        ),
        tabPosition === 2 && React.createElement(
          TabContainer,
          null,
          'Item Three'
        )
      );
    }
  }]);

  return ScoutingApp;
}(React.Component);

var Scouting = function (_React$Component2) {
  _inherits(Scouting, _React$Component2);

  function Scouting(props) {
    _classCallCheck(this, Scouting);

    return _possibleConstructorReturn(this, (Scouting.__proto__ || Object.getPrototypeOf(Scouting)).call(this, props));
  }

  _createClass(Scouting, [{
    key: 'render',
    value: function render() {
      // return
    }
  }]);

  return Scouting;
}(React.Component);

var TabContainer = function TabContainer(props) {
  return React.createElement(
    Typography,
    { component: 'div', style: { padding: 8 * 3 } },
    props.children
  );
};

var theme = createMuiTheme({
  palette: {
    primary: {
      light: colors.red[300],
      main: colors.red[500],
      dark: colors.red[700]
    },
    secondary: {
      light: colors.blue[300],
      main: colors.blue[500],
      dark: colors.blue[700]
    }
  },
  typography: {
    useNextVariants: true
  }
});

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    }
  };
};

var App = withStyles(styles)(ScoutingApp);