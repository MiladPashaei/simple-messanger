import React, { useState, useRef, useEffect } from "react";
import TitleBar from "./titleBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./appStatus.module.scss";

export default function AppStatus({ keyword, searchInput }) {
  const [mode, setMode] = useState("list");
  const input = useRef(null);

  function gotoSearchMode() {
    setMode("search");
  }

  function gotoListMode() {
    setMode("list");
  }

  useEffect(() => {
    if (mode === "search") {
      input.current.focus();
    }
  }, [mode]);

  function onChangeHandler(e) {
    searchInput(e.target.value);
  }

  const listMode = mode === "list";

  return (
    <TitleBar
      first={
        <FontAwesomeIcon
          icon={listMode ? faBars : faArrowLeft}
          size="lg"
          color="#009588"
          className={styles["pointer"]}
          onClick={gotoListMode}
        />
      }
      middle={
        <div className={styles["app-title"]}>
          {listMode && "Fancy Messenger"}
          {!listMode && (
            <input
              type="text"
              value={keyword}
              className={styles["search-text"]}
              ref={input}
              onChange={onChangeHandler}
            />
          )}
        </div>
      }
      last={
        listMode && (
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            color="#009588"
            className={styles["pointer"]}
            onClick={gotoSearchMode}
          />
        )
      }
    />
  );
}
