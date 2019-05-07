import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import AuthComponent from "./AuthComponent";
import { authActions, authSelectors } from "../../state/auth/";

const mapStateToProps = createStructuredSelector({
	error: authSelectors.getError,
	isAuthenticated: authSelectors.getIsAuthenticated,
	authRedirectPath: authSelectors.getAuthRedirectPath
});

const mapDispatchToProps = dispatch => ({
	onAuth: (formData, isLogin) => dispatch(authActions.auth(formData, isLogin))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthComponent);
