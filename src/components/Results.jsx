import React from "react";
import "./Results.css"; // Import the CSS file
import { motion } from "framer-motion";
import finishAnimation from "../assets/finishAnimation.json";
import Lottie from "lottie-react";
import congratsAnimation from "../assets/congratsAnimation.json";
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const score = calculateScore();

  return (
    <div className="results-container">
      <Lottie
        animationData={finishAnimation}
        style={{ width: "400px", position: "absolute", left: "15.5%" }}
      />
      {/*  <Lottie
        animationData={congratsAnimation}
        style={{ width: "400px", position: "absolute", right: "15.5%" }}
      /> */}
      <h1>Quiz Finished</h1>
      <div className="score">
        Final Score: {score}/{questions.length}
      </div>
      <motion.div
        className="review-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {questions.map((question, index) => (
          <motion.div
            key={index}
            className="review-item"
            variants={itemVariants}
          >
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
          </motion.div>
        ))}
      </motion.div>
      <></>
      <button className="restart-button" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
