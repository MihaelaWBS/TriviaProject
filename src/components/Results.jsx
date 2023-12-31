import React from "react";
import "./Results.css";
import { motion } from "framer-motion";
import finishAnimation from "../assets/finishAnimation.json";
import Lottie from "lottie-react";
import congratsAnimation from "../assets/congratsAnimation.json";
import owl1 from "../assets/owl-hooting-48028.mp3";
import thankYou from "../assets/thankYou.mp3";
import simpleThingy from "../assets/simpleThingy.mp3";

const Results = ({ questions, answers, onRestart }) => {
  console.log("Questions:", questions);
  console.log("Answers:", answers);

  const calculateScore = () => {
    return questions.reduce((score, question) => {
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

  const playSound = () => {
    new Audio(owl1).play();
  };

  const thankYouFin = () => {
    new Audio(thankYou).play();
  };

  const simpleThingy1 = () => {
    new Audio(simpleThingy).play();
  };

  const score = calculateScore();

  return (
    <div className="results-container">
      <Lottie
        animationData={finishAnimation}
        style={{
          width: "400px",
          position: "absolute",
          left: "15.5%",
        }}
      />
      <div
        onClick={playSound}
        style={{
          position: "absolute",
          top: "10%",
          left: "19.5%",
          zIndex: "1000",
          padding: "32px",
          paddingTop: "64px",
          fontSize: "32px",
          display: "hidden",
        }}

      ></div>
      <div
        onClick={thankYouFin}
        style={{
          position: "absolute",
          top: "10%",
          left: "24%",
          zIndex: "1000",
          padding: "32px",
          paddingTop: "64px",
          fontSize: "26px",
        }}
         
      ></div>
      <div
        onClick={simpleThingy1}
        style={{
          position: "absolute",
          top: "9%",
          left: "29%",
          paddingBottom: "15px",
          zIndex: "1000",
          padding: "32px",
          paddingTop: "64px",
        
          fontSize: "26px",
        }}

      
      ></div>
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
