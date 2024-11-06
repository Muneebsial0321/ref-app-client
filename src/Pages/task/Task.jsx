import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/style/Task.css';
import axios from 'axios';
import {BACK_URL} from '../../../ENV'
import { GlobalContext } from '../../context/Global';

const Task = () => {
  const context = useContext(GlobalContext)
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [task, setTask] = useState([]);
  const [number, setNumber] = useState(0);
  const [submittedQuestions, setSubmittedQuestions] = useState([]); 
  useEffect(() => {
    getPoints()

    const getTask = async () => {
      try {
        const response = await axios.get(`${BACK_URL}/api/getQuestion`);
        const result = response.data;
        setTask(result);
      } catch (err) {
        console.log(err);
      }
    };
    getTask();
  }, []);

  // Handle option selection
  const handleSelect = (questionId, optionId) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: optionId,
    }));
  };

  // Handle submission of each question
  const handleSubmit = (questionId) => {
    const selectedOptionId = selectedAnswers[questionId];
    const selectedOption = task
      .find((q) => q._id === questionId)
      .options.find((option) => option._id === selectedOptionId);

    if (selectedOption) {
      // Increment points for correct answer
      if (selectedOption.isCorrect) {
        setNumber(number + 10);
        console.log({number})
      }

      // Add the question to the list of submitted questions
      setSubmittedQuestions((prevSubmitted) => [...prevSubmitted, questionId]);

    } else {
      alert("Please select an option before submitting.");
    }
  };
  const getPoints=async()=>{
    console.log("fetching points")
    const res = await fetch(`${BACK_URL}/api/points/${context.global.User._id}`)
    const data = await res.json()
    console.log({data})
    setPoints(data)
    
  }

  const upDatePoints=async()=>{
    const res = await fetch(`${BACK_URL}/api/point/${context.global.User._id}`, {
      method: 'PUT', // Set the method to POST
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({ point: number}), // Send the updated points in the body
    });
    const data = await res.json()
    console.log("update point data,",data)
   await getPoints()
  }

  const point = {
    point: number
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center text-light">Your point is : {points}</h1>
      {task.map((question) => (
        <div key={question._id} className="question-box">
          <div className="question-header">{question.questionText}</div>

          <div className="row">
            {question.options.map((option) => (
              <div key={option._id} className="col-md-6 option-col">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={option._id}
                    checked={selectedAnswers[question._id] === option._id}
                    onChange={() => handleSelect(question._id, option._id)}
                    disabled={submittedQuestions.includes(question._id)} // Disable if submitted
                  />
                  <label className="form-check-label" htmlFor={option._id}>
                    {option.optionText}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <button
            className="submit-btn"
            onClick={() => handleSubmit(question._id)}
            disabled={submittedQuestions.includes(question._id)} // Disable if submitted
          >
            {submittedQuestions.includes(question._id) ? "Submitted" : "Submit"}
          </button>
        </div>
      ))}
      <div className="btn-submit-all">
        <button onClick={upDatePoints}>Submit All</button>
      </div>
    </div>
  );
};

export default Task;