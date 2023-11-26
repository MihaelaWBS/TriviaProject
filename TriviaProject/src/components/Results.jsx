import React from "react";
import "./Results.css"; // Import the CSS file

const Results = ({ questions, answers, onRestart }) => {
    // Add console logs to check the questions and answers data
    console.log("Questions:", questions);
    console.log("Answers:", answers);

    const calculateScore = () => {
        return questions.reduce((score, question) => {
            // Add a console log inside the reduce function to check each question and answer
            console.log("Current Question:", question);
            console.log("User Answer:", answers[question.id]);
            console.log("Correct Answer:", question.correct_answer);
            return score + (answers[question.id] === question.correct_answer ? 1 : 0);
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
                {questions.map((question, index) => (
                    <div key={index} className="review-item">
                        <p className="question-text">{question.question}</p>
                        <p className="correct-answer">
                            Correct Answer: {question.correct_answer}
                        </p>
                        <p
                            className={
                                answers[question.id] === question.correct_answer
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
