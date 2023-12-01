import React, { useState } from "react";
import Answers from "./Answers";
import "./Questions.css";
import { AnimatePresence, motion } from "framer-motion";
import spiderAnimation from "../assets/spiderAnimation.json";
import Lottie from "lottie-react";
import logo from "../assets/logo.png";

const Questions = ({
  setSpiderGone,
  setspiderAnswer,
  spiderAnswer,
  quizQuestions,
  selectedAnswer,
  onAnswerSelect,
}) => {
  if (!quizQuestions) {
    return <div>Loading...</div>;
  }

  const deadSpider = () => {
    setspiderAnswer(false);
    setSpiderGone(true);
  };

  return (
    <>
      <header className="header-wrapper">
        <nav>
          <img src={logo} style={{ width: "100px" }} alt="logo" />
          <h3>API QUIZ</h3>
        </nav>
        <ul>
          <li>HOME</li>
          <li>RESULTS</li>
          <li>ABOUT</li>
        </ul>
      </header>
      {spiderAnswer && (
        <Lottie
          onClick={deadSpider}
          style={{
            position: "absolute",
            width: "300px",
            left: "10%",
            zIndex: "1000",
          }}
          animationData={spiderAnimation}
        />
      )}
      <div className="a-q-container">
        <AnimatePresence>
          <motion.div
            key={quizQuestions.id}
            initial={{ opacity: -100 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
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
    </>
  );
};

export default Questions;
