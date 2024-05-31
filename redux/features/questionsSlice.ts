import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialQuestions: any = [];
let initialQuestionsToDelete: any = [];
const initialState = {
  questions: initialQuestions,
  questionsToDelete: initialQuestionsToDelete,
};

export const questions = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestions: (state, action) => {
      state.questions = state.questions.concat(action.payload);
    },
    deleteQuestion: (state, action) => {
      const questionsToDelete: any = state.questionsToDelete;
      const currQuestions = state.questions;
      const newQuestions = currQuestions.filter((item: any) => {
        const toDelete = item.id !== action.payload;
        if (!toDelete) {
          questionsToDelete.push(item);
        }
        return toDelete;
      });
      state.questionsToDelete = questionsToDelete;
      state.questions = newQuestions;
    },
  },
});

export const { setQuestions, addQuestions, deleteQuestion } = questions.actions;
export default questions.reducer;
