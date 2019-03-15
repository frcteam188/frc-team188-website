'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
var _window$materialUi = window['material-ui'],
    AppBar = _window$materialUi.AppBar,
    Avatar = _window$materialUi.Avatar,
    Button = _window$materialUi.Button,
    colors = _window$materialUi.colors,
    createMuiTheme = _window$materialUi.createMuiTheme,
    Divider = _window$materialUi.Divider,
    ExpansionPanel = _window$materialUi.ExpansionPanel,
    ExpansionPanelSummary = _window$materialUi.ExpansionPanelSummary,
    ExpansionPanelDetails = _window$materialUi.ExpansionPanelDetails,
    ExpandMoreIcon = _window$materialUi.ExpandMoreIcon,
    Grid = _window$materialUi.Grid,
    List = _window$materialUi.List,
    ListItem = _window$materialUi.ListItem,
    ListItemAvatar = _window$materialUi.ListItemAvatar,
    ListItemText = _window$materialUi.ListItemText,
    MuiThemeProvider = _window$materialUi.MuiThemeProvider,
    Paper = _window$materialUi.Paper,
    Tabs = _window$materialUi.Tabs,
    Tab = _window$materialUi.Tab,
    Table = _window$materialUi.Table,
    TableBody = _window$materialUi.TableBody,
    TableCell = _window$materialUi.TableCell,
    TableHead = _window$materialUi.TableHead,
    TableRow = _window$materialUi.TableRow,
    Typography = _window$materialUi.Typography,
    withStyles = _window$materialUi.withStyles;


var PickupAsset = { floor: '/assets/pictures/floor.png', hp: '/assets/pictures/human.png', preload: '/assets/pictures/preload.png' };
var GamePieceAsset = { none: '/assets/pictures/no_game_piece.jpg', hatch: '/assets/pictures/hatch.jpg', cargo: '/assets/pictures/cargo.jpg' };
var ScoringAreaAsset = { rocket_ship: '/assets/pictures/rocket_ship.jpg', cargo_ship: '/assets/pictures/cargo_ship.jpg', sandstorm: '/assets/pictures/sandstorm.jpeg' };

var TeamView = function (_React$Component) {
  _inherits(TeamView, _React$Component);

  function TeamView(props) {
    _classCallCheck(this, TeamView);

    var _this = _possibleConstructorReturn(this, (TeamView.__proto__ || Object.getPrototypeOf(TeamView)).call(this, props));

    _initialiseProps.call(_this);

    var _this$props = _this.props,
        teamNumber = _this$props.teamNumber,
        data = _this$props.data;

    _this.state = {
      appBarHeight: 50,
      scoutingSize: 475,
      tabPosition: 0,
      teamNumber: teamNumber,
      color: 'red',
      data: data
    };
    console.log(_this.state.data);
    return _this;
  }

  //   renderList = () => {
  //       const {cycles} = this.state.data;
  //       var infoKey = 0;

  //     }


  _createClass(TeamView, [{
    key: 'render',
    value: function render() {
      var theme = this.createTheme();
      var _state = this.state,
          appBarHeight = _state.appBarHeight,
          teamNumber = _state.teamNumber,
          tabPosition = _state.tabPosition,
          scoutingSize = _state.scoutingSize;

      var imgheight = 50;

      return React.createElement(
        MuiThemeProvider,
        { theme: theme },
        React.createElement(
          AppBar,
          { position: 'static', style: { height: appBarHeight } },
          React.createElement(
            Tabs,
            { value: tabPosition, onChange: this.tabClicked },
            React.createElement(Tab, { label: 'Team: ' + teamNumber }),
            React.createElement(Tab, { label: 'Red', disabled: true }),
            React.createElement(Tab, { label: 'Blue', disabled: true })
          )
        ),
        tabPosition === 0 && React.createElement(
          'div',
          { style: { height: scoutingSize, float: 'left' } },
          React.createElement(
            Paper,
            null,
            React.createElement(
              List,
              { className: 'pitStratList', style: {} },
              this.renderCycles(),
              this.renderMatches()
            )
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
            vlight: primaryColor[200],
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

  return TeamView;
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

  this.tabClicked = function (event, tabPosition) {
    _this3.setState({ tabPosition: tabPosition });
  };

  this.renderCycles = function () {
    var data = _this3.state.data;

    data.sort(function (a, b) {
      return a.id - b.id;
    });
    var infoKey = 0;
    return [].concat(_toConsumableArray(data)).map(function (cycle) {
      var cycleTime = (cycle.time / 1000).toFixed(2);
      var primary = 'match:' + cycle.match + ' ' + cycle.success;
      var secondary = 'time: ' + cycleTime + 's';
      var tertiary = cycle.phase + ' on ' + cycle.score + ' at ' + cycle.level;
      return _this3.createInfoItem([_this3.getPickupAsset(cycle.pickup), _this3.getGamePieceAsset(cycle.piece), _this3.getScoringAreaAsset(cycle.score)], primary, secondary, tertiary, infoKey++);
    });
  };

  this.createInfoItem = function (assets, primary, secondary, tertiary, key) {
    return [React.createElement(
      ListItem,
      { className: 'pitView-list-item', style: { maxWidth: 400 }, alignItems: 'flex-start', key: key++ },
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

  this.renderHab = function (index) {
    var habs = _this3.state.habs;

    if (habs.length <= index) return;
    var hab = habs[index];
    var habScored = (hab.phase === 'tele' ? 'climb: ' : 'mobility: ') + hab.success + (hab.time ? ': ' + (hab.time / 1000).toFixed(2) : '');
    return _this3.createInfoItem([], 'Level ' + hab.level, hab.phase, habScored, 0);
  };

  this.renderMatches = function () {
    var data = _this3.state.data;

    data.sort(function (a, b) {
      return a.id - b.id;
    });
    var infoKey = 0;
  };
};

var teamRow = function (_React$Component2) {
  _inherits(teamRow, _React$Component2);

  function teamRow(props) {
    _classCallCheck(this, teamRow);

    return _possibleConstructorReturn(this, (teamRow.__proto__ || Object.getPrototypeOf(teamRow)).call(this, props));
  }

  _createClass(teamRow, [{
    key: 'render',
    value: function (_render) {
      function render() {
        return _render.apply(this, arguments);
      }

      render.toString = function () {
        return _render.toString();
      };

      return render;
    }(function () {
      render(React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          team.team
        ),
        React.createElement(
          'td',
          null,
          team.matches
        ),
        React.createElement(
          'td',
          null,
          team.ssLevel
        ),
        React.createElement(
          'td',
          null,
          team.ssHatch
        ),
        React.createElement(
          'td',
          null,
          team.ssCargo
        ),
        React.createElement(
          'td',
          null,
          team.shipHatch
        ),
        React.createElement(
          'td',
          null,
          team.rocketHatch
        ),
        React.createElement(
          'td',
          null,
          team.shipCargo
        ),
        React.createElement(
          'td',
          null,
          team.rocketCargo
        ),
        React.createElement(
          'td',
          null,
          team.defense
        ),
        React.createElement(
          'td',
          null,
          team.hab
        )
      ));
    })
  }]);

  return teamRow;
}(React.Component);

var App = TeamView;