import { useState } from "react";
import "./global.css";
import { LeadForm } from "./features/lead/components/LeadForm/LeadForm";
import { SubmissionSuccess } from "./features/lead/components/LeadForm/SubmissionSuccess";
import type { LeadFormValues } from "./features/lead/config/leadFormConfig";

export function App() {
	const [submittedValues, setSubmittedValues] =
		useState<LeadFormValues | null>(null);

	return (
		<div className="app">
			{submittedValues ? (
				<SubmissionSuccess
					values={submittedValues}
					onSubmitAnother={() => setSubmittedValues(null)}
				/>
			) : (
				<LeadForm onSuccess={(values) => setSubmittedValues(values)} />
			)}
		</div>
	);
}

export default App;
