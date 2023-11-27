import { useState, useEffect } from "react";
// Removed the unused import 'questions'
import Questions from "./components/Questions";
import "./App.css";
// Removed the unused import 'axios'
import Results from "./components/Results";
import { v4 as uuidv4 } from "uuid";

function App() {
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [quizOver, setQuizOver] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [showResults, setShowResults] = useState(false);

	const handleResults = () => {
		setShowResults(true);
	};

	const goToNextQuestion = () => {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			setShowResults(true);
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				const processedQuestions = data.results.map((item) => ({
					...item,
					id: uuidv4(),
					question: unEscape(item.question),
					answers: shuffleAnswers(item.correct_answer, item.incorrect_answers),
				}));
				setQuizQuestions(processedQuestions);
				localStorage.setItem(
					"selectedAnswers",
					JSON.stringify(selectedAnswers)
				);
			} catch (error) {
				console.error("Error fetching quiz data:", error);
			}
		};

		const storedQuestions = localStorage.getItem("quizQuestions");
		const storedAnswers = localStorage.getItem("selectedAnswers");

		if (storedQuestions) {
			setQuizQuestions(JSON.parse(storedQuestions));
		} else {
			fetchData();
		}

		if (storedAnswers) {
			setSelectedAnswers(JSON.parse(storedAnswers));
		}
	}, []);

	
	const url =
		"https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";

	const handleAnswerSelect = (question, answer) => {
		setSelectedAnswers((prevAnswers) => ({
			...prevAnswers,
			[question]: answer,
		}));
	};



	const restartQuiz = () => {
		setSelectedAnswers({});
		setQuizOver(false);
	};

	if (quizOver) {
		return (
			<Results
				questions={quizQuestions}
				answers={selectedAnswers}
				onRestart={restartQuiz}
			/>
		);
	}

	return (
		<main>
			{showResults ? (
				<Results
					questions={quizQuestions}
					answers={selectedAnswers}
					onRestart={restartQuiz}
				/>
			) : quizQuestions.length > 0 &&
			  currentQuestionIndex < quizQuestions.length ? (
				<Questions
					key={quizQuestions[currentQuestionIndex].id}
					quizQuestions={quizQuestions[currentQuestionIndex]}
					selectedAnswer={
						selectedAnswers[quizQuestions[currentQuestionIndex].id] || null
					}
					onAnswerSelect={handleAnswerSelect}
				/>
			) : (
				<div>Loading or no questions available...</div>
			)}
			{!showResults &&
				quizQuestions.length > 0 &&
				currentQuestionIndex < quizQuestions.length && (
					<button onClick={goToNextQuestion}>NEXT QUESTION</button>
				)}
		</main>
	);
}

// Helper functions to shuffle answers and unescape HTML entities
const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
	const allAnswers = [correctAnswer, ...incorrectAnswers];
	// Fisher-Yates shuffle algorithm
	for (let i = allAnswers.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
	}
	return allAnswers;
};

function unEscape(htmlStr) {
	htmlStr = htmlStr.replace(/&lt;/g, "<");
	htmlStr = htmlStr.replace(/&gt;/g, ">");
	htmlStr = htmlStr.replace(/&quot;/g, '"');
	htmlStr = htmlStr.replace(/&#039;/g, "'");
	htmlStr = htmlStr.replace(/&amp;/g, "&");
	return htmlStr;
}

export default App;
