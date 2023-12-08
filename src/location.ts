import e from "express";
import { Location } from "./interfaces/Location";

const locations: Location[] = [
  {
    name: "Hodaripuoti",
    address: "Messukeskus",
    city: "Helsinki",
    coords: { lat: 60.20322568649935, lng: 24.93696528041362 },
    popupText:
      "<b>Hodaripuoti</b><br>Messukeskus , Helsinki<br>Parhaat hodarit tapahtumissa!",
  },
  {
    name: "Ravintola Hodaripuoti",
    address: "Helsingin katu 4",
    city: "Espoo",
    coords: { lat: 60.187394224490475, lng: 24.959375673402533 },
    popupText:
      "<b>Hodaripuoti </b><br>Helsingin katu 4, Helsinki<br>Herkullisia annoksia!, avaamme pian!",
  },
];

let map: google.maps.Map;

const initMap = (): void => {
  map = new google.maps.Map(document.getElementById("map")!, {
    center: { lat: 60.1699, lng: 24.9384 },
    zoom: 8,
  });

  locations.forEach((location) => {
    const marker = new google.maps.Marker({
      position: location.coords,
      map: map,
      title: location.name,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: location.popupText,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });

  const locationSelect = document.getElementById(
    "location-select"
  ) as HTMLSelectElement;

  locations.forEach((location) => {
    const option = document.createElement("option");
    option.value = location.name;
    option.textContent = `${location.name} - ${location.address}, ${location.city}`;
    locationSelect.appendChild(option);
  });

  locationSelect.addEventListener("change", () => {
    const selectedLocation = locationSelect.value;
    const selectedCoords = locations.find(
      (loc) => loc.name === selectedLocation
    )?.coords;

    if (selectedCoords) {
      map.setCenter(selectedCoords);
      const marker = new google.maps.Marker({
        position: selectedCoords,
        map: map,
      });
    }
  });
};
initMap();
export { initMap };
