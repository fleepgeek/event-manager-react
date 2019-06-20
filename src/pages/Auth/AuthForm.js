import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { StyledForm, Button, Input } from "../../components";

const LoginSchema = Yup.object().shape({
	username: Yup.string()
		.min(4, "Username must not be less than 4 characters")
		.required("Username Required"),
	password: Yup.string()
		.min(8, "Password must not be less than 8 characters")
		.required("Password Required")
});

const RegSchema = Yup.object().shape({
	username: Yup.string()
		.min(4, "Username must be more than 5 characters")
		.required("Username Required"),
	email: Yup.string()
		.email("E-mail is not valid!")
		.required("E-mail is required!"),
	password2: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
	password: Yup.string()
		.min(8, "Password must not be less than 8 characters")
		.required("Password Required")
});

const AuthToggle = styled.button`
	margin-top: 16px;
	cursor: pointer;
	font-size: 14px;
	background-color: transparent;
	&:hover {
		color: ${props => props.theme.colors.secondary};
	}
`;

const AuthForm = props => {
	const [isLogin, setIsLogin] = useState(true);
	return (
		<>
			<StyledForm title={isLogin ? "Login" : "Sign Up"}>
				<Formik
					initialValues={{
						username: "",
						email: "",
						password: "",
						password2: ""
					}}
					validationSchema={isLogin ? LoginSchema : RegSchema}
					onSubmit={values => {
						// console.log(values);
						let formData = values;
						if (isLogin) {
							formData = {
								username: values.username,
								password: values.password
							};
						}
						props.onAuth(formData, isLogin);
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<Input name="username" type="text" placeholder="Username" />
							{!isLogin && (
								<Input name="email" type="email" placeholder="Email" />
							)}
							<Input name="password" type="password" placeholder="Password" />
							{!isLogin && (
								<Input
									name="password2"
									type="password"
									placeholder="Confirm Password"
									labelText="Re-Type Password"
								/>
							)}
							{/* <button type="submit" disabled={isSubmitting}> */}
							<Button type="submit" secondary>
								{isLogin ? "Login" : "Sign Up"}
							</Button>
						</Form>
					)}
				</Formik>
				<AuthToggle onClick={() => setIsLogin(!isLogin)}>
					{!isLogin && <span>Already have an account?</span>}{" "}
					{isLogin ? "Or Sign Up" : "Login"}
				</AuthToggle>
				{props.message && <h3>{props.message}</h3>}
			</StyledForm>
		</>
	);
};

export default AuthForm;
