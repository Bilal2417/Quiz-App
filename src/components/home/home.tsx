"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { useRouter } from "next/navigation";
import ReduxProvider from "../reduxProvider/reduxProvider";
import { UseDispatch } from "react-redux";
import {
  addAmount,
  addCategory,
  addDifficulty,
  addType,
} from "../../store/quizSlice";
import { Slider } from "@mui/material";

export default function Home() {
  return (
    <ReduxProvider>
      <GetData />
    </ReduxProvider>
  );
}

function GetData() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number>(25); // Assuming a default value
  const [category, setCategory] = useState<Array<{ id: number; name: string }>>([]);
  const [difficulty, setDifficulty] = useState<Array<{ type: string }>>([]);
  const [type, setType] = useState<Array<{ type: string }>>([]);

  interface TriviaCategory {
    id: number;
    name: string;
  }
  interface ApiResponse {
    trivia_categories: TriviaCategory[];
  }

  useEffect(() => {
    
    axios.get<ApiResponse>("https://opentdb.com/api_category.php").then((resp) => {
      setCategory(resp.data.trivia_categories);
      const types = [{ type: "Multiple" }, { type: "Boolean" }];
      setType(types);

      const difficulties = [
        { type: "Easy" },
        { type: "Medium" },
        { type: "Hard" },
      ];
      setDifficulty(difficulties);
    });
    
  }, []);

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value.toLowerCase());
  };

  const handleAmount = (e: Event, newValue: number | number[]) => {
    setSelectedAmount(newValue as number);
  };

  const isDisabled = !selectedCategory || !selectedDifficulty || !selectedType;

  return (
    <div className="container">
      <div className="row">
        <h2>QUIZ</h2>
        <br />
        <div className="bs-docs-example">
          <label htmlFor="selection">Category</label>
          <select
            id="selection"
            className="selectpicker"
            data-style="btn-primary"
            onChange={handleCategory}
          >
            <option value="">Any Category</option>
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="bs-docs-example">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            className="selectpicker"
            data-style="btn-primary"
            onChange={handleDifficulty}
          >
            <option value="">Any Difficulty</option>
            {difficulty.map((difficultyType) => (
              <option key={difficultyType.type} value={difficultyType.type.toLowerCase()}>
                {difficultyType.type}
              </option>
            ))}
          </select>
        </div>
        <div className="bs-docs-example">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            className="selectpicker"
            data-style="btn-primary"
            onChange={handleType}
          >
            <option value="">Any Type</option>
            {type.map((typeName) => (
              <option key={typeName.type} value={typeName.type}>
                {typeName.type}
              </option>
            ))}
          </select>
        </div>
        <div className="bs-docs-example">
          <label htmlFor="amount">Amount</label>
          <Slider
            id="amount"
            size="medium"
            defaultValue={25}
            aria-label="Small"
            valueLabelDisplay="auto"
            min={5}
            max={50}
            onChange={handleAmount}
          />
        </div>
        <div className="bs-docs-example">
          <button
            className={!isDisabled ? `submit-button` : "submit-button disabled"}
            type="submit"
            disabled={isDisabled}
            onClick={() => {
              dispatch(addCategory(selectedCategory));
              dispatch(addDifficulty(selectedDifficulty));
              dispatch(addType(selectedType));
              dispatch(addAmount(selectedAmount));
              route.push("./quiz");
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
