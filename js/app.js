
// Inicializando y agregando el mapa
function initMap() {
  let icon = 'assets/bicicleta.png';
  let gmarker, latitude, longitude;
  let location = {
    lat: -12.026733806103568,
    lng: -76.98777915};// Peru;

  let objConfig = {
    Zoom: 8,
    center: location
  };
  // Agregamos el nuevo objeto de mapas para crearlo en el div map
  let map = new google.maps.Map(document.getElementById('map'), objConfig);


  let myUbication = function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // Agregando marcador (la propiedad position define la posicion de marcador)
    gmarker = new google.maps.Marker({
      position: location,
      map: map,
      icon: icon,
      animation: google.maps.Animation.DROP, // animar un marcador
      title: 'Usted esta aqui'
    });  
        
    map.setZoom(18);// Acercamos al mapa
    map.setCenter(location);// Asignamos un nuevo centro del mapa
  };

  // Si encontramos algun problema se activa la funcion error
  let error = function(error) {
    window.alert('No se ha encontrado tu localizacion localización');
  };

  // Funcion buscar se ejecutara cuando se de el evento load
  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(myUbication, error);
    }
  }

  // llamando a los elementos del  DOM
  let start = document.getElementById('origin');
  let destination = document.getElementById('destination');
  
  // Autocompletando
  new google.maps.places.Autocomplete(start);
  new google.maps.places.Autocomplete(destination);

  // Para trazar una ruta

  let ds = new google.maps.DirectionsService;// Recibe y devuelve el resultado
  let dr = new google.maps.DirectionsRenderer;// Para administar los resultados

  // Evento para el boton encuentrame
  document.getElementById('find-me').addEventListener('click', function() {
    start.value = latitude + ' ' + longitude;
  });

  let route = function(ds, dr) {
    // Nos devuelve un objeto
    var request = {
      origin: start.value,
      destination: destination.value,
      travelMode: 'DRIVING'
    };
    ds.route(request, function(result, status) {
      // Si el status es correcto nos devolvera result
      if (status === 'OK') {
        dr.setDirections(result);
      }
    });

    // Mapa donde se trazara la ruta
    dr.setMap(map);    
    gmarker.setMap(null);
  };

  /** ****Eventos********/

  // Creamos el evento load y llamamos a la funcion buscar
  window.addEventListener('load', search);
  // Evento para el boton ruta
  document.getElementById('route').addEventListener('click', function() {
    route(ds, dr);
  });
};