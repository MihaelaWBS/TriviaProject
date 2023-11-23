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

    const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";

    useEffect(() => {
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
      }, []);

    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
        if (Object.keys(selectedAnswers).length === quizQuestions.length - 1) {
            setQuizOver(true);
        }
    };

    const restartQuiz = () => {
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

    return (
        <main>
            {quizQuestions.map((x) => (
                <Questions
                    key={x.id}
                    quizQuestions={x}
                    selectedAnswer={selectedAnswers[x.id]}
                    onAnswerSelect={handleAnswerSelect}
                />
            ))}
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
    htmlStr = htmlStr.replace(/&lt;/g, '<');
    htmlStr = htmlStr.replace(/&gt;/g, '>');
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#039;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, '&');
    return htmlStr;
}

export default App;
