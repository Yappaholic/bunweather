function getInfo(city: string, time: string, day: string | undefined): string {
  const body = "http://api.weatherapi.com/v1/";
  const key = "?key=eb62870811bb4ef184491055242105";
  let timeSearch: string;
  let result: string = "";
  if (time === "Now") {
    timeSearch = "current.json";
    result = [body, timeSearch, key, "&q=", city].join("");
  } else if (time === "Future") {
    timeSearch = "forecast.json";
    result = [body, timeSearch, key, "&q=", city, "&days=", day].join("");
  }
  return result;
}
async function getWeather(
  city: string,
  time: string,
  days: string | undefined,
) {
  const searchURL: any = getInfo(city, time, days);
  const decCheck = /\d+$/;
  var weather: any[] = [];
  const result = await fetch(searchURL, { mode: "cors" });
  result.json().then(function (response: any) {
    if (!searchURL.match(decCheck)) {
      weather.push(response.location.name);
      weather.push(response.location.country);
      weather.push(response.current.temp_c);
      weather.push(response.current.condition.text);
      weather.push(response.current.condition.icon);
    } else {
      weather.push(response.location.name);
      const days: Object[] = [];
      response.forecast.forecastday.forEach((day: any) => {
        let date = day.date;
        let temp = day.day.avgtemp_c;
        let condition = day.day.condition.text;
        let icon = day.day.condition.icon;
        days.push({ date, temp, condition, icon });
      });
      weather.push(days);
    }
  });
  return weather;
}
export { getInfo, getWeather };
