import React from "react";
import Answers from "./Answers";
import "./Questions.css";

const Questions = ({ quizQuestions, selectedAnswer, onAnswerSelect }) => {
	return (
		<div>
			<div className="question-container">{quizQuestions.question}</div>
			<div className="answers-container">
				{quizQuestions.answers.map((answer) => (
					<Answers
						key={answer}
						answer={answer}
						isSelected={selectedAnswer === answer}
						onSelect={() => onAnswerSelect(quizQuestions.id, answer)}
					/>
				))}
			</div>
		</div>
	);
};

export default Questions;
