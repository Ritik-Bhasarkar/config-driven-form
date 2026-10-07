import React, { useState } from "react";

import {
	INITIAL_LEAD_FORM_VALUES,
	leadFormConfig,
	type LeadFormValues,
	type LeadFormErrors,
} from "../../config/leadFormConfig";

import {
	validateLeadField,
	validateLeadForm,
} from "../../validation/validateLeads";

import { FieldRenderer } from "../FieldRenderer";

import { Button } from "@/design-system";

import "./LeadForm.css";

export interface LeadFormProps {
	onSuccess?: (values: LeadFormValues) => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSuccess }) => {
	const [values, setValues] = useState<LeadFormValues>(
		INITIAL_LEAD_FORM_VALUES,
	);

	const [errors, setErrors] = useState<LeadFormErrors>({});

	const [touched, setTouched] = useState<
		Partial<Record<keyof LeadFormValues, boolean>>
	>({});

	const visibleFields = leadFormConfig.filter((field) =>
		field.visibleWhen ? field.visibleWhen(values) : true,
	);

	const handleChange = (
		name: keyof LeadFormValues,
		value: string | boolean,
	) => {
		const updatedValues = {
			...values,
			[name]: value,
		};

		setValues(updatedValues);

		if (touched[name]) {
			const field = leadFormConfig.find((field) => field.name === name);

			if (field) {
				const error = validateLeadField(field, updatedValues);

				setErrors((prev) => {
					const next = { ...prev };

					if (error) {
						next[name] = error;
					} else {
						delete next[name];
					}

					return next;
				});
			}
		}

		if (name === "leadType" && value !== "Company") {
			setErrors((prev) => {
				const next = { ...prev };
				delete next.companyName;
				return next;
			});
		}
	};

	const handleBlur = (name: keyof LeadFormValues) => {
		setTouched((prev) => ({
			...prev,
			[name]: true,
		}));

		const field = leadFormConfig.find((field) => field.name === name);

		if (!field) return;

		const error = validateLeadField(field, values);

		setErrors((prev) => {
			const next = { ...prev };

			if (error) {
				next[name] = error;
			} else {
				delete next[name];
			}

			return next;
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const validationErrors = validateLeadForm(leadFormConfig, values);

		setErrors(validationErrors);

		const allTouched: Partial<Record<keyof LeadFormValues, boolean>> = {};

		visibleFields.forEach((field) => {
			allTouched[field.name] = true;
		});

		setTouched(allTouched);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		console.log("Lead form submitted:", values);

		onSuccess?.(values);
	};

	return (
		<div className="formCard">
			<header className="cardHeader">
				<h1 className="cardTitle">Inquiry & Lead Capture</h1>

				<p className="cardSubtitle">
					Please provide your details below. Fields marked with an
					asterisk (*) are required.
				</p>
			</header>

			<form
				className="formBody"
				onSubmit={handleSubmit}
				noValidate>
				<div className="formGrid">
					{visibleFields.map((field) => (
						<FieldRenderer
							key={field.name}
							field={field}
							values={values}
							error={errors[field.name]}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					))}
				</div>

				<footer className="formActions">
					<Button
						type="submit"
						variant="primary">
						Submit Lead Request
					</Button>
				</footer>
			</form>
		</div>
	);
};
