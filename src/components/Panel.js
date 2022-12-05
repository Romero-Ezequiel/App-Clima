import React, {useState} from "react";
import Form from "./Form";
import Card from "./Card";


const Panel = () => {
    let urlClima = "https://api.openweathermap.org/data/2.5/weather?appid=d0f4018e3c992726849a47b78861105a&lang=es";
    let urlCiudad = "&q=";
    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?appid=d0f4018e3c992726849a47b78861105a&lang=es";


    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState("");

    const getLocation = async(loc) => {
        setLoading(true);
        setLocation(loc);

        urlClima = urlClima + urlCiudad + loc;

        await fetch(urlClima).then((response) =>{
            if(!response.ok) throw {response}
            return response.json();
        }).then((weatherData) =>{
            console.log(weatherData);
            setWeather(weatherData);
        }).catch(error => {
            console.log(error);
            setLoading(false);
            setShow(false);
        });


        urlForecast = urlForecast + urlCiudad + loc;
        await fetch(urlForecast).then((response) =>{
            if(!response.ok) throw {response}
            return response.json();
        }).then((forecastData) =>{
            console.log(forecastData);
            setForecast(forecastData);

            //Visualiza la informacion
            setLoading(false);
            setShow(true);

        }).catch(error => {
            console.log(error);
            setLoading(false);
            setShow(false);
        });


    }

    return (
        <React.Fragment>
            <Form
                newLocation = {getLocation}
            />

            <Card
                showData = {show}
                loadingData = {loading}
                weather = {weather}
                forecast = {forecast}
            />
        </React.Fragment>
    );

}

export default Panel;