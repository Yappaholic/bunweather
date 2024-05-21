const select = document.querySelector<HTMLSelectElement>("form>select");
select?.addEventListener("change", () => {
  if (select?.value === "Future") {
    const label = document.createElement("label");
    label.setAttribute("for", "day");
    label.id = "for-day";
    label.textContent = "Number of days:";
    const form = document.querySelector("form");
    const selection = document.createElement("select");
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
