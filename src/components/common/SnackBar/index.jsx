// src/components/Common/AppSnackbar.jsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackBar = ({ open, message, severity = "success", onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%", fontWeight: "medium" }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
