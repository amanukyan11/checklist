import React from 'react';
import './ProgressBar.css';

const ProgressBar = (props) => {
  const { completed } = props;

  return (

    <div className="containerStyles">
      <div className="fillerStyles" style={{ width: `${completed}%`, backgroundColor: "#00695c" }}>
        <span className="labelStyles">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
