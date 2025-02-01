import React from 'react';

export default function Questionlist({ question, options, handleClick, currentAnswer }) {
  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li 
            key={index}
            onClick={() => handleClick(option)}
            className={currentAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
