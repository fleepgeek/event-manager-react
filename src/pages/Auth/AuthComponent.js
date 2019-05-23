import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import AuthForm from "./AuthForm";

const AuthComponent = props => {
	const { from } = props.location.state || { from: { pathname: "/" } };
	return (
		<>
			{props.isAuthenticated && <Redirect to={from} />}
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

export default withRouter(AuthComponent);
