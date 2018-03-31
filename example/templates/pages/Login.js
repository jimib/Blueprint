import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Linking, Keyboard, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Container, Content } from 'native-base';
import HeaderWithLogo from '../components/common/HeaderWithLogo';
import LoginForm from '../components/LoginForm';
import * as Actions from '../actions/LoginActions';
import { darkGray } from '../themes/colors';
import Footer from '../components/common/Footer';
import { screenKeys } from '../utils';
import NotificationModal from '../components/notificationModal';
import { getPropValue } from '../reducers/Mutators';
import { resetNavigationStack } from '../utils/CommonFunctions';

const styles = {
  cnt: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: darkGray,
  },
  footer: {
    marginTop: 2,
    paddingBottom: 10,
  },
};

class ${PAGE_NAME} extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToRegister = this.navigateToRegister.bind(this);
  }
  componentWillMount() {
    const { navigation } = this.props;
    Linking.addEventListener('url', (data) => {
      const params = data.url.split('/+@ppmobile@')[1];
      if (params) {
        resetNavigationStack(navigation, 'ResetPassword', params);
      }
    });
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', Linking.addEventListener);
  }

  handleSubmit(values) {
    const { actions, navigation } = this.props;
    actions.logMeIn(values, navigation);
  }

  handleForgotPassword() {
    const { navigation } = this.props;
    navigation.navigate(screenKeys.ForgotPassword);
  }

  navigateToRegister() {
    const { navigation, actions } = this.props;
    actions.setTermsAccepted(false);
    navigation.navigate(screenKeys.Register);
  }

  render() {
    const { cnt, footer } = styles;
    const {
      actions, isLoading, loginError, navigation,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container style={cnt}>
          <StatusBar hidden />
          <Content>
            <HeaderWithLogo title="Login" />
            <LoginForm submit={this.handleSubmit} isLoading={isLoading} />
            <Footer
              text="Not signed up yet?"
              linkText="Register"
              onPress={() => this.navigateToRegister()}
            />
            <Footer
              style={footer}
              linkText="Forgot password"
              onPress={() => this.handleForgotPassword()}
            />
            <NotificationModal
              onClick={() => actions.modalProps('')}
              isVisible={loginError !== ''}
              errorMessage={this.props.loginError}
            />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

const mapStateToProps = (state) => {
  const loggedUser = getPropValue(state, 'login', 'loggedUser');
  const loginError = getPropValue(state, 'login', 'loginError');
  const isLoading = getPropValue(state, 'login', 'isLoading');
  return {
    loggedUser,
    loginError,
    isLoading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(${PAGE_NAME});
