import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AuthForm.scss";

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

const AuthForm = props => {
	const [isLogin, setIsLogin] = useState(true);
	return (
		<>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<div className="form">
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
							<div className="input-group">
								<Field name="username" type="text" placeholder="Username" />
								<ErrorMessage name="username" component="div" />
							</div>

							{!isLogin && (
								<div className="input-group">
									<Field name="email" type="email" placeholder="Email" />
									<ErrorMessage name="email" component="div" />
								</div>
							)}

							<div className="input-group">
								<Field name="password" type="password" placeholder="Password" />
								<ErrorMessage name="password" component="div" />
							</div>

							{!isLogin && (
								<div className="input-group">
									<Field
										name="password2"
										type="password"
										placeholder="Confirm Password"
									/>
									<ErrorMessage name="password2" component="div" />
								</div>
							)}

							{/* <button type="submit" disabled={isSubmitting}> */}
							<button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
						</Form>
					)}
				</Formik>
				<p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
					{!isLogin && <span>Already have an account?</span>}{" "}
					{isLogin ? "Or Sign Up" : "Login"}
				</p>
				{props.error && <h3>{props.error}</h3>}
			</div>
		</>
	);
};

export default AuthForm;
