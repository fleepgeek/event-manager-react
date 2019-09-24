import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "reactstrap";

import { FormWrapper, Button, Input } from "../../components";

const EventSchema = Yup.object().shape({
	title: Yup.string()
		.min(4, "Title must not be less than 4 characters")
		.required("Event Title Required"),
	description: Yup.string()
		.min(20, "Description must not be less than 20 characters")
		.max(400, "Description must not be less than 400 characters")
		.required("Event Description is Required"),
	location: Yup.string().required("Location Required"),
	event_date: Yup.date().required(
		"Please select the date and time of the event"
	)
});

const EventForm = ({
	isEdit,
	id,
	event,
	// closeModal,
	saveEvent,
	categories,
	tags
}) => {
	const defaultValues =
		event && isEdit
			? {
					title: event.title || "",
					description: event.description || "",
					location: event.location || "",
					category: (event.category && event.category.id) || "",
					tags: (event.tags && event.tags.map(t => t.id)) || [],
					event_date: event.event_date || ""
			  }
			: {
					title: "",
					description: "",
					location: "",
					category: "",
					tags: [],
					event_date: ""
			  };

	return (
		<Container>
			<Formik
				initialValues={defaultValues}
				enableReinitialize={true}
				validationSchema={EventSchema}
				onSubmit={values => {
					if (isEdit) {
						saveEvent(values, id);
					} else {
						saveEvent(values);
					}
				}}
			>
				{({ isSubmitting }) => (
					<FormWrapper title={!isEdit ? "Create Event" : "Edit Event"}>
						<Form>
							<Row>
								<Col md={{ size: 7 }}>
									<Input name="title" placeholder="Title" />
									{categories && (
										<Input
											name="category"
											component="select"
											items={categories}
										/>
									)}
									<Input
										name="description"
										component="textarea"
										placeholder="Description here"
										style={{ height: "81px" }}
									/>
									<Input
										name="event_date"
										labelText="Event Date and Time"
										type="datetime-local"
									/>
									<Input name="location" placeholder="Venue" />
								</Col>
								<Col>
									<Input name="tags" component="select" items={tags} multiple />
									<Button type="submit" className="mr-4" secondary>
										Save Event
									</Button>
									{/* {closeModal && (
										<Button onClick={() => closeModal()}>Cancel</Button>
									)} */}
								</Col>
							</Row>
						</Form>
					</FormWrapper>
				)}
			</Formik>
		</Container>
	);
};

export default EventForm;
// export default React.memo(EventForm);
