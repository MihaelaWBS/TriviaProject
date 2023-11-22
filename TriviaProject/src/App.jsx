import { useState } from "react";
import questions from "./questions";
import Questions from "./components/Questions";
import "./App.css";

function App() {
	const [quizQuestions, setQuizQuestions] = useState(questions);
	const [selectedAnswers, setSelectedAnswers] = useState({});

	const handleAnswerSelect = (questionId, answer) => {
		setSelectedAnswers({...selectedAnswers, [questionId]: answer});

	};
		

		

 
	return (
		<>
			<main>
				{questions.map((x) => (
					<Questions 
					 key={x.id}
					 quizQuestions={x} 
					 selectedAnswer = {selectedAnswers[x.id]}
					 onAnswerSelect={handleAnswerSelect}
					 />
				))}
			</main>
		</>
	);
}

export default App;
