import React from "react";
import "./Button.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outline";
	isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	isLoading = false,
	disabled = false,
	children,
	className = "",
	...rest
}) => {
	return (
		<button
			{...rest}
			type={rest.type ?? "button"}
			disabled={disabled || isLoading}
			className={`button button--${variant} ${className}`.trim()}>
			{isLoading ? "Loading..." : children}
		</button>
	);
};
