// importing elements
const currentTime = document.getElementById('current-time');
const setAlarm = document.getElementById('set-alarm');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const ampm = document.getElementById('ampm');
const alarmUL = document.getElementById('alarmUL');

// list of alarms
const alarmList = [];

// populating select element for alarm input
function selectTimeOptions() {
  var hrs = 12;
  var min = 59;
  var sec = 59;
  for (i = 1; i <= hrs; i++) {
    hours.options[hours.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
  for (i = 0; i <= min; i++) {
    minutes.options[minutes.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
  for (i = 0; i <= sec; i++) {
    seconds.options[seconds.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}

selectTimeOptions();

// removes an alarm from the unordered list and alarmList
alarmUL.addEventListener('click', e => {

  const deleteAlarm = e.target.parentElement.childNodes[0].textContent;
  let newAlarmList = alarmList.filter(alarm => alarm !== deleteAlarm);
  alarmList.length = 0;
  alarmList.push.apply(alarmList, newAlarmList)
  if (e.target.classList.contains("deleteAlarm")) {
    e.target.parentElement.remove();
  }
})

// setting new alarm
setAlarm.addEventListener('click', function () {
  const newAlarm = hours.options[hours.selectedIndex].text + ':'
    + minutes.options[minutes.selectedIndex].text + ':'
    + seconds.options[seconds.selectedIndex].text + ' '
    + ampm.options[ampm.selectedIndex].text;
  if (alarmList.includes(newAlarm)) {
    alert(`Alarm already set for ${newAlarm}`)
  } else {
    alarmList.push(newAlarm);
    const newAlarmLI = `
          <li class = "time-list"><span class="time btn btn-success">${newAlarm}</span>
          <button class="btn btn-danger deleteAlarm " id="delete-button"  value=${newAlarm}>Delete Alarm</button>       
          </li>`
    alarmUL.innerHTML += newAlarmLI;
  }
});

// format time to AM/PM
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  return strTime;
}


// window
window.addEventListener('DOMContentLoaded', function () {
  setInterval(function () {
    currentTime.textContent = formatAMPM(new Date());
    if (alarmList.includes(currentTime.textContent)) {
      alert(`Time is ${currentTime.textContent}`)
    }
  }, 1000)
});