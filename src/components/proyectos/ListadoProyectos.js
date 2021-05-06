/*****************************************************************
 *    IMPORTACIÓN DEL COMPONENTE
 *****************************************************************/
import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import alertaContext from "../../context/alertas/alertaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

/*****************************************************************
 *    DEFINICIÓN DEL COMPONENTE
 *****************************************************************/
const ListadoProyectos = () => {
  //Extraer proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos, limpiarProyecto } = proyectosContext;

  const alertasContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  //Obtener proyectos, cuando carga el componente
  useEffect(() => {
    limpiarProyecto();
    //Si hay un error
    if (mensaje) {
      return mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje]);

  // Revisar si proyectos tiene contenido
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;
  /*****************************************************************
   *   RETURN DEL COMPONENTE
   *****************************************************************/
  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria} `}>{alerta.msg}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};
/*****************************************************************
 *   EXPORTACIÓN DEL COMPONENTE
 *****************************************************************/
export default ListadoProyectos;
