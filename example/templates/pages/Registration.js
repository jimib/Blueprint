import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Content } from 'native-base';
import RegistrationForm from '../components/RegistrationForm';
import HeaderWithLogo from '../components/common/HeaderWithLogo';
import * as Actions from '../actions/RegisterActions';
import { darkGray } from '../themes/colors';
import Footer from '../components/common/Footer';
import NotificationModal from '../components/notificationModal';
import { getPropValue } from '../reducers/Mutators';
import { screenKeys } from '../utils';

const styles = {
  cnt: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: darkGray,
  },
};

class ${PAGE_NAME} extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToTnCs = this.navigateToTnCs.bind(this);
    this.onCheckboxChecked = this.onCheckboxChecked.bind(this);
  }

  onCheckboxChecked() {
    const { actions, isTermAccepted } = this.props;
    actions.setTermAccepted(!isTermAccepted);
  }

  handleSubmit(values) {
    const { actions, navigation } = this.props;
    values.Name = 'mob-user';
    values.Title = 1;
    values.ConfirmEmail = values.Email;
    actions.register(values, navigation);
  }

  navigateToTnCs() {
    const { navigation } = this.props;
    navigation.navigate(screenKeys.Terms);
  }

  render() {
    const {
      actions, isLoading, navigation, isTermAccepted,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container style={styles.cnt}>
          <StatusBar hidden />
          <Content>
            <HeaderWithLogo title="Register" />
            <RegistrationForm
              submit={this.handleSubmit}
              isRegLoading={isLoading}
              onTermsPress={this.navigateToTnCs}
              isTermAccepted={isTermAccepted}
              onCheckboxChecked={this.onCheckboxChecked}
            />
            <Footer
              text="Already registered?"
              linkText="Login"
              onPress={() => navigation.navigate('Login')}
            />
            <NotificationModal
              onClick={() => actions.modalProps('')}
              isVisible={this.props.RegistrationError !== ''}
              errorMessage={this.props.RegistrationError}
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
  const RegistrationError = getPropValue(state, 'registration', 'RegistrationError');
  const isLoading = getPropValue(state, 'registration', 'isLoading');
  const isTermAccepted = getPropValue(state, 'registration', 'isTermAccepted');
  return { RegistrationError, isLoading, isTermAccepted };
};

export default connect(mapStateToProps, mapDispatchToProps)(${PAGE_NAME});
