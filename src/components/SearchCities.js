import React, { useEffect, useState } from "react";
import { api } from "../constants/ApiConstants";
import { Container } from "react-bootstrap";

export function SearchCities() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(undefined);
  const [loading, setLoading] = useState(false);

  function searchWeather() {
    setLoading(true);
    fetch(`${api.base}/weather?q=${city}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setWeather(json);
        setCity("");
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  }

  function dateBuilder(datum) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[datum.getDay()];
    let date = datum.getDate();
    let month = months[datum.getMonth()];
    let year = datum.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }
  function convertTime(unixTime) {
    let dt = new Date(unixTime * 1000);
    let h = dt.getHours();
    let m = "0" + dt.getMinutes();
    let t = h + ":" + m.substr(-2);
    return t;
  }

  useEffect(() => {
    console.log(weather);
  }, [weather]);
  return (
    <div
      className="border d-flex align-items-center justify-content-center fs-2  "
      style={{
        backgroundColor: "lightgray",
      }}
    >
      <Container fluid="md" className="text-center">
        {" "}
        {/* samo cities pa posle drugite  */}
        <div>
          {" "}
          {/* 1 */}
          <input
            type="text"
            placeholder="Search Cities"
            className=" p-2 m-2 "
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button onClick={searchWeather} className="btn btn-secondary">
            Search
          </button>
        </div>
        {weather && loading === false && (
          <div>
            <div>
              <div>
                {weather.name}, {weather.sys.country}
              </div>
              <div>{dateBuilder(new Date())}</div>
            </div>
            <div>
              <div>{Math.round(weather.main.temp)} &#8451;</div>
              <div>{weather.weather[0].main}</div>
              <div>
                {(weather.wind.speed * 3.6).toFixed(1)}
                <b> Km/h</b>
              </div>
              <div>
                {convertTime(weather.sys.sunrise)}
                <b> sunrise</b>
              </div>
              <div>
                {convertTime(weather.sys.sunset)}
                <b> sunset</b>
              </div>
            </div>
          </div>
        )}
        {loading}
      </Container>
    </div>
  );
}
