import React from 'react'
import {useAuth0} from '../../../../auth/react-auth0-spa'
import {Registration} from '../../../../dataServices/apollo/interfaces'

interface AttendanceBtnProps {
  attendees: Registration[] | undefined | null
  onAttendClick: () => Promise<any>
  onRemoveAttendanceClick: (registrationId: string) => Promise<any>
}

// Displays btn to attend or de-register from an event depending on if the user is signed in and listed as an attendee.
export const AttendBtn = (props: AttendanceBtnProps) => {
  const { isAuthenticated, isInitializing, user } = useAuth0()

  if (isInitializing || !isAuthenticated)
    return <></>

  // Check if the user is the attendee list.
  const registration = props.attendees?.find((registration) => registration.attendee.id == user?.sub)
  if (registration)
    return (
      <button
        className='btn-gray mb-2 mr-2'
        onClick={() => props.onRemoveAttendanceClick(registration.id)}
      >
        Remove Attendance
      </button>
    )
  return (
    <button
      className='btn-gray mb-2 mr-2'
      onClick={props.onAttendClick}
    >
      Attend
    </button>
  )
}