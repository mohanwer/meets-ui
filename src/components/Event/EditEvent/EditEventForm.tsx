import React from 'react'
import { FormikErrors, Formik, FormikProps } from 'formik';
import { Event } from '../../../services/apollo/interfaces'
import { EventValues, EventData } from '../CreateEvent/interfaces';
import { EventFormFields } from '../CreateEvent/CreateEventForm';

export interface EditEventFormProps  {
  initialValues: Event
  onSubmit: (eventInfo: EventData) => Promise<any>
}

export const EditEventForm = ({initialValues, onSubmit}: EditEventFormProps) => {
  const {address} = initialValues;
  const formInitialValues: EventValues = {
    name: initialValues.name,
    briefDescription: initialValues.briefDescription,
    longDescription: initialValues.longDescription,
    address1: address.addr1,
    address2: address.addr2,
    city: address.city,
    state: address.state,
    postal: address.postal,
    country: address.country
  }
  return (
    <Formik
      initialValues={formInitialValues}
      enableReinitialize
      onSubmit={async values => {
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
            country: values.country || 'USA'
          }
        }
        await onSubmit(formValues)
      }}
      validate={values => {
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
      }}
    >
      {(props: FormikProps<EventValues>) => (
        <EventFormFields 
          {...props}
        />
      )}
    </Formik>
  )
}