import React from "react";
import "./Field.css";

interface FieldControlProps {
	id?: string;
	"aria-describedby"?: string;
	"aria-invalid"?: boolean;
	isInvalid?: boolean;
}

export interface FieldProps {
	id: string;
	label?: React.ReactNode;
	hint?: string;
	error?: string;
	required?: boolean;
	optional?: boolean;
	children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
	id,
	label,
	hint,
	error,
	required = false,
	optional = false,
	children,
}) => {
	const hintId = hint ? `${id}-hint` : undefined;
	const errorId = error ? `${id}-error` : undefined;

	const describedBy =
		[hintId, errorId].filter(Boolean).join(" ") || undefined;

	const control = React.isValidElement<FieldControlProps>(children) // Clone the child element and add the field's props to it
		? React.cloneElement(children, {
				id: children.props.id ?? id,
				"aria-describedby": describedBy,
				"aria-invalid": error ? true : undefined,
				isInvalid: Boolean(error),
			})
		: children;

	return (
		<div className="field">
			{label && (
				<label
					htmlFor={id}
					className="field--label">
					<span className="field--label-text">{label}</span>

					{required && (
						<span
							className="field--required"
							aria-hidden="true">
							*
						</span>
					)}

					{optional && (
						<span className="field--optional">(Optional)</span>
					)}
				</label>
			)}

			<div className="field--control">{control}</div>

			{hint && (
				<p
					id={hintId}
					className="field--hint">
					{hint}
				</p>
			)}

			{error && (
				<p
					id={errorId}
					className="field--error"
					role="alert">
					{error}
				</p>
			)}
		</div>
	);
};
