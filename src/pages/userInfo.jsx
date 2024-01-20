import React, { useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { FaRegCheckCircle } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import "./forms.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate, Link } from "react-router-dom";

const countries = ["Elige un pais","Argentina", "Bolivar", "Ecuador", "Venezuela"];

function userInfo() {
  const [value, setValue] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const todayDate = dayjs().subtract(0, "day").format("YYYY");

  const onSubmitFunction = handleSubmit((data) => {

    if (errors.name || errors.lastName || errors.birthDate || errors.country) {
      console.log(errors);
    } else {
      navigate("/success");
    }
  });

  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmitFunction}>
      <center>
        <h1>Registro Candidato</h1>
      </center>

      <center>
        <text>
          <FaRegCheckCircle color="#B635D7" /> Informacion Personal
        </text>
      </center>

      <div className="textField">
        <TextField
          className="textField"
          type="text"
          label="Nombre"
          color="secondary"
          {...register("name", {
            required: {
              value: true,
              message: "Es requerido ingresar un nombre",
            },
            minLength: {
              value: 2,
              message: "El nombre debe tener un minimo de 2 caracteres",
            },
          })}
        />
      </div>
      {errors.name && <span>{errors.name.message}</span>}

      <div className="textField">
        <TextField
          className="textField"
          type="text"
          label="Apellido"
          color="secondary"
          {...register("lastName", {
            required: {
              value: true,
              message: "Es requerido ingresar un apellido",
            },
            minLength: {
              value: 2,
              message: "El apellido debe tener un minimo de 2 caracteres",
            },
          })}
        />
      </div>
      {errors.lastName && <span>{errors.lastName.message}</span>}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="select"
          label="Fecha Nacimiento"
          type="date"
          name="birthDate"
          value={value ? dayjs(value) : null}
          id="datepicker"
          onChange={(newValue) => {
            setValue(newValue);
            console.log("alo2");
          }}
          {...register("birthDate", {
            required: {
              value: true,
              message: "Es requerido ingresar una fecha",
            },
            validate: (algo, dos) => {
              var fechaNacimiento = algo;
              var selected = document.querySelector('[name="birthDate"]').value;
              var year = new Date(selected);
              fechaNacimiento = dayjs().format("YYYY");
              const edad = parseInt(todayDate) - parseInt(year.getFullYear());
              return edad >= 18 || "Debes ser mayor de edad";
            },
          })}
        />
      </LocalizationProvider>
      {errors.birthDate && <span>{errors.birthDate.message}</span>}

      <div className="textField">
        <TextField
          className="select"
          select
          label="Pais de Residencia"
          SelectProps={{
            native: true,
          }}
          {...register("country", {
            required: {
              value: true,
              message: "Es requerido ingresar un pais",
            },
            validate: (value) => {
                return (
                    value !=  "Elige un pais" ||
                  "Debes ingresar un pais"
                );
              },
          })}
        >
          {countries.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </div>
      {errors.country && <span>{errors.country.message}</span>}

      <center>
        <button type="submit">Siguiente</button>
      </center>
    </form>
  );
}

export default userInfo;
