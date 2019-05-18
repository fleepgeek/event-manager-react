import React from "react";
import styled from "styled-components";

const FormComponent = styled.div`
	h1 {
		font-size: 28px;
		font-weight: 400;
		margin-bottom: 20px;
	}
	form {
		display: flex;
		flex-direction: column;
	}
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
