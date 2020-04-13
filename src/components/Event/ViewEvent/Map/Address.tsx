import React, {useEffect, useState} from 'react'
import { GoogleAddress } from '../../CreateEvent/interfaces';

interface AddressProps {
  addressChange: (place: GoogleAddress) => void,
  className?: string
}

export const placesResultToAddress = (place: google.maps.places.PlaceResult): GoogleAddress => {
  const filterPlaces = (type: string) => {
    const address = place.address_components?.find(address => address.types.some(t => t === type))
    if (!address)
      return ''
    if (type === 'administrative_area_level_1' || type === 'country')
      return address.short_name
    return address.long_name
  }

  const address1 = place.name
  const city = filterPlaces('locality')
  const state = filterPlaces('administrative_area_level_1')
  const country = filterPlaces('country')
  const postal = filterPlaces('postal_code')
  return {
    address: address1,
    city: city,
    postal: postal,
    state: state,
    country: country,
    geoCode: place.geometry?.location.toJSON()
  }
}

export const Address = (props: AddressProps) => {
  const [streetAddress, setStreetAddress] = useState('')

  useEffect(() => {
    const input = document.getElementById("address-search-box") as HTMLInputElement
    const google = window.google
    const autoComplete = new google.maps.places.Autocomplete(
      input,
      {
        types: ['address']
      }
    )
    autoComplete.setFields(["address_component", "geometry", "name"])
    autoComplete.addListener('place_changed', () => handleSearch(autoComplete))
  }, [])

  const handleSearch = (autocomplete: google.maps.places.Autocomplete) => {
    const place: google.maps.places.PlaceResult = autocomplete.getPlace()
    if (place && place.geometry) {
      const googleAddress = placesResultToAddress(place)
      setStreetAddress(googleAddress.address)
      props.addressChange(googleAddress)
    }
  }

  return (
    <input
      type='text'
      id='address-search-box'
      placeholder="Search an address..."
      className={props.className}
      onChange={e => setStreetAddress(e.target.value)}
      value={streetAddress}
    />
  )
}