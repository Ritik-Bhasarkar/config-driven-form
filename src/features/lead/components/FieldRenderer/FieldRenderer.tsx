import React from "react";

import { Checkbox, Field, Select, Textarea, TextInput } from "@/design-system";

import type {
	LeadFieldConfig,
	LeadFormValues,
} from "../../config/leadFormConfig";

interface FieldRendererProps {
	field: LeadFieldConfig;
	values: LeadFormValues;
	error?: string;
	onChange: (name: keyof LeadFormValues, value: string | boolean) => void;
	onBlur: (name: keyof LeadFormValues) => void;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
	field,
	values,
	error,
	onChange,
	onBlur,
}) => {
	const value = values[field.name];

	const handleChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		onChange(field.name, event.target.value);
	};

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		onChange(field.name, event.target.checked);
	};

	const renderControl = () => {
		switch (field.type) {
			case "text":
			case "email":
				return (
					<TextInput
						id={field.name}
						name={field.name}
						type={field.type}
						value={String(value)}
						placeholder={field.placeholder}
						onChange={handleChange}
						onBlur={() => onBlur(field.name)}
					/>
				);

			case "select":
				return (
					<Select
						id={field.name}
						name={field.name}
						value={String(value)}
						options={field.options ?? []}
						placeholder={field.placeholder}
						onChange={handleChange}
						onBlur={() => onBlur(field.name)}
					/>
				);

			case "textarea":
				return (
					<Textarea
						id={field.name}
						name={field.name}
						value={String(value)}
						placeholder={field.placeholder}
						onChange={handleChange}
						onBlur={() => onBlur(field.name)}
						maxLength={field.validations?.maxLength}
					/>
				);

			case "checkbox":
				return (
					<Checkbox
						id={field.name}
						name={field.name}
						checked={Boolean(value)}
						onChange={handleCheckboxChange}
						onBlur={() => onBlur(field.name)}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<Field
			id={field.name}
			label={field.label}
			hint={field.hint}
			error={error}
			required={field.validations?.required}>
			{renderControl()}
		</Field>
	);
};
