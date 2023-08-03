let background = document.getElementById("background");
let home = document.getElementById("home");
let hourly = document.getElementById("hourly");
let daily = document.getElementById("daily");
let alarms = document.getElementById("alarms");
let alarmSettings = document.getElementById("alarm-settings");
home.style.display = "grid";
hourly.style.display = "none";
daily.style.display = "none";
alarms.style.display = "none";
alarmSettings.style.display = "none";

let currentTab = "Home";

let tabLeft = document.getElementById("tab-left");
let tabRight = document.getElementById("tab-right");
let hourLeft = document.getElementById("hour-left");
let hourRight = document.getElementById("hour-right");

// Home page
let feelsLike = document.getElementById("feels-like");
let temp = document.getElementById("temp");
let precipitation = document.getElementById("precipitation");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");

// Hourly
let dailyHigh = document.getElementById("high");
let dailyLow = document.getElementById("low");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let windSpeedHigh = document.getElementById("wind-speed-high");
// Images
let icon1 = document.getElementById("img1");
let icon2 = document.getElementById("img2");
let icon3 = document.getElementById("img3");
let icon4 = document.getElementById("img4");
let icon5 = document.getElementById("img5");
// Temperatures
let temp1 = document.getElementById("tp1");
let temp2 = document.getElementById("tp2");
let temp3 = document.getElementById("tp3");
let temp4 = document.getElementById("tp4");
let temp5 = document.getElementById("tp5");
// Hours
let hour1 = document.getElementById("tm1");
let hour2 = document.getElementById("tm2");
let hour3 = document.getElementById("tm3");
let hour4 = document.getElementById("tm4");
let hour5 = document.getElementById("tm5");

//Daily
let max1 = document.getElementById("day1-high");
let min1 = document.getElementById("day1-low");
let max2 = document.getElementById("day2-high");
let min2 = document.getElementById("day2-low");
let max3 = document.getElementById("day3-high");
let min3 = document.getElementById("day3-low");
let max4 = document.getElementById("day4-high");
let min4 = document.getElementById("day4-low");
let max5 = document.getElementById("day5-high");
let min5 = document.getElementById("day5-low");
// Week days
let weekDay1 = document.getElementById("week-day1");
let weekDay2 = document.getElementById("week-day2");
let weekDay3 = document.getElementById("week-day3");
let weekDay4 = document.getElementById("week-day4");
let weekDay5 = document.getElementById("week-day5");
// Week day icons
let iconDay1 = document.getElementById("img-day1");
let iconDay2 = document.getElementById("img-day2");
let iconDay3 = document.getElementById("img-day3");
let iconDay4 = document.getElementById("img-day4");
let iconDay5 = document.getElementById("img-day5");

// Alarms
let alarm = document.getElementById("alarm-noise");
let alarmTime = document.getElementById("alarm");
let stopAlarm = document.getElementById("stop-alarm");
let alarmSettingsButton = document.getElementById("settings-icon");
let repeat = document.getElementById("repeat");
let tone = document.getElementById("tone");
let countdown = document.getElementById("countdown");

alarmSettingsButton.addEventListener("click", function () {
    alarms.style.display = "none";
    alarmSettings.style.display = "grid";
})

// Stop alarm
stopAlarm.addEventListener("click", function () {
    stopAlarm.innerHTML = "Cancel";
    if (repeat.value === "never") {
        alarmTime.value = "--:--" // Set the alarm to blank
    }
    alarm.currentTime = 0; // Restart the alarm
    alarm.pause();
    console.log("Stopping");
});


let weekDays = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
};

let hour = 0;
hourLeft.addEventListener("click", function () {
    if (hour > 0) {
        hour -= 5;
    }
});
// Move to the next hour when displaying hourly weather
hourRight.addEventListener("click", function () {
    if (hour < 25) {
        hour += 5;
    }
})

// Tab left
tabLeft.addEventListener("click", function () {
    if (currentTab == "Hourly") {
        currentTab = "Home";
        home.style.display = "grid";
        hourly.style.display = "none";
    } else if (currentTab == "Daily") {
        currentTab = "Hourly";
        hourly.style.display = "grid";
        daily.style.display = "none";
    } else if (currentTab == "Alarms") {
        currentTab = "Daily";
        daily.style.display = "grid";
        alarms.style.display = "none";
        alarmSettings.style.display = "none";
    }
})
// Tab right
tabRight.addEventListener("click", function () {
    if (currentTab == "Home") {
        currentTab = "Hourly";
        home.style.display = "none";
        hourly.style.display = "grid";
    } else if (currentTab == "Hourly") {
        currentTab = "Daily";
        hourly.style.display = "none";
        daily.style.display = "grid";
    } else if (currentTab == "Daily") {
        currentTab = "Alarms";
        daily.style.display = "none";
        alarms.style.display = "grid";
    }
})
// Converrt 24 hour format to 12 hour format
function fromMilitary(hours) {
    hours = hours % 24;
    hours = hours % 12 || 12;
    hours = hours >= 10 ? hours : "0" + hours.toString();
    return hours;
}
// Convert unix time to 12 hour format
function convertUnix(unix) {
    let time = new Date(unix * 1000);
    let hours = fromMilitary(time.getHours());
    let minutes = "0" + time.getMinutes();
    let seconds = "0" + time.getSeconds();

    return [hours + ":" + minutes.substr(-2) +
        ":" + seconds.substr(-2), time.getHours()];
}

function updateWeather() {
    let now = new Date();
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var api = "https://api.open-meteo.com/v1/" +
        "forecast?latitude=42.36&longitude" +
        "=-71.06&hourly=temperature_2m," +
        "relativehumidity_2m,apparent_temperature" +
        ",precipitation_probability,precipitation," +
        "weathercode,windspeed_10m&daily=weathercode," +
        "temperature_2m_max,temperature_2m_min,sunrise," +
        "sunset,windspeed_10m_max&current_weather=true&" +
        "temperature_unit=fahrenheit&windspeed_unit=mph&" +
        "precipitation_unit=inch&timeformat=unixtime&" +
        "timezone=America%2FNew_York";

    let imageMap =
    {
        0: "resources/clear_sky.png",
        1: "resources/partly-cloudy.png",
        2: "resources/partly-cloudy.png",
        3: "resources/overcast.png",
        45: "resources/fog.png",
        48: "resources/fog.png",
        51: "resources/drizzle.png",
        53: "resources/drizzle.png",
        55: "resources/drizzle.png",
        56: "resources/drizzle.png",
        57: "resources/drizzle.png",
        61: "resources/rain.png",
        63: "resources/rain.png",
        65: "resources/rain.png",
        66: "resources/rain.png",
        67: "resources/rain.png",
        71: "resources/snowy.png",
        73: "resources/snowy.png",
        75: "resources/snowy.png",
        77: "resources/snowy.png",
        80: "resources/rain.png",
        81: "resources/rain.png",
        82: "resources/rain.png",
        85: "resources/snowy.png",
        86: "resources/snowy.png",
        95: "resources/thunderstorm.png",
        96: "resources/thunderstorm.png",
        99: "resources/thunderstorm.png",
        100: "resources/moon.png",
    }

    fetch(api)
        .then(res => res.json())
        .then(data => {
            let index = now.getHours() + hour;
            // Geet the weather for the now
            temp.innerHTML = data["hourly"]["temperature_2m"][index - hour] + "&deg;F";
            feelsLike.innerHTML = "Feels like " + data["hourly"]["apparent_temperature"][index - hour] + "&deg;F";
            precipitation.innerHTML = "Precipitation: " + data["hourly"]["precipitation_probability"][index - hour] + "%";
            humidity.innerHTML = "Humidity: " + data["hourly"]["relativehumidity_2m"][index - hour] + "%";
            wind.innerHTML = "Wind speed: " + data["hourly"]["windspeed_10m"][index - hour] + "mph";

            // Get today's weather including sunrise and sunset
            dailyHigh.innerHTML = data["daily"]["temperature_2m_max"][0] + "&deg;F";
            dailyLow.innerHTML = data["daily"]["temperature_2m_min"][0] + "&deg;F";

            let sunriseObject = convertUnix(data["daily"]["sunrise"][index / 24 | 0]);
            let sunriseTime = sunriseObject[0];
            let sunriseHour = sunriseObject[1];
            sunrise.innerHTML = "Sunrise: " + sunriseTime;

            let sunsetObject = convertUnix(data["daily"]["sunset"][index / 24 | 0]);
            let sunsetTime = sunsetObject[0];
            let sunsetHour = sunsetObject[1];
            sunset.innerHTML = "Sunset: " + sunsetTime;
            windSpeedHigh.innerHTML = "Wind speed high: " + data["daily"]["windspeed_10m_max"][0] + "mph";
            // Images
            icon1.src = index % 24 >= sunriseHour && index % 24 <= sunsetHour ? imageMap[[data["hourly"]["weathercode"][index]]] : imageMap[100];
            icon2.src = (index + 1) % 24 >= sunriseHour && (index + 1) % 24 <= sunsetHour ? imageMap[[data["hourly"]["weathercode"][index + 1]]] : imageMap[100];
            icon3.src = (index + 2) % 24 >= sunriseHour && (index + 2) % 24 <= sunsetHour ? imageMap[[data["hourly"]["weathercode"][index + 2]]] : imageMap[100];
            icon4.src = (index + 3) % 24 >= sunriseHour && (index + 3) % 24 <= sunsetHour ? imageMap[[data["hourly"]["weathercode"][index + 3]]] : imageMap[100];
            icon5.src = (index + 4) % 24 >= sunriseHour && (index + 4) % 24 <= sunsetHour ? imageMap[[data["hourly"]["weathercode"][index + 4]]] : imageMap[100];
            // Temperatures
            temp1.innerHTML = data["hourly"]["temperature_2m"][index] + "&deg;F";
            temp2.innerHTML = data["hourly"]["temperature_2m"][index + 1] + "&deg;F";
            temp3.innerHTML = data["hourly"]["temperature_2m"][index + 2] + "&deg;F";
            temp4.innerHTML = data["hourly"]["temperature_2m"][index + 3] + "&deg;F";
            temp5.innerHTML = data["hourly"]["temperature_2m"][index + 4] + "&deg;F";
            // Hours
            hour1.innerHTML = fromMilitary(now.getHours() + hour) + ":00";
            hour2.innerHTML = fromMilitary(now.getHours() + 1 + hour) + ":00";
            hour3.innerHTML = fromMilitary(now.getHours() + 2 + hour) + ":00";
            hour4.innerHTML = fromMilitary(now.getHours() + 3 + hour) + ":00";
            hour5.innerHTML = fromMilitary(now.getHours() + 4 + hour) + ":00";
            // Daily
            let weekDay = now.getDay();
            max1.innerHTML = data["daily"]["temperature_2m_max"][0] + "&deg;F";
            min1.innerHTML = data["daily"]["temperature_2m_min"][0] + "&deg;F";
            max2.innerHTML = data["daily"]["temperature_2m_max"][1] + "&deg;F";
            min2.innerHTML = data["daily"]["temperature_2m_min"][1] + "&deg;F";
            max3.innerHTML = data["daily"]["temperature_2m_max"][2] + "&deg;F";
            min3.innerHTML = data["daily"]["temperature_2m_min"][2] + "&deg;F";
            max4.innerHTML = data["daily"]["temperature_2m_max"][3] + "&deg;F";
            min4.innerHTML = data["daily"]["temperature_2m_min"][3] + "&deg;F";
            max5.innerHTML = data["daily"]["temperature_2m_max"][4] + "&deg;F";
            min5.innerHTML = data["daily"]["temperature_2m_min"][4] + "&deg;F";
            // Week days
            weekDay1.innerHTML = weekDays[weekDay].substr(0, 3);
            weekDay2.innerHTML = weekDays[(weekDay + 1) % 7].substr(0, 3);
            weekDay3.innerHTML = weekDays[(weekDay + 2) % 7].substr(0, 3);
            weekDay4.innerHTML = weekDays[(weekDay + 3) % 7].substr(0, 3);
            weekDay5.innerHTML = weekDays[(weekDay + 4) % 7].substr(0, 3);
            // Week day icons
            iconDay1.src = imageMap[data["daily"]["weathercode"][0]];
            iconDay2.src = imageMap[data["daily"]["weathercode"][1]];
            iconDay3.src = imageMap[data["daily"]["weathercode"][2]];
            iconDay4.src = imageMap[data["daily"]["weathercode"][3]];
            iconDay5.src = imageMap[data["daily"]["weathercode"][4]];

            console.log(data)
        })//.catch(err => alert("Something went wrong"))
}

let first = false;
function updateClock() {
    let now = new Date();
    let time = document.getElementById("time");
    let date = document.getElementById("date");

    let meridiem = now.getHours() < 12 ? 'AM' : 'PM';
    let hours = now.getHours() < 13 ? now.getHours() : now.getHours() - 12;
    hours = hours >= 10 ? hours : "0" + hours.toString();
    let minutes = now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes().toString();
    let seconds = now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds().toString();
    time.innerHTML = hours + ":" +
        minutes + ":" +
        seconds + " " +
        meridiem;
    let months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };
    date.innerHTML = weekDays[now.getDay()] + ", " +
        months[now.getMonth()] + " " +
        now.getDate() + ", " +
        now.getFullYear();

    let nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    let alarmSeconds = Math.floor(alarmTime.value.substr(0, 2)) * 3600 + Math.floor(alarmTime.value.substr(3, 5)) * 60;

    let difference = new Date(null);
    difference.setSeconds(alarmSeconds - nowSeconds);

    if (alarmTime.value == "") {
        countdown.style.display = "none";
    } else {
        countdown.style.display = "block";
        countdown.innerHTML = difference.toISOString().substr(11, 8);

        first = true;
    }

    if(Math.floor(now.getHours()) >= 17 || Math.floor(now.getHours) <= 6) {
        //background.style.display = "block";
    }else {
        //background.style.display = "none";
    }

    // Set alarm
    if (Math.floor(now.getHours()) == Math.floor(alarmTime.value.substr(0, 2)) && minutes == alarmTime.value.substr(3, 5) && seconds == "00") {
        if ((repeat.value == "weekends" && now.getDay() % 6 == 0) ||
            (repeat.value == "weekdays" && now.getDay() % 6 != 0) ||
            first) {
            home.style.display = "none";
            hourly.style.display = "none";
            daily.style.display = "none";
            alarms.style.display = "grid";
            stopAlarm.innerHTML = "Stop";

            alarm.loop = true;

            if (tone.value == "cats dog") {
                alarm.src = "resources/ruffmeow.mp3";
            } else if (tone.value == "viva la vida") {
                alarm.src = "resources/viva_la_vida.mp3";
            }

            alarm.play();
            first = false;
            console.log(alarm.src);
        } else {
            countdown.style.display = "none";
        }
    }
}

setInterval(updateClock, 1000);
setInterval(updateWeather, 1000);