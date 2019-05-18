import styled from "styled-components";

const Avatar = styled.img.attrs(props => ({
	alt: props.alt || "avatar"
}))`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

export default Avatar;
