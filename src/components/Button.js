import styled, { css } from "styled-components";

const Button = styled.button`
	/* background: transparent; */
	/* background: ${({ theme }) => theme.colors.lightGrey}; */
	background-color: #eff3f6;
	background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
	border: ${props => (props.hasBorder ? "1px solid rgba(27,31,35,.2)" : "none")};
	/* border: none; */
	color: ${({ theme }) => theme.colors.primary};
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
			color: white;
		`}
	${props =>
		props.secondary &&
		css`
			background: ${props.theme.colors.secondary};
			color: white;
		`}
`;

export default Button;
