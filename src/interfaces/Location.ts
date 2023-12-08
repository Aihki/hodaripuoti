interface Location {
  name: string;
  address: string;
  city: string;
  coords: google.maps.LatLngLiteral;
  popupText: string;
}

export type { Location };
