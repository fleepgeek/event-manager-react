import { connect } from "react-redux";
import { actions as authActions } from "../../state/auth";
import AuthComponent from "./AuthComponent";

const mapStateToProps = state => ({
  error: state.auth.error,
  isLogin: state.auth.isLogin,
  isAuthenticated: state.auth.token,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: payload => dispatch(authActions.auth(payload)),
  onToggleLogin: () => dispatch(authActions.toggleLogin())
  // onLogout: () => dispatch(authActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent);
