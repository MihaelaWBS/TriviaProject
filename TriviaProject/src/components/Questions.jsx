import React from "react";

const Questions = ({ quizQuestions }) => {
	return (
		<div>
			<div>{quizQuestions.questions}</div>
		</div>
	);
};

export default Questions;
