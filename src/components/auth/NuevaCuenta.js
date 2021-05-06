import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //Extraer los Valores
    //Extraer proyectos de state inicial
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario, limpiarMensaje } = authContext;

    //En caso de que el usuariose haya autenticado o registrado o error

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
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    //Extraer usuario
    const { nombre, email, password, confirmar } = usuario;
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
        if (nombre.trim() === ''
            || email === ''
            || password === ''
            || confirmar === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //Validar password minimo  6 caracteres
        if (password.length < 6) {
            mostrarAlerta('El password debe tener mínimo 6 caracteres', 'alerta-error');
            return;
        }
        //Password y confirmación de passeorn¡d
        if (password !== confirmar) {
            mostrarAlerta('El password y la confirmación no coinciden', 'alerta-error');
            return;
        }
        //Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }
    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crea una Cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="password">Password</label>
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
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repetir contraseña"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme" />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver aIniciar Sesión
                </Link>
            </div>
        </div>

    );
}

export default NuevaCuenta;