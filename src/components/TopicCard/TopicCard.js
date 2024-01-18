import React, { useContext, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";

import "./topicCard.css";
import "../chatbot/chatbot.css";

export default function TopicCard({ questionData }) {
  // console.log(questionData);
  const dark = useContext(ThemeContext);

  const findPercentage = (doneQuestions, totalQuestions) => {
    return Math.round((doneQuestions / totalQuestions) * 100);
  };

  let totalSolved = 0;
  let totalQuestions = 0;

  // Collapsible logic
  useEffect(() => {
    const coll = document.querySelectorAll(".collapsible");

    coll.forEach((item) => {
      item.addEventListener("click", function () {
        this.classList.toggle("active");

        const content = this.nextElementSibling;

        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  }, []); // Empty dependency array to run once after the initial render

  const getBotestResponse = (userText) => {
    // Convert user input to lowercase for case-insensitive matching
    const lowerUserText = userText.toLowerCase();

    // Define your custom questions and corresponding answers
    const customResponses = {
      // Your custom responses here
    };

    // Check if there's a custom response for the user's input
    if (customResponses.hasOwnProperty(lowerUserText)) {
      return customResponses[lowerUserText];
    }

    // If no custom response, provide a default response
    return "I'm sorry, I didn't understand that. Can you please ask another question?";
  };

  const getTime = () => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
  };

  useEffect(() => {
    
    // Initial bot message
    firstBotMessage();
  }, []); // Empty dependency array to run once after the initial render

  const firstBotMessage = () => {
    let firstMessage = "Hi, How can I help you?";
    const botStarterMessage = document.getElementById("botStarterMessage");
    botStarterMessage.innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();
    const chatTimestamp = document.getElementById("chat-timestamp");
    chatTimestamp.append(time);

    const userInput = document.getElementById("userInput");
    userInput.scrollIntoView(false);
  };

  const getHardResponse = (userText) => {
    let botResponse = getBotestResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += botHtml;

    const chatBarBottom = document.getElementById("chat-bar-bottom");
    chatBarBottom.scrollIntoView(true);
  };

  const getResponse = () => {
    let userText = document.getElementById("textInput").value;

    if (userText === "") {
      userText = "I love Code Palace!";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';
    document.getElementById("textInput").value = "";

    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += userHtml;

    const chatBarBottom = document.getElementById("chat-bar-bottom");
    chatBarBottom.scrollIntoView(true);

    setTimeout(() => {
      getHardResponse(userText);
    }, 1000);
  };

  const buttonSendText = (sampleText) => {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';
    document.getElementById("textInput").value = "";

    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += userHtml;

    const chatBarBottom = document.getElementById("chat-bar-bottom");
    chatBarBottom.scrollIntoView(true);

    // Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
  };

  const sendButton = () => {
    getResponse();
  };

  let topicCard = questionData.map((topic, index) => {
    let { topicName, doneQuestions, questions, started } = topic;
    let percentDone = findPercentage(doneQuestions, questions.length);
    let questionsRemainig = questions.length - doneQuestions;

    totalSolved += doneQuestions;
    totalQuestions += questions.length;

    return (
      <Fade key={index} duration={500 + index * 0.4}>
        <div className="col mb-4">
          <Link
            to={`/${topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              className={`mb-3 ${
                started ? "inprogress-card animate__slideInDown" : "notstarted-card"
              } hvr-grow ${dark ? "darkCard" : ""}`}
            >
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title className="topicName">{topic.topicName}</Card.Title>
                  </Col>
                  <Col>
                    <h4>
                      <Badge
                        pill
                        variant={started ? "success" : "primary"}
                        className="float-right"
                        style={{ fontWeight: "500", cursor: "pointer" }}
                      >
                        {started
                          ? questionsRemainig === 0
                            ? "Done 👏🏻"
                            : "Solve Now 🙇🏻‍♂️"
                          : "Start Now"}
                      </Badge>
                    </h4>
                  </Col>
                </Row>
                <Card.Text className="totalQuestion">
                  Total Questions {questions.length} <br />
                  {`${questionsRemainig}`} More to go
                </Card.Text>
                <p className="percentDone mb-1">
                  <b>{percentDone}% Done</b>
                </p>
                <ProgressBar
                  animated={percentDone === 100 ? false : true}
                  variant="success"
                  now={percentDone}
                />
              </Card.Body>
            </Card>
          </Link>
        </div>
      </Fade>
    );
  });

  return (
    <>
      <h3 className="app-heading2 text-center mb-3">Solve DSA problems to master DSA</h3>
      <br />
      <br />
      <h4 className="text-center mb-4">
        {totalSolved
          ? `Total Questions Solved: ${totalSolved} (${((totalSolved / totalQuestions) * 100).toFixed(
              2
            )}% Done)`
          : "Start Solving"}
        <br />
        <br />
        <p className="percentDone container mt-1">
          {totalSolved ? (
            <ProgressBar
              animated={
                ((totalSolved / totalQuestions) * 100).toFixed(2) === "100" ? false : true
              }
              variant="success"
              now={((totalSolved / totalQuestions) * 100).toFixed(2)}
              style={{ margin: "0.2em 5em" }}
            />
          ) : null}
        </p>
      </h4>
      <div className="row row-cols-1 row-cols-md-3 mt-3 grids" style={{ paddingTop: '5px', paddingBottom: '10px', paddingLeft: '5px', paddingRight: '5px' }}>
        {topicCard}
      </div>
      <div className="chat-bar-collapsible">
        <button id="chat-button" type="button" className="collapsible">
          Chat with us!
          <i id="chat-icon" style={{ color: "#fff" }} className="fa fa-fw fa-comments-o"></i>
        </button>

        <div className="content">
          <div className="full-chat-block">
            {/* Message Container */}
            <div className="outer-container">
              <div className="chat-container">
                {/* Messages */}
                <div id="chatbox">
                  <h5 id="chat-timestamp"></h5>
                  <p id="botStarterMessage" className="botText">
                    <span>Loading...</span>
                  </p>
                </div>

                {/* User input box */}
                <div className="chat-bar-input-block">
                  <div id="userInput">
                    <input
                      id="textInput"
                      className="input-box"
                      type="text"
                      name="msg"
                      placeholder="Tap 'Enter' to send a message"
                    />
                    <p></p>
                  </div>

                  <div className="chat-bar-icons">
                    <i
                      id="chat-icon"
                      style={{ color: "#333" }}
                      className="fa fa-fw fa-send"
                      onClick={sendButton}
                    ></i>
                  </div>
                </div>

                <div id="chat-bar-bottom">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
