import axios from "axios";
import React, { useState, useEffect } from "react";
import { api } from "../constants/ApiConstants";
import { Container, Table } from "react-bootstrap";

export function EuropeanCities() {
  const [weather, setWeather] = useState(undefined);
  const [loading, setLoading] = useState(false);

  function getWeatherInfo(selectedCity) {
    setLoading(true);
    axios({
      url: `${api.base}/forecast?q=${selectedCity}&cnt=7&units=metric&APPID=${api.key}`,
      method: "GET",
    })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      })
      .catch((err) => {
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
    <div>
      <br />
      <div className="text-center ">
        <button
          onClick={() => {
            getWeatherInfo("Berlin");
          }}
          className="btn btn-secondary"
        >
          Berlin
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Paris");
          }}
          className="btn btn-secondary"
        >
          Paris
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Rome");
          }}
          className="btn btn-secondary"
        >
          Rome
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Sofia");
          }}
          className="btn btn-secondary"
        >
          Sofia
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Prague");
          }}
          className="btn btn-secondary"
        >
          Prague
        </button>
        <button
          onClick={() => {
            getWeatherInfo("London");
          }}
          className="btn btn-secondary"
        >
          London
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Oslo");
          }}
          className="btn btn-secondary"
        >
          Oslo
        </button>
        <div className=" text-center ">
          {weather &&
            loading === false &&
            weather.list.map((w, i) => {
              return (
                <Container
                  fluid="md"
                  className="m-auto border border-dark w-100 p-3 mt-5 "
                >
                  <h1>{dateBuilder(new Date(w.dt_txt))}</h1>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Temperature</th>
                        <th>Weather</th>
                        <th>icon</th>
                        <th>date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>{weather.city.name}</td>
                        <td>{weather.city.country}</td>
                        <td>{Math.round(w.main.temp)}°c</td>
                        <td>{w.weather[0].main}</td>
                        <td>{w.weather[0].icon}</td>

                        <td> {convertTime(w.dt)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Container>
              );
            })}
          {loading}
        </div>
      </div>
    </div>
  );
}
