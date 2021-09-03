///khai bao bien
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const listExercisesComponent = $$(".exercise_item_process");
const startBtn = $(".time_start");
const pauseBtn = $(".time_pause");
const continueBtn = $(".time_Continue");
const timeComponent = $(".time");
const relaxComponent = $(".relax");
var counterPracticesComponent = $(".counter_practice");
var counterRelaxComponent = $(".counter_relax");
let activePosition = 0;
var exerciseName = $(".exercise_name");
var timePrac = 0;
var timeBreak = 15;
var timerPrac;
var audio = $("#audio");
var timerBreak;
var pauseKey = false;
var startKey = false;
var endSound = new Audio(
  "./assets/sound/Am-thanh-dem-nguoc-het-gio-www_tiengdong_com.mp3"
);
var finishSound = new Audio("./assets/sound/hoanho.mp3");
var introduce = $(".introduce");
var listSong = [
  {
    name: "Believer-Imagine Dragon",
    path: "./assets/sound/Believer - Imagine Dragons.m4a",
    image: "./assets/imgs/imagine_dragon_1.jpg",
  },
  {
    name: "Follow You-Imagine Dragon",
    path: "./assets/sound/Follow You - Imagine Dragons.m4a",
    image: "./assets/imgs/imagine_dragon_2.jpg",
  },
  {
    name: "Thunder-Imagine Dragon",
    path: "./assets/sound/Thunder - Imagine Dragons.m4a",
    image: "./assets/imgs/imagine_dragon_3.jpg",
  },
];
var musicComponet = $(".music");
var musicIcon = $(".music_icon");
var musicList = $(".music_list");
var musicItem = $(".music_item");
var currentSongPos = 0;
var nameSong = $(".music_name");
var onSpeaker = $(".speaker-icon-on");
var offSpeaker = $(".speaker-icon-off");
var isOnSpeaker = true;
var levelTime = localStorage.getItem("levelTime");
const animationCd = musicIcon.animate(
  [
    // keyframes
    { transform: "rotate(360deg)" },
  ],
  {
    // timing options
    duration: 10000,
    iterations: Infinity,
  }
);
const restTime = 15;
//function

//rendertime
function rendertimePrac() {
  counterPracticesComponent.innerHTML = levelTime;
}
//setup function
function setup() {
  musicComponet.style.display = "flex";
  startKey = true;
  startBtn.style.display = "none";
  introduce.style.display = "block";
}

//on-off speaker function
function onOffSpeaker() {
  onSpeaker.classList.toggle("active");
  offSpeaker.classList.toggle("active");
  isOnSpeaker = !isOnSpeaker;
  if (isOnSpeaker) {
    animationCd.play();
    audio.play();
  } else {
    animationCd.pause();
    audio.pause();
  }
}

//render Songs
function renderSong() {
  nameSong.innerHTML = currentSong().name;
  musicIcon.style.backgroundImage = `url(${currentSong().image})`;
  var songs = listSong.map((item, index) => {
    return `<li index="${index}" class="music_item ${
      currentSongPos == index ? "active" : ""
    }">${item.name}</li>`;
  });
  musicList.innerHTML = songs.join("");
}

//set music function
function setMusic() {
  renderSong();
  audio.src = currentSong().path;
  audio.play();
  animationCd.play();
}

// start function
function startFunc() {
  setup();
  clearInterval(timerPrac);

  setMusic();
  eventListeners();
  timePrac = levelTime;
  timerPrac = setInterval(solve, 1000);
}

//event Listeners Function
function eventListeners() {
  //xet ten bai tap va active
  setName_Active_Exercise();
  //event  speaker on-off
  onSpeaker.addEventListener("click", onOffSpeaker);
  offSpeaker.addEventListener("click", onOffSpeaker);
  //event music
  audio.onended = function () {
    currentSongPos++;
    if (currentSongPos >= listSong.length) currentSongPos = 0;
    audio.src = currentSong().path;
    audio.play();
    renderSong();
  };

  musicList.onclick = function (e) {
    console.log(e.target);
    currentSongPos = Number(e.target.getAttribute("index"));
    audio.src = currentSong().path;
    audio.play();
    renderSong();
  };
  musicIcon.onclick = function () {
    musicList.classList.toggle("active");
  };
}

//load current song
function currentSong() {
  return listSong[currentSongPos];
}

function setName_Active_Exercise() {
  if (activePosition >= listExercisesComponent.length) {
    console.log("xong set func");
    let finishComponet = $(".finish");
    finishComponet.style.display = "block";
    finishSound.play();
    finishSound.onended = () => {
      finishSound.play();
    };
  } else {
    exerciseName.innerHTML =
      "exercise: " +
      listExercisesComponent[activePosition].getAttribute("value");
    listExercisesComponent[activePosition].classList.add("active");

    var introcudeImg =
      listExercisesComponent[activePosition].getAttribute("introduce");
    introduce.style.backgroundImage = `url("${introcudeImg}")`;
  }
}

function relaxFunc() {
  timeBreak = restTime;
  clearInterval(timerPrac);
  timerBreak = setInterval(() => {
    if (timeBreak <= 0) {
      endSound.pause();
      endSound.load();
      clearInterval(timerBreak);
      activePosition++;
      if (activePosition < listExercisesComponent.length) {
        timePrac = levelTime;
        timerPrac = setInterval(solve, 1000);
      }
      setName_Active_Exercise();
      counterRelaxComponent.innerHTML = restTime;
    } else {
      counterRelaxComponent.innerHTML = timeBreak;
      timeBreak--;
      if (timeBreak < 4) {
        endSound.play();
      }
    }
  }, 1000);
}

function solve() {
  if (timePrac <= 0) {
    //rest
    endSound.pause();
    endSound.load();
    timeComponent.style.display = "none";
    relaxComponent.style.display = "block";
    relaxFunc();
  } else {
    timeComponent.style.display = "flex";
    relaxComponent.style.display = "none";
    if (timePrac <= 4) {
      //đổi màu chữ 3s cuối
      counterPracticesComponent.style.color = "rgb(255, 31, 31)";
      endSound.play();
    } else counterPracticesComponent.style.color = "white";
    counterPracticesComponent.innerHTML = timePrac;
    timePrac--;
  }
}
//pause Function
function pauseFunc() {
  if (startKey) {
    pauseKey = true;
    clearInterval(timerPrac);
    endSound.pause();
  }
}
//continue Function
function continueFunc() {
  if (pauseKey) {
    timerPrac = setInterval(solve, 1000);
    pauseKey = false;
  }
}

rendertimePrac();
startBtn.addEventListener("click", startFunc); // startbtn
pauseBtn.addEventListener("click", pauseFunc); //pause buttons
continueBtn.addEventListener("click", continueFunc); //continue buttons
