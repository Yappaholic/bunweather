function getInfo(city: string, time: string, day: number) {
  const body = "http://api.weatherapi.com/v1/";
  const key = "?key=eb62870811bb4ef184491055242105";
  let timeSearch: string;
  if (time === "Now") {
    timeSearch = "current.json";
    const result = [body, timeSearch, key, "&q=", city].join("");
    return result;
  } else if (time === "Future") {
    timeSearch = "forecast.json";
    const result = [body, timeSearch, key, "&q=", city, "&days=", day].join("");
    return result;
  }
}
async function getWeather(city: string, time: string, ...args: number[]) {
  const searchURL: any = getInfo(city, time, args[0]);
  const decCheck = /\d+$/;
  try {
    const result = await fetch(searchURL, { mode: "cors" });
    result.json().then(function (response: any) {
      if (!searchURL.match(decCheck)) {
        const result = [
          response.location.name,
          response.current.temp_c,
          response.current.condition.text,
        ];
        console.log(result);
      } else {
        const result = [response.location.name];
        const days: Object[] = [];
        response.forecast.forecastday.forEach((day: any) => {
          let date = day.date;
          let temp = day.day.avgtemp_c;
          let condition = day.day.condition.text;
          days.push({ date, temp, condition });
        });
        result.push(days);
        console.log(result);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
getWeather("Minsk", "Future", 3);
