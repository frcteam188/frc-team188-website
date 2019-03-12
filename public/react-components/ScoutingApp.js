'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
    Divider = _window$materialUi.Divider,
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
  this.level = 0;
  this.success = undefined;
  this.timer = undefined;
  this.time = undefined;
};

var Defence = function Defence(robot, match, matchPhase) {
  _classCallCheck(this, Defence);

  this.type = undefined; // pin, drop piece 
  this.success = undefined; // foul, success
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
    // console.log(props)

    _this.state = {
      appBarHeight: 50,
      scoutingSize: 475,
      tabPosition: 2,
      matchNumber: matchNumber,
      teamNumber: teamNumber,
      station: station,
      flipped: flipped,
      color: station.includes('b') ? 'blue' : 'red',
      matchPhase: 'sandstorm', // sandstorm, tele
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
      // console.log(this.state);
      var theme = this.createTheme();
      var flipped = this.props.flipped;
      var _state = this.state,
          appBarHeight = _state.appBarHeight,
          scoutingSize = _state.scoutingSize,
          teamNumber = _state.teamNumber,
          station = _state.station,
          matchNumber = _state.matchNumber,
          tabPosition = _state.tabPosition,
          matchPhase = _state.matchPhase,
          cycle = _state.cycle,
          hab = _state.hab;
      var pickup = cycle.pickup,
          gamePiece = cycle.gamePiece,
          score = cycle.score;


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
              { id: 'state-info', style: { borderColor: theme.palette.primary.main, position: 'relative' } },
              React.createElement(
                Typography,
                { variant: 'h5', className: 'f-left', color: 'primary' },
                teamNumber
              ),
              this.createDroppedButton(),
              React.createElement('img', { src: this.getScoringAreaAsset(score), id: 'game-piece-img' }),
              React.createElement('img', { src: this.getGamePieceAsset(gamePiece), id: 'game-piece-img' }),
              React.createElement('img', { src: this.getPickupAsset(pickup), id: 'game-piece-img' })
            ),
            React.createElement(
              List,
              { style: { maxHeight: scoutingSize - 100, overflow: 'auto' } },
              this.renderCycles(),
              this.renderHabs()
            )
          ),
          React.createElement(
            'div',
            { id: 'scouting-column', style: { height: scoutingSize } },
            this.renderButtons(),
            React.createElement('img', { className: 'fill', src: this.getBackgroundAsset(station, flipped) })
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

  this.getPickupAsset = function (pickup) {
    var pickupArea = pickup && (pickup.includes('hp') ? 'hp' : pickup);
    var assetMap = { floor: '/assets/pictures/floor.png', hp: '/assets/pictures/human.png', preload: '/assets/pictures/preload.png' };
    return assetMap[pickupArea];
  };

  this.getGamePieceAsset = function (gamePiece) {
    var assetMap = { none: '/assets/pictures/no_game_piece.jpg', hatch: '/assets/pictures/hatch.jpg', cargo: '/assets/pictures/cargo.jpg' };
    return assetMap[gamePiece];
  };

  this.getScoringAreaAsset = function (scoringArea) {
    var scoringShip = scoringArea && (scoringArea.includes('rocket') ? 'rocket_ship' : scoringArea.includes('cargo') ? 'cargo_ship' : 'dropped');
    var assetMap = { rocket_ship: '/assets/pictures/rocket_ship.jpg', cargo_ship: '/assets/pictures/cargo_ship.jpg', dropped: '/assets/pictures/dropped.jpg' };
    return assetMap[scoringShip];
  };

  this.getBackgroundAsset = function (station, flipped) {
    return station.includes('b') ? flipped ? '/assets/pictures/scouting_blue_left.png' : '/assets/pictures/scouting_blue_right.png' : flipped ? '/assets/pictures/scouting_red_right.png' : '/assets/pictures/scouting_red_left.png';
  };

  this.tabClicked = function (event, tabPosition) {
    if (tabPosition == 3 && _this3.state.matchPhase !== 'tele') {
      var _state2 = _this3.state,
          cycle = _state2.cycle,
          hab = _state2.hab,
          habs = _state2.habs;

      _this3.setState({
        matchPhase: 'tele',
        cycle: Object.assign({}, cycle, { matchPhase: 'tele', timer: _this3.getCurrTime() }),
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
    hab.time = _this3.getCurrTime() - hab.timer;
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
    var _state4 = _this3.state,
        matchPhase = _state4.matchPhase,
        hab = _state4.hab,
        habs = _state4.habs;

    console.log(hab);
    console.log(hab);
    var isAttempted = hab.success === 'attempted' && hab.level === level;
    var isTele = matchPhase === 'tele';
    if (isTele && isAttempted) {
      hab.success = 'scored';
      hab.time = _this3.getCurrTime() - hab.timer;
      hab.timer = undefined;
      habs.push(hab);
      _this3.setState({ habs: habs, hab: new Hab(_this3.props.teamNumber, _this3.props.matchNumber, 'tele') });
    } else {
      _this3.setState({ hab: Object.assign({}, hab, { level: level, success: 'attempted', timer: isTele ? _this3.getCurrTime() : hab.timer }) });
    }
  };

  this.getCurrTime = function () {
    return new Date().getTime();
  };

  this.startTimer = function () {
    var _state5 = _this3.state,
        cycle = _state5.cycle,
        hab = _state5.hab;

    _this3.setState({ cycle: Object.assign({}, cycle, { timer: _this3.getCurrTime() }), hab: Object.assign({}, hab, { timer: _this3.getCurrTime() }) });
  };

  this.pickup = function (gamePiece, source) {
    var cycle = _this3.state.cycle;

    _this3.setState({ cycle: Object.assign({}, cycle, { gamePiece: gamePiece, pickup: source, timer: _this3.getCurrTime() }) });
  };

  this.score = function (scoringArea) {
    var _state6 = _this3.state,
        cycle = _state6.cycle,
        cycles = _state6.cycles;

    var isAttempted = cycle.success === 'attempted' && cycle.score === scoringArea;
    if (!isAttempted && scoringArea !== 'dropped') {
      _this3.setState({ cycle: Object.assign({}, cycle, { score: scoringArea, success: 'attempted' }) });
    } else {
      var newCycle = new Cycle(_this3.props.robot, _this3.props.matchNumber, _this3.state.matchPhase);
      if (scoringArea === 'dropped') {
        if (cycle.success !== 'attempted') {
          cycle.success = 'dropped';
          cycle.score = 'dropped';
        }
      } else {
        cycle.success = 'success';
      }

      cycle.time = _this3.getCurrTime() - cycle.timer;
      cycle.timer = undefined;
      cycles.push(cycle);
      _this3.setState({ cycle: newCycle, cycles: cycles });
    }
  };

  this.createDroppedButton = function () {
    var _state7 = _this3.state,
        scoutingSize = _state7.scoutingSize,
        cycle = _state7.cycle;
    var gamePiece = cycle.gamePiece;

    return (gamePiece == 'hatch' || gamePiece === 'cargo') && React.createElement(ScoutingButton, { top: 65, left: 5, width: 75, height: 40, scoutingSize: scoutingSize, text: 'Drop', buttonProps: { onClick: function onClick() {
          return _this3.score('dropped');
        }, variant: 'contained' } });
  };

  this.renderButtons = function () {
    var _state8 = _this3.state,
        scoutingSize = _state8.scoutingSize,
        color = _state8.color,
        tabPosition = _state8.tabPosition,
        matchPhase = _state8.matchPhase,
        cycle = _state8.cycle,
        cycles = _state8.cycles,
        hab = _state8.hab,
        habs = _state8.habs;


    var flipped = _this3.state.flipped ^ color === 'blue';
    var isAuto = matchPhase === 'sandstorm';
    var isTele = !isAuto;
    var timerStarted = hab.timer !== undefined;
    var mobilityDone = habs.length > 0;

    var carryingNone = cycle.gamePiece === 'none';
    var carryingCargo = cycle.gamePiece === 'cargo';
    var carryingHatch = cycle.gamePiece === 'hatch';

    var createScoutingButton = function createScoutingButton(key, top, left, width, height, text, buttonProps) {
      return React.createElement(ScoutingButton, { key: key, top: top, left: left, width: width, height: height, text: text, buttonProps: buttonProps, flipped: flipped, scoutingSize: scoutingSize });
    };

    var preloads = isAuto && cycles.length == 0 && [createScoutingButton('hatch-preload', 25, 25, 150, 100, 'Hatch', { onClick: function onClick() {
        return _this3.pickup('hatch', 'preload');
      }, variant: carryingHatch ? 'contained' : 'outlined' }), createScoutingButton('cargo-preload', 425, 25, 150, 100, 'Cargo', { onClick: function onClick() {
        return _this3.pickup('cargo', 'preload');
      }, variant: carryingCargo ? 'contained' : 'outlined' }), createScoutingButton('no-preload', 450, 225, 150, 75, 'No Preload', { onClick: function onClick() {
        return _this3.pickup('none', 'preload');
      }, variant: carryingNone ? 'contained' : 'outlined' })];

    var mobilityButtons = !mobilityDone && [createScoutingButton('timer-start', 105, 400, 100, 75, 'Start Timer', { onClick: function onClick() {
        return _this3.startTimer();
      }, variant: timerStarted ? 'contained' : 'outlined' }), createScoutingButton('mobility', 25, 225, 150, 410, 'Mobility', { onClick: _this3.mobilityClicked, variant: 'outlined', disabled: !_this3.canTele() })];

    var habButtons = (isTele || habs.length == 0) && [createScoutingButton('low-hab', 145, 100, 100, 260, 'LV-1', { onClick: function onClick() {
        return _this3.habClicked(1);
      }, variant: hab.level === 1 ? 'contained' : 'outlined' }), createScoutingButton('top-mid-hab', 165, 0, 100, 65, 'LV-2', { onClick: function onClick() {
        return _this3.habClicked(2);
      }, variant: hab.level === 2 ? 'contained' : 'outlined' }), createScoutingButton('bot-mid-hab', 320, 0, 100, 65, 'LV-2', { onClick: function onClick() {
        return _this3.habClicked(2);
      }, variant: hab.level === 2 ? 'contained' : 'outlined' }), isTele && createScoutingButton('high-hab', 230, 0, 100, 90, 'LV-3', { onClick: function onClick() {
        return _this3.habClicked(3);
      }, variant: hab.level === 3 ? 'contained' : 'outlined' })];

    var createScoringButton = function createScoringButton(key, top, left, width, height, text) {
      var isAttempted = cycle.success === 'attempted' && cycle.score === key;
      return createScoutingButton(key, top, left, width, height, text, { onClick: function onClick() {
          return _this3.score(key);
        }, variant: isAttempted ? 'contained' : 'outlined' });
    };

    var scoreButtons = (isAuto && mobilityDone || isTele) && cycle.gamePiece != undefined && cycle.gamePiece != 'none' && [createScoringButton('top-rocket-low', 50, 450, 60, 60, 'L'), createScoringButton('top-rocket-mid', 50, 510, 60, 60, 'M'), createScoringButton('top-rocket-high', 50, 570, 60, 60, 'H'), createScoringButton('bot-rocket-low', 440, 450, 60, 60, 'L'), createScoringButton('bot-rocket-mid', 440, 510, 60, 60, 'M'), createScoringButton('bot-rocket-high', 440, 570, 60, 60, 'H'), createScoringButton('top-cargo', 180, 520, 125, 50, ''), createScoringButton('front-cargo', 230, 400, 55, 90, ''), createScoringButton('bot-cargo', 320, 520, 125, 50, '')];

    var createPickupButton = function createPickupButton(key, top, left, width, height, text, primary, secondary) {
      var isPickedUp = cycle.pickup === key;
      var gamePiece = isPickedUp && cycle.gamePiece == primary ? secondary : primary;
      var pickupProps = { onClick: function onClick() {
          return _this3.pickup(gamePiece, key);
        }, variant: isPickedUp ? 'contained' : 'outlined' };
      return createScoutingButton(key, top, left, width, height, text, pickupProps);
    };

    var pickups = (isAuto && cycles.length > 0 || isTele) && [createPickupButton('top-hp', 25, 25, 150, 100, 'hp', 'hatch', 'cargo'), createPickupButton('bot-hp', 425, 25, 150, 100, 'hp', 'hatch', 'cargo'), createPickupButton('floor', 25, 225, 150, 500, 'floor', 'cargo', 'hatch')];

    return habs.length < 2 && [].concat(_toConsumableArray(preloads), _toConsumableArray(mobilityButtons), _toConsumableArray(habButtons), _toConsumableArray(scoreButtons), _toConsumableArray(pickups));
  };

  this.createInfoItem = function (assets, primary, secondary, tertiary, key) {
    return [React.createElement(
      ListItem,
      { alignItems: 'flex-start', key: key++ },
      React.createElement(ListItemText, {
        primary: primary,
        secondary: React.createElement(
          React.Fragment,
          null,
          React.createElement(
            Typography,
            { component: 'span', color: 'textPrimary' },
            secondary
          ),
          tertiary
        ) }),
      assets.map(function (asset) {
        return React.createElement(Avatar, { className: 'padding-s', src: asset });
      })
    ), React.createElement(Divider, { key: 'div' })];
  };

  this.renderHabs = function () {
    var habs = _this3.state.habs;

    var infoKey = 0;
    return habs.map(function (hab) {
      var habScored = (hab.matchPhase === 'tele' ? 'climb: ' : 'mobility: ') + hab.success + (hab.time ? ': ' + (hab.time / 1000).toFixed(2) : '');
      return _this3.createInfoItem([], 'Level ' + hab.level, hab.matchPhase, habScored, infoKey++);
    });
  };

  this.renderCycles = function () {
    var cycles = _this3.state.cycles;

    var infoKey = 0;
    return [].concat(_toConsumableArray(cycles)).reverse().map(function (cycle) {
      var cycleTime = (cycle.time / 1000).toFixed(2);
      return _this3.createInfoItem([_this3.getPickupAsset(cycle.pickup), _this3.getGamePieceAsset(cycle.gamePiece), _this3.getScoringAreaAsset(cycle.score)], cycle.success, cycleTime, cycle.matchPhase, infoKey++);
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
      left: flipped ? 650 - (left + width) : left
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
          buttonProps = _props.buttonProps,
          scoutingSize = _props.scoutingSize;

      var yScaleFactor = scoutingSize / 550;
      var left = this.state.left;

      return React.createElement(
        Button,
        Object.assign({
          color: 'primary',
          style: { top: top * yScaleFactor,
            left: left,
            width: width,
            height: height * yScaleFactor,
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