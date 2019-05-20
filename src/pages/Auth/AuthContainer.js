import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import AuthComponent from "./AuthComponent";
import { authActions, authSelectors } from "../../state/auth/";
import { globalSelectors } from "../../state/global";

const mapStateToProps = createStructuredSelector({
	message: globalSelectors.getMessage,
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
