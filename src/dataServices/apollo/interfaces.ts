// Auto generated via https://graphql-code-generator.com/
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type Address = {
   __typename?: 'Address',
  id: Scalars['ID'],
  addr1: Scalars['String'],
  addr2: Scalars['String'],
  city: Scalars['String'],
  state: Scalars['String'],
  postal: Scalars['String'],
  country: Scalars['String'],
  lat: Scalars['Float'],
  lng: Scalars['Float'],
  events?: Maybe<Array<Address>>,
  createdBy: User,
  created: Scalars['DateTime'],
  modified: Scalars['DateTime'],
};

export type AddressInput = {
  addr1: Scalars['String'],
  addr2: Scalars['String'],
  city: Scalars['String'],
  state: Scalars['String'],
  postal: Scalars['String'],
  country: Scalars['String'],
};


export type Event = {
   __typename?: 'Event',
  id: Scalars['ID'],
  name: Scalars['String'],
  briefDescription: Scalars['String'],
  longDescription: Scalars['String'],
  eventDate: Scalars['DateTime'],
  createdBy: User,
  attendees?: Maybe<Array<Registration>>,
  comments?: Maybe<Array<EventComment>>,
  createdByGroup?: Maybe<Group>,
  address: Address,
  created: Scalars['DateTime'],
  modified: Scalars['DateTime'],
};

export type EventComment = {
   __typename?: 'EventComment',
  id: Scalars['ID'],
  commentText: Scalars['String'],
  event: Event,
  createdBy: User,
  created: Scalars['DateTime'],
  modified: Scalars['DateTime'],
};

export type EventInput = {
  name: Scalars['String'],
  briefDescription: Scalars['String'],
  longDescription: Scalars['String'],
  eventDate: Scalars['DateTime'],
  address: AddressInput,
};

export type EventUpdateInput = {
  name: Scalars['String'],
  briefDescription: Scalars['String'],
  longDescription: Scalars['String'],
  eventDate: Scalars['DateTime'],
  address: AddressInput,
  id: Scalars['String'],
};

export type EventSearchRequest = {
  eventName?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  location?: Maybe<LocationRequest>;
  from?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type EventSearchResponse = {
  __typename?: 'EventSearchResponse';
  id: Scalars['String'];
  name: Scalars['String'];
  addr1: Scalars['String'];
  addr2?: Maybe<Scalars['String']>;
  briefDescription: Scalars['String'];
  longDescription: Scalars['String'];
  eventDate: Scalars['DateTime'];
  userId: Scalars['String'];
  displayName: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  postal?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  location?: Maybe<LocationResponse>;
};

export type LocationRequest = {
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  distance?: Maybe<Scalars['String']>;
};

export type LocationResponse = {
  __typename?: 'LocationResponse';
  lat: Scalars['Float'];
  lon: Scalars['Float'];
};

export type Group = {
   __typename?: 'Group',
  id: Scalars['ID'],
  about: Scalars['String'],
  events?: Maybe<Array<Event>>,
  createdBy: User,
  groupMembers?: Maybe<Array<GroupMember>>,
  created: Scalars['DateTime'],
  modified: Scalars['DateTime'],
};

export type GroupMember = {
   __typename?: 'GroupMember',
  id: Scalars['ID'],
  group: Group,
  member: User,
  created: Scalars['DateTime'],
  modified: Scalars['DateTime'],
};

export type Mutation = {
   __typename?: 'Mutation',
  addUser: User,
  addEvent: Event,
  updateEvent: Event,
  deleteEvent: Scalars['Float'],
  addAttendee: Registration,
  deleteAttendee: Scalars['Float'],
  addEventComment: EventComment,
  updateEventComment: EventComment,
  deleteEventComment: Scalars['Float'],
  addGroup: Group,
  addGroupEvent: Group,
  deleteGroup: Scalars['Float'],
  updateGroup: Group,
  addGroupMember: GroupMember,
  deleteGroupMember: Scalars['Float'],
};


export type MutationAddUserArgs = {
  userData: UserInput
};


export type MutationAddEventArgs = {
  eventData: EventInput
};


export type MutationUpdateEventArgs = {
  eventData: EventUpdateInput
};


export type MutationDeleteEventArgs = {
  id: Scalars['String']
};


export type MutationAddAttendeeArgs = {
  eventId: Scalars['String']
};


export type MutationDeleteAttendeeArgs = {
  registrationId: Scalars['String']
};


export type MutationAddEventCommentArgs = {
  commentText: Scalars['String'],
  eventId: Scalars['String']
};


export type MutationUpdateEventCommentArgs = {
  commentText: Scalars['String'],
  commentId: Scalars['String'],
  eventId: Scalars['String']
};


export type MutationDeleteEventCommentArgs = {
  eventCommentId: Scalars['String']
};


export type MutationAddGroupArgs = {
  about: Scalars['String']
};


export type MutationAddGroupEventArgs = {
  eventData: EventInput,
  groupId: Scalars['String']
};


export type MutationDeleteGroupArgs = {
  groupId: Scalars['String']
};


export type MutationUpdateGroupArgs = {
  about: Scalars['String'],
  groupId: Scalars['String']
};


export type MutationAddGroupMemberArgs = {
  groupId: Scalars['String']
};


export type MutationDeleteGroupMemberArgs = {
  groupMembershipId: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  getUser?: Maybe<User>,
  event?: Maybe<Event>,
  attendee?: Maybe<Registration>,
  eventComment?: Maybe<EventComment>,
  group?: Maybe<Group>,
};


export type QueryGetUserArgs = {
  id: Scalars['String']
};


export type QueryEventArgs = {
  id: Scalars['String']
};


export type QueryAttendeeArgs = {
  id: Scalars['String']
};


export type QueryEventCommentArgs = {
  id: Scalars['String']
};


export type QueryGroupArgs = {
  id: Scalars['String']
};

export type Registration = {
   __typename?: 'Registration',
  id: Scalars['ID'],
  event: Event,
  attendee: User,
  created: Scalars['DateTime'],
  modified: Scalars['DateTime'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  displayName: Scalars['String'],
  eventsAttended?: Maybe<Array<Registration>>,
  eventsCreated?: Maybe<Array<Event>>,
  groupsCreated?: Maybe<Array<Group>>,
  groupMembership?: Maybe<Array<GroupMember>>,
  created: Scalars['DateTime'],
  modified: Scalars['DateTime'],
};

export type UserInput = {
  id: Scalars['ID'],
  email: Scalars['String'],
  displayName: Scalars['String'],
};