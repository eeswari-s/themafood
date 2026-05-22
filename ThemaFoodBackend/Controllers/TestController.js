//================
// User Dashboard
//================

export const UserDashboard = async (
  request,
  response
) => {
  try {
    response.status(200).json({
      Success: true,
      Message: "User Dashboard Success",
      User: request.User,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Admin Dashboard
//================

export const AdminDashboard = async (
  request,
  response
) => {
  try {
    response.status(200).json({
      Success: true,
      Message: "Admin Dashboard Success",
      User: request.User,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};