/*****************************************************************
  *  IMPORTS
 *****************************************************************/
import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
} from '../../types';
/*****************************************************************
  *  DEFINICIÓN DEL STATE
 *****************************************************************/
const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null,
    }
    const [state, dispatch] = useReducer(TareaReducer, initialState);
    /*****************************************************************
      * OBTENER TAREAS DE UN PROYECTO
     *****************************************************************/
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            });
        } catch (error) {
            console.log(error)
        }
    }
    /*****************************************************************
     * AGREGAR TAREAS A UN PROYECTO
    *****************************************************************/
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data
            });
        } catch (error) {
            console.log(error)
        }
    }
    /*****************************************************************
      * VALIDAR TAREA
     *****************************************************************/
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
        });
    }
    /*****************************************************************
      * ELIMINAR TAREA DE UN PROYECTO
     *****************************************************************/
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } })
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error)
        }
    }

    /*****************************************************************
      * SELECCIONAR TAREA PARA EDICIÓN
     *****************************************************************/
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }
    /*****************************************************************
      * ACTUALIZAR TAREA
     *****************************************************************/
    const actualizarTarea = async tarea => {
        try {
            const resultado=await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (error) {
            console.log(error);
        }
    }
    /*****************************************************************
      * LIMIAR TAREA
     *****************************************************************/
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA,

        });
    }
    /*****************************************************************
      * RETORNAR CONTEXTPROVIDER TAREA
     *****************************************************************/
    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}
/*****************************************************************
  * EXPORTAR
 *****************************************************************/
export default TareaState;