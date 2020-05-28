import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, ListGroup, Row, Col } from "react-bootstrap";
import "./item.scss";

export default function Item(props) {
  const { data } = props;
  const [expanded, setExpanded] = useState(false);
  const jobAreas = Object.entries(data.jobAreas);
  const history = useHistory();

  return (
    <Card className="company-card">
      <Card.Header>
        {jobAreas.length > 0 ? (
          <Button
            className="toggle-btn"
            variant="default"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <span className="fa fa-minus"></span>
            ) : (
              <span className="fa fa-plus"></span>
            )}
            <h3>{data.name}</h3>
          </Button>
        ) : (
          <h3 className="ml">{data.name}</h3>
        )}

        <Button
          className="more-btn"
          onClick={() => history.push(`/companies/${data.id}`)}
        >
          <span className="fa fa-chevron-right"></span>
        </Button>
      </Card.Header>

      {expanded && jobAreas.length > 0 ? (
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <h5>Job Areas</h5>
              {jobAreas.map(([key, value], index) => (
                <JobArea key={key} title={key} data={value} />
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      ) : null}
    </Card>
  );
}

function JobArea(props) {
  const { title, data } = props;

  return (
    <Row>
      <Col className="col-first">
        <b>{title}:</b>
      </Col>
      <Col>
        <div className="employees">
          {data.map((item, index) => (
            <span key={item.id}>
              <Link to={`/employees/${item.id}`}>
                {`${item.firstName} ${item.lastName}`}
              </Link>
            </span>
          ))}
        </div>
      </Col>
    </Row>
  );
}
