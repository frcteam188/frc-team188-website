'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: !liked }) },
      'Like'
    );
  }
}
window.onload = function(){
    const domContainer = document.querySelector('#scouting_app');
    ReactDOM.render(e(LikeButton), domContainer);
}