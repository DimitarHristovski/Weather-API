import axios from "axios";
import React, { useState, useEffect } from "react";
import { api } from "../constants/ApiConstants";
import { Container, Table } from "react-bootstrap";

export function LocalCities() {
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);

  function getWeatherInfo(selectedCity) {
    setLoading(true);
    axios({
      url: `${api.base}/forecast?q=${selectedCity}&cnt=16&units=metric&APPID=${api.key}`,
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
            getWeatherInfo("Lippstadt");
          }}
          className="btn btn-secondary"
        >
          Lippstadt
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Detmold");
          }}
          className="btn btn-secondary"
        >
          Detmold
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Hamburg");
          }}
          className="btn btn-secondary"
        >
          Hamburg
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Marburg");
          }}
          className="btn btn-secondary"
        >
          Marburg
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Dortmund");
          }}
          className="btn btn-secondary"
        >
          Dortmund
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Kassel");
          }}
          className="btn btn-secondary"
        >
          Kassel
        </button>
        <button
          onClick={() => {
            getWeatherInfo("Paderborn");
          }}
          className="btn btn-secondary"
        >
          Paderborn
        </button>
        <div className=" text-left ">
          <Container
            fluid="md"
            className="m-auto border border-dark w-100 p-3 mt-5"
          >
            <Table>
              <thead>
                gi
                <tr>
                  <th>#</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Temperature</th>
                  <th>Weather</th>
                  <th>Date</th>
                  <th>Date/Hours</th>
                </tr>
              </thead>
              <tbody>
                {weather &&
                  loading === false &&
                  weather.list.map((w, i) => {
                    return (
                      <tr key={i} className="border border-dark ">
                        <td></td>

                        <td>{weather.city.name}</td>
                        <td>{weather.city.country}</td>
                        <td>{Math.round(w.main.temp)}°c</td>
                        <td>{w.weather[0].main}</td>
                        <td> {dateBuilder(new Date(w.dt_txt))}</td>

                        <td> {convertTime(w.dt)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Container>

          {loading}
        </div>
      </div>
    </div>
  );
}
