import React from 'react';
import './LoadingBox.scss';
import { CircularProgress } from '@mui/material';

export default function LoadingBox() {
  return (
    <div className="loading-box">
      <CircularProgress className="circular-progress" thickness={5} size={80} />
    </div>
  );
}
