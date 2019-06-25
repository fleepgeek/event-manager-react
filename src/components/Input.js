import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field, ErrorMessage } from "formik";

const InputWrapper = styled.div`
	margin-bottom: 1rem;
	input,
	textarea,
	select {
		border: 1px solid ${({ theme }) => theme.colors.lightGrey};
		width: 100%;
		padding: 10px;
		border-radius: 2px;
	}
	div {
		color: red;
		font-size: 12px;
		font-weight: 600;
	}
`;

const Label = styled.label`
	font-weight: 600;
	text-transform: uppercase;
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: 0.5rem;
	display: inline-block;
`;

const Input = ({
	name,
	type,
	placeholder,
	component,
	items,
	noLabel,
	labelText,
	...props
}) => {
	let field = (
		<Field
			name={name}
			type={type || "text"}
			component={component || "input"}
			placeholder={placeholder || name}
			{...props}
		/>
	);
	if (component === "select") {
		field = (
			<Field name={name} component="select" {...props}>
				{items.map(item => (
					<option value={item.id} key={item.id}>
						{item.name}
					</option>
				))}
			</Field>
		);
	}
	return (
		<InputWrapper>
			{!noLabel && <Label htmlFor={name}>{labelText || name}</Label>}
			{field}
			<ErrorMessage name={name} component="div" />
		</InputWrapper>
	);
};

Input.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	noLabel: PropTypes.bool,
	labelText: PropTypes.string
};

Input.defaultProps = {
	noLabel: false
};

export default Input;
