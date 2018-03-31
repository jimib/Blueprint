import React, { Component } from 'react';
import { View, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getWidth, getHeight } from '../utils';
import * as Actions from '../actions/LoginActions';

const picLogo = require('../../src/images/pp_splashLogo.png');

const styles = {
  logoContainer: {
    alignSelf: 'center',
  },
  imageStyle: {
    height: getHeight * 0.4,
    width: getWidth * 0.4,
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1c2d',
    flexDirection: 'column',
    flex: 1,
  },
};

class ${PAGE_NAME} extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    Actions.verifyUser(navigation);
  }
  componentWillUnmount() {
    clearInterval(this.splashTimer);
    Linking.removeEventListener('url', Linking.getInitialURL);
  }


  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="center"
            style={styles.imageStyle}
            source={picLogo}
          />
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(${PAGE_NAME});
