export interface GoogleAddress {
  address: string,
  city: string,
  state: string,
  postal: string,
  country: string,
  geoCode?: GoogleGeoCode,
}

export interface GoogleGeoCode {
  lat: number,
  lng: number
}

export interface EventValues {
  name: string,
  briefDescription: string,
  longDescription: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  postal: string,
  country: string,
  geoLocation?: GoogleGeoCode,
}

export interface EventData {
  name: string
  briefDescription: string
  longDescription: string
  eventDate: Date
  address: {
    addr1: string
    addr2: string
    city: string
    state: string
    postal: string
    country: string
  }
}