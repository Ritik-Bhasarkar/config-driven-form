import React from 'react';
import './TextInput.css';

export interface TextInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'tel' | 'password' | 'url';
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  disabled = false,
  isInvalid = false,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={isInvalid}
			className={`text-input ${isInvalid ? 'text-input--invalid' : ''}`.trim()}
    />
  );
};
