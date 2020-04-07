export const apiUrl = process.env.API_URL || 'http://localhost:5000'

export const eventSearch = async (searchRequest: EventSearchRequest): Promise<ElasticSearchResult[]> => {
  const response = await fetch(`${apiUrl}/search/events`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(searchRequest)
  })
  return await response.json()
};

export interface EventSearchRequest {
  name?: string
  location?: {
    lat: number,
    lng: number,
    distance: string
  },
  from?: number,
  size?: number
}

export interface ElasticSearchResult {
  id: string,
  name: string,
  addr1: string,
  addr2: string,
  briefDescription: string,
  longDescription: string,
  eventDate: Date,
  userId: string,
  email: string,
  displayName: string,
  city: string,
  state: string,
  postal: string,
  country: string,
  location: {
    lat: number,
    lon: number
  }
}