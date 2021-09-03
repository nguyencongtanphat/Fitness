const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var lowBtn = $(".low_level");
var heightBtn = $(".height_level");
var timeValue;
console.log(heightBtn);
//get level time and save localStorage
function getSaveLevelTime(e) {
  timeValue = e.target.getAttribute("value");
  localStorage.setItem("levelTime", timeValue);
}
lowBtn.addEventListener("click", getSaveLevelTime);
heightBtn.addEventListener("click", getSaveLevelTime);
