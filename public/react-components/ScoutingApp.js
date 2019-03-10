'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
var _window$materialUi = window['material-ui'],
    AppBar = _window$materialUi.AppBar,
    Button = _window$materialUi.Button,
    colors = _window$materialUi.colors,
    createMuiTheme = _window$materialUi.createMuiTheme,
    Grid = _window$materialUi.Grid,
    MuiThemeProvider = _window$materialUi.MuiThemeProvider,
    Paper = _window$materialUi.Paper,
    Tabs = _window$materialUi.Tabs,
    Tab = _window$materialUi.Tab,
    Typography = _window$materialUi.Typography,
    withStyles = _window$materialUi.withStyles;

var ScoutingApp = function (_React$Component) {
  _inherits(ScoutingApp, _React$Component);

  function ScoutingApp(props) {
    _classCallCheck(this, ScoutingApp);

    var _this = _possibleConstructorReturn(this, (ScoutingApp.__proto__ || Object.getPrototypeOf(ScoutingApp)).call(this, props));

    _this.getBackgroundAsset = function (station, flipped) {
      return station.includes('b') ? flipped ? '/assets/pictures/scouting_blue_left.png' : '/assets/pictures/scouting_blue_right.png' : flipped ? '/assets/pictures/scouting_red_right.png' : '/assets/pictures/scouting_red_left.png';
    };

    _this.habClicked = function (level) {
      _this.setState({ startingLevel: level });
    };

    _this.pickup = function (gamePiece, source) {
      var matchPhase = _this.state.matchPhase;

      var isAuto = matchPhase === 'sandstorm';
      _this.setState({ gamePiece: gamePiece });
    };

    _this.renderButtons = function (scoutingSize) {
      var _this$state = _this.state,
          color = _this$state.color,
          matchPhase = _this$state.matchPhase,
          gamePiece = _this$state.gamePiece,
          startingLevel = _this$state.startingLevel;


      var flipped = _this.state.flipped ^ color === 'blue';
      var isAuto = matchPhase === 'sandstorm';
      var isTele = !isAuto;
      var preloaded = gamePiece != undefined;
      var carryingCargo = gamePiece === 'cargo';
      var carryingHatch = gamePiece === 'hatch';

      var createScoutingButton = function createScoutingButton(top, left, width, height, text, buttonProps) {
        return e(ScoutingButton, { top: top, left: left, width: width, height: height, scoutingSize: scoutingSize, flipped: flipped, text: text, buttonProps: buttonProps });
      };

      var preloads = [createScoutingButton(25, 25, 125, 100, 'Hatch', { onClick: function onClick() {
          return _this.pickup('hatch', 'preload');
        }, variant: carryingHatch ? 'contained' : 'outlined' }), createScoutingButton(425, 25, 125, 100, 'Cargo', { onClick: function onClick() {
          return _this.pickup('cargo', 'preload');
        }, variant: carryingCargo ? 'contained' : 'outlined' })];

      var lowHab = createScoutingButton(145, 80, 85, 260, 'LV-1', { onClick: function onClick() {
          return _this.habClicked(1);
        }, variant: startingLevel === 1 ? 'contained' : 'outlined' });
      var middleHabTop = createScoutingButton(165, 0, 80, 65, 'LV-2', { onClick: function onClick() {
          return _this.habClicked(2);
        }, variant: startingLevel === 2 ? 'contained' : 'outlined' });
      var middleHabBottom = createScoutingButton(320, 0, 80, 65, 'LV-2', { onClick: function onClick() {
          return _this.habClicked(2);
        }, variant: startingLevel === 2 ? 'contained' : 'outlined' });
      var highHab = createScoutingButton(230, 0, 80, 90, 'LV-3', { onClick: function onClick() {
          return _this.habClicked(3);
        }, variant: startingLevel === 3 ? 'contained' : 'outlined' });

      var showMobility = startingLevel !== 'none' && preloaded;
      var mobility = createScoutingButton(25, 180, 125, 500, 'Mobility', { onClick: undefined, variant: 'outlined', disabled: !showMobility });

      var habButtons = [lowHab, middleHabTop, middleHabBottom, isTele && highHab];

      return [].concat(preloads, habButtons, [mobility]);
    };

    console.log(props);
    _this.state = {
      'tabPosition': 0,
      'matchNumber': _this.props.matchNumber,
      'teamNumber': _this.props.teamNumber,
      'station': _this.props.station,
      'flipped': _this.props.flipped,
      'color': _this.props.station.includes('b') ? 'blue' : 'red',
      'scoutingBg': _this.getBackgroundAsset(_this.props.station, _this.props.flipped),
      'authDone': false,
      'startingLevel': 'none',
      'matchPhase': 'sandstorm', // sandstorm, tele
      'gamePiece': undefined, //none, hatch, cargo
      'cycles': []
    };
    return _this;
  }

  _createClass(ScoutingApp, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      _objectDestructuringEmpty(this.props);

      var _state = this.state,
          teamNumber = _state.teamNumber,
          station = _state.station,
          color = _state.color,
          matchNumber = _state.matchNumber,
          tabPosition = _state.tabPosition,
          scoutingBg = _state.scoutingBg,
          autoDone = _state.autoDone,
          matchPhase = _state.matchPhase,
          gamePiece = _state.gamePiece;

      var appBarHeight = 50,
          scoutingSize = 550;

      return React.createElement(
        MuiThemeProvider,
        { theme: this.createTheme() },
        React.createElement(
          AppBar,
          { position: 'static', style: { height: appBarHeight } },
          React.createElement(
            Tabs,
            { value: tabPosition, onChange: function onChange(event, tabPosition) {
                _this2.setState({ tabPosition: tabPosition });
              } },
            React.createElement(Tab, { label: 'Sandstorm' }),
            React.createElement(Tab, { label: 'Tele', disabled: !autoDone }),
            React.createElement(Tab, { label: 'Defence' }),
            React.createElement(Tab, { label: 'Submit' }),
            React.createElement(Tab, { label: 'Match: ' + matchNumber, disabled: true }),
            React.createElement(Tab, { label: 'Team: ' + teamNumber, disabled: true }),
            React.createElement(Tab, { label: 'Station: ' + station, disabled: true })
          )
        ),
        (tabPosition === 0 || tabPosition == 1) && React.createElement(
          'div',
          { style: { height: scoutingSize } },
          React.createElement('div', { id: 'info-column' }),
          React.createElement(
            'div',
            { id: 'scouting-column', style: { height: scoutingSize } },
            this.renderButtons(scoutingSize),
            React.createElement('img', { className: 'fill-v', src: scoutingBg })
          ),
          React.createElement('div', { className: 'clear' })
        )
      );
    }
  }, {
    key: 'createTheme',
    value: function createTheme() {
      var primaryColor = colors.red,
          secondaryColor = colors.blue;
      if (this.state.color === 'blue') {
        primaryColor = colors.blue;
        secondaryColor = colors.red;
      }
      return createMuiTheme({
        palette: {
          primary: {
            light: primaryColor[300],
            main: primaryColor[500],
            dark: primaryColor[700]
          },
          secondary: {
            light: secondaryColor[300],
            main: secondaryColor[500],
            dark: secondaryColor[700]
          }
        },
        typography: {
          useNextVariants: true
        }
      });
    }
  }]);

  return ScoutingApp;
}(React.Component);

var ScoutingButton = function (_React$Component2) {
  _inherits(ScoutingButton, _React$Component2);

  function ScoutingButton(props) {
    _classCallCheck(this, ScoutingButton);

    var _this3 = _possibleConstructorReturn(this, (ScoutingButton.__proto__ || Object.getPrototypeOf(ScoutingButton)).call(this, props));

    var left = props.left,
        width = props.width,
        scoutingSize = props.scoutingSize,
        flipped = props.flipped;

    _this3.state = {
      left: flipped ? scoutingSize - (left + width) : left
    };

    return _this3;
  }

  _createClass(ScoutingButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          text = _props.text,
          top = _props.top,
          width = _props.width,
          height = _props.height,
          buttonProps = _props.buttonProps;
      var left = this.state.left;

      return React.createElement(
        Button,
        Object.assign({
          color: 'primary',
          style: { top: top,
            left: left,
            width: width,
            height: height,
            minWidth: 0,
            borderWidth: 2,
            position: 'absolute',
            display: 'block' }
        }, buttonProps),
        text
      );
    }
  }]);

  return ScoutingButton;
}(React.Component);

var App = ScoutingApp;