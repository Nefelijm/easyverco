
// Inicializando y agregando el mapa
function initMap() {
  let location = { lat: -12.0431800,
    lng: -77.0282400};
  // Agregamos el nuevo objeto de mapas para crearlo en el div map
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: location
  });
  // Agregando marcador (la propiedad position define la posicion de marcador)
  let marker = new google.maps.Marker({
    position: location,
    animation: google.maps.Animation.DROP,
    map: map
  });
}