import React , {useState} from 'react'
import {useForm} from 'react-hook-form'
import { FaRegCheckCircle } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import { useNavigate , Link } from "react-router-dom";

import './forms.css'

const validEmail = "prueba@gmail.com"
const validPassword = "prueba123"

function login() {

    const {register, reset , handleSubmit , 
        formState: {errors}
    } = useForm()

    const [passwordCheck, setSpanPassword] = useState(false);

    const [emailCheck, setSpanEmail] = useState(false);
    
    
    const onSubmitFunction = handleSubmit((data) => {
        if(errors.email || errors.password || errors.confirmPassword){
            console.log(errors)
        }else if (data.password != validPassword || data.email != validEmail){

            if(data.password != validPassword){
                if(!passwordCheck) {
                    setSpanPassword(passwordCheck => !passwordCheck)
                }
            }

            if(data.email != validEmail){
                if(!emailCheck) {
                    setSpanEmail(emailCheck => !emailCheck)
                }
            }

            if(data.email == validEmail){
                if(emailCheck) {
                    setSpanEmail(emailCheck => !emailCheck)
                }
            }

            if(data.password == validPassword){
                if(passwordCheck) {
                    setSpanPassword(passwordCheck => !passwordCheck)
                }
            }
            
        }
        else {
            reset()
            navigate('/success')
        }
    })

    const navigate = useNavigate();

  return (
<div>
    <form onSubmit= {onSubmitFunction}>
    <center><h1>Iniciar sesión</h1></center>
    <center><text><FaRegCheckCircle color='#B635D7'/> Correo y contraseña</text></center>
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
    {
        emailCheck && <span>Email incorrecto</span>
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
    {
        passwordCheck && <span>Contraseña incorrecta</span>
    }
    <center><Link className='forgot' to="">Olvidaste tu contraseña?</Link></center>

    <center><button type='submit'>Siguiente</button></center>

    </form>

    <center><div className='hint'>
        <text>
        Correo de prueba = prueba@gmail.com    
        Contraseña de prueba = prueba123
        </text>
    </div></center>
</div>

  )
}

export default login