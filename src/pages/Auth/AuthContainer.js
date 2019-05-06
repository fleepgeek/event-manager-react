import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as authActions from "../../state/auth/actions";
import AuthComponent from "./AuthComponent";
import * as authSelectors from "../../state/auth/selectors";

const mapStateToProps = state => ({
	error: authSelectors.getError(state),
	isLogin: authSelectors.getIsLogin(state),
	isAuthenticated: authSelectors.getIsAuthenticated(state),
	authRedirectPath: authSelectors.getAuthRedirectPath(state)
});
// const mapStateToProps = createStructuredSelector({
// 	error: authSelectors.getError(),
// 	isLogin: authSelectors.getIsLogin(),
// 	isAuthenticated: authSelectors.getIsAuthenticated(),
// 	authRedirectPath: authSelectors.getAuthRedirectPath()
// });

const mapDispatchToProps = dispatch => ({
	onAuth: formData => dispatch(authActions.auth(formData)),
	onToggleLogin: () => dispatch(authActions.toggleLogin())
	// onLogout: () => dispatch(authActions.logout())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthComponent);
