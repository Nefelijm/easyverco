
// Inicializando y agregando el mapa
function initMap() {
  
  let location = {
    lat: -12.1358805,
    lng: -77.0074234};// Peru;
  let objConfig = {
    Zoom: 18,
    center: location
  };
  // Agregamos el nuevo objeto de mapas para crearlo en el div map
  let gMap = new google.maps.Map(document.getElementById('map'), objConfig);
  
  // Agregando marcador (la propiedad position define la posicion de marcador)
  var objConfigMarker = {
    position: location,
    map: gMap,
    animation: google.maps.Animation.DROP, // animar un marcador
    title: 'Usted esta aqui'
  };
  let gmarker = new google.maps.Marker(objConfigMarker);


  // Utilizamos el objeto gcoders para traducir una direccion a una coordenada de google maps 
  let gCoder = new google.maps.Geocoder();
  // Informacion que ingresa
  let objetInformacion = {
    address: 'Plaza de armas, Santiago de surco'
  };
  // Funcion geocod con dos para metros
  gCoder.geocode(objetInformacion, funCoder);
  // Funcion de respuesta
  function funCoder(datos) {
    let coordinates = datos[0].geometry.location; // Es como un objeto location      
    let config = {
      map: gMap,
      animation: google.maps.Animation.DROP,
      position: coordinates,
      title: 'Partida'
    };
    let gMarkerdv = new google.maps.Marker(config);
    // Agregando icono para los marcadores
    // gMarkerdv.setIcon('icono local');
  }
  
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
}