import React, { useState } from 'react';
//import './SnackBar.css'; // Import your custom styles for the snack bar

function Snackbar() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = () => {
    setSnackbarMessage('This is a snack bar!');
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleSnackbarSubmit = () => {
    alert('Submit button clicked!');
  };

  return (
    <div>
      <button onClick={showSnackbar}>Show Snack Bar</button>
      {snackbarVisible && (
        <div className="snackbar">
          {snackbarMessage}
          <button className="btn-close" onClick={hideSnackbar}>Close</button>
          <button className="btn-submit" onClick={handleSnackbarSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export const SectionSnackbar = Snackbar;
