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

// Погода
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");


city.addEventListener('change', getWeather);


city.value = "Магнитогорск";


async function getWeather() {
  const inputCity = city.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&lang=ru&appid=23375f98bc0f9927f7e5e7cb611cd650&units=metric`;
  const res = await fetch(url);
  const data = await res.json();


  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Скорость ветра: ${data.wind.speed} m/s`;
  humidity.textContent = `Влажность: ${data.main.humidity}%`;
}

getWeather();


// Генератор цытат

const btnQuote = document.querySelector(".change-quote");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

async function getQuotes() {
  const quotes = "./data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  console.log(data);
  return data;
}
getQuotes();

async function updateQuote() {
  const data = await getQuotes();
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomQuote = data[randomIndex];
  
  quote.textContent = randomQuote.text;
  author.textContent = randomQuote.author;
}

getQuotes();

btnQuote.addEventListener('click', updateQuote);

window.addEventListener('load', updateQuote);

//аудиоплеер

document.addEventListener("DOMContentLoaded", function() {
  const playerControls = document.querySelector('.player-controls');
  const playPauseBtn = document.querySelector('.play');
  const playPrevBtn = document.querySelector('.play-prev');
  const playNextBtn = document.querySelector('.play-next');
  const playList = document.querySelector('.play-list');
  const progressBar = document.querySelector('.progress-bar');
  const volumeBtn = document.querySelector('.volume');
  const volumeSlider = document.querySelector('.volume-slider');
  const trackName = document.querySelector('.track-name');
  const currentTimeDisplay = document.querySelector('.current-time');
  const durationDisplay = document.querySelector('.duration');

  const tracks = [
      { name: 'Аква Целестис', src: './assets/sounds/Aqua Caelestis.mp3' },
      { name: 'Река Течет В Тебе', src: './assets/sounds/Ennio Morricone.mp3' },
      { name: 'Летний ветер', src: './assets/sounds/River Flows In You.mp3' },
      { name: 'Эннио Морриконе', src: './assets/sounds/Summer Wind.mp3' },
      { name: 'Задержка', src: './assets/sounds/c152-hold-up.mp3' },
      { name: 'Эннио', src: './assets/sounds/deathkllr84-forever-mine.mp3' },
      { name: 'Морриконе', src: './assets/sounds/matcukito-kioto-c152-it-was-the-longest-night-of-my-life.mp3' },
  ];

  let currentTrackIndex = 0;
  let audio = new Audio(tracks[currentTrackIndex].src);


  playPauseBtn.addEventListener('click', function() {
      if (audio.paused) {
          playTrack();
      } else {
          pauseTrack();
      }
  });

  playPrevBtn.addEventListener('click', function() {
      currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
      playTrack();
  });


  playNextBtn.addEventListener('click', function() {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      playTrack();
  });


  function updatePlayList() {
      const trackItems = playList.querySelectorAll('li');
      trackItems.forEach((item) => {
          item.classList.remove('current-track');
      });
      trackItems[currentTrackIndex].classList.add('current-track');
      trackName.textContent = tracks[currentTrackIndex].name;
  }


  function playTrack() {
      audio.src = tracks[currentTrackIndex].src;
      audio.play();
      playPauseBtn.classList.remove('play-icon');
      playPauseBtn.classList.add('pause');
      updatePlayList();
  }


  function pauseTrack() {
      audio.pause();
      playPauseBtn.classList.remove('pause');
      playPauseBtn.classList.add('play-icon');
  }

  function updateProgress() {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${progress}%`;
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
      durationDisplay.textContent = formatTime(audio.duration);
  }

  function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  audio.addEventListener('timeupdate', updateProgress);

  progressBar.addEventListener('click', function(event) {
      const clickX = event.offsetX;
      const progressBarWidth = progressBar.clientWidth;
      const progress = (clickX / progressBarWidth) * audio.duration;
      audio.currentTime = progress;
  });


  volumeBtn.addEventListener('click', function() {
      audio.muted = !audio.muted;
      volumeBtn.classList.toggle('mute', audio.muted);
  });


  volumeSlider.addEventListener('input', function() {
      audio.volume = volumeSlider.value / 100;
  });


  audio.addEventListener('ended', function() {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      playTrack();
  });


  tracks.forEach((track, index) => {
      const trackItem = document.createElement('li');
      trackItem.textContent = track.name;
      trackItem.addEventListener('click', function() {
          currentTrackIndex = index;
          playTrack();
      });
      playList.appendChild(trackItem);
  });
});








