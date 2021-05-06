/***************************************************************************
 *  PARA PROTEGER LAS RUTAS PRIVADAS CUANDO NO HAYA USUARIO AUTENTICADO
 ****************************************************************************/

import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';


const RutaPrivada = ({ component: Component, ...props }) => {

    const authContex = useContext(AuthContext);
    const { autenticado, usuarioAutenticado, cargando } = authContex;
    //Para que al recargar se mantengan los datos del usuario auteticado
    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Route {...props} render={props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )} />
    );
}

export default RutaPrivada;