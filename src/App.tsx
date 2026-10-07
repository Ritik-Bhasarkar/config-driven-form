import { LeadForm } from "./features/lead/components/LeadForm/LeadForm";

function App() {
	return (
		<main>
			<LeadForm
				onSuccess={(data) => {
					console.log("Submission received by App handler:", data);
				}}
			/>
		</main>
	);
}

export default App;
