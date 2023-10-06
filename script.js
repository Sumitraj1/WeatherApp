
let result = document.getElementById("result");
let result1 = document.getElementById("result1");
let result2 = document.getElementById("result2");
let panel = document.querySelector(".panel");
const app = document.querySelector('.weather-app');

let searchBtn = document.getElementById("search-btn");
let cityInp = document.getElementById("locInp");

const timel = document.getElementById('time');
const datel = document.getElementById('date');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM'

  timel.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

  datel.innerHTML = days[day] + ', ' + date+ ' ' + months[month] + ' (IST)'

}, 1000);

//Function to fetch weather details from api and display them
let getWeather = (e) => {
  e.preventDefault();
  let cityValue = cityInp.value;
  //If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = ""
    result1.innerHTML = ""
    panel.style.height = "30%"
    panel.style.right = "30%"
    result2.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;

  }
  //If input field is NOT empty
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    //Clear the input field
   
    result2.innerHTML=""
    cityInp.value = "";
    panel.style.bottom ="17%"
    panel.style.height = "70%"
    panel.style.right = "5%"

    fetch(url)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
       let imageChange = data.weather[0].main;
        console.log(data.weather[0].description);
        console.log(data.name);
       
        console.log(data.main.temp);

        if(imageChange =="Snow"){
          app.style.backgroundImage = `url(./images/50e16e663f03e546202fb23607f747b3.gif)`
        }else if(imageChange =="Clouds"){
          app.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),url(./images/ad8e41d1fc00ff3c27b1c08d0f225ddf.gif)`
          panel.style.backgroundColor= `rgba(110, 110, 110, 0.1)`

        }else if(imageChange=="Rain"){
          app.style.backgroundImage = `url(./images/ea9fed7510140921b9c36330bda27547.gif)`
          panel.style.backgroundColor= `rgba(110, 110, 110, 0.1)`

        }else if(imageChange=="Haze"){
          app.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(./images/093f07c3fe70482d1d79a104d13b9e56.gif)`
          panel.style.backgroundColor= `rgba(110, 110, 110, 0.1)`

        }else if(imageChange=="Clear"){
          app.style.backgroundImage = `url(./images/df0a3e2ec30abb1c92d145ef165b714f.gif)`
          panel.style.backgroundColor= `rgba(110, 110, 110, 0.1)`

        }else if(imageChange=="Mist"){
          app.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),url(./images/1d1b336e40de7fd0689afc6561f4e92f.gif)`
          panel.style.backgroundColor= `rgba(110, 110, 110, 0.1)`

        }else if(imageChange=="Smoke"){
          app.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(./images/093f07c3fe70482d1d79a104d13b9e56.gif)`
          panel.style.backgroundColor= `rgba(110, 110, 110, 0.1)`

        }else if(imageChange=="Thunderstorm"){
          app.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(./images/739432d532bf90abdadbeea579abc21b.gif)`
          panel.style.backgroundColor= `rgba(110, 110, 110, 0.1)`

        }else{
          app.style.backgroundImage = `url(./images/df0a3e2ec30abb1c92d145ef165b714f.gif)`
          panel.style.backgroundColor= `rgba(110, 110, 110, 0.1)`

        }
       
        result.innerHTML = `
        <h1 class="temp">${data.main.temp}&#176;</h1>
        <div class="city-time">
            <h1 class="name">${data.name}</h1>
           
        </div>
        <div  class="weather">
            <img class="icon" width="70" height="70" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"" alt="icon">
            <span class="condition">${data.weather[0].description}</span>
            </div>
        `;
      result1.innerHTML = `<li>
      <span>COUNTRY</span>
      <span class="country">${data.sys.country}</span>
  </li>
       <li>
      <span>Clouds</span>
      <span class="clouds">${data.clouds.all}%</span>
  </li>
  <li>  <span>Humidity</span>
      <span class="humid">${data.main.humidity}</span></li>
  <li>  <span>Winds</span>
      <span class="wind">${data.wind.speed}km/h</span></li>
  <li>  <span>Pressure</span>
      <span class="pressure">${data.main.pressure}</span></li>`
      
      
      })
      //If city name is NOT valid
      .catch(() => {
        result.innerHTML = "";
    result1.innerHTML = "";
    panel.style.height = "30%";
    panel.style.right = "30%";

        result2.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
}








searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);