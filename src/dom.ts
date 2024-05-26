import { getWeather } from "./lib";
const select = document.querySelector<HTMLSelectElement>("form>select");
const search = document.querySelector<HTMLButtonElement>("button[submit]");
const content = document.querySelector(".content");
const header = document.querySelector("[header]");
async function weatherCall(
  city: string,
  time: string,
  day: string | undefined,
) {
  let result = await getWeather(city, time, day);
  await new Promise((resolve, reject) => setTimeout(resolve, 100));
  if (result[1].length > 3) {
    displayCurrentWeather(result);
  } else {
    displayFutureWeather(result);
  }
}

function clearContent(form: HTMLFormElement, button: HTMLButtonElement) {
  content!.removeChild(form);
  content!.removeChild(button);
}

function displayCurrentWeather(weather: any) {
  const city = weather[0] + ", " + weather[1];
  const temp = weather[2];
  const feel = weather[3];
  const div = document.createElement("div");
  const img = document.createElement("img");
  div.classList.toggle("forecast");
  img.src = "https:" + weather[4];
  img.classList.toggle("image");
  const cityText = document.createElement("h2");
  const tempText = document.createElement("p");
  const feelText = document.createElement("p");
  header!.textContent = "You are looking weather for";
  feelText.classList.toggle("temp");
  cityText.textContent = city;
  tempText.textContent = `C°: ${temp}`;
  feelText.textContent = feel;
  content!.appendChild(cityText);
  div.appendChild(tempText);
  div.appendChild(feelText);
  div.appendChild(img);
  content!.appendChild(div);
}
function displayFutureWeather(weather: any) {
  console.log(weather);
  const cityText = document.createElement("h2");
  cityText.textContent = weather[0];
  content!.appendChild(cityText);
  for (let i = 0; i < weather[1].length; i++) {
    const div = document.createElement("div");
    div.classList.toggle("forecast");
    const img = document.createElement("img");
    img.src = "https:" + weather[1][i].icon;
    img.classList.toggle("image");
    const date = document.createElement("p");
    const temp = document.createElement("p");
    date.classList.toggle("date");
    temp.classList.toggle("temp");
    date.textContent = weather[1][i].date.slice(5);
    temp.textContent = `C°: ${weather[1][i].temp}`;
    div.appendChild(date);
    div.appendChild(temp);
    div.appendChild(img);
    content!.appendChild(div);
  }
}
select?.addEventListener("change", () => {
  if (select?.value === "Future") {
    const label = document.createElement("label");
    label.setAttribute("for", "day");
    label.id = "for-day";
    label.textContent = "Number of days:";
    const form = document.querySelector("form");
    const selection = document.createElement("select");
    selection.name = "day";
    selection.id = "day";
    const day1 = document.createElement("option");
    day1.value = "1";
    day1.textContent = "1";
    const day2 = document.createElement("option");
    day2.value = "2";
    day2.textContent = "2";
    const day3 = document.createElement("option");
    day3.value = "3";
    day3.textContent = "3";
    selection.appendChild(day1);
    selection.appendChild(day2);
    selection.appendChild(day3);
    form?.appendChild(label);
    form?.appendChild(selection);
  } else {
    const label = document.querySelector("#for-day");
    const select = document.querySelector("#day");
    if (label && select) {
      const form = document.querySelector("form");
      form?.removeChild(label);
      form?.removeChild(select);
    }
  }
});
search?.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector("form")!;
  const formData = new FormData(form);
  let city = formData.get("city")!.toString();
  let time = formData.get("time")!.toString();
  let day: string | undefined;
  if (time!.toString() === "Future") {
    day = formData.get("day")?.toString();
  }
  clearContent(form, search);
  weatherCall(city, time, day);
});
