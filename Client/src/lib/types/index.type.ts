export interface Activitiy {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  isCancelled: boolean;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
}

export interface LocationSuggestion {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: LocationAddress;
}

export interface LocationAddress {
  name: string;
  neighbourhood?: string;
  town?: string;
  village?: string;
  city?: string;
  county?: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
  house_number?: string;
  road?: string;
  suburb?: string;
}
