import React , {useState} from 'react'
import {useForm} from 'react-hook-form'
import { FaRegCheckCircle } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

import './forms.css'

function email() {

    const {register, reset , handleSubmit , 
        formState: {errors}
    } = useForm()

    const [diferentPasswords, setSpan] = useState(false);
    
    
    const onSubmitFunction = handleSubmit((data) => {
    
        if(errors.email || errors.password || errors.confirmPassword){
            console.log(errors)
        }else if (data.password != data.confirmPassword){
            console.log("contraseñas no iguales")

            if(!diferentPasswords){
                setSpan(diferentPasswords => !diferentPasswords)
            }
            
        }
        else {
            reset()
            navigate('/inputInfo')
        }
    })

    const navigate = useNavigate();

  return (
    <form onSubmit= {onSubmitFunction}>
        <center><h1>Registro Candidato</h1></center>
        <center><text><FaRegCheckCircle color='#B635D7'/>Correo y contraseña</text></center>
        <div className='textField'><TextField
            className='textField'
            type='email'
            label="Correo"
            color='secondary'
            {...register("email",{
                required: {
                    value: true,
                    message: 'Es requerido ingresar un correo'
                }
            })}
        /></div>
        {
            errors.email && <span>{errors.email.message}</span>
        }

        <div className='textField'><TextField
            className='textField'
            type='password'
            label="Contraseña"
            color='secondary'
            {...register("password",{
                required: {
                    value: true,
                    message: 'Es requerido ingresar una contraseña'
                },
                minLength: {
                    value: 8,
                    message: 'La contraseña debe tener almenos 8 caracteres'
                }
            })}
        /></div>
        {
            errors.password && <span>{errors.password.message}</span>
        }

        <div className='textField'><TextField
            className='textField'
            type='password'
            label="Confirmar Contraseña"
            color='secondary'
            {...register("confirmPassword",{
                required: {
                    value: true,
                    message: 'Debe ingresar confirmacion de contraseña'
                },
                minLength: {
                    value: 8,
                    message: 'La contraseña debe tener almenos 8 caracteres'
                }
                
            })}
        /></div>
        {
            errors.confirmPassword && <span>{errors.confirmPassword.message}</span>
        }
        {
            diferentPasswords && <span>Las contraseñas deben ser iguales</span>
        }

        <center><button type='submit'>Siguiente</button></center>
    </form>
  )
}

export default email