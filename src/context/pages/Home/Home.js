
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import "./Home.css";
import axios from "axios";
import QuestionsList from "../question/QuestionList";
import { MdArrowForwardIos } from "react-icons/md";

const Home = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [page, setPage] = useState("Home");
  const [allQuestions, setAllQuestions] = useState([]);
  //let [currrentQuestion, setCurrrentQuestion] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
    // console.log(">>>>>>>>Home useEffect: 0");
    const fetchQuestions = async () => {
      // console.log(">>>>>>>>Home useEffect >> fetchQuestions: 1");

      let questions = await axios.get(
        `${process.env.REACT_APP_base_url}/api/questions/all`
      );
      // console.log(">>>>>>>>Home useEffect >> fetchQuestions: 2");

      // console.log(">>>>>>>>Fetched questions:", questions.data.data);

      questions = questions.data.data;
      console.log(">>>>>>>>Fetched questions:", questions);
      setAllQuestions(() => {
        return questions;
      });
    };
    fetchQuestions();
  }, [userData.user, navigate]);

  return (
    <div className="home">
      {/* show username in homepage */}
      <div className="home__top">
        {/* <Link to="/AskQuestion"> */}
        <button
          onClick={() => {
            navigate("/question");
          }}
          className="home_topBtn"
        >
          <p className="bg-blue-600 w-36 h-8 rounded-lg">Ask Question</p>
        </button>

        <h4>Welcome: {userData.user?.display_name}</h4>
      </div>
      {/* <button onClick={logout}>Log out</button> */}
      <h3 className="home__question">Questions</h3>
      {/* <div> printed: {allQuestions[0]?.question_id}</div> */}
      <div className="home__questionLists">
        <div>
          {allQuestions?.map((question) => (
            <div key={question.question_id}>
              {/* <div>{question.question}</div> */}
              <Link
                to={`/Answers/${question.question_id}`}
                // to={`/answer/${question.question_id}`}
                // state prop used to pass the data along the link
                state={{
                  question: question,
                  currentUserId: userData.user?.id,
                }}
                className="Link"
              >
                <QuestionsList show={question} />
                <MdArrowForwardIos className="MdArrowForwardIos" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {allQuestions.length < 3 && <div className="home__questionListsBottom" />}
    </div>
  );
};

export default Home;
