import React from 'react'
import { withFormik, FormikErrors } from 'formik'
import { Event } from '../../../services/apollo/interfaces'
import { EventValues, EventData } from '../CreateEvent/interfaces';
import { EventFormFields } from '../CreateEvent/CreateEventForm';

export interface EditEventFormProps  {
  initialValues: Event
  onSubmit: (eventInfo: EventData) => Promise<any>
}

export const EditEventForm = ({initialValues, onSubmit}: EditEventFormProps) => {
  const EditForm = withFormik<Event, EventValues>({
    handleSubmit: async values => {
      const formValues: EventData = {
        name: values.name,
        briefDescription: values.briefDescription,
        longDescription: values.longDescription,
        eventDate: new Date(),
        address: {
          addr1: values.address1,
          addr2: values.address2,
          city: values.city,
          state: values.state,
          postal: values.postal,
          country: 'USA' // Defaulting to USA for now.
        }
      }
      await onSubmit(formValues)
    },
    validate: (values) => {
      let errors: FormikErrors<EventValues> = {};
      if (!values.name)
        errors.name = 'Required';
      if (!values.longDescription)
        errors.longDescription = 'Required';
      if (!values.briefDescription)
        errors.briefDescription = 'Required';
      if (!values.address1)
        errors.address1 = 'Required'
      return errors;
    },
    mapPropsToValues: props => {
      return {
        name: props.name,
        briefDescription: props.briefDescription,
        longDescription: props.longDescription,
        address1: props.address.addr1,
        address2: props.address.addr2,
        city: props.address.city,
        state: props.address.state,
        postal: props.address.postal,
      }
    }
  })(EventFormFields)

  return <EditForm {...initialValues}/>
}