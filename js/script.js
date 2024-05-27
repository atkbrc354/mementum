const time = document.querySelector('.time');
const dateText = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');


// Time

const months = [
  "Январь", 
  "Февраль", 
  "Март", 
  "Апрель", 
  "Май", 
  "Июнь", 
  "Июль", 
  "Август", 
  "Сентябрь", 
  "Октябрь", 
  "Ноябрь", 
  "Декабрь"
];

const daysOfWeek = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье"
];

const date = new Date();
const day = String(date.getDate()).padStart(2, '0');
const dayWeek = date.getDay();
const dayMonth = date.getMonth();



function showCustomTime() {
      const timeCurrent = new Date();
      const utc = timeCurrent.getTime() + (timeCurrent.getTimezoneOffset() * 60000);
      const myTime = new Date(utc + (3600000 * 5));
      
      const hours = String(myTime.getHours()).padStart(2, '0');
      const minutes = String(myTime.getMinutes()).padStart(2, '0');
      const seconds = String(myTime.getSeconds()).padStart(2, '0');
    
    const customTime = `${hours}:${minutes}:${seconds}`;
    const customDay = `${daysOfWeek[dayWeek]}, ${months[dayMonth]} ${day}`;
    
    time.textContent = customTime;
    dateText.textContent = customDay;
    setTimeout(showCustomTime, 1000);
}

showCustomTime();

// Приветствие

function showGreeting() {
  const timeCurrent = new Date();
  const utc = timeCurrent.getTime() + (timeCurrent.getTimezoneOffset() * 60000);
  const myTime = new Date(utc + (3600000 * 5));
      
  const hours = myTime.getHours();
  if(hours <= 5){
    greeting.textContent = `Спокойной ночи`;
  } else if(hours > 5 && hours <= 12) {
    greeting.textContent = `Доброе утро`;
  } else if(hours > 12 && hours <= 16) {
    greeting.textContent = `Добрый день`;
  } else if(hours > 16 && hours <= 21) {
    greeting.textContent = `Добрый вечер`;
  }
}

showGreeting();


function setLocalStorage() {
  localStorage.setItem("name", name.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  const nameFromLS = localStorage.getItem("name");

  if (nameFromLS !== null) {
    name.value = nameFromLS;
  }
}
window.addEventListener("load", getLocalStorage);


//slider

function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

function getTimeOfDay() {
  const timeCurrent = new Date();
  const utc = timeCurrent.getTime() + (timeCurrent.getTimezoneOffset() * 60000);
  const myTime = new Date(utc + (3600000 * 5));
      
  const hours = myTime.getHours();
  if(hours <= 5){
    return 'night';
  } else if(hours > 5 && hours <= 12) {
    return 'morning';
  } else if(hours > 12 && hours <= 16) {
    return 'afternoon';
  } else if(hours > 16 && hours <= 21) {
    return 'evening';
  } else {
    return 'night';
  }
}

function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = getRandomNum().toString().padStart(2, '0');
  const imageUrl = `https://raw.githubusercontent.com/atkbrc354/stage1-tasks-assets/main/images/${timeOfDay}/${bgNum}.jpg`;

  const img = new Image();
  img.src = imageUrl;
  img.onload = () => {
    document.body.style.backgroundImage = 'url(' + imageUrl + ')';
  };
}

let randomNum;

function getSlideNext() {
  if (randomNum === 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg();
}

function getSlidePrev() {
  if (randomNum === 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg();
}

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

setBg();







