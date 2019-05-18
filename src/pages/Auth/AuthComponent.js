import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import AuthForm from "./AuthForm";

const AuthComponent = props => {
	return (
		<>
			{props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
			<Container style={{ marginTop: "40px" }}>
				<Row>
					<Col
						sm={{ size: 8, offset: 2 }}
						md={{ size: 6, offset: 3 }}
						lg={{ size: 4, offset: 4 }}
					>
						<AuthForm {...props} />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default AuthComponent;
