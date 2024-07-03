import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialQuestions: any = [];
let initialQuestionsToDelete: any = [];
let initialQuestionOptions: any = [];
const initialState = {
  questions: initialQuestions,
  questionsToDelete: initialQuestionsToDelete,
  questionOptions: initialQuestionOptions,
};

export const questions = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {
    clearStates: (state) => {
      state.questions = [];
      state.questionsToDelete = [];
      state.questionOptions = [];
    },
    setQuestions: (state, action) => {
      // console.log(action.payload);
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
    updateQuestionTitle: (state, action) => {
      // console.log(action.payload);
      const updatedQuestions = state.questions.map((question: any) => {
        if (question.id === action.payload.id) {
          return { ...question, title: action.payload.title };
        } else {
          return question;
        }
      });
      state.questions = updatedQuestions;
    },
    updateQuestionRequired: (state, action) => {
      // console.log(action.payload);
      const updatedQuestions = state.questions.map((question: any) => {
        if (question.id === action.payload.id) {
          return { ...question, isRequired: action.payload.isRequired };
        } else {
          return question;
        }
      });
      state.questions = updatedQuestions;
    },
    changeQuestionType: (state, action) => {
      // console.log(action.payload);
      const updatedQuestions = state.questions.map((question: any) => {
        if (question.id === action.payload.id) {
          return { ...question, type: action.payload.type };
        } else {
          return question;
        }
      });
      state.questions = updatedQuestions;
    },
    setQuestionOptions: (state, action) => {
      state.questionOptions = state.questionOptions.concat(action.payload);
    },
    updateQuestionOptionText: (state, action) => {
      const updatedQuestionOptions = state.questionOptions.map((item: any) =>
        item.id === action.payload.id
          ? { ...item, text: action.payload.text }
          : item
      );
      state.questionOptions = updatedQuestionOptions;
    },
  },
});

export const {
  setQuestions,
  addQuestions,
  deleteQuestion,
  updateQuestionTitle,
  clearStates,
  updateQuestionRequired,
  changeQuestionType,
  setQuestionOptions,
  updateQuestionOptionText,
} = questions.actions;
export default questions.reducer;
