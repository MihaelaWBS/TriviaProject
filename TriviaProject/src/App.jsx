import { useState } from "react";
import questions from "./questions";
import Questions from "./components/Questions";
import "./App.css";
import Results from "./components/Results";

function App() {
	const [quizQuestions, setQuizQuestions] = useState(questions);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [quizOver, setQuizOver] = useState(false);

	const handleAnswerSelect = (questionId, answer) => {
		setSelectedAnswers({...selectedAnswers, [questionId]: answer});
		if (Object.keys(selectedAnswers).length === quizQuestions.length - 1) {
            setQuizOver(true); 
        }

	};

	const restartQuiz = () => {
        setSelectedAnswers({});
        setQuizOver(false);
    };

    if (quizOver) {
        return <Results questions={quizQuestions} answers={selectedAnswers} onRestart={restartQuiz} />;
    }
 
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
