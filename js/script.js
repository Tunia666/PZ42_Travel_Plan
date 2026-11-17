"use strict";

const citySelect = document.querySelector("#city-select");
const planButton = document.querySelector("#plan-button");
const result = document.querySelector("#result");
const status = document.querySelector("#status");

// Эти три функции уже возвращают Promise. Их переписывать не нужно.
function getCity(code) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cities = { spb: "Санкт-Петербург", kazan: "Казань" };
      if (cities[code]) resolve(cities[code]);
      else reject(new Error("Город не найден"));
    }, 500);
  });
}

function getWeather(city) {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({ city, weather: city === "Казань" ? "солнечно" : "ветрено" }),
      500,
    );
  });
}

function getAdvice(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tip =
        data.weather === "солнечно"
          ? "Возьмите солнцезащитные очки."
          : "Захватите ветровку.";
      resolve(`${data.city}: ${data.weather}. ${tip}`);
    }, 500);
  });
}

// Задание 1: создаем async function buildPlan()
async function buildPlan() {
  planButton.disabled = true;
  result.textContent = "Составляем совет...";
  status.className = "status status--working";
  status.textContent = "Получаем данные...";

  try {
    // Задание 2: последовательно получаем город, погоду и совет через await
    const city = await getCity(citySelect.value);
    const weather = await getWeather(city);
    const advice = await getAdvice(weather);

    // Задание 3: выводим результат и успешный статус
    result.textContent = advice;
    status.className = "status status--success";
    status.textContent = "Совет готов.";
  } catch (error) {
    // Задание 4: обработка ошибки
    result.textContent = error.message;
    status.className = "status status--error";
    status.textContent = "Не удалось составить совет.";
  } finally {
    // Разблокируем кнопку обратно
    planButton.disabled = false;
  }
}

// Задание 5: подключаем buildPlan как обработчик клика (один раз)
planButton.addEventListener("click", buildPlan);
