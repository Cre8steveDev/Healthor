/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import "./comp_styles/diagnosis.css";
import Message from "./Message";
import BmiCalculator from "./BmiCalculator";
import Personalization from "./Personalization";

const Diagnosis = () => {
  let [chats, setChats] = useState([
    {
      type: "Bot",
      message: "Hello, welcome to Healthor. How can I help you today?",
    },
  ]);
  let [userText, setUserText] = useState("");
  let [responseLoader, setresponseLoader] = useState(false);

  let key = 0;
  let updateChatUI = chats.map((chat) => <Message chat={chat} key={key++} />);

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
      <div className="diagnosis-sidebar">
        <BmiCalculator />
        <Personalization />
      </div>

      {/* DIAGNOSIS CONTAINER BEGINS HERE */}
      <div className="diagnosis-chat">
        {responseLoader && (
          <div className="response-loader">
            <p>Generating response...</p>
            <img src="/loader.gif" />
          </div>
        )}
        {/* Diagnosis Correspondence  */}
        <div className="diagnosis-chat-dialogue" ref={scrollingDivRef}>
          {updateChatUI}
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
              chatAPI(chats, userText, setChats, setresponseLoader);
              setUserText("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;

// API Calls to the Chat

async function chatAPI(chats, userText, setChats, setresponseLoader) {
  const previousMessages = chats.map((chat) => {
    const role = chats.type === "User" ? "assistant" : "user";
    return { role, content: chat.message };
  });

  // let newText = `
  // CONTENT: ${userText}

  // RULE: IF THE CONTENT OF THE TEXT THAT FOLLOWS THIS STATEMENT IS NOT MEDICAL OR HEALTH RELATED, SEND BACK A MESSAGE THAT YOU CAN ONLY ANSWER MEDICAL AND HEALTH RELATED QUESTIONS AS AN AI-POWERED MODEL. THEN SHARE A RANDOM HEALTH TIP USING THE FORMAT AS -

  // HEALTH TIP:
  // TIP GOES HERE
  // FORMAT: Let there be a newline before the health tip.

  // RULE:IF THE QUESTION IS MEDICAL OR HEALTH RELATED, DON'T SHARE A HEALTH TIP
  // RULE: IF THE QUESTION IS MEDICAL OR HEALTH RELATED, ABOUT SYMPTOMS, ILLNESS, DISEASE, Then provide information and suggestions to alleviate it.
  // `;

  /*
  const responseRule = length
    ? "RULE: Keep your answer short"
    : "RULE: Respond with more details";
*/
  let newText = userText;

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
      Authorization:
        "Bearer " + "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",
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
    const answer = data.choices[0]?.message?.content;

    if (answer) {
      setChats((chat) => [...chat, { type: "Bot", message: answer }]);
    }
  } catch (error) {
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
