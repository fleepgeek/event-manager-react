import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { FormWrapper, Button, Input } from "../../components";

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
	password: Yup.string()
		.min(8, "Password must not be less than 8 characters")
		.required("Password Required"),
	password2: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Please confirm your password")
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

const Content = ({
	isValid,
	resetForm,
	isLoading,
	isRegistered,
	isLogin,
	setIsLogin,
	message
}) => {
	useEffect(() => {
		if (isRegistered) {
			setIsLogin(true);
			resetForm();
		}
	}, [isRegistered, resetForm, setIsLogin]);
	return (
		<FormWrapper title={isLogin ? "Login" : "Sign Up"}>
			<Form role="form">
				<Input name="username" type="text" placeholder="Username" />
				{!isLogin && <Input name="email" type="email" placeholder="Email" />}
				<Input name="password" type="password" placeholder="Password" />
				{!isLogin && (
					<Input
						name="password2"
						type="password"
						placeholder="Confirm Password"
						labelText="Re-Type Password"
					/>
				)}
				<Button
					type="submit"
					secondary
					disabled={isLoading || !isValid}
					data-testid="submit-button"
				>
					{isLogin ? "Login" : "Sign Up"}
				</Button>{" "}
			</Form>
			<AuthToggle
				onClick={() => setIsLogin(!isLogin)}
				data-testid="auth-toggle"
			>
				{!isLogin && <span>Already have an account?</span>}{" "}
				{isLogin ? "Or Sign Up" : "Login"}
			</AuthToggle>
			{message && <h5>Error Occured: {message}</h5>}
		</FormWrapper>
	);
};

const AuthForm = ({ onAuth, message, isLoading, isRegistered }) => {
	const [isLogin, setIsLogin] = useState(true);
	return (
		<>
			<Formik
				initialValues={{
					username: "",
					email: "",
					password: "",
					password2: ""
				}}
				validationSchema={isLogin ? LoginSchema : RegSchema}
				onSubmit={(values, { resetForm, submitForm }) => {
					let formData = values;
					if (isLogin) {
						formData = {
							username: values.username,
							password: values.password
						};
					}
					onAuth(formData, isLogin);
				}}
			>
				{props => (
					<Content
						{...props}
						isLogin={isLogin}
						setIsLogin={setIsLogin}
						isLoading={isLoading}
						isRegistered={isRegistered}
						message={message}
					/>
				)}
			</Formik>
		</>
	);
};

export default AuthForm;
