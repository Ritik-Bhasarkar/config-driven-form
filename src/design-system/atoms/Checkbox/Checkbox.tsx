import React from "react";
import { SvgIcon } from "../SvgIcon/SvgIcon";
import "./Checkbox.css";

export interface CheckboxProps {
	id: string;
	name: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	label?: React.ReactNode;
	required?: boolean;
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
	required = false,
	disabled = false,
	isInvalid = false,
}) => {
	return (
		<label
			htmlFor={id}
			className={`checkbox-wrapper ${disabled ? "checkbox-wrapper--disabled" : ""}`.trim()}>
			<span className="control-container">
				<input
					id={id}
					name={name}
					type="checkbox"
					checked={checked}
					onChange={onChange}
					onBlur={onBlur}
					disabled={disabled}
					aria-invalid={isInvalid}
					required={required}
					className="native-input"
				/>
				<span
					className={`custom-box ${isInvalid ? "custom-box--invalid" : ""}`}
					aria-hidden="true">
					{checked && <SvgIcon url="/assets/svg/checked.svg" />}
				</span>
			</span>
			{label && (
				<span className="label-content">
					{label}
					{required && (
						<span className="checkbox-required" aria-hidden="true">
							*
						</span>
					)}
				</span>
			)}
		</label>
	);
};
