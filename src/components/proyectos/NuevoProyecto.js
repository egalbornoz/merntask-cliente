
/*****************************************************************
     *  IMPORTACIONES 
 *****************************************************************/
import React, { Fragment, useContext, useState } from "react";
import proyectoContext from '../../context/proyectos/proyectoContext';


/*********************************************************************
     *  DEFINICIÓN DEL COMPONENTE
 *********************************************************************/
const NuevoProyecto = () => {
  // Obtener stae del formulario
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorformulario,
    mostrarFormulario,
    agregarProyecto, mostrarError }
    = proyectosContext;

  //Crear State del Nuevo Proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: '',
  });

  //Extrayendo datos del proyecto
  const { nombre } = proyecto;
  //Lee los datos del formulario
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProyecto = (e) => {
    e.preventDefault();
    //Validar nombre del proyecto no este  vacio
    if (nombre === '') {
      mostrarError();
      return;
    }
    //Agregar al state
    agregarProyecto(proyecto);
    // Reiniciar Formulario
    guardarProyecto({
      nombre: ''
    })
  };

  //Mostrar formulario
  const onClickFormulario = () => {
    mostrarFormulario();
  }
  /*****************************************************************
     *  RETURN DEL COMPONENTE
 *****************************************************************/
  return (
    <Fragment>
      <button type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}>
        Nuevo Proyecto
      </button>

      { formulario ?
        (
          <form onSubmit={onSubmitProyecto} className="formulario-nuevo-proyecto">
            <input
              type="text"
              className="input-text"
              placeholder="Nombre del Proyecto"
              name="nombre"
              value={nombre}
              onChange={onChangeProyecto}
            />

            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Agregar Proyecto"
            />
          </form>
        ) : null
      }
      {errorformulario ? <p className="mensaje error">El Nombre del Proyecto es Obligarorio</p> : null}
    </Fragment>
  );
};
/*****************************************************************
     *  EXPORTACIÓN COMPONENTE
 *****************************************************************/
export default NuevoProyecto;
