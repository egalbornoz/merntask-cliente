/*****************************************************************
  *  IMPORTACIÓN DEL PROYECTO
 *****************************************************************/
import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

/*****************************************************************
  *  COMPONENTE PROYECTO
 *****************************************************************/
const Proyecto = ({ proyecto }) => {
    // Obtener stae de Proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;
    // Obtener stae de Tareas
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;
    /*****************************************************************
      *  SELECCIÓN DE PROYECTO
     *****************************************************************/
    //Función para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id);  // Fijar proyecto actual
        obtenerTareas(id);   //Filtra las tareas
    }
    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    );
}
/*****************************************************************
 *   EXPORTACIÓN DE COMPONENTE
*****************************************************************/
export default Proyecto;