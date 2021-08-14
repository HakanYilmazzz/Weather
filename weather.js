const api = {
  key: "5397443a198bdd97e5e5f998fe8befbc", //Your api key 
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}
fetch(`${api.base}weather?q=balıkesir&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
    
function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults).catch((err)=>{
      Swal.fire({
        title: "",
        text: "İlgili şehir bulunamadı.",
        icon: "warning",
        confirmButtonText: "Tamam",
      });
      searchbox.value ="";
    })
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `Şuanki: ${Math.round(weather.main.temp)}<span>°c</span>`;

  let temp2 = document.querySelector('.current .feel');
  temp2.innerHTML = `Hissedilen: ${Math.round(weather.main.feels_like)}<span>°C</span>`;
  
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

  console.log(weather.weather[0].main)

  if (weather.weather[0].main=='Clear'){
    document.body.style.backgroundImage="url('./Assets/clear.jpg')";
  }
  else if(weather.weather[0].main=='Thunderstorm'){
    document.body.style.backgroundImage="url('./Assets/thunderstrom.jpg')";
  }
  else if(weather.weather[0].main=='Snow'){
    document.body.style.backgroundImage="url('./Assets/snow.jpg')";
  }
  else if(weather.weather[0].main=='Clouds'){
    console.log("girdi")
    document.body.style.backgroundImage="url('./Assets/clouds.jpg')";
  }
  else if(weather.weather[0].main=='Rain'){
    document.body.style.backgroundImage="url('./Assets/rain.jpg')";
  }
  else if(weather.weather[0].main=='Drizzle'){
    document.body.style.backgroundImage="url('./Assets/drizzle.jpg')";
  }
  else {
    document.body.style.backgroundImage="url('./Assets/atmosphere.jpg')";
  }
}

function dateBuilder (d) {
  let months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  let days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return ` ${date} ${month} ${year}, ${day}`;
}
