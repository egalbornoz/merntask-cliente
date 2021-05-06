/*****************************************************************
 *   IMPORTACIONES DEL REDUCER
*****************************************************************/
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    LIMPIAR_MENSAJE
} from '../../types';

/*****************************************************************
 *    DEFINICIÓN DEL REDUCER
*****************************************************************/
const reducerAuth = (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                autenticado: false,
                usuario: null,
                mensaje: action.payload,
                cargando: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload.usuario,
                cargando: false
            }
        case LIMPIAR_MENSAJE:
            return {
                ...state,
                mensaje: false
            }
        
        default:
            return state;
    }
}
/*****************************************************************
 *  EXPORTACIÓN DEL REDUCER
*****************************************************************/
export default reducerAuth;