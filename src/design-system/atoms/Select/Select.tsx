import React from "react";
import { SvgIcon } from "../SvgIcon/SvgIcon";
import "./Select.css";

export interface SelectOption {
	label: string;
	value: string;
	disabled?: boolean;
}

export interface SelectProps {
	id: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
	options: SelectOption[];
	placeholder?: string;
	disabled?: boolean;
	isInvalid?: boolean;
}

export const Select: React.FC<SelectProps> = ({
	id,
	name,
	value,
	onChange,
	onBlur,
	options,
	placeholder,
	disabled = false,
	isInvalid = false,
}) => {
	return (
		<div className="select-wrapper">
			<select
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				disabled={disabled}
				aria-invalid={isInvalid}
				className={`select ${isInvalid ? "select--invalid" : ""}`.trim()}>
				{placeholder && (
					<option
						value=""
						disabled
						hidden={value !== ""}>
						{placeholder}
					</option>
				)}
				{options.map((opt) => (
					<option
						key={opt.value}
						value={opt.value}
						disabled={opt.disabled}>
						{opt.label}
					</option>
				))}
			</select>
			<span
				className="chevron"
				aria-hidden="true">
				<SvgIcon
					url="/assets/svg/chevron-down.svg"
					width={16}
					height={16}
				/>
			</span>
		</div>
	);
};
