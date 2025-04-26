// Configuración de Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4MzyFGaSfb2QFde2Up85lD-5UsayRCMY",
  authDomain: "betty-70d8b.firebaseapp.com",
  databaseURL: "https://betty-70d8b-default-rtdb.firebaseio.com",
  projectId: "betty-70d8b",
  storageBucket: "betty-70d8b.appspot.com",
  messagingSenderId: "282418308744",
  appId: "1:282418308744:web:9f47962175af0a1a5be13d",
  measurementId: "G-75CZ09M5JM"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

var map; 
var marker; 
var userLocation = { lat: null, lng: null }; 

function openMaps(lat, lng, link) {
  var position = { lat: lat, lng: lng };
  map.setCenter(position);
  if (marker) {
    marker.setMap(null);
  }
  marker = new google.maps.Marker({
    position: position,
    map: map,
    title: "Cancha de Baloncesto"
  });
  window.open(link, '_blank');
}

function initMap() {
  var defaultPosition = { lat: 39.4699, lng: -0.3763 }; 
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultPosition,
    zoom: 12,
  });

  marker = new google.maps.Marker({
    position: defaultPosition,
    map: map,
    title: "Cancha de Baloncesto - Parque Central"
  });
}

function shareLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      document.getElementById('location-status').innerHTML = "Ubicación compartida: Latitud " + userLocation.lat + ", Longitud " + userLocation.lng;
    }, function() {
      document.getElementById('location-status').innerHTML = "No se pudo obtener la ubicación.";
    });
  } else {
    document.getElementById('location-status').innerHTML = "La geolocalización no es compatible con este navegador.";
  }
}

function joinCourt(courtLat, courtLng, buttonId, playersCountId) {
  const button = document.getElementById(buttonId);
  const playersCount = document.getElementById(playersCountId);

  const lastJoinedTime = localStorage.getItem(buttonId);
  const currentTime = new Date().getTime();

  if (lastJoinedTime) {
    const elapsedTime = currentTime - lastJoinedTime;
    if (elapsedTime < 7200000) { // 2 horas en milisegundos
      alert("¡Ya estás unido a esta cancha! Debes esperar 2 horas para unirte nuevamente.");
      return;
    }
  }

  const distance = getDistance(userLocation.lat, userLocation.lng, courtLat, courtLng);
  if (distance <= 1) {
    let currentPlayers = parseInt(playersCount.innerText.split(":")[1].trim());

    if (currentPlayers < 50) {
      currentPlayers++;
      playersCount.innerText = "Jugadores: " + currentPlayers + " / 50";

      // Actualizar Firebase
      const courtRef = database.ref("canchas/" + buttonId);
      courtRef.set({
        players: currentPlayers
      });

      // Guardar la hora en la que el jugador se unió para prevenir unirse repetidamente en un corto período
      localStorage.setItem(buttonId, currentTime);
    } else {
      alert("La cancha está llena.");
    }
  } else {
    alert("Estás demasiado lejos de la cancha.");
  }
}

function updatePlayersCount(buttonId, playersCountId) {
  const courtRef = database.ref("canchas/" + buttonId);
  courtRef.on("value", function(snapshot) {
    const data = snapshot.val();
    if (data && data.players !== undefined) {
      const playersCount = document.getElementById(playersCountId);
      playersCount.innerText = "Jugadores: " + data.players + " / 50";
    }
  });
}


function getDistance(lat1, lng1, lat2, lng2) {
  var R = 6371; 
  var dLat = deg2rad(lat2 - lat1);
  var dLng = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c; 
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

window.onload = function() {
  updatePlayersCount("joinButton1", "players-count-1");
  updatePlayersCount("joinButton2", "players-count-2");
  updatePlayersCount("joinButton3", "players-count-3");
  updatePlayersCount("joinButton4", "players-count-4");
};