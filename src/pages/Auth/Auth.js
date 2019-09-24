import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Container, Row, Col } from "reactstrap";
import { authActions, authSelectors } from "../../state/auth";
import { globalSelectors } from "../../state/global";

import AuthForm from "./AuthForm";
// const AuthForm = React.lazy(() => import("./AuthForm"));

const Auth = ({
	location,
	isAuthenticated,
	isRegistered,
	onAuth,
	message,
	isLoading
}) => {
	const { from } = location.state || { from: { pathname: "/" } };
	return (
		<>
			{isAuthenticated && <Redirect to={from} />}
			<Container>
				<Row>
					<Col
						sm={{ size: 8, offset: 2 }}
						md={{ size: 6, offset: 3 }}
						lg={{ size: 4, offset: 4 }}
					>
						{isRegistered && (
							<h5 data-testid="reg-success">
								Registration Successful. Please Login{" "}
							</h5>
						)}
						{/* <React.Suspense fallback={<h3>Loading...</h3>}> */}
						<AuthForm
							onAuth={onAuth}
							message={message}
							isLoading={isLoading}
							isRegistered={isRegistered}
						/>
						{/* </React.Suspense> */}
					</Col>
				</Row>
			</Container>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	message: globalSelectors.getMessage,
	isLoading: globalSelectors.getLoading,
	isAuthenticated: authSelectors.getIsAuthenticated,
	isRegistered: authSelectors.getIsRegistered,
	authRedirectPath: authSelectors.getAuthRedirectPath
});

const mapDispatchToProps = dispatch => ({
	onAuth: (formData, isLogin) => dispatch(authActions.auth(formData, isLogin))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
