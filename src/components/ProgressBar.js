import React from "react";
import styled, { keyframes } from "styled-components";
import { lighten } from "polished";

const indeterminate = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
`;

const indeterminateShort = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
`;

const Bar = styled.div`
	/* position: relative; */
	position: absolute;
	height: 4px;
	display: block;
	width: 100%;
	background-color: ${({ theme }) => lighten(0.3, theme.colors.secondary)};
	border-radius: 2px;
	background-clip: padding-box;
	/* margin: 0.5rem 0 1rem 0; */
	overflow: hidden;
	.determinate {
		position: absolute;
		background-color: inherit;
		top: 0;
		bottom: 0;
		background-color: #26a69a;
		transition: width 0.3s linear;
	}
	.indeterminate {
		background-color: ${({ theme }) => theme.colors.secondary};
		:before {
			content: "";
			position: absolute;
			background-color: inherit;
			top: 0;
			left: 0;
			bottom: 0;
			will-change: left, right;
			animation: ${indeterminate} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
				infinite;
		}
		:after {
			content: "";
			position: absolute;
			background-color: inherit;
			top: 0;
			left: 0;
			bottom: 0;
			will-change: left, right;
			animation: ${indeterminateShort} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
				infinite;
			animation-delay: 1.15s;
		}
	}
`;

const ProgressBar = () => {
	return (
		<Bar>
			<div className="indeterminate" />
		</Bar>
	);
};

export default ProgressBar;
