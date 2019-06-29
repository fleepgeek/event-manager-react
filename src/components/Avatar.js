import styled from "styled-components";
import avatar from "./avatar.jpg";

const Avatar = styled.img.attrs(props => ({
	alt: props.alt || "avatar",
	src: props.src || avatar
}))`
	width: ${props => props.width || "50px"};
	height: ${props => props.height || "50px"};
	border-radius: 50%;
`;

export default Avatar;
