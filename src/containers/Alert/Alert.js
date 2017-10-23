import React, { Component } from 'react';
import styles from '../../styles/Alert.scss';
import animation from '../../styles/Animation.scss';
import cx from 'classnames';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closing: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible && !nextProps.visible) {
      // visible props is changing from true -> false
      this.setState({
        closing: true,
      });

      // 1 sec after
      setTimeout(() => {
        this.setState({
          closing: false,
        });
      }, 1000);
    }
  }

  render() {
    const { closing } = this.state;
    const { message, visible } = this.props;

    if (!visible && !closing) return null;

    return (
      <div className={cx(styles.AlertWrapper)}>
        <div
          className={cx(
            styles.Alert,
            animation.animated,
            `${closing ? animation.bounceOut : animation.bounceIn}`
          )}
        >
          {message}
        </div>
      </div>
    );
  }
}

export default Alert;
