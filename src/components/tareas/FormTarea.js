import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener stae de Tareas
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada,
        errortarea,
        agregarTarea,
        validarTarea,
        obtenerTareas,
        actualizarTarea,
        limpiarTarea } = tareasContext;

    //useEffect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [tareaseleccionada])



    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });
    // Extraer el nombre del proyecto

    const { nombre } = tarea;
    if (!proyecto) return null;

    const [proyectoActual] = proyecto;
    //Leer los valores del formulario

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    //Función para agregar la tarea 
    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }
        //Revisar si es Edición o Nueva Tarea
        if (tareaseleccionada === null) {
            //Agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //Actualizar tarea existente
            actualizarTarea(tarea);
            //Elimina la tarea seleccionada           
            limpiarTarea();
        }
        // Obtener las tareas del proyecto
        obtenerTareas(proyectoActual._id);
        //Reiniciar el form
        guardarTarea({
            nombre: ''
        });

    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">

                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form >
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div >


    );
}

export default FormTarea;