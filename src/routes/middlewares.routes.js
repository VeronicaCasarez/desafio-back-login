// Middleware para verificar si el usuario está logueado
export function isLoggedIn(req, res, next) {
    if (req.session.user) {
      // Si el usuario está logueado, permite el acceso a la siguiente ruta
      return next();
    } else {
      // Si el usuario no está logueado, redirige al inicio de sesión
      return res.redirect("/");
    }
  }
  
  // Middleware para verificar si el usuario ya está logueado y redirigirlo al perfil
  export function redirectToProfileIfLoggedIn(req, res, next) {
    if (req.session.user) {
      // Si el usuario ya está logueado, redirige al perfil
      return res.redirect("/profile");
    } else {
      // Si el usuario no está logueado, permite el acceso a la siguiente ruta
      return next();
    }
  }
  