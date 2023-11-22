import { useState } from "react";
import questions from "./questions";
import Questions from "./components/Questions";
import "./App.css";

function App() {
	const [quizQuestions, setQuizQuestions] = useState(questions);

	return (
		<>
			<main>
				{questions.map((x) => (
					<Questions key={x.id} quizQuestions={x} />
				))}
			</main>
		</>
	);
}

export default App;
