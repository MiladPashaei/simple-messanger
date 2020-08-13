import React, { useState, useMemo, useReducer } from "react";
import AppStatus from "./components/appStatus";
import ListItem from "./components/listItem";
import List from "./components/list";
import ChatDetail from "./components/chatDetail";
import styles from "./index.module.scss";
import { Server } from "../../Resourses/server";
import { produce } from "immer";
function reducer(state, action) {
  switch (action.type) {
    case "SELECTED_CHAT":
      return { ...state, ...action.payload };
    case "MESSAGE_ADDED":
      const newMessage = {
        id: Math.random().toString(),
        me: true,
        text: action.payload,
        time: new Date(),
        type: "txt",
      };
      const nextState = produce(state, (draftState) => {
        const selectedItem = draftState.data.find(
          (x) => x.id === draftState.selectedChat
        );

        selectedItem.messages.push(newMessage);
      });

      return nextState;
    case "SEARCH_INPUT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
export default function Index() {
  const [{ data, selectedChat, keyword }, dispatch] = useReducer(reducer, {
    data: Server,
    selectChat: 1,
    keyword: "",
  });

  function selectChatHandler(id) {
    dispatch({
      type: "SELECTED_CHAT",
      payload: { selectedChat: id },
    });
  }
  function searchHandler(keyword) {
    dispatch({
      type: "SEARCH_INPUT",
      payload: { keyword: keyword },
    });
  }
  function addMessageHandler(text) {
    dispatch({
      type: "MESSAGE_ADDED",
      payload: text,
    });
  }

  const ShowList = useMemo(() => {
    return data.filter((x) =>
      x.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, data]);

  function chatGenerator(data) {
    const getTime = (item) => {
      const lastIndex = item.messages.length - 1;
      const time = item.messages[lastIndex].time;

      return `${time.getHours()}:${time.getMinutes()}`;
    };
    const getText = (item) => {
      const lastIndex = item.messages.length - 1;
      return item.messages[lastIndex].text.substring(0, 10) + "...";
    };
    return (
      <List>
        {data.map((item) => {
          return (
            <ListItem
              id={item.id}
              key={item.id}
              name={item.name}
              avatar={item.avatar}
              unreadMessageCount={item.unreadMessageCount}
              time={getTime(item)}
              text={getText(item)}
              selectChat={selectChatHandler}
            />
          );
        })}
      </List>
    );
  }
  function chatDetailGenerator() {
    const selectedItem = data.find((x) => x.id === selectedChat);

    if (selectedItem === undefined) {
      return <div>Please select An Chat</div>;
    } else
      return (
        <ChatDetail
          addMessage={addMessageHandler}
          selectChat={selectChatHandler}
          avatar={selectedItem.avatar}
          name={selectedItem.name}
          messages={selectedItem.messages}
        />
      );
  }

  return (
    <div className={styles["layout"]}>
      <div className={styles["side"]}>
        <AppStatus keyword={keyword} searchInput={searchHandler} />
        {chatGenerator(ShowList)}
      </div>
      <div className={styles["main"]}>{chatDetailGenerator()}</div>
    </div>
  );
}
