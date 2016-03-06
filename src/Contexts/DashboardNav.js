import { connect } from 'react-redux';
import DashboardNav from '../Components/DashboardNav';

function mapStateToProps (state) {
  return {
    displayName: state.auth.email
  };
}

function mapDispatchToProps (dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNav);
