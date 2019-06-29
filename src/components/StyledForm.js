import React from "react";
import styled from "styled-components";

const FormComponent = styled.div`
	margin-top: 2rem;
	h1 {
		font-size: 28px;
		font-weight: 600;
		text-transform: uppercase;
		margin-bottom: 20px;
	}
	/* form {
		display: flex;
		flex-direction: column;
	} */
`;

const StyledForm = ({ title, children }) => {
	return (
		<FormComponent>
			{title && <h1>{title}</h1>}
			{children}
		</FormComponent>
	);
};

export default StyledForm;
