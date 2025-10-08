import React from 'react';
import './Input.css';

const Input = ({ id, label, type = 'text', value, onChange, error = false, ...rest }) => {
  return (
    <div className="ui-input-group">
      <label htmlFor={id} className="ui-input-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`ui-input-field ${error ? 'ui-input-error' : ''}`}
        {...rest}
      />
    </div>
  );
};

export default Input;
