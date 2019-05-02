import React from "react";
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
	return (
		<div className="form">
			<Formik
				initialValues={{
					username: "",
					email: "",
					password: "",
					password2: ""
				}}
				validationSchema={props.isLogin ? LoginSchema : RegSchema}
				onSubmit={values => {
					// console.log(values);
					let val = values;
					if (props.isLogin) {
						val = {
							username: values.username,
							password: values.password
						};
					}
					console.log(val);
					let payload = {
						formData: val,
						isLogin: props.isLogin
					};
					props.onAuth(payload);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="input-group">
							<Field name="username" type="text" placeholder="Username" />
							<ErrorMessage name="username" component="div" />
						</div>

						{!props.isLogin && (
							<div className="input-group">
								<Field name="email" type="email" placeholder="Email" />
								<ErrorMessage name="email" component="div" />
							</div>
						)}

						<div className="input-group">
							<Field name="password" type="password" placeholder="Password" />
							<ErrorMessage name="password" component="div" />
						</div>

						{!props.isLogin && (
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
						<button type="submit">{props.isLogin ? "Login" : "Sign Up"}</button>
					</Form>
				)}
			</Formik>
			<p className="auth-toggle" onClick={props.onToggleLogin}>
				{!props.isLogin && <span>Already have an account?</span>}{" "}
				{props.isLogin ? "Or Sign Up" : "Login"}
			</p>
			{props.error && <h3>{props.error}</h3>}
		</div>
	);
};

export default AuthForm;
