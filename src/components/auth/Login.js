import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    //Extraer los Valores
    //Extraer proyectos de state inicial
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion, limpiarMensaje } = authContext;


    //En caso de que el usuarios o password no exista

    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');//Redirige al usuario a los proyectos
        } else {
            limpiarMensaje();
        }
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje, autenticado, props.history])

    //State para iniciar Sesión
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });


    //Extraer usuario
    const { email, password } = usuario;
    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    //Función Submit Inicio  de sesión

    const onSubmit = e => {
        e.preventDefault();
        // Válidar campos
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //Pasarlo al action
        iniciarSesion({ email, password })
    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dar">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Passord</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión" />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>

    );
}

export default Login;