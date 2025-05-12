import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const ProtectedRoute = () => {
  const [open, setOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      setOpen(true);
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
    setShouldRedirect(true);
  };

  if (!isAuthenticated()) {
    return (
      <>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}   
            severity="warning"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Please login to continue.
          </Alert>
        </Snackbar>

        {shouldRedirect && <Navigate to="/login" replace />}
      </>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
