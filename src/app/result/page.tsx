"use client";
import { useSelector } from "react-redux";
import "./result.css";
import ReduxProvider from "../../components/reduxProvider/reduxProvider";
import Loader from "../../components/loader/loader";

const ResultComponent: React.FC = () => {
  return (
    <ReduxProvider>
      <QuizResult />
    </ReduxProvider>
  );
};

const QuizResult: React.FC = () => {

  const questions: number = useSelector((store: { quizSlice: { qLength: number } }) => store.quizSlice.qLength);
  const score: number = useSelector((store: { quizSlice: { score: number } }) => store.quizSlice.score);
  const complete: boolean = useSelector((store: { quizSlice: { complete: boolean } }) => store.quizSlice.complete);

  if(!complete){
return <Loader/>
  }
  return (
    <div className="wrapperr">
      <div className="quiz-container">
        <div className="quiz-head">
          <h1 className="quiz-title">Quiz Game</h1>
          <div className="quiz-score flex">
            <span id="correct-score">{score}</span>/<span id="total-question">{questions}</span>
          </div>
        </div>
        <div id="result">
          {score} Questions correct out of {questions}
        </div>
        <div className="quiz-foot">
          <a href="/" id="play-again">
            Play Again!
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;
