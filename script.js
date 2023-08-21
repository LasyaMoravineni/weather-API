const apiKey="9c91f856065ab75a3d2475d4e70dabbe";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".inputfield");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon= document.querySelector(".weather-icon");


async function check(city){
    const response= await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status== 404){
        document.querySelector(".error").innerHTML = "Invalid location";

        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    }
    else if(searchBox.value== ""){
        //window.alert("Please enter a location"); (or)
        document.querySelector(".error").innerHTML = "You must enter a location";
        document.querySelector(".error").style.display = "block";


    }
    else{
    
    var data= await response.json();

    console.log(data);
    document.querySelector(".city").innerHTML= data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp) + "°C";
    document.querySelector(".desc").innerHTML= capitalize(data.weather[0]["description"]);
    document.querySelector(".humidity").innerHTML= data.main.humidity + " %";
    document.querySelector(".Windspeed").innerHTML= data.wind.speed + " km/h";
    // document.querySelector(".Precipitation").innerHTML= data.
    
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display= "none";

}
}

function capitalize(str){
    const arr= str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }
    const str2 = arr.join(" ");

    return str2;


}

 /*linking enter key to add button */
searchBox.addEventListener("keyup",function(event){
    if(event.keyCode==13){
        event.preventDefault();
        searchBtn.click();
    }
});

searchBtn.addEventListener("click", ()=>{
    check(searchBox.value);

})

