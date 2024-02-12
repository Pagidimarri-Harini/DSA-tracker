import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GridCell from './GridCell';
// import InformationPage from './InformationPage';
import './interview.css';

const Interview= () => {
  const gridHeadings = ['Accenture', 'Athena Health', 'Amazon', 'Bank Of America', 'IBM', 'KPIT', 'Oracle', 'Persistent Systems', 'State Street', 'Sify', 'VISA', 'Wabtec'];

  return (
      <div>
          <h1><center>Interview Experiences</center></h1>
          <div className="grid-container">
            {gridHeadings.map((heading, index) => (
              <GridCell key={index} heading={heading} />
            ))}
          </div>
        </div>
  );
};

export default Interview;