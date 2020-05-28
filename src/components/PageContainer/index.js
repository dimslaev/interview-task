import React from "react";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./index.scss";

export default function PageContainer(props) {
  const { pageTitle, children } = props;
  return (
    <Container className="page-container">
      <Header pageTitle={pageTitle} />
      {children}
    </Container>
  );
}

function Header(props) {
  const { pageTitle } = props;
  const history = useHistory();

  return (
    <div className="header">
      {history.location.pathname !== "/" ? (
        <Button onClick={() => history.push("/")}>
          <span className="fa fa-chevron-left"></span>
        </Button>
      ) : (
        <div className="btn btn-primary">
          <span className="fa fa-home"></span>
        </div>
      )}

      <h1>{pageTitle}</h1>
    </div>
  );
}
