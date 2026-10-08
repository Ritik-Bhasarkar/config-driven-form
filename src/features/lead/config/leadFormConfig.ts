import type { SelectOption } from "@/design-system";

export type FieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export interface ValidationRules {
	required?: boolean;
	email?: boolean;
	exactDigits?: number;
	maxLength?: number;
}

export interface LeadFormValues {
	fullName: string;
	email: string;
	leadType: string;
	companyName: string;
	phone: string;
	notes: string;
	consent: boolean;
}

export interface LeadFieldConfig {
	name: keyof LeadFormValues;
	type: FieldType;
	label: string;
	summaryLabel?: string;
	optional?: boolean;
	placeholder?: string;
	hint?: string;
	options?: SelectOption[];
	validations?: ValidationRules;
	visibleWhen?: (values: LeadFormValues) => boolean;
	colSpan?: 1 | 2;
}

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

export const INITIAL_LEAD_FORM_VALUES: LeadFormValues = {
	fullName: "",
	email: "",
	leadType: "",
	companyName: "",
	phone: "",
	notes: "",
	consent: false,
};

export const leadFormConfig: LeadFieldConfig[] = [
	{
		name: "fullName",
		type: "text",
		label: "Full Name",
		placeholder: "e.g. Jane Doe",
		validations: {
			required: true,
		},
		colSpan: 1,
	},

	{
		name: "email",
		type: "email",
		label: "Work Email",
		summaryLabel: "Email Address",
		placeholder: "jane@company.com",
		validations: {
			required: true,
			email: true,
		},
		colSpan: 1,
	},

	{
		name: "leadType",
		type: "select",
		label: "Lead Type",
		placeholder: "Select lead type...",
		options: [
			{
				label: "Individual",
				value: "Individual",
			},
			{
				label: "Company",
				value: "Company",
			},
		],
		validations: {
			required: true,
		},
		colSpan: 1,
	},

	{
		name: "companyName",
		type: "text",
		label: "Company Name",
		placeholder: "Acme Corporation",
		visibleWhen: (values) => values.leadType === "Company",
		validations: {
			required: true,
		},
		colSpan: 1,
	},

	{
		name: "phone",
		type: "text",
		label: "Phone Number",
		placeholder: "10 digits (e.g. 9876543210)",
		hint: "Must be exactly 10 digits",
		validations: {
			required: true,
			exactDigits: 10,
		},
		colSpan: 1,
	},

	{
		name: "notes",
		type: "textarea",
		label: "Additional Notes",
		optional: true,
		placeholder: "Tell us more about your project or inquiry...",
		hint: "Maximum 200 characters",
		validations: {
			maxLength: 200,
		},
		colSpan: 2,
	},

	{
		name: "consent",
		type: "checkbox",
		label: "I agree to the terms of service and consent to being contacted regarding this inquiry.",
		summaryLabel: "Consent Given",
		validations: {
			required: true,
		},
		colSpan: 2,
	},
];
