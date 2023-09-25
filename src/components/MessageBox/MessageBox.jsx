import React, {useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import {Alert, AlertTitle} from '@mui/material';

export default function MessageBox({reset, ...props}) {
  const [snackState, setSnackState] = useState({
    open: true
  });

  const {vertical, horizontal, open} = snackState;

  const handleClose = () => {
    setSnackState({open: false});
    // setSnackState({...snackState, open: open == true ? false : true});
    reset();
  };
  return (
    <>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={snackState.open}
        // onClose={() => this.setSnackState({open: false})}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={props.severity}>
          <AlertTitle>Error</AlertTitle>
          {props.children}
        </Alert>
      </Snackbar>
    </>
  );

  // <div className={`alert alert-${props.variant || 'info'}`}>
  //   {props.children}
  // </div>
}
