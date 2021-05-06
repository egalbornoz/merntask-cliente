/*****************************************************************
  *  IMPORTS DE LA APP
 *****************************************************************/
import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR,
    LIMPIAR_PROYECTO
}
    from '../../types';
import clienteAxios from '../../config/axios.js';
/*******************************************************************
 *  STATE DE PROYECTOS
********************************************************************/
const ProyectoState = props => {
    /***************************************************************
     *  STATE INICIAL
    ****************************************************************/
    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }
    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);
    //Serie de funciones para el  CRUD de proyectos
    /***************************************************************
     *  FUNCIÓN MOSTRAR FORMULARIO_PROYECTO (REDUCERSTATE)
    *****************************************************************/
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }
    /***************************************************************
   *  FUNCIÓN OBTENER_PROYECTOS (REDUCERSTATE).
    ******************************************************************/
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }
    /***************************************************************
    *  FUNCIÓN AGREGAR_PROYECTO (REDUCERSTATE)
   *****************************************************************/
    const agregarProyecto = async (proyecto) => {
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }
    /*********************************************************************
    *  FUNCIÓN VALIDAR_FORMULARIO (REDUCERSTATE)
   ***********************************************************************/
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO,
        })
    }
    /**********************************************************************
    *  FUNCIÓN PARA OBTENER  PROYECTO_ACTUAL (REDUCERSTATE)
   ************************************************************************/
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }
    /**********************************************************************
     *  FUNCIÓN PARA ELIMINAR_PROYECTO (REDUCERSTATE)
    ***********************************************************************/
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }
    /**********************************************************************
        *  FUNCIÓN PARA LIMPIAR_PROYECTO_SELECCIONADO (REDUCERSTATE)
       ***********************************************************************/
    const limpiarProyecto = () => {
        dispatch({
            type: LIMPIAR_PROYECTO
        })
    }
    /***********************************************************************
        *  RETURN DEL PROVIDER DEL PROYECTCONTEXT
       ***********************************************************************/
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto,
                limpiarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}
/***********************************************************************
*  EXPORTACIONES
***********************************************************************/
export default ProyectoState;