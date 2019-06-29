import styled from "styled-components";

const Backdrop = styled.div`
	display: ${({ show }) => (show ? "block" : "none")} !important;
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
`;

export default Backdrop;
