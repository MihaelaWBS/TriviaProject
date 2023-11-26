import { useState, useEffect } from "react";
// Removed the unused import 'questions'
import Questions from "./components/Questions";
import "./App.css";
// Removed the unused import 'axios'
import Results from "./components/Results";

function App() {
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState({});
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

	const url =
		"https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";

	//Use effect ours start
	/*    useEffect(() => {
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then((data) => {
            // Process each question from the API
            const processedQuestions = data.results.map((item, index) => ({
              ...item,
              id: index, // Adding a unique ID
              question: unEscape(item.question), // Unescaping HTML entities in the question
              answers: shuffleAnswers(item.correct_answer, item.incorrect_answers) // Shuffling answers
            }));
            setQuizQuestions(processedQuestions);
          })
          .catch((error) => console.error('There was a problem with the fetch operation:', error));
      }, []); */

	//Use effect ours end

	//useeffect solution start
	useEffect(() => {
		const fetchData = (retryCount = 0) => {
			fetch(url)
				.then((res) => {
					if (!res.ok) {
						// If status is 429, wait and retry
						if (res.status === 429 && retryCount < 5) {
							setTimeout(
								() => fetchData(retryCount + 1),
								Math.pow(2, retryCount) * 1000
							);
							return;
						}
						throw new Error("Network response was not ok");
					}
					return res.json();
				})
				.then((data) => {
					if (data) {
						const processedQuestions = data.results.map((item, index) => ({
							...item,
							id: index,
							question: unEscape(item.question),
							answers: shuffleAnswers(
								item.correct_answer,
								item.incorrect_answers
							),
						}));
						setQuizQuestions(processedQuestions);
					}
				})
				.catch((error) => {
					console.error("There was a problem with the fetch operation:", error);
				});
		};
		fetchData();
	}, []);

	//useeffect solution end

	const handleAnswerSelect = (question, answer) => {
		setSelectedAnswers((prevAnswers) => ({
			...prevAnswers,
			[question]: answer,
		}));
	};

	useEffect(() => {
		if (Object.keys(selectedAnswers).length === quizQuestions.length) {
			setQuizOver(true);
		}
	}, [selectedAnswers, quizQuestions.length]);

	/* const restartQuiz = () => {
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
 */
	return (
		<main>
			{showResults ? (
				<Results
					questions={quizQuestions}
					answers={selectedAnswers}
					/* onRestart={restartQuiz} */
				/>
			) : (

				<Questions
					key={quizQuestions[currentQuestionIndex].id}
					quizQuestions={quizQuestions[currentQuestionIndex]}
					selectedAnswer={selectedAnswers[quizQuestions[currentQuestionIndex].id] || null}
					onAnswerSelect={handleAnswerSelect}
				/>

				/* 
				<Questions
					key={quizQuestions[currentQuestionIndex]}
					quizQuestions={quizQuestions[currentQuestionIndex]}
					selectedAnswer={selectedAnswers[quizQuestions[currentQuestionIndex]]}
					onAnswerSelect={handleAnswerSelect}
				/>  */
			)}
			<button onClick={goToNextQuestion}>NEXT QUESTION</button>
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
