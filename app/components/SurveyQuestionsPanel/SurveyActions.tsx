"use client";
import { useAppSelector } from "@/redux/store";
import short from "short-uuid";
import React from "react";
import {
  FaPlus,
  FaRegCheckCircle,
  FaRegEye,
  FaRegTrashAlt,
} from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addQuestions, setActionAlert } from "@/redux/features/questionsSlice";
import { saveQuestionsChanges } from "@/data/surveys";
import Link from "next/link";
import { useDeleteModalContext } from "@/app/contexts/deleteSurveyModalContext";
import DeleteSurveyModal from "../DeleteSurveyModal";

interface surveyID {
  actionsOnID: string | null;
}

const SurveyActions: React.FC<surveyID> = ({ actionsOnID }) => {
  const { showModal, setShowModal } = useDeleteModalContext();
  // const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const questions = useAppSelector((state) => state.questionsReducer.questions);
  const options = useAppSelector(
    (state) => state.questionsReducer.questionOptions
  );
  const deletedQuestions = useAppSelector(
    (state) => state.questionsReducer.questionsToDelete
  );
  const dispatch = useDispatch();
  const addQuestionFunction = () => {
    const shortID = short.generate();
    const question = {
      id: shortID,
      title: "test",
      isRequired: false,
      surveyId: actionsOnID,
      type: "SHORTTEXT",
      options: [
        { id: short.generate(), text: "Opcja 1", questionId: shortID },
        { id: short.generate(), text: "Opcja 2", questionId: shortID },
      ],
    };
    dispatch(addQuestions(question));
  };

  const saveChanges = async () => {
    const msg = await saveQuestionsChanges(
      questions,
      deletedQuestions,
      options
    );
    dispatch(setActionAlert(msg));
    setTimeout(() => {
      dispatch(setActionAlert(""));
    }, 4000);
  };

  // useEffect(() => {
  //   const onResize = () => {
  //     if (window.innerWidth > 767) {
  //       setIsHamburgerOpen(false);
  //     }
  //   };
  //   window.addEventListener("resize", onResize);
  // }, []);

  // const handleHamburger = () => {
  //   setIsHamburgerOpen(!isHamburgerOpen);
  // };
  return (
    <>
      {showModal ? (
        <DeleteSurveyModal actionsOnID={actionsOnID as string} />
      ) : null}
      {/* <div className="md:hidden flex justify-end py-3">
        <div
          onClick={handleHamburger}
          className={`flex flex-col cursor-pointer w-fit ${
            isHamburgerOpen ? "active" : ""
          }`}
        >
          <span
            className={`w-8 h-1 bg-white rounded-2xl transition-all line1 my-1`}
          ></span>
          <span
            className={`w-8 h-1 bg-white rounded-2xl transition-all line2 my-1`}
          ></span>
        </div>
      </div> */}
      {/* <div
        className={`bg-slate-800 w-52 ${
          isHamburgerOpen ? "flex" : "hidden"
        } flex-col items-center absolute z-50 right-0 mr-2 rounded-lg border`}
      >
        <div
          onClick={() => addQuestionFunction()}
          className="hover:bg-orange-400 transition-all cursor-pointer border w-36 my-2 p-2 rounded-lg"
        >
          <span className="flex items-center justify-center">
            <FaPlus /> Pytanie
          </span>
        </div>
        <Link
          href={`/survey/${actionsOnID}`}
          target="_blank"
          className="hover:bg-orange-400 transition-all cursor-pointer border w-36 my-2 p-2 rounded-lg"
        >
          <span className="flex items-center justify-center">
            <FaRegEye /> Zobacz
          </span>
        </Link>
        <div
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/survey/${actionsOnID}`
            );
            dispatch(setActionAlert("ℹ️ Skopiowano do schowka"));
            setTimeout(() => {
              dispatch(setActionAlert(""));
            }, 4000);
          }}
          className="hover:bg-orange-400 transition-all cursor-pointer border w-36 my-2 p-2 rounded-lg"
        >
          <span className="flex items-center justify-center">
            <MdShare /> Udostępnij
          </span>
        </div>
        <div
          onClick={() => saveChanges()}
          className="hover:bg-orange-400 transition-all cursor-pointer border w-36 my-2 p-2 rounded-lg"
        >
          <span className="flex items-center justify-center">
            <FaRegCheckCircle /> Zapisz
          </span>
        </div>
        <div
          onClick={() => {
            setIsHamburgerOpen(false);
            setShowModal(true);
          }}
          className="hover:bg-orange-400 transition-all cursor-pointer border w-36 my-2 p-2 rounded-lg"
        >
          <span className="flex items-center justify-center">
            <FaRegTrashAlt /> Usuń
          </span>
        </div>
      </div> */}
      <div className="flex justify-end">
        <div
          onClick={() => addQuestionFunction()}
          className="lg:mx-5 sm:mx-3 mx-1 py-3 px-2 lg:px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
        >
          <span className="flex items-center">
            <FaPlus /> Pytanie
          </span>
        </div>
        <Link
          className="lg:mx-5 sm:mx-3 mx-1 py-3 px-2 lg:px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
          href={`/survey/${actionsOnID}`}
          target="_blank"
        >
          <div>
            <span className="flex items-center">
              <FaRegEye /> Zobacz
            </span>
          </div>
        </Link>
        <div
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/survey/${actionsOnID}`
            );
            dispatch(setActionAlert("ℹ️ Skopiowano do schowka"));
            setTimeout(() => {
              dispatch(setActionAlert(""));
            }, 4000);
          }}
          className="lg:mx-5 sm:mx-3 mx-1 py-3 px-2 lg:px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
        >
          <span className="flex items-center">
            <MdShare /> Udostępnij
          </span>
        </div>
        <div
          onClick={() => saveChanges()}
          className="lg:mx-5 sm:mx-3 mx-1 py-3 px-2 lg:px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
        >
          <span className="flex items-center">
            <FaRegCheckCircle /> Zapisz
          </span>
        </div>
        <div
          onClick={() => setShowModal(true)}
          className="lg:ml-5 sm:mx-3 ml-1 py-3 px-2 lg:px-5 hover:bg-orange-400 transition-all rounded-2xl cursor-pointer"
        >
          <span className="flex items-center">
            <FaRegTrashAlt /> Usuń
          </span>
        </div>
      </div>
    </>
  );
};

export default SurveyActions;
