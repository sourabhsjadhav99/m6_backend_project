const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied.' });
      }
      next();
    };
  };
  
  export default authorizeRoles;


  
//   import express from 'express';
//   import authMiddleware from '../middleware/authMiddleware.js';
//   import authorizeRoles from '../middleware/roleMiddleware.js';
  
//   const router = express.Router();
  
//   // Example of an admin-only route
//   router.get('/admin', authMiddleware, authorizeRoles('admin'), (req, res) => {
//     res.json({ message: 'This is an admin-only route', user: req.user });
//   });
  
//   export default router;
  