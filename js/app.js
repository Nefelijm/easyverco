
// Inicializando y agregando el mapa
function initMap() {
  let icon = 'assets/bicicleta.png';
  let gmarker, latitude, longitude;
  let location = {
    lat: -12.1358805,
    lng: -77.0074234};// Peru;
  let objConfig = {
    Zoom: 18,
    center: location
  };
  // Agregamos el nuevo objeto de mapas para crearlo en el div map
  let gMap = new google.maps.Map(document.getElementById('map'), objConfig);

  // Creando funcion para encontrar mi ubicacion
  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(myUbication, error);
    }
  }


  let myUbication = function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // Agregando marcador (la propiedad position define la posicion de marcador)
    let gmarker = new google.maps.Marker({    
      position: location,
      map: gMap,
      icon: icon,
      animation: google.maps.Animation.DROP, // animar un marcador
      title: 'Usted esta aqui'
    });  
  };


  let error = function(error) {
    window.alert('No podemos ubicarlo');
  };

  // llamando a los elementos del  DOM
  let start = document.getElementById('origin');
  let destination = document.getElementById('destination');

  // // Autocompletando
  // new google.maps.places.Autocomplete(start);
  // new google.maps.places.Autocomplete(destination);


  // Rutas
  
  let objDr = {
    map: gMap
  };

  let objDs = {
    origin: location,
    destination: objetInformacion.address,
    travelMode: google.maps.TravelMode.WALKING
  };

  let ds = new google.maps.DirectionsService();// Obtener coordenadas
  let dr = new google.maps.DirectionsRenderer(objDr);// Traduce las coordenadas a la ruta
  
  ds.route(objDs, ruter);

  function ruter(result, status) {
    if (status === 'ok') {
      dr.setDirections(result);
    } else {
      alert('error');
    }
  }


  // Agregando eventos

  
  window.addEventListener('load', search);
  let ubication = document.getElementById('find-me');
  let endRoute = document.getElementById('route');
  ubication.addEventListener('click',function(){
   start.value = latitude + '' + longitude;
  })
  endRoute.addEventListener('click', function(){
    route ();
  })
}