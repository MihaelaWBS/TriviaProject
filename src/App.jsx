import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import he from "he";
import Questions from "./components/Questions";
import "./App.css";
import ProgressBar from "./components/ProgressBar";

import Results from "./components/Results";
import { v4 as uuidv4 } from "uuid";
import Loader from "./components/Loader";
import Timer from "./components/Timer";

function App() {
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [quizOver, setQuizOver] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [showResults, setShowResults] = useState(false);
	const [spiderAnswer, setspiderAnswer] = useState(false);
	const [setspiderGone, setSpiderGone] = useState(false);

	const [buttonClass, setButtonClass] = useState("timer-button");
	const handleTimerChange = (time) => {
		if (time < 10) {
			setButtonClass("restart-quiz-button-timer-10");
		} else {
			setButtonClass("timer-button");
		}
	};

	const handleResults = () => {
		setShowResults(true);
	};

	const goToNextQuestion = () => {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			if (!setspiderGone) {
				setspiderAnswer(true);
			}
		} else {
			setShowResults(true);
		}
	};

	const goToPreviousQuestion = () => {
		setCurrentQuestionIndex(currentQuestionIndex - 1);
	};

	const resetQuiz = () => {
		// logic to reset the quiz
		alert("Your time is up! The quiz will restart.");
		// reset your quiz state here
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
					correct_answer: unEscape(item.correct_answer),
					incorrect_answers: item.incorrect_answers.map((answer) =>
						unEscape(answer)
					),
					answers: shuffleAnswers(
						unEscape(item.correct_answer),
						item.incorrect_answers.map((answer) => unEscape(answer))
					),
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
		location.reload();
	};

	if (quizOver) {
		return (
			<>
				<Results
					questions={quizQuestions}
					answers={selectedAnswers}
					onRestart={restartQuiz}
				/>
				<Loader />
			</>
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
					setSpiderGone={setSpiderGone}
					setspiderAnswer={setspiderAnswer}
					spiderAnswer={spiderAnswer}
					key={quizQuestions[currentQuestionIndex].id}
					quizQuestions={quizQuestions[currentQuestionIndex]}
					selectedAnswer={
						selectedAnswers[quizQuestions[currentQuestionIndex].id] || null
					}
					onAnswerSelect={handleAnswerSelect}
				/>
			) : (
				<div className="loader"></div>
			)}
			{!showResults &&
				quizQuestions.length > 0 &&
				currentQuestionIndex < quizQuestions.length && (
					<>
						<button className="next-question-button" onClick={goToNextQuestion}>
							NEXT QUESTION
						</button>
						{currentQuestionIndex > 0 && (
							<button
								className="previous-question-button"
								onClick={goToPreviousQuestion}
							>
								PREVIOUS QUESTION
							</button>
						)}
						<button className="restart-quiz-button" onClick={restartQuiz}>
							RESTART QUIZ 🤯
						</button>
						<ProgressBar
							current={currentQuestionIndex}
							total={quizQuestions.length}
						/>
						<button className={buttonClass}>
							<Timer onTimeChange={handleTimerChange} />
						</button>
					</>
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
	return he.decode(htmlStr);
}

export default App;
