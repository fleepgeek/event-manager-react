import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as authActions from "../../state/auth";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username must be more than 5 characters")
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

class Auth extends Component {
  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            password2: ""
          }}
          validationSchema={this.props.isLogin ? LoginSchema : RegSchema}
          onSubmit={values => {
            // console.log(values);
            let val = values;
            if (this.props.isLogin) {
              val = {
                username: values.username,
                password: values.password
              };
            }
            console.log(val);
            let payload = {
              formData: val,
              isLogin: this.props.isLogin
            };
            this.props.onAuth(payload);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="username" type="text" placeholder="Username" />
              <ErrorMessage name="username" component="div" />
              {!this.props.isLogin && (
                <>
                  <Field name="email" type="email" placeholder="Email" />
                  <ErrorMessage name="email" component="div" />
                </>
              )}

              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />

              {!this.props.isLogin && (
                <>
                  <Field
                    name="password2"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage name="password2" component="div" />
                </>
              )}

              <button type="submit" disabled={isSubmitting}>
                {this.props.isLogin ? "Login" : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
        <button
          onClick={this.props.onToggleLogin}
        >
          Or {this.props.isLogin ? "Sign Up" : "Login"}
        </button>
        {this.props.error && <h3>{this.props.error}</h3>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  isLogin: state.auth.isLogin
});

const mapDispatchToProps = dispatch => ({
  onAuth: payload => dispatch(authActions.auth(payload)),
  onToggleLogin: () => dispatch(authActions.toggleLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
