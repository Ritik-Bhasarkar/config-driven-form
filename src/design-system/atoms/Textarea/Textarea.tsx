import React from "react";
import "./Textarea.css";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	id: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	isInvalid?: boolean;
	showCharacterCount?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
	id,
	name,
	value,
	onChange,
	onBlur,
	placeholder,
	disabled = false,
	isInvalid = false,
	showCharacterCount = false,
	maxLength,
	...rest
}) => {
	return (
		<div className="textarea">
			<textarea
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				disabled={disabled}
				aria-invalid={isInvalid}
				className={`textarea--control ${
					isInvalid ? "textarea--invalid" : ""
				}`}
				{...rest}
			/>

			{showCharacterCount && maxLength !== undefined && (
				<span
					className={`textarea--counter ${
						value.length > maxLength
							? "textarea--counter-exceeded"
							: ""
					}`.trim()}>
					{value.length}/{maxLength}
				</span>
			)}
		</div>
	);
};
