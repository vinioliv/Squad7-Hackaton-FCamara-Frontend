import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./styles.css";

export default function Schedule() {
  const [value, onChange] = useState(new Date());

  const percentage = 75;

  function chosenDay(value) {
    const splits = value.toString().split(" ", 4);
    console.log(splits);
  }
  return (
    <div className="col-12 col-lg-6">
      <div className="content">
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={chosenDay(value)}
        />

        <div className="container-offices">
     
          <select className="offices">
          <option value="0">Sede</option>
            <option value="1">Santos</option>
            <option value="2">São Paulo</option>
          </select>
        </div>

        <div className="container-section">
          <div id="barra" className="progress-bar">
            <CircularProgressbar
              styles={buildStyles({
                pathColor: `#FE662E`,
                textColor: "black",
                trailColor: "#FEBBA2",
              })}
              value={percentage}
              text={`${percentage}%`}
            />
          </div>

          <div className="text-schedule">
          <p>45 Vagas disponíveis na sede de Santos- SP no dia 16/09/2021. Clique em agendar para marcar o dia</p>
          </div>

          <h4>Dicas:</h4>
          <div className="tips"> 
            <ul>
              <li>Sempre use mascara;</li>
              <li>Respeite o distanciamento;</li>
              <li>use álcool em gel;</li>
              <li>Tenha uma garrafinha;</li>
              <li>Se divirta bastante;</li>
            </ul>
          </div>
          <form>
            <input name="id" type="hidden"></input>
            <input name="day" type="hidden"></input>
            <button className="button" type="submit">
              Agendar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
