import { gql } from 'apollo-boost'

export const GET_EVENT_BY_ID = gql`
  query GetEventById($id: String!) {
    event(id: $id) {
      id
      name
      briefDescription
      longDescription
      eventDate
      address {
        addr1
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
      createdBy {
        id
        displayName
      }
    }
  }
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
