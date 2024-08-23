import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialQuestions: any = [];
let initialQuestionsToDelete: any = [];
let initialQuestionOptions: any = [];
let initialOptionsToDelete: any = [];
let initialActionAlert = "";
const initialState = {
  questions: initialQuestions,
  questionsToDelete: initialQuestionsToDelete,
  questionOptions: initialQuestionOptions,
  optionsToDelete: initialOptionsToDelete,
  actionAlert: initialActionAlert,
};

export const questions = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {
    clearStates: (state) => {
      state.questions = [];
      state.questionsToDelete = [];
      state.questionOptions = [];
      state.optionsToDelete = [];
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
      console.log(action.payload);
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
      const newOptions = action.payload;
      const existingOptionsIds = state.questionOptions.map(
        (option: any) => option.id
      );
      const filteredOptions = newOptions.filter(
        (option: any) => !existingOptionsIds.includes(option.id)
      );
      state.questionOptions = state.questionOptions.concat(filteredOptions);
    },
    updateQuestionOptionText: (state, action) => {
      const updatedQuestionOptions = state.questionOptions.map((item: any) =>
        item.id === action.payload.id
          ? { ...item, text: action.payload.text }
          : item
      );
      state.questionOptions = updatedQuestionOptions;
    },
    deleteOptionAction: (state, action) => {
      const optionsToDelete: any = state.optionsToDelete;
      const currOptions = state.questionOptions;
      const newOptions = currOptions.filter((item: any) => {
        const toDelete = item.id !== action.payload;
        if (!toDelete) {
          optionsToDelete.push(item);
        }
        return toDelete;
      });
      state.optionsToDelete = optionsToDelete;
      state.questionOptions = newOptions;
    },
    addOptionAction: (state, action) => {
      state.questionOptions = state.questionOptions.concat(action.payload);
    },
    setActionAlert: (state, action) => {
      state.actionAlert = action.payload;
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
  deleteOptionAction,
  addOptionAction,
  setActionAlert,
} = questions.actions;
export default questions.reducer;
