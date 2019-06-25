import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container } from "reactstrap";

import { StyledForm, Button, Input } from "../../components";

const EventSchema = Yup.object().shape({
	title: Yup.string()
		.min(4, "Title must not be less than 4 characters")
		.required("Event Title Required"),
	description: Yup.string()
		.min(20, "Description must not be less than 20 characters")
		.max(400, "Description must not be less than 400 characters")
		.required("Event Description is Required"),
	location: Yup.string().required("Location Required")
});

const EventForm = ({ closeModal, message, saveEvent }) => {
	return (
		<Container>
			<StyledForm title="Create Event">
				<Formik
					initialValues={{
						title: "",
						description: "",
						location: "",
						category: 2,
						tags: [1, 2],
						event_date: "2019-09-12T01:30:00"
					}}
					validationSchema={EventSchema}
					onSubmit={values => {
						saveEvent(values);
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<Input name="title" type="text" placeholder="Title" />
							{/* <Input
								name="category"
								component="select"
								items={[{ id: 1, name: "Music" }, { id: 2, name: "Sport" }]}
							/> */}
							<Input
								name="description"
								component="textarea"
								placeholder="Description here"
							/>
							<Input name="location" type="text" placeholder="Venue" />
							<Button type="submit" className="mr-4" secondary>
								Create Event
							</Button>
							{closeModal && (
								<Button onClick={() => closeModal()}>Cancel</Button>
							)}
						</Form>
					)}
				</Formik>
				{message && <h3>{message}</h3>}
			</StyledForm>
		</Container>
	);
};

export default EventForm;
