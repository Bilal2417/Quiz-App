"use client";

import ReduxProvider from "../../components/reduxProvider/reduxProvider";
import "./quiz.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { addQlength, addScore, completed } from "../../store/quizSlice";
import Loader from "../../components/loader/loader";

interface QuizQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
}

interface RootState {
  quizSlice: {
    category: string;
    amount: number;
    difficulty: string;
    type: string;
  };
}

export default () => {
  return (
    <ReduxProvider>
      <Quiz />
    </ReduxProvider>
  );
};

function Quiz() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>();

  const category = useSelector((store: RootState) => store.quizSlice.category);
  const amount = useSelector((store: RootState) => store.quizSlice.amount);
  const difficulty = useSelector((store: RootState) => store.quizSlice.difficulty);
  const type = useSelector((store: RootState) => store.quizSlice.type);

  async function fetchQuestions() {
    await callASync();
  }

  async function callASync() {
    try {
      const response = await axios.get<{ results: QuizQuestion[] }>(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
      );
      console.log(response.data);
      setQuestions(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      if(questions.length > 3){
        setLoading(false);
      }
      else{
        const myTimeout = setTimeout(()=>{setLoading(true)
          if(loading){
            return <Loader/>
          }
         }, 5000);
        route.push("../error")

      }
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);


  if(loading){
    return <Loader/>
  }
  function shuffle<T>(array: T[]): void {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  function checkAnswers(e: React.MouseEvent<HTMLLIElement>) {
    console.log(e.currentTarget.id);

    if (e.currentTarget.id === questions[currentIndex].correct_answer) {
      console.log("Correct");
      setScore(score + 1);
    }
    setCurrentIndex(currentIndex + 1);


    if (currentIndex === questions.length - 1) {
      dispatch(addScore(score));
      dispatch(addQlength(questions.length));
      dispatch(completed(true))
      route.push("/result");
    }
    console.log(questions.length);
  }

  const options = questions[currentIndex]?.incorrect_answers
    ? [...questions[currentIndex].incorrect_answers]
    : [];
  options.push(questions[currentIndex]?.correct_answer || "");
  shuffle(options);
  console.log(options);

  console.log("questions", questions);
  console.log("questions", questions[currentIndex]?.question);
  console.log("option", options);

  return (
    <div className="wrapper">
      <div className="quiz-container">
        <div className="quiz-head">
          <h1 className="quiz-title">Quiz Game</h1>
          <div className="quiz-score flex">
            <span id="correct-score">{score}</span>/<span id="total-question">{questions.length}</span>
          </div>
        </div>
        <div className="quiz-ques-head">
          <div className="total-que">
            <p className="total-quest">Total Questions : </p>
            <p className="total-quest-num">{questions.length}</p>
          </div>
          <div className="total-que">
            <p className="total-quest">Current Question : </p>
            <p className="total-quest-num">{currentIndex + 1}</p>
          </div>
        </div>
        <div className="quiz-body">
          <h2 className="quiz-question" id="question">
            {questions[currentIndex]?.question || ""}
          </h2>
          <div className="category-heading-block">
            <h3 className="category-heading">{questions[currentIndex]?.category}</h3>
          </div>
          <ul className="quiz-options">
            {options.map((option) => (
              <li  className="abc" id={option} onClick={checkAnswers}>
                {option}
              </li>
            ))}
          </ul>
          <div id="result"></div>
        </div>
        <div className="quiz-foot">
          <a href="/" type="button" id="play-again">
            Play Again!
          </a>
        </div>
      </div>
    </div>
  );
}

