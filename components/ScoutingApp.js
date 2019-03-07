'use strict';

const e = React.createElement;

class ScoutingApp extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {'matchNumber': this.props.matchNumber, 'station': this.props.station};
  }

  render() {
   return <h1>Scouting 2019: {this.state.matchNumber}, {this.state.station}</h1>
  }
}