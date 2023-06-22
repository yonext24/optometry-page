import React from 'react'
import '../../styles/Login/Login.css'

export function Login () {
  return (
        <React.Fragment>
            <div className="row">
                <div className="col left-login">
                <div className="card">
                      <div className="card-body">
                        <h1 className="card-title">Iniciar Sesion</h1>
                        <p className="card-text">Introduce tus datos para iniciar sesión</p>
                        <form className="my-sign-p-4" id='cuadro'>
                            <div className="my-input">
                                <div className="icono"><i className="bi bi-person"></i></div>
                                <input type="email" className="form-control" name="email" placeholder="Email" />
                            </div>
                            <div className="my-input">
                                <div className="icono"><i className="bi bi-lock"></i></div>
                                <input type="password" name="password" className="form-control" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-sesion">Ingresar</button>
                            {/* error? <span>Error con el correo o la contraseña</span>:<span></span> */}
                        </form>
                      </div>
                    </div>
                </div>
                <div className="col right-login">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Logo_de_la_Univesidad_de_la_Salle_%28Bogot%C3%A1%29.svg/2560px-Logo_de_la_Univesidad_de_la_Salle_%28Bogot%C3%A1%29.svg.png" alt="Logo la salle" />
                </div>
            </div>
        </React.Fragment>
  )
}
