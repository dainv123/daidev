import React, { useState } from 'react';
//import './SnackBar.css'; // Import your custom styles for the snack bar

function Snackbar({ show, hide, submit }) {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const showSnackbar = () => {
    setSnackbarVisible(true);
    show();
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
    hide();
  };

  const handleSnackbarSubmit = () => {
    submit();
  };

  return (
    <div>
      <button onClick={showSnackbar}>Show Snack Bar</button>
      {snackbarVisible && (
        <div className="snackbar">
          <button className="btn-close" onClick={hideSnackbar}>Close</button>
          <button className="btn-submit" onClick={handleSnackbarSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export const SectionSnackbar = Snackbar;
