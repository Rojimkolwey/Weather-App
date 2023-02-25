const apikey = "fac8ce50374d84e2944c13b033dcc6e3";
const main = document.getElementById("main");
const form = document.getElementById("form");
const searchLat = document.getElementById("searchLat");
const searchLon = document.getElementById("searchLon");

async function getWeatherByLocation(lat, lon) {
  try {
    const resp = await fetch(
      `
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}
    `,
      {
        origin: "cors",
      }
    );

    if (!resp.ok) {
      console.log("error", resp.statusText);
    }

    const respData = await resp.json();

    console.log(respData, KtoC(respData.main.temp));
    addWeatherToPage(respData, lat, lon);
  } catch (error) {
    console.log("error", error);
  }
}

function addWeatherToPage(data, lat, lon) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
  <h2>  <img src = "http://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>${temp}°C</h2> 
  <small> in ${lat} ${lon}</small>
  
  `;

  main.appendChild(weather);
}

// getWeatherByLocation("51.5072", "0.1276");

function KtoC(K) {
  return (K - 273.15).toFixed(2);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //check
  const lat = searchLat.value;
  const lon = searchLon.value;

  if (lat && lon) {
    getWeatherByLocation(lat, lon);
  }
});
