import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Backdrop } from "./";

// const ModalContent = styled.div`
const Wrapper = styled.div`
	z-index: 20 !important;
	position: absolute;
	max-width: 992px;
	top: 10%;
	left: 15%;
	right: 15%;
	margin: 0 auto 1rem auto !important;
	display: ${({ isModalOpen }) => (isModalOpen ? "block" : "none")} !important;
	background: #fff;
	padding: 1rem 0.5rem;
	border-radius: 5px;
	@media screen and (max-width: 992px) {
		left: 5%;
		right: 5%;
		padding-bottom: 1rem;
	}
`;

const Modal = ({ children, isModalOpen, closeModal, clickableBackdrop }) => {
	const modalRoot = document.getElementById("modal-root");
	React.useEffect(() => {
		const escapePressed = e => {
			if (e.keyCode === 27) closeModal();
		};
		document.addEventListener("keydown", escapePressed);
		return () => {
			document.removeEventListener("keydown", escapePressed);
		};
	}, [closeModal]);

	return ReactDOM.createPortal(
		<div data-testid="modal">
			{clickableBackdrop ? (
				<Backdrop show={isModalOpen} onClick={() => closeModal()} />
			) : (
				<Backdrop show={isModalOpen} onClick={() => null} />
			)}
			<Wrapper isModalOpen={isModalOpen}>{children}</Wrapper>
		</div>,
		modalRoot
	);
};

Modal.defaultProps = {
	closeModal: () => {},
	clickableBackdrop: true
};

export default Modal;
