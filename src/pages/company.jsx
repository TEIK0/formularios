import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegCheckCircle } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { useNavigate, Link } from "react-router-dom";

import "./forms.css";

const rubros = [
    "Elige algo",
    "Apps mobiles",
    "Paginas web",
    "Softwares varios",
    "Sistemas de seguridad",
];

const countries = ["Elige un pais","Argentina", "Ecuador", "Venezuela"];

const employesquantity = [
    "Escoge un valor",
    "1-5 empleados",
    "6-15 empleados",
    "16-50 empleados",
    "51-100 empleados",
    "100+ empleados",]

function company() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitFunction = handleSubmit((data) => {
    if (errors.email || errors.password) {
      console.log(errors);
    } else {
      reset();
      navigate("/success");
    }
  });

  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmitFunction}>
      <center>
        <h1>Registrar empresa</h1>
      </center>
      <div className="textField">
        <TextField
          className="textField"
          type="text"
          label="Nombre empresa"
          color="secondary"
          {...register("name", {
            required: {
              value: true,
              message: "Es requerido ingresar el nombre de la empresa",
            },
            minLength: {
              value: 2,
              message:
                "Es requerido el nombre de la empresa tenga mas de 2 caracteres",
            },
          })}
        />
      </div>
      {errors.name && <span>{errors.name.message}</span>}
      <div className="textField">
        <TextField
          className="textField"
          type="integer"
          label="Años de actividad"
          color="secondary"
          {...register("years", {
            required: {
              value: true,
              message: "Es requerido ingresar los años activos de la empresa",
            },
            validate: (date) => {
              return (
                date >= 0 ||
                "No se puede ingresar valores negativos en este campo"
              );
            },
          })}
        />
      </div>
      {errors.years && <span>{errors.years.message}</span>}

      <div className="textField">
        <TextField
          className="select"
          select
          label="Rubro"
          SelectProps={{
            native: true,
          }}
          {...register("rubro", {
            required: {
              value: true,
              message: "Es requerido ingresar el Rubro de la empresa",
            },
            validate: (value) => {
                return (
                    value !=  "Elige algo" ||
                  "Debes elegir un rubro"
                );
              },
          })}
        >
          {rubros.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </div>
      {errors.rubro && <span>{errors.rubro.message}</span>}

      <div className="textField">
        <TextField
          className="select"
          select
          label="Cantidad empleados"
          SelectProps={{
            native: true,
          }}
          {...register("employes", {
            required: {
              value: true,
              message: "Es requerido ingresar cantidad de empleados",
            },
            validate: (value) => {
                return (
                    value !=  "Escoge un valor" ||
                  "Debes ingresar la cantidad de empleados"
                );
              },
          })}
        >
          {employesquantity.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </div>
      {errors.employes && <span>{errors.employes.message}</span>}

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

      <div className="textField">
        <TextField
          className="textField"
          type="text"
          label="Cultura laboral"
          color="secondary"
          multiline
          minRows={3}
          {...register("culture", {
            required: {
              value: true,
              message: "Es requerido ingresar una descripción de la cultura laboral de la empresa",
            },
            minLength: {
                value: 100,
                message: "La descripcion de la cultura laboral deben tener almenos 100 caracteres"
            }
          })}
        />
      </div>
      {errors.culture && <span>{errors.culture.message}</span>}

      <div className="textField">
        <TextField
          className="textField"
          type="text"
          label="Beneficios de ingresar a la empresa"
          color="secondary"
          multiline
          minRows={3}
          {...register("benefits", {
            required: {
              value: true,
              message: "Es requerido ingresar una descripción de los beneficios de la empresa",
            },
            minLength: {
                value: 100,
                message: "La descripcion de los beneficios deben tener almenos 100 caracteres"
            }
          })}
        />
      </div>
      {errors.benefits && <span>{errors.benefits.message}</span>}

      <center>
        <button type="submit">Siguiente</button>
      </center>
    </form>
  );
}

export default company;
