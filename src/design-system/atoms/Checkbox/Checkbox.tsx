import React from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  isInvalid?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  onBlur,
  label,
  disabled = false,
  isInvalid = false,
}) => {
  return (
    <label
      htmlFor={id}
      className={`checkboxWrapper ${disabled ? 'checkboxWrapper--disabled' : ''}`.trim()}
    >
      <span className="controlContainer">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={isInvalid}
          className="nativeInput"
        />
        <span
          className={`customBox ${isInvalid ? 'customBox--invalid' : ''}`}
          aria-hidden="true"
        >
          {checked && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
      </span>
      {label && <span className="labelContent">{label}</span>}
    </label>
  );
};
