import React from "react";
import Answers from "./Answers";
import "./Questions.css";

const Questions = ({ quizQuestions }) => {
	return (
		<div>
			<div className="question-container">{quizQuestions.question}</div>
			<div className="question-container">
				{quizQuestions.answers.map((x) => (
					<Answers answer={x} />
				))}
			</div>
		</div>
	);
};

export default Questions;
