/* eslint-disable react/prop-types */
import { AppContext } from "./StateProvider";
import { useContext } from "react";

const Message = ({ chat }) => {
  const { appState } = useContext(AppContext);
  let style = chat.type === "User" ? "user-message-comp" : "bot-message-comp";
  let style2 = chat.type === "User" ? "user-message" : "bot-message";

  let avatar_user = "/avatar-male.png";
  let avatar_doc = "/avatar-doctor.png";

  let select_avatar = chat.type == "User" ? avatar_user : avatar_doc;

  const styleDark =
    appState.theme == "Dark" && chat.type == "Bot"
      ? { backgroundColor: "#1D267D", color: "White" }
      : appState.theme == "Dark" && chat.type == "User"
      ? { backgroundColor: "#5C469C", color: "White" }
      : {};

  return (
    <div className={"message-comp " + style}>
      <div className="message-comp-image">
        <img src={select_avatar} alt="Image" />
      </div>

      <div
        className={`message-comp-text ${style2}`}
        style={{ ...styleDark, whiteSpace: "pre-line" }}
      >
        {chat.message}
      </div>
    </div>
  );
};

export default Message;
