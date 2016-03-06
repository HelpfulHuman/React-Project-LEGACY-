import { connect } from 'react-redux';
import Login from '../Components/Login';
import { attemptLogin } from '../Actions/Auth';

function mapStateToProps (state) {
  return {
    isLoading: state.auth.loading
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onLogin: (email, pass) => dispatch(attemptLogin(email, pass))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
