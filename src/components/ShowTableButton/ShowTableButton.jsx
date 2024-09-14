import React from 'react';
import Button from '../Buttons/Button';

import './ShowTableButton.css';

const ShowTableButton = ({ showTable, toggleShowTable }) => {
  return (
    <Button className='show-country-btn' variant='primary' onClick={toggleShowTable} label={showTable ? 'Hide Countries' : 'Show All Countries'} />
  );
};

export default ShowTableButton;
