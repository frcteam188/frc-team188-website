'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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


var PickupAsset = { floor: '/assets/pictures/floor.png', hp: '/assets/pictures/human.png', preload: '/assets/pictures/preload.png' };
var GamePieceAsset = { none: '/assets/pictures/no_game_piece.jpg', hatch: '/assets/pictures/hatch.jpg', cargo: '/assets/pictures/cargo.jpg' };
var ScoringAreaAsset = { rocket_ship: '/assets/pictures/rocket_ship.jpg', cargo_ship: '/assets/pictures/cargo_ship.jpg', sandstorm: '/assets/pictures/sandstorm.jpeg' };

var PitStrat = function (_React$Component) {
  _inherits(PitStrat, _React$Component);

  function PitStrat(props) {
    _classCallCheck(this, PitStrat);

    var _this = _possibleConstructorReturn(this, (PitStrat.__proto__ || Object.getPrototypeOf(PitStrat)).call(this, props));

    _this.tabClicked = function (event, tabPosition) {
      if (tabPosition == 3 && _this.state.matchPhase !== 'tele') {
        var _this$state = _this.state,
            cycle = _this$state.cycle,
            hab = _this$state.hab,
            habs = _this$state.habs;

        _this.setState({
          matchPhase: 'tele',
          cycle: Object.assign({}, cycle, { matchPhase: 'tele', timer: _this.getCurrTime() }),
          hab: new Hab(_this.props.teamNumber, _this.props.matchNumber, 'tele')
        });
        if (habs.length == 0) {
          hab.success = 'none';
          hab.time = undefined;
          hab.timer = undefined;
          _this.setState({ habs: [hab] });
        }
      }
      _this.setState({ tabPosition: tabPosition });
    };

    _this.renderRows = function () {
      var data = _this.state.data;

      var stations = ['r1', 'r2', 'r3', 'b1', 'b2', 'b3'];
      return stations.map(function (station) {
        var team = data[station];
        return React.createElement(
          'tr',
          { key: team.team },
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
        );
      });
    };

    var matchNumber = _this.props.matchNumber;
    // console.log(props)

    _this.state = {
      appBarHeight: 50,
      scoutingSize: 475,
      tabPosition: 0,
      matchNumber: matchNumber,
      color: 'red',
      data: {
        r1: {
          team: 188,
          matches: 2,
          ssLevel: 1,
          ssHatch: 1,
          ssCargo: 1,
          rocketHatch: 1,
          rocketCargo: 2,
          shipHatch: 1,
          shipCargo: 2,
          defense: '-',
          hab: 3
        },
        r2: {
          team: 610,
          matches: 2,
          ssLevel: 2,
          ssHatch: 0,
          ssCargo: 1,
          rocketHatch: 3,
          rocketCargo: 2,
          shipHatch: 5,
          shipCargo: 2,
          defense: '-',
          hab: 3
        },
        r3: {
          team: 7885,
          matches: 2,
          ssLevel: 1,
          ssHatch: 1,
          ssCargo: 0,
          rocketHatch: 0,
          rocketCargo: 2,
          shipHatch: 0,
          shipCargo: 2,
          defense: 0,
          hab: 3
        },
        b1: {
          team: 188,
          matches: 2,
          ssLevel: 1,
          ssHatch: 1,
          ssCargo: 1,
          rocketHatch: 1,
          rocketCargo: 2,
          shipHatch: 1,
          shipCargo: 2,
          defense: '-',
          hab: 3
        },
        b2: {
          team: 610,
          matches: 2,
          ssLevel: 2,
          ssHatch: 0,
          ssCargo: 1,
          rocketHatch: 3,
          rocketCargo: 2,
          shipHatch: 5,
          shipCargo: 2,
          defense: '-',
          hab: 3
        },
        b3: {
          team: 7885,
          matches: 2,
          ssLevel: 1,
          ssHatch: 1,
          ssCargo: 0,
          rocketHatch: 0,
          rocketCargo: 2,
          shipHatch: 0,
          shipCargo: 2,
          defense: 0,
          hab: 3
        }
      }
    };
    return _this;
  }

  _createClass(PitStrat, [{
    key: 'render',
    value: function render() {
      var theme = this.createTheme();
      var _state = this.state,
          appBarHeight = _state.appBarHeight,
          matchNumber = _state.matchNumber,
          tabPosition = _state.tabPosition;

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
            React.createElement(Tab, { label: 'Match: ' + matchNumber }),
            React.createElement(Tab, { label: 'Red' }),
            React.createElement(Tab, { label: 'Blue' })
          )
        ),
        tabPosition === 0 && React.createElement(
          'div',
          { style: { height: 470 } },
          React.createElement(
            'table',
            { id: 'tb', className: 'sortable' },
            React.createElement(
              'thead',
              null,
              React.createElement(
                'tr',
                { style: { maxHeight: appBarHeight } },
                React.createElement(
                  'th',
                  null,
                  'Team'
                ),
                React.createElement(
                  'th',
                  null,
                  'Matches'
                ),
                React.createElement(
                  'th',
                  null,
                  'Mobility'
                ),
                React.createElement(
                  'th',
                  null,
                  React.createElement('img', { className: 'table-icon', src: ScoringAreaAsset.sandstorm }),
                  React.createElement('img', { className: 'table-icon', src: GamePieceAsset.hatch })
                ),
                React.createElement(
                  'th',
                  null,
                  React.createElement('img', { className: 'table-icon', src: ScoringAreaAsset.sandstorm }),
                  React.createElement('img', { className: 'table-icon', src: GamePieceAsset.cargo })
                ),
                React.createElement(
                  'th',
                  null,
                  React.createElement('img', { className: 'table-icon', src: ScoringAreaAsset.cargo_ship }),
                  React.createElement('img', { className: 'table-icon', src: GamePieceAsset.hatch })
                ),
                React.createElement(
                  'th',
                  null,
                  React.createElement('img', { className: 'table-icon', src: ScoringAreaAsset.cargo_ship }),
                  React.createElement('img', { className: 'table-icon', src: GamePieceAsset.cargo })
                ),
                React.createElement(
                  'th',
                  null,
                  React.createElement('img', { className: 'table-icon', src: ScoringAreaAsset.rocket_ship }),
                  React.createElement('img', { className: 'table-icon', src: GamePieceAsset.hatch })
                ),
                React.createElement(
                  'th',
                  null,
                  React.createElement('img', { className: 'table-icon', src: ScoringAreaAsset.rocket_ship }),
                  React.createElement('img', { className: 'table-icon', src: GamePieceAsset.cargo })
                ),
                React.createElement(
                  'th',
                  null,
                  'Cycles'
                ),
                React.createElement(
                  'th',
                  null,
                  'Climb'
                ),
                React.createElement('div', { className: 'clear' })
              )
            ),
            React.createElement(
              'tbody',
              null,
              this.renderRows()
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

  return PitStrat;
}(React.Component);

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

var App = PitStrat;