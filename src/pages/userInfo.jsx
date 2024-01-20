import React from 'react'
import dayjs from 'dayjs';
import {useForm} from 'react-hook-form'
import { FaRegCheckCircle } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import './forms.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const countries = [
    {
      value: 'Argentina',
    },
    {
      value: 'Bolivar',
    },
    {
      value: 'Ecuador',
    },
    {
      value: 'Venezuela',
    },
  ];

function userInfo() {

    const {register , handleSubmit , 
        formState: {errors}
    } = useForm()

    console.log(errors)
    
    const onSubmitFunction = handleSubmit((data) => {
        if(errors.name || errors.lastName || errors.birthDate || errors.country){
            console.log(errors)
        } else {
            navigate('/success')
        }
    })

    const todayDate = dayjs().subtract(0, 'day').format('YYYY');
    const datePicked = dayjs()

  return (
    <form onSubmit= {onSubmitFunction}>
        <center><h1>Registro Candidato</h1></center>

        <center><text><FaRegCheckCircle color='#B635D7'/> Informacion Personal</text></center>

        <div className='textField'><TextField
            className='textField'
            type='text'
            label="Nombre"
            color='secondary'
            {...register("name",{
                required: {
                    value: true,
                    message: 'Es requerido ingresar un nombre'
                },
                minLength: {
                    value: 2,
                    message: 'El nombre debe tener un minimo de 2 caracteres'
                }
            })}
        /></div>
        {
            errors.name && <span>{errors.name.message}</span>
        }

        <div className='textField'><TextField
            className='textField'
            type='text'
            label="Apellido"
            color='secondary'
            {...register("lastName",{
                required: {
                    value: true,
                    message: 'Es requerido ingresar un apellido'
                },
                minLength: {
                    value: 2,
                    message: 'El apellido debe tener un minimo de 2 caracteres'
                }
            })}
        /></div>
        {
            errors.lastName && <span>{errors.lastName.message}</span>
        }

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className='select'
                label="Fecha Nacimiento"
                type='date'
                value={dayjs(datePicked)}
                onChange={(datePicked) => {
                    console.log("Nueva fecha "+newDate)
                    datePicked = newDate}}
                {...register("birthDate",{
                    required: {
                        value: true,
                        message: 'Es requerido ingresar una fecha'
                    },
                    validate: (datePicked) => {
                      var fechaNacimiento = datePicked
                      console.log(fechaNacimiento)
                      fechaNacimiento =  dayjs().format('YYYY');
                      console.log(fechaNacimiento)
                        const edad = parseInt(todayDate) - parseInt(fechaNacimiento);
                        console.log("edad es " + edad)
                      return edad >= 18 || "Debes ser mayor de edad";
                    },
            })}
            />
        </LocalizationProvider>
        {
            errors.birthDate && <span>{errors.birthDate.message}</span>
        }
        
        <div className='textField'><TextField
            className='select'
            select
            label="Pais de Residencia"
            defaultValue="Venezuela"
            SelectProps={{
                native: true,
            }}
            {...register("country",{
                required: {
                    value: true,
                    message: 'Es requerido ingresar un pais'
                }
            })}
        >
        {countries.map((option) => (
            <option key={option.value} value={option.value}>
                {option.value}
            </option>
        ))}
        </TextField></div>
        {
            errors.country && <span>{errors.country.message}</span>
        }

        <center><button type='submit'>Siguiente</button></center>
    </form>
  )
}

export default userInfo
