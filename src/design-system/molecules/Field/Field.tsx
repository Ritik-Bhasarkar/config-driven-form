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
	children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
	id,
	label,
	hint,
	error,
	required = false,
	children,
}) => {
	const hintId = hint ? `${id}-hint` : undefined;
	const errorId = error ? `${id}-error` : undefined;

	const describedBy =
		[hintId, errorId].filter(Boolean).join(" ") || undefined;

	const control = React.isValidElement<FieldControlProps>(children)
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
					{label}

					{required && (
						<span
							className="field--required"
							aria-hidden="true">
							*
						</span>
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
