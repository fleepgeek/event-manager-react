import styled, { css } from "styled-components";

const Button = styled.button`
	background: transparent;
	border: none;
	color: white;
	outline: none;
	cursor: pointer;
	padding: 10px 20px;
	border-radius: 4px;
	width: ${props => (props.full ? "100%" : "auto")};
	&:disabled {
		cursor: not-allowed;
		color: #888888;
	}
	${props =>
		props.primary &&
		css`
			background: ${props.theme.colors.primary};
		`}
	${props =>
		props.secondary &&
		css`
			background: ${props.theme.colors.secondary};
		`}
`;

export default Button;
