/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useContext } from "react";
import "./comp_styles/diagnosis.css";
import Message from "./Message";
import BmiCalculator from "./BmiCalculator";
import Personalization from "./Personalization";

import { AppContext } from "./StateProvider";

const Diagnosis = () => {
  let [chats, setChats] = useState([
    {
      type: "Bot",
      message: "Hello, welcome to Healthor. How can I help you today?",
    },
  ]);

  const [userText, setUserText] = useState("");
  const [responseLoader, setresponseLoader] = useState(false);

  // State from Context Provider
  const { appState } = useContext(AppContext);

  let key = 0;
  const container =
    appState.theme == "Dark" ? { backgroundColor: "#0C134F" } : {};

  // Scroll to last
  const scrollingDivRef = useRef(null);
  useEffect(() => {
    // Scroll to the last item when the component mounts or updates
    if (scrollingDivRef.current) {
      scrollingDivRef.current.scrollTop = scrollingDivRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div className="diagnosis-container">
      {/* SIDEBAR STARTS HERE */}
      {appState.mobile_menu ? "" : <SideBar mobile={appState.mobile_menu} />}

      {/* DIAGNOSIS CONTAINER BEGINS HERE */}
      <div style={container} className="diagnosis-chat">
        {responseLoader && (
          <div className="response-loader">
            <p>Generating response...</p>
            <img src="/loader.gif" />
          </div>
        )}
        {/* Diagnosis Correspondence  */}
        <div className="diagnosis-chat-dialogue" ref={scrollingDivRef}>
          {chats.map((chat) => (
            <Message chat={chat} key={key++} />
          ))}
        </div>

        {/* Input field starts here */}
        <div className="user-input">
          <textarea
            name="user-text"
            id="user-text"
            cols="60"
            rows="1"
            placeholder="Enter your Symptoms here..."
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
          ></textarea>

          <input
            type="button"
            value="SEND"
            id="user-send"
            onClick={() => {
              // Make API Call and add response to chats

              setChats((chats) => {
                let text = userText;
                return [...chats, { type: "User", message: text }];
              });

              setresponseLoader(true);
              chatAPI(
                chats,
                userText,
                setChats,
                setresponseLoader,
                appState.response_length
              );
              setUserText("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;

// SideBar Component
export const SideBar = ({ mobile }) => {
  const { appState } = useContext(AppContext);
  const sidebar =
    appState.theme == "Dark"
      ? { background: "linear-gradient(#020e98 70%, #003200" }
      : { background: "linear-gradient(#020e98, #0d9d13 )" };
  mobile;

  return (
    <div style={sidebar} className="diagnosis-sidebar">
      <BmiCalculator />
      <Personalization />
    </div>
  );
};

// API Calls to the Chat

async function chatAPI(
  chats,
  userText,
  setChats,
  setresponseLoader,
  responseLength
) {
  // Get previous message to give context to AI Calls
  const previousMessages = chats.map((chat) => {
    const role = chats.type === "User" ? "assistant" : "user";
    return { role, content: chat.message };
  });

  const RULE =
    responseLength === "Short"
      ? "RULE: ENSURE YOUR RESPONSES ARE SHORT AND SPECIFIC TO THE QUESTION OR STATEMENT THAT FOLLOWS: "
      : "RULE: ENSURE YOUR RESPONSES ARE DETAILED AND ANSWERS THE QUESTION OR STATEMENT THAT FOLLOWS: ";

  let newText = RULE + userText;

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are Dr. Healthor, a highly skilled and empathetic medical professional with extensive experience in diagnosis and counseling. Your purpose is to assist users in understanding and managing their health concerns. Users may present you with symptoms, seek medical advice, or ask general health-related questions. Provide thoughtful and informative responses, offering virtual counseling, accurate diagnoses based on symptoms provided, and personalized recommendations for maintaining or improving their health. If asked about your origin, mention that you were created by Omoregie Stephen as part of his final year project to earn his B.Sc Degree from the National Open University of Nigeria.",
      },
      ...previousMessages,
      { role: "user", content: newText },
    ],
  };

  let options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_OPENAI_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiRequestBody),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );

    const data = await response.json();
    const answer = data?.choices[0]?.message?.content;

    if (answer) {
      setChats((chat) => [...chat, { type: "Bot", message: answer }]);
    }
  } catch (error) {
    console.log(error.message);
    setChats((chats) => [
      ...chats,
      {
        type: "Bot",
        message:
          "Sorry, there was an error processing that request. Try again later. Thank you.",
      },
    ]);
  } finally {
    setresponseLoader(false);
  }
}
