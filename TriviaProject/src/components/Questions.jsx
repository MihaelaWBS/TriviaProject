import React from "react";
import Answers from "./Answers";
import "./Questions.css";
import { AnimatePresence, motion } from "framer-motion";

const Questions = ({ quizQuestions, selectedAnswer, onAnswerSelect }) => {
	if (!quizQuestions) {
		return <div>Loading...</div>;
	}

	return (
		<div className="a-q-container">
			<AnimatePresence>
				<motion.div
					key={quizQuestions.id}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="question-container"
				>
					{quizQuestions.question}
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
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default Questions;
