import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { isChildElement } from "../../utils";
import "./index.scss";

export default function Editable(props) {
  const {
    children,
    className,
    isStarted,
    startBtnIcon,
    startBtnText,
    onStart,
    onSubmit,
    onCancel,
    disabled,
  } = props;

  const containerRef = useRef(null);

  const classNames = () => {
    const arr = ["editable"];
    if (className) arr.push(className);
    if (isStarted) arr.push("is-started");
    return arr.join(" ");
  };

  useEffect(() => {
    if (!containerRef.current || !isStarted) return;

    const listenForClickOutsite = (e) => {
      if (!isChildElement(e.target, containerRef.current)) {
        if (onCancel) onCancel();
      }
    };

    window.addEventListener("click", listenForClickOutsite);

    return function cleanup() {
      window.removeEventListener("click", listenForClickOutsite);
    };
  }, [containerRef, isStarted, onCancel]);

  if (disabled) return <div></div>;

  return (
    <div className={classNames()} ref={containerRef}>
      {children}

      <Button
        onClick={onStart}
        className="start-btn"
        size="sm"
        variant="default"
      >
        <span className={`fa ${startBtnIcon}`}></span>
        {startBtnText && <span className="text">{startBtnText}</span>}
      </Button>

      <Button
        onClick={onSubmit}
        className="submit-btn"
        size="sm"
        variant="default"
      >
        <span className="fa fa-check"></span>
      </Button>

      <Button
        onClick={onCancel}
        className="cancel-btn"
        size="sm"
        variant="default"
      >
        <span className="fa fa-close"></span>
      </Button>
    </div>
  );
}
