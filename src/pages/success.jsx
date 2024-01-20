import React from 'react'
import { FaRegCheckCircle } from "react-icons/fa";
import './success.css'

function success() {
  return (
    <div className='success-cont'>
      <h1 className='registered'>Formulario llenado exitosamente</h1>
      <h2 className='ready'>Ya puedes empezar a buscar trabajo</h2>
      <center><FaRegCheckCircle size='200px' color='#B635D7'/></center>
    </div>
  )
}

export default success
