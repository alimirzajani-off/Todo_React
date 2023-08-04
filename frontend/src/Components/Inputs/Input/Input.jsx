import React from "react";
import "./Input.scss";
export const Input = ({
  value,
  onChange,
  type = "text",
  label,
  placeholder = "",
  readOnly,
}) => {
  if (type == "checkbox") {
    return (
      <div className="input">
        {label && <label className="input-label">{label}</label>}
        <input
          className="input-box"
          checked={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          max={5}
        />
      </div>
    );
  } else {
    return (
      <div className="input">
        {label && <label className="input-label">{label}</label>}
        {readOnly ? (
          value
        ) : (
          <input
            className="input-box"
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  }
};
