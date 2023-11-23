import React from "react";
import "./Results.css"; // Import the CSS file

const Results = ({ questions, answers, onRestart }) => {
	const calculateScore = () => {
		return questions.reduce((score, question) => {
			return score + (answers[question.id] === question.correctAnswer ? 1 : 0);
		}, 0);
	};

	const score = calculateScore();

	return (
		<div className="results-container">
			<h1>Quiz Finished</h1>
			<div className="score">
				Final Score: {score}/{questions.length}
			</div>
			<div className="review-container">
				{questions.map((question) => (
					<div key={question.id} className="review-item">
						<p className="question-text">{question.question}</p>
						<p className="correct-answer">
							Correct Answer: {question.correctAnswer}
						</p>
						<p
							className={
								answers[question.id] === question.correctAnswer
									? "yourAnswer-correct"
									: "yourAnswer-incorrect"
							}
						>
							Your Answer: {answers[question.id]}
						</p>
					</div>
				))}
			</div>
			<button className="restart-button" onClick={onRestart}>
				Restart Quiz
			</button>
		</div>
	);
};

export default Results;

