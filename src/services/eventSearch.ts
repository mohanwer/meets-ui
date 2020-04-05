export const apiUrl = process.env.API_URL || 'http://localhost:5000'

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

export const eventSearch = async(searchRequest: EventSearchRequest) => {
    const response = await fetch(apiUrl, {
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