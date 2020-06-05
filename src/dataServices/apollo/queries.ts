import { gql } from 'apollo-boost'

const EventPageFragment = gql`
  fragment EventPage on Event {
    id
    name
    briefDescription
    longDescription
    eventDate
    address {
      addr1
      addr2
      city
      state
      postal
      country
      lat
      lng
    }
    comments {
      id
      commentText
      modified
      createdBy {
        id
        displayName
      }
    }
    attendees {
      id
      attendee {
        displayName
        id
      }
    }
    createdBy {
      id
      displayName
    }
  }
`

export const GET_EVENT_BY_ID = gql`
  query GetEventById($id: String!) {
    event(id: $id) {
      ...EventPage
    }
  }
  ${EventPageFragment}
`

export const ADD_EVENT_COMMENT = gql`
  mutation AddEventComment($eventId: String!, $commentText: String!) {
    addEventComment(eventId: $eventId, commentText: $commentText) {
      id
      commentText
      modified
      createdBy {
        id
        displayName
      }
    }
  }
`

export const UPDATE_EVENT_COMMENT = gql`
  mutation UpdateEventComment($eventId: String!, $commentId: String!, $commentText: String!) {
    updateEventComment(eventId: $eventId, commentId: $commentId, commentText: $commentText) {
      id
      commentText
      modified
      createdBy {
        id
        displayName
      }
    }
  }
`

export const DELETE_EVENT_COMMENT = gql`
  mutation DeleteEventComment($eventCommentId: String!) {
    deleteEventComment(eventCommentId: $eventCommentId)
  }
`

export const ADD_EVENT = gql`
  mutation AddEvent($eventData: EventInput!) {
    addEvent(eventData: $eventData) {
      ...EventPage
    }
  }
  ${EventPageFragment}
`

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($eventData: EventUpdateInput!) { 
    updateEvent(eventData: $eventData) {
      ...EventPage
    }
  }
  ${EventPageFragment}
`

export const SEARCH_EVENTS = gql`
  query SearchEvents($eventSearchRequest: EventSearchRequest!) {
    searchEvents(searchParams: $eventSearchRequest) {
      id
      name
      addr1
      addr2
      briefDescription
      longDescription
      eventDate
      userId
      displayName
      city
      state
      postal
      country
      location {
        lat
        lon
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String!, $displayName: String!) {
    updateUser(email: $email, displayName: $displayName) {
      id
      displayName
      email
    }
  }
`

export const ATTEND_EVENT = gql`
  mutation AddAttendee($eventId: String!) {
    addAttendee(eventId: $eventId) {
      id
      attendee {
        displayName
        id
      }
    }
  }
`

export const REMOVE_ATTENDANCE = gql`
  mutation deleteAttendee($registrationId: String!) {
    deleteAttendee(registrationId: $registrationId)
  }
`