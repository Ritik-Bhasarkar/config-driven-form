import React from "react";
import { Button } from "@/design-system";
import type { LeadFormValues } from "../../config/leadFormConfig";
import { leadFormConfig } from "../../config/leadFormConfig";
import "./FormCard.css";
import "./SubmissionSuccess.css";

interface SubmissionSuccessProps {
	values: LeadFormValues;
	onSubmitAnother: () => void;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
	values,
	onSubmitAnother,
}) => {
	const submittedFields = leadFormConfig.filter(
		(field) =>
			(!field.visibleWhen || field.visibleWhen(values)) &&
			!(field.optional && values[field.name] === ""),
	);

	return (
		<section className="form-card success-screen" aria-labelledby="success-title">
			<div className="success-screen__mark" aria-hidden="true">
				✓
			</div>
			<h1 id="success-title" className="success-screen__title">
				Lead Captured Successfully
			</h1>
			<p className="success-screen__message">
				Thank you for reaching out. We have received your information and our
				team will get back to you shortly.
			</p>
			<section className="success-screen__summary" aria-labelledby="summary-title">
				<h2 id="summary-title" className="success-screen__summary-title">
					Submitted Payload Summary
				</h2>
				<dl className="submission-summary">
					{submittedFields.map((field) => {
						const value = values[field.name];
						const displayValue =
							typeof value === "boolean"
								? value
									? "✓ Verified"
									: "Not verified"
								: value || "—";

						return (
							<div className="submission-summary__row" key={field.name}>
								<dt>{field.summaryLabel ?? field.label}</dt>
								<dd>{displayValue}</dd>
							</div>
						);
					})}
				</dl>
			</section>
			<Button
				className="success-screen__again"
				type="button"
				onClick={onSubmitAnother}>
				Submit Another Lead
			</Button>
		</section>
	);
};
