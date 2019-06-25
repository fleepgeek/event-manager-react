import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Backdrop } from "./";

// const ModalContent = styled.div`
const Wrapper = styled.div`
	z-index: 20 !important;
	position: absolute;
	max-width: 992px;
	top: 15%;
	left: 15%;
	right: 15%;
	margin: 0 auto !important;
	display: ${({ isModalOpen }) => (isModalOpen ? "block" : "none")} !important;
	background: #fff;
	padding: 2rem 0.5rem;
	border-radius: 5px;
	@media screen and (max-width: 992px) {
		left: 5%;
		right: 5%;
		padding-bottom: 1rem;
	}
`;

const modalRoot = document.getElementById("modal-root");

const Modal = ({ children, isModalOpen, closeModal }) => {
	return ReactDOM.createPortal(
		<>
			<Backdrop show={isModalOpen} onClick={() => closeModal()} />
			{/* <Backdrop show={isModalOpen} onClick={() => !isModalOpen} /> */}
			<Wrapper isModalOpen={isModalOpen}>{children}</Wrapper>
		</>,
		modalRoot
	);
};

Modal.defaultProps = {
	closeModal: () => {}
};

export default Modal;
