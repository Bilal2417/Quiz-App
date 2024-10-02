import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  category: string;
  difficulty: string;
  type: string;
  amount: number;
  score: number;
  qLength: number;
  complete: boolean;
}

const initialState: QuizState = {
  category: "",
  difficulty: "",
  type: "",
    amount: 0, 
    score: 0,  
    qLength: 0,
    complete: false,
  }

export const quizSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      console.log("Category", action.payload);
    },
    addDifficulty: (state, action: PayloadAction<string>) => {
      state.difficulty = action.payload;
      console.log("Difficulty", action.payload);
    },
    addType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
      console.log("Type", action.payload);
    },
    addAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
      console.log("Amount", action.payload);
    },
    addScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
      console.log("Score", action.payload);
    },
    addQlength: (state, action: PayloadAction<number>) => {
      state.qLength = action.payload;
      console.log("Length", action.payload);
    },
    completed: (state, action: PayloadAction<boolean>) => {
      state.complete = action.payload;
      console.log("Complete", action.payload);
    },
  },
});

export const {
  addCategory,
  addDifficulty,
  addType,
  addAmount,
  addScore,
  addQlength,
  completed
} = quizSlice.actions;

export default quizSlice.reducer;
