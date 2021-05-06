import React, { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';


const FormTarea = ({ tarea }) => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Extraer tareas de state inicial
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    //Se extrae el proyecto activo

    const [proyectoActual] = proyecto;

    //Función que se ejecuta, cuando el usuario presiona el boton de eliminar tarea
    const clickEliminar = id => {
        if (tarea) {
            eliminarTarea(id, proyectoActual._id);
            obtenerTareas(proyectoActual._id);
        }
    }

    //Cambiar estado de la tarea

    const cambiarEstado = tarea => {
        tarea.estado = !tarea.estado;
        actualizarTarea(tarea);

    }
    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                    ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                    :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => clickEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    );
}

export default FormTarea;