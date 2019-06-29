import React from "react";
import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
import { Container, Row, Col } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { StyledForm, Input, Button } from "../../components";
import { userActions } from "../../state/user";

const UserSchema = Yup.object().shape({});

const Profile = ({ profile, onUpdateUser }) => {
	return (
		<Container>
			<StyledForm title="Public Profile">
				{profile && (
					<Formik
						initialValues={profile}
						// enableReinitialize={true}
						validationSchema={UserSchema}
						onSubmit={values => {
							onUpdateUser(values);
						}}
					>
						{() => (
							<Form>
								<Row>
									<Col>
										<Input
											name="display_name"
											labelText="Display Name"
											placeholder="Display Name"
										/>
										<Input name="about" component="textarea" />
									</Col>
									{/* <Col>
									<Input
										name="first_name"
										labelText="First Name"
										placeholder="First Name"
									/>
									<Input
										name="last_name"
										labelText="Last Name"
										placeholder="Last Name"
									/>
									<Input
										name="status"
										labelText="Your Status"
										placeholder="'Lover of things'"
									/>
									<Input
										name="about"
										component="textarea"
										placeholder="About Yourself"
									/>
								</Col>
								<Col>
									<Input name="location" placeholder="Location" />
								</Col> */}
								</Row>
								<Button type="submit" secondary>
									Update Profile
								</Button>
							</Form>
						)}
					</Formik>
				)}
			</StyledForm>
		</Container>
	);
};

// const mapStateToProps = createStructuredSelector({
// 	currentUser: userSelectors.getCurrentUser
// });

export default connect(
	null,
	{
		onUpdateUser: userActions.updateUser
	}
)(Profile);
