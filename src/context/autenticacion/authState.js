/************************************************************************************
     *  IMPORTS
    *************************************************************************************/
import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authrReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    LIMPIAR_MENSAJE
} from '../../types';

/************************************************************************************
 * STATE INICIAL
*************************************************************************************/
const AuthState = props => {
    //State inicial
    const initialState = {
        //Almacea el tokrn en el localStorage
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }
    const [state, dispatch] = useReducer(authrReducer, initialState);
    /************************************************************************************
     * RETORNA LOS DATOS DEL USUARIO AUTENTICADO
    *************************************************************************************/
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }
    /************************************************************************************
     *  REGISTRAR USUARIO
    *************************************************************************************/
    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });
            //Obtener datos del usuario Autenticado
            usuarioAutenticado();
        } catch (error) {
            // console.log(error.response.data.errors[0].msg);
            const alerta = {
                msg: error.response.data.errors[0].msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }

/************************************************************************************
 *  INCIAR SESIÓN DEL USUARIO
*************************************************************************************/
    const iniciarSesion = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth/login', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
            //Obtener datos del usuario Autenticado
            usuarioAutenticado();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload:alerta
            });
        }
    }
    /************************************************************************************
    *  CERRAR SESIÓN DEL USUARIO
   *************************************************************************************/
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }
    /************************************************************************************
 *  INCIAR SESIÓN DEL USUARIO
*************************************************************************************/
const limpiarMensaje=()=>{
    dispatch({
        type: LIMPIAR_MENSAJE,
    });
}
    /************************************************************************************
    *  RETORNO DEL PROVIDER DEL AUTHSTATE
   *************************************************************************************/
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion,
                limpiarMensaje

            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;