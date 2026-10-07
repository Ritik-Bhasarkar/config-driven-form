import type {
	LeadFieldConfig,
	LeadFormErrors,
	LeadFormValues,
} from "../config/leadFormConfig";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLeadField(
	field: LeadFieldConfig,
	values: LeadFormValues,
): string | undefined {
	if (field.visibleWhen && !field.visibleWhen(values)) {
		return undefined;
	}

	const value = values[field.name];
	const rules = field.validations;

	if (!rules) {
		return undefined;
	}

	// Checkbox validation
	if (field.type === "checkbox") {
		if (rules.required && value !== true) {
			return "You must give consent to proceed.";
		}

		return undefined;
	}

	const stringValue = typeof value === "string" ? value.trim() : "";

	// Required validation
	if (rules.required && !stringValue) {
		if (field.type === "select") {
			return `Please select a ${field.label.toLowerCase()}.`;
		}

		return `${field.label} is required.`;
	}

	// Optional empty fields are valid
	if (!stringValue) {
		return undefined;
	}

	// Email validation
	if (rules.email && !EMAIL_REGEX.test(stringValue)) {
		return "Please enter a valid email address.";
	}

	// Exact digit validation
	if (rules.exactDigits !== undefined) {
		const digitsRegex = new RegExp(`^\\d{${rules.exactDigits}}$`);

		if (!digitsRegex.test(stringValue)) {
			return `${field.label} must contain exactly ${rules.exactDigits} digits.`;
		}
	}

	// Maximum length validation
	if (rules.maxLength !== undefined && stringValue.length > rules.maxLength) {
		return `${field.label} cannot exceed ${rules.maxLength} characters.`;
	}

	return undefined;
}

export function validateLeadForm(
	config: LeadFieldConfig[],
	values: LeadFormValues,
): LeadFormErrors {
	const errors: LeadFormErrors = {};

	for (const field of config) {
		const error = validateLeadField(field, values);

		if (error) {
			errors[field.name] = error;
		}
	}

	return errors;
}
