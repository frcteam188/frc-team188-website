'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var e = React.createElement;
var _window$materialUi = window['material-ui'],
    AppBar = _window$materialUi.AppBar,
    Avatar = _window$materialUi.Avatar,
    Button = _window$materialUi.Button,
    colors = _window$materialUi.colors,
    createMuiTheme = _window$materialUi.createMuiTheme,
    Grid = _window$materialUi.Grid,
    List = _window$materialUi.List,
    ListItem = _window$materialUi.ListItem,
    ListItemAvatar = _window$materialUi.ListItemAvatar,
    ListItemText = _window$materialUi.ListItemText,
    MuiThemeProvider = _window$materialUi.MuiThemeProvider,
    Tabs = _window$materialUi.Tabs,
    Tab = _window$materialUi.Tab,
    Typography = _window$materialUi.Typography,
    withStyles = _window$materialUi.withStyles;

var GameState = function GameState() {
  _classCallCheck(this, GameState);
};

var Cycle = function Cycle(robot, match, matchPhase) {
  _classCallCheck(this, Cycle);

  this.robot = robot;
  this.match = match;
  this.matchPhase = matchPhase;
  this.gamePiece = undefined;
  this.pickup = undefined;
  this.score = undefined;
  this.level = undefined;
  this.success = undefined;
  this.timer = undefined;
  this.time = undefined;
};

var Hab = function Hab(robot, match, matchPhase) {
  _classCallCheck(this, Hab);

  this.robot = robot;
  this.match = match;
  this.matchPhase = matchPhase;
  this.level = undefined;
  this.success = undefined;
  this.timer = undefined;
  this.time = undefined;
};

var ScoutingApp = function (_React$Component) {
  _inherits(ScoutingApp, _React$Component);

  function ScoutingApp(props) {
    _classCallCheck(this, ScoutingApp);

    var _this = _possibleConstructorReturn(this, (ScoutingApp.__proto__ || Object.getPrototypeOf(ScoutingApp)).call(this, props));

    _initialiseProps.call(_this);

    var _this$props = _this.props,
        matchNumber = _this$props.matchNumber,
        teamNumber = _this$props.teamNumber,
        station = _this$props.station,
        flipped = _this$props.flipped;

    console.log(props);
    _this.state = {
      appBarHeight: 50,
      scoutingSize: 550,
      tabPosition: 2,
      matchNumber: matchNumber,
      teamNumber: teamNumber,
      station: station,
      flipped: flipped,
      color: station.includes('b') ? 'blue' : 'red',
      scoutingBg: _this.getBackgroundAsset(station, flipped),
      canTele: false,
      matchPhase: 'sandstorm', // sandstorm, tele
      gamePiece: undefined, //none, hatch, cargo
      cycle: new Cycle(teamNumber, matchNumber, 'sandstorm'),
      hab: new Hab(teamNumber, matchNumber, 'sandstorm'),
      habs: [],
      cycles: []
    };
    return _this;
  }

  _createClass(ScoutingApp, [{
    key: 'render',
    value: function render() {
      console.log(this.state);
      var theme = this.createTheme();

      _objectDestructuringEmpty(this.props);

      var _state = this.state,
          appBarHeight = _state.appBarHeight,
          scoutingSize = _state.scoutingSize,
          teamNumber = _state.teamNumber,
          station = _state.station,
          matchNumber = _state.matchNumber,
          tabPosition = _state.tabPosition,
          scoutingBg = _state.scoutingBg,
          canTele = _state.canTele,
          matchPhase = _state.matchPhase,
          cycle = _state.cycle,
          hab = _state.hab;
      var gamePiece = cycle.gamePiece;

      var gamePieceAssets = { none: '/assets/pictures/no_game_piece.jpg', hatch: '/assets/pictures/hatch.jpg', cargo: '/assets/pictures/cargo.jpg' };
      return React.createElement(
        MuiThemeProvider,
        { theme: theme },
        React.createElement(
          AppBar,
          { position: 'static', style: { height: appBarHeight } },
          React.createElement(
            Tabs,
            { value: tabPosition, onChange: this.tabClicked },
            React.createElement(Tab, { label: 'Match: ' + matchNumber, disabled: true }),
            React.createElement(Tab, { label: 'Station: ' + station, disabled: true }),
            React.createElement(Tab, { label: 'Sandstorm', disabled: matchPhase !== 'sandstorm' }),
            React.createElement(Tab, { label: 'Tele', disabled: !this.canTele() }),
            React.createElement(Tab, { label: 'Defence' }),
            React.createElement(Tab, { label: 'Submit' })
          )
        ),
        (tabPosition === 2 || tabPosition == 3) && React.createElement(
          'div',
          { style: { height: scoutingSize, overflow: 'hidden' } },
          React.createElement(
            'div',
            { id: 'info-column' },
            React.createElement(
              'div',
              { id: 'state-info', style: { borderColor: theme.palette.primary.main } },
              React.createElement(
                Typography,
                { variant: 'headline', className: 'f-left', color: 'primary' },
                teamNumber
              ),
              React.createElement('img', { src: gamePieceAssets[gamePiece], id: 'game-piece-img' })
            ),
            React.createElement(
              List,
              { style: { maxHeight: scoutingSize - 100, overflow: 'auto' } },
              this.renderCycles()
            )
          ),
          React.createElement(
            'div',
            { id: 'scouting-column', style: { height: scoutingSize } },
            this.renderButtons(),
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

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getBackgroundAsset = function (station, flipped) {
    return station.includes('b') ? flipped ? '/assets/pictures/scouting_blue_left.png' : '/assets/pictures/scouting_blue_right.png' : flipped ? '/assets/pictures/scouting_red_right.png' : '/assets/pictures/scouting_red_left.png';
  };

  this.tabClicked = function (event, tabPosition) {
    if (tabPosition == 3) {
      var _state2 = _this3.state,
          cycle = _state2.cycle,
          hab = _state2.hab,
          habs = _state2.habs;

      _this3.setState({
        matchPhase: 'tele',
        cycle: Object.assign({}, cycle, { matchPhase: 'tele' }),
        hab: new Hab(_this3.props.teamNumber, _this3.props.matchNumber, 'tele')
      });
      if (habs.length == 0) {
        hab.success = 'none';
        hab.time = undefined;
        hab.timer = undefined;
        _this3.setState({ habs: [hab] });
      }
    }
    _this3.setState({ tabPosition: tabPosition });
  };

  this.mobilityClicked = function () {
    var hab = _this3.state.hab;

    hab.success = 'scored';
    hab.time = new Date().getTime() - hab.timer;
    hab.timer = undefined;
    _this3.setState({ hab: new Hab(_this3.props.teamNumber, _this3.props.matchNumber, 'tele'), habs: [hab] });
  };

  this.canTele = function () {
    var _state3 = _this3.state,
        matchPhase = _state3.matchPhase,
        cycle = _state3.cycle,
        hab = _state3.hab,
        habs = _state3.habs;

    return matchPhase == 'tele' || habs.length > 0 || hab.level !== undefined && cycle.gamePiece != undefined && hab.timer !== undefined;
  };

  this.habClicked = function (level) {
    var hab = _this3.state.hab;

    _this3.setState({ hab: Object.assign({}, hab, { level: level }) });
  };

  this.startTimer = function () {
    var _state4 = _this3.state,
        cycle = _state4.cycle,
        hab = _state4.hab;

    var currTime = new Date().getTime();
    _this3.setState({ cycle: Object.assign({}, cycle, { timer: currTime }), hab: Object.assign({}, hab, { timer: currTime }) });
  };

  this.pickup = function (gamePiece, source) {
    var _state5 = _this3.state,
        matchPhase = _state5.matchPhase,
        cycle = _state5.cycle;

    var isAuto = matchPhase === 'sandstorm';
    _this3.setState({ cycle: Object.assign({}, cycle, { gamePiece: gamePiece, pickup: source }) });
  };

  this.renderButtons = function () {
    var _state6 = _this3.state,
        scoutingSize = _state6.scoutingSize,
        color = _state6.color,
        matchPhase = _state6.matchPhase,
        cycle = _state6.cycle,
        cycles = _state6.cycles,
        hab = _state6.hab,
        habs = _state6.habs;


    var flipped = _this3.state.flipped ^ color === 'blue';
    var isAuto = matchPhase === 'sandstorm';
    var isTele = !isAuto;
    var mobilityDone = habs.length > 0;
    var carryingNone = cycle.gamePiece === 'none';
    var carryingCargo = cycle.gamePiece === 'cargo';
    var carryingHatch = cycle.gamePiece === 'hatch';
    var timerStarted = hab.timer !== undefined;

    var createScoutingButton = function createScoutingButton(key, top, left, width, height, text, buttonProps) {
      return React.createElement(ScoutingButton, { key: key, top: top, left: left, width: width, height: height, text: text, buttonProps: buttonProps, flipped: flipped, scoutingSize: scoutingSize });
    };

    var preloads = isAuto && [createScoutingButton('hatch-preload', 25, 25, 125, 100, 'Hatch', { onClick: function onClick() {
        return _this3.pickup('hatch', 'preload');
      }, variant: carryingHatch ? 'contained' : 'outlined' }), createScoutingButton('cargo-preload', 425, 25, 125, 100, 'Cargo', { onClick: function onClick() {
        return _this3.pickup('cargo', 'preload');
      }, variant: carryingCargo ? 'contained' : 'outlined' }), isAuto && createScoutingButton('no-preload', 450, 180, 125, 75, 'No Preload', { onClick: function onClick() {
        return _this3.pickup('none', 'preload');
      }, variant: carryingNone ? 'contained' : 'outlined' })];

    var mobilityButtons = !mobilityDone && [createScoutingButton('timer-start', 105, 320, 125, 75, 'Start Timer', { onClick: function onClick() {
        return _this3.startTimer();
      }, variant: timerStarted ? 'contained' : 'outlined' }), createScoutingButton('mobility', 25, 180, 125, 410, 'Mobility', { onClick: _this3.mobilityClicked, variant: 'outlined', disabled: !_this3.canTele() })];

    var habButtons = (isTele || habs.length == 0) && [createScoutingButton('low-hab', 145, 80, 85, 260, 'LV-1', { onClick: function onClick() {
        return _this3.habClicked(1);
      }, variant: hab.level === 1 ? 'contained' : 'outlined' }), createScoutingButton('top-mid-hab', 165, 0, 80, 65, 'LV-2', { onClick: function onClick() {
        return _this3.habClicked(2);
      }, variant: hab.level === 2 ? 'contained' : 'outlined' }), createScoutingButton('bot-mid-hab', 320, 0, 80, 65, 'LV-2', { onClick: function onClick() {
        return _this3.habClicked(2);
      }, variant: hab.level === 2 ? 'contained' : 'outlined' }), isTele && createScoutingButton('high-hab', 230, 0, 80, 90, 'LV-3', { onClick: function onClick() {
        return _this3.habClicked(3);
      }, variant: hab.level === 3 ? 'contained' : 'outlined' })];

    var scoreButtons = (isAuto && mobilityDone || isTele) && cycle.gamePiece != undefined && [createScoutingButton('top-rocket-low', 50, 350, 50, 50, 'L', { variant: 'outlined' }), createScoutingButton('top-rocket-mid', 50, 400, 50, 50, 'M', { variant: 'outlined' }), createScoutingButton('top-rocket-high', 50, 450, 50, 50, 'H', { variant: 'outlined' }), createScoutingButton('bot-rocket-low', 450, 350, 50, 50, 'L', { variant: 'outlined' }), createScoutingButton('bot-rocket-mid', 450, 400, 50, 50, 'M', { variant: 'outlined' }), createScoutingButton('bot-rocket-high', 450, 450, 50, 50, 'H', { variant: 'outlined' }), createScoutingButton('cargo-top', 180, 425, 125, 50, '', { variant: 'outlined' }), createScoutingButton('cargo-front', 230, 335, 50, 90, '', { variant: 'outlined' }), createScoutingButton('cargo-bot', 320, 425, 125, 50, '', { variant: 'outlined' })];

    return [].concat(_toConsumableArray(preloads), _toConsumableArray(mobilityButtons), _toConsumableArray(habButtons), _toConsumableArray(scoreButtons));
  };

  this.renderHabs = function () {
    var scoutingSize = _this3.state.scoutingSize;

    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) {
      return React.createElement(
        ListItem,
        { alignItems: 'flex-start' },
        React.createElement(
          ListItemAvatar,
          null,
          React.createElement(Avatar, { alt: 'Remy Sharp', src: '' })
        ),
        React.createElement(ListItemText, {
          primary: 'Brunch this weekend?',
          secondary: React.createElement(
            React.Fragment,
            null,
            React.createElement(
              Typography,
              { component: 'span', color: 'textPrimary' },
              'Ali Connors'
            ),
            " — I'll be in your neighborhood doing errands this…"
          )
        })
      );
    });
  };

  this.renderCycles = function () {
    var scoutingSize = _this3.state.scoutingSize;

    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) {
      return React.createElement(
        ListItem,
        { alignItems: 'flex-start' },
        React.createElement(
          ListItemAvatar,
          null,
          React.createElement(Avatar, { alt: 'Remy Sharp', src: '' })
        ),
        React.createElement(ListItemText, {
          primary: 'Brunch this weekend?',
          secondary: React.createElement(
            React.Fragment,
            null,
            React.createElement(
              Typography,
              { component: 'span', color: 'textPrimary' },
              'Ali Connors'
            ),
            " — I'll be in your neighborhood doing errands this…"
          )
        })
      );
    });
  };
};

var ScoutingButton = function (_React$Component2) {
  _inherits(ScoutingButton, _React$Component2);

  function ScoutingButton(props) {
    _classCallCheck(this, ScoutingButton);

    var _this2 = _possibleConstructorReturn(this, (ScoutingButton.__proto__ || Object.getPrototypeOf(ScoutingButton)).call(this, props));

    var left = props.left,
        width = props.width,
        scoutingSize = props.scoutingSize,
        flipped = props.flipped;

    _this2.state = {
      left: flipped ? scoutingSize - (left + width) : left
    };
    return _this2;
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