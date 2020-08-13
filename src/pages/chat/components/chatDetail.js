import React, { useState, useEffect } from "react";
import { animateScroll } from "react-scroll";
import TitleBar from "./titleBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faTimes,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "./avatar";
import styles from "./chatDetail.module.scss";

export default function ChatDetail({
  name,
  messages,
  avatar,
  selectChat,
  addMessage,
}) {
  const [text, setText] = useState("");
  function scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "chatContainer",
    });
  }
  useEffect(() => scrollToBottom(), []);

  function setSelectedToNull() {
    selectChat(null);
  }

  function inputHandler(e) {
    setText(e.target.value);
  }
  function enterHandler(e) {
    if (e.keyCode === 13 && text !== "") {
      addMessage(text);
      setText("");
      scrollToBottom();
    }
  }
  function sendHandler() {
    addMessage(text);
    scrollToBottom();
    setText("");
  }
  return (
    <>
      <TitleBar
        first={
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            color="#009588"
            className="pointer"
            onClick={setSelectedToNull}
          />
        }
        middle={
          <div className={styles["app-title"]}>
            <Avatar name={name} url={avatar} />
            <div className={styles["name"]}>{name}</div>
          </div>
        }
        last={
          <FontAwesomeIcon
            icon={faEllipsisV}
            size="lg"
            color="#009588"
            className="pointer"
          />
        }
      />
      <div id="chatContainer" className={styles["chat-box"]}>
        <ul className={styles["messages-panel"]}>
          {messages.map((message) => {
            return (
              <li className={styles[message.me ? "me" : ""]} key={message.id}>
                {message.text}
              </li>
            );
          })}
        </ul>
        {/* <div style={{ float: "left", clear: "both" }}></div> */}
        <div className={styles["input-section"]}>
          <input
            type="text"
            value={text}
            onChange={inputHandler}
            onKeyUp={enterHandler}
          />
          <FontAwesomeIcon
            icon={text !== "" ? faPaperPlane : faPaperclip}
            color="#009588"
            onClick={text !== "" ? sendHandler : undefined}
            className={styles["send"] + " " + styles["pointer"]}
            size="lg"
          />
        </div>
      </div>
    </>
  );
}
