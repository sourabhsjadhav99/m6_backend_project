
// to check role - is it admin or not ?
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.user.role === 'admin') {
      next(); // User is an admin, proceed to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Not authorized as an admin' });
    }
  };
  
  export default adminMiddleware;