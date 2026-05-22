//================
// Role Middleware
//================

const RoleMiddleware = (...Roles) => {
  return async (
    request,
    response,
    next
  ) => {
    try {
      if (!Roles.includes(request.User.Role)) {
        return response.status(403).json({
          Success: false,
          Message: "Access denied",
        });
      }

      next();
    } catch (error) {
      response.status(500).json({
        Success: false,
        Message: error.message,
      });
    }
  };
};

export default RoleMiddleware;