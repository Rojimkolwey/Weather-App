const apikey = "fac8ce50374d84e2944c13b033dcc6e3";

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
  } catch (error) {
    console.log("error", error);
  }
}

function  addWeatherToPage (data){
  const temp KtoC(data.main.temp)
}

getWeatherByLocation("51.5072", "0.1276");

function KtoC(K) {
  return (K - 273.15).toFixed(2);
}
