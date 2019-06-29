import React from "react";
import { Container } from "reactstrap";
import styled from "styled-components";
import { Button, Divider } from "../../components";

const Action = styled.div`
	margin: 3rem 0;
	h3 {
		/* border-bottom: 1px solid rgba(27, 31, 35, 0.2); */
	}
	p {
		margin: 1rem auto;
	}
`;

const Account = () => {
	return (
		<Container>
			<Action>
				<h3>Change Username</h3>
				<Divider />
				<p>Changing your username may have some side effects</p>
				<Button hasBorder>Change Username</Button>
			</Action>
			<Action>
				<h3>Change Password</h3>
				<Divider />
				<p>Click the button to update your password</p>
				<Button hasBorder>Change Password</Button>
			</Action>
		</Container>
	);
};

export default Account;
