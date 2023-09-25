import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../../../components/Button';
import './PayError.scss';

export default function PayError() {
  const navigate = useNavigate();

  return (
    <div id="pay-error">
      <div className="header">
        <h1>Payment cancelled</h1>
        <p>A payment error has occurred</p>
      </div>
      <div className="footer">
        <Button contained onClick={() => navigate('/')}>
          Return Home
        </Button>
      </div>
    </div>
  );
}
