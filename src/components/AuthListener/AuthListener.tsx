import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../../services/AuthService';
import { setUser, setRoles } from '../../redux/authSlice';
import { userService } from '../../services/UserService'; 

interface AuthListenerProps {
  children: React.ReactNode;
}

const AuthListener: React.FC<AuthListenerProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    //authService.signOut();
    console.log("Authlistener montado");
    const unsubscribe = authService.onAuthStateChanged(async (currentUser) => {
      console.log("AuthListener detectó un cambio en la autenticación.");
      if (currentUser) {
        try {
          // Obtener roles y datos adicionales como name y lastname
          // const userRoles = await authService.getUserRoles(currentUser);
          // const userData = await userService.getUserData(currentUser.uid);  // Este servicio puede obtener 'name' y 'lastname' de la base de datos
          const [userRoles, userData] = await Promise.all([
                authService.getUserRoles(currentUser),
                userService.getUserData(currentUser.uid)
            ]);
          console.log("Entro en AuthListener");
          console.log("UserDate vale: " + userData?.name);
          console.log("UserDate id vale: " + currentUser?.uid);
          if (userData) {
            // Despachar el usuario y sus datos a Redux
            dispatch(setUser({
              userid: currentUser.uid,
              name: userData.name,
              lastname: userData.lastname
            }));
          }

          dispatch(setRoles(userRoles));
        } catch (error) {
          console.error('Error al obtener los roles o datos del usuario:', error);
          dispatch(setRoles(null));
        }
      } else {
        // Si no hay usuario autenticado, limpiar el estado de roles y usuario
        dispatch(setRoles(null));
        dispatch(setUser({
          userid: null,
          name: null,
          lastname: null
        }));
      }
      setLoading(false);
    });

    return () => {
      console.log("AuthListener desmontado"); // <-- Para ver si se desmonta en algún momento
      unsubscribe();
    };

  }, [dispatch]);
  if (loading) return <div>Cargando...</div>;
  return <>{children}</>;
};

export default AuthListener;
