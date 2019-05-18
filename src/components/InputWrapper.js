import styled from "styled-components";

const InputWrapper = styled.div`
	margin-bottom: 15px;
	input {
		border: 1px solid ${({ theme }) => theme.colors.lightGrey};
		width: 100%;
		padding: 10px;
		border-radius: 2px;
	}
	div {
		color: red;
		font-size: 12px;
	}
`;

export default InputWrapper;
