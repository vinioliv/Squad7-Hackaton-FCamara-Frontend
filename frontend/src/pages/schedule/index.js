import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { format, getDay } from "date-fns";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { post } from "../../services/consult";

import meetingImg from "../../assets/Imagem-reuniao.png";

import "./styles.css";
import { saveNewDate } from "../../services/saveSchedule";
import { deleteDateScheduled } from "../../services/deleteSchedule";

export default function Schedule() {
  const [dayMonthYear, setDay] = useState("");

  const [notAllowed, setNotAllowed] = useState([]);
  const [scheduledByUser, setScheduled] = useState([]);

  const [month, setMonth] = useState();

  const [percentage, setPercentage] = useState(0);
  const [dateValue, setDate] = useState(0);
  const [remaining, setRemaing] = useState();
  const [office, setOffice] = useState("");

  const [dias, setDias] = useState([]);

  const [chosen, setChosen] = useState("");

  const [open, setOpen] = useState(false);

  function callendarUnavailable(event) {
    const splits = event.date.toString().split(" ", 4);
    const justDay = parseInt(splits[2]);

    if (notAllowed.includes(justDay)) {
      return "something";
    }
  }

  function callendarScheduled(event) {
    const splits = event.date.toString().split(" ", 4);
    const justDay = parseInt(splits[2]);

    if (scheduledByUser.includes(justDay)) {
      return "scheduled";
    }
  }

  function returnMonth(month) {
    let monthReturn = "";
    switch (month) {
      case "Jan":
        monthReturn = "01";
        setMonth("01");
        return monthReturn;

        break;
      case "Feb":
        monthReturn = "02";
        setMonth("02");
        return monthReturn;

        break;
      case "Mar":
        monthReturn = "03";
        setMonth("03");
        return monthReturn;

        break;
      case "Apr":
        monthReturn = "04";
        setMonth("04");
        return monthReturn;

        break;
      case "May":
        monthReturn = "05";
        setMonth("05");
        return monthReturn;

        break;
      case "Jun":
        monthReturn = "06";
        setMonth("06");
        return monthReturn;

        break;
      case "Jul":
        monthReturn = "07";
        setMonth("07");
        return monthReturn;

        break;
      case "Aug":
        monthReturn = "08";
        setMonth("08");
        return monthReturn;

        break;
      case "Sep":
        monthReturn = "09";
        setMonth("09");
        return monthReturn;

        break;
      case "Oct":
        monthReturn = "10";
        setMonth("10");
        return monthReturn;

        break;
      case "Nov":
        monthReturn = "11";
        setMonth("11");
        return monthReturn;
        break;
      case "Dec":
        monthReturn = "12";
        setMonth("12");
        return monthReturn;
        break;
    }
  }

  async function changeOffice() {
    const selectedOffice = document.getElementById("select-office");

    if (selectedOffice.value != 0) {
      const dateToday = format(new Date(), "dd/MM/yyyy");
      const data = {
        office_id: selectedOffice.value,
        schedule_date: dateToday,
      };
      const response = await post(data);
      var scheduled = [];

      if (response.daysNotAllowed != null) {
        const blockedDays = response.daysNotAllowed.map((day) => {
          if (day != null && day.scheduledByUser == false) {
            return day.dayNotAllowed;
          } else {
            scheduled.push(day.dayNotAllowed);
          }
        });
        setNotAllowed(blockedDays);
      }

      if (response.daysAllowed != null) {
        const scheduledDays = response.daysAllowed.map((day) => {
          if (day != null && day.scheduledByUser == false) {
            return day.dayAllowed;
          } else {
            scheduled.push(day.dayAllowed);
          }
        });
        setScheduled(scheduled);
      }
    }
  }

  async function chosenDay(value) {
    const selectedOffice = document.getElementById("select-office");

    if (selectedOffice.value == 0) {
      alert("Selecione o escritório");
    } else {
      const valueOffice =
        selectedOffice.value == 1 ? "Santos - SP" : "São Paulo - SP";
      setOffice(valueOffice);

      const splits = value.toString().split(" ", 4);
      const day = splits[2];
      var month = "";
      const year = splits[3];

      month = returnMonth(splits[1]);

      // if (scheduledByUser.includes(parseInt(day))) {
      //   document.getElementById("btn-agendar").innerText = "Cancelar";
      //   setChosen(day + "/" + month + "/" + year);

      // } else {
      //   document.getElementById("btn-agendar").innerText = "Agendar";
      //   setChosen(day + "/" + month + "/" + year);

      // }

      //switch estava aqui

      const data = {
        office_id: selectedOffice.value,
        schedule_date: day + "/" + month + "/" + year,
      };

      setDay(format(new Date(value), "dd/MM/yyyy"));

      try {
        const response = await post(data);

        if (response.daysAllowed != null) {
          for (let i = 0; i < response.daysAllowed.length; i++) {
            if (
              response.daysAllowed[i] != null &&
              day == response.daysAllowed[i].dayAllowed
            ) {
              setDate(response.daysAllowed[i].dayAllowed);
              setPercentage(response.daysAllowed[i].percentageAllowed);
              setRemaing(response.daysAllowed[i].remainingAmount);
              setOpen(true);
            }
          }
        }
        if (response.daysNotAllowed != null) {
          let daysNotAllowed = [];
          for (let i = 0; i < response.daysNotAllowed.length; i++) {
            if (
              response.daysNotAllowed[i] != null &&
              day == response.daysNotAllowed[i].dayNotAllowed
            ) {
              setDate(response.daysNotAllowed[i].dayNotAllowed);
              setPercentage(response.daysNotAllowed[i].percentageAllowed);
              setRemaing(response.daysNotAllowed[i].remainingAmount);
              daysNotAllowed.push(response.daysNotAllowed[i].dayNotAllowed);
              setOpen(true);
            }
          }
          setNotAllowed(daysNotAllowed);
          if (scheduledByUser.includes(parseInt(day))) {
            document.getElementById("btn-agendar").innerText = "Cancelar";
            setChosen(day + "/" + month + "/" + year);
          } else {
            document.getElementById("btn-agendar").innerText = "Agendar";
            setChosen(day + "/" + month + "/" + year);
          }
        }
      } catch (er) {
        alert("Erro");
      }
    }
  }

  async function deleteDate(office_id, dataDelete) {
    const data = {
      office_id: office_id,
      schedule_date: dataDelete,
    };

    const response = await deleteDateScheduled(data);

    if (response.msg == "The schedule was deleted!") {
      alert("Excluído com sucesso");
      changeOffice();
    } else {
      alert(response.msg);
      changeOffice();
    }
  }

  async function saveDate(e) {
    const selectedOffice = document.getElementById("select-office");
    if (selectedOffice.value == 0) {
      alert("Selecione um escritório");
    } else if (document.getElementById("btn-agendar").innerText == "Agendar") {
      const data = {
        office_id: selectedOffice.value,
        schedule_date: chosen,
      };

      const response = await saveNewDate(data);

      console.log("resposta: " + response);

      if (response.msg == "The schedule was successful!") {
        alert("Salvo");
        changeOffice();
      } else {
        alert("Erro ao deletar");
      }
    } else {
      deleteDate(selectedOffice.value, chosen);
    }
  }

  return (
    <div className="col-12 col-lg-12">
      <div className="content-calendar">
        <Calendar
          tileClassName={callendarScheduled}
          minDate={new Date()} //ano, mes, dia
          tileDisabled={callendarUnavailable}
          onChange={setDay}
          onClickDay={(dayMonthYear) => chosenDay(dayMonthYear)}
        />

        <div className="legends">
          <div className="legends-selected">
            <div className="circle-orange">
              <p className="legends-text">Selecionado</p>
            </div>
          </div>

          <div className="legends-scheduled">
            <div className="circle-green">
              <p className="legends-text">Agendado</p>
            </div>
          </div>

          <div className="legends-unavailable">
            <div className="circle-gray">
              <p className="legends-text">Indisponível</p>
            </div>
          </div>
        </div>

        <div className="container-offices">
          <p className="p-office">Escolha a sede que deseja ir</p>
          <select
            onChange={changeOffice}
            id="select-office"
            className="offices"
          >
            <option value="0">Sede</option>
            <option value="1">Santos</option>
            <option value="2">São Paulo</option>
          </select>
        </div>
      </div>

      <div className="container-section">
        <div className="div-progress-bar">
          <CircularProgressbar
            className={open ? "progress-bar-visible" : "progress-bar"}
            styles={buildStyles({
              pathColor: `#FE662E`,
              textColor: "black",
              trailColor: "#FEBBA2",
              textSize: 14,
            })}
            value={percentage}
            text={`${percentage}% vagas`}
          />
        </div>

        <div className={open ? "text-schedule-visible" : "text-schedule"}>
          <p id="textdescription">
            {remaining} Vagas disponíveis na sede de {office} no dia {dateValue}
            /{month}. Clique em agendar para marcar o dia
          </p>
        </div>
        <div className={open ? "div-img-invisible" : "div-img"}>
          <h2>Vamos tomar um suco de laranja?</h2>
          <img className="meeting-img" src={meetingImg} alt="meeting-image" />
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

        <input name="id" type="hidden"></input>
        <input name="day" type="hidden"></input>
        <button
          onClick={() => saveDate()}
          id="btn-agendar"
          className="button"
          type="submit"
        >
          Agendar
        </button>
      </div>
    </div>
  );
}
