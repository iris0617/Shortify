import React from "react";
const Input = ({ name, label, error, value, onChange }) => {
  return (
    <div className="form-group">
      <h5>{label}</h5>
      <input
        value={value}
        onChange={onChange}
        error={error}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
