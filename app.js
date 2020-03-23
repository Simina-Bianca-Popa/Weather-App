window.addEventListener('load', function () { 

let Lat;
let Long; 
let City = document.querySelector('.city');
let WeatherTemperature = document.querySelector('.temp');
let WeatherDescription = document.querySelector('.desc');
let WeatherIcon = document.querySelector('.icon');
const TempSpan = document.querySelector('.degree span')

if (navigator.geolocation) { //get the current location and display the wheater
  navigator.geolocation.getCurrentPosition(function(position) {
       // console.log(position)
    Lat = position.coords.latitude;
    Long = position.coords.longitude; 

  
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const API = `${proxy}https://api.darksky.net/forecast/a303611cd9fa1f82816df8c5a34fba8f/${Lat},${Long}`;
    
  fetch(API) // access the API and retrive data
    .then (response => { //when you will have all datea(response) from server do
      return response.json(); //return the data that you convert to JSON
    })
    .then (APIdataReceive => { //when you have all data

      console.log(APIdataReceive); //Display data received from json
      const {temperature, summary, icon} = APIdataReceive.currently; //{names of paramiters you want to access} 

      // sets DOM elements from API
      City.textContent = APIdataReceive.timezone;
      WeatherTemperature.textContent = Math.round(temperature);
      WeatherDescription.textContent = summary;

      //formula for Celsius
      let Celsius = (temperature-32) * (5/9);

      // set Icon
      setWeatherIcon(icon, WeatherIcon); //include the icon in the canvs icon of html

      document.getElementById('CDegree').addEventListener('click', myFunction);
      document.getElementById('FDegree').addEventListener('click', myFunction);
      
      function myFunction() {
        var val;
        if (document.getElementById('CDegree').checked) {
          val = document.getElementById('CDegree').value; 
          TempSpan.textContent = "\u2103"; 
          WeatherTemperature.textContent = Math.round(Celsius);
        }
        if (document.getElementById('FDegree').checked) {
          val = document.getElementById('FDegree').value;
          TempSpan.textContent = "\u2109";
          WeatherTemperature.textContent = Math.round(temperature);
        }
         localStorage.setItem('WeatherUnit',val); //Store the preference in the local storage and use it to display the temperature for the user based on the stored value.
         document.cookie = 'WeatherUnit='+ val;  // Set the cookie for WeatherTemperature
         console.log(document.cookie)
      };

    });
  
  }); 
 
} else {
    alert('Geolocation is not available');
}
function setWeatherIcon (icon, iconID){
  const skycons = new Skycons({color:"blue"});
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();//replace - with _ and make all upper case to mache the  API
  skycons.play(); //for animation
  return skycons.set(iconID, Skycons[currentIcon]);// we add the ID and the current ICON
}
});  