import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { fetchData, formatDate } from "../../utils/";
import PageContainer from "../../components/PageContainer";
import "./index.scss";

export default function Employee(props) {
  const [employees, setEmployees] = useState(null);
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    fetchData(`/data/employees.json`)
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        setError(error);
      });

    fetchData(`/data/projects.json`)
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setEmployees, setProjects, setError]);

  if (!employees || !projects) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const employeeId = history.location.pathname.replace("/employees/", "");
  const employee = employees.find((x) => x.id === employeeId);
  const employeeCompanyProjects = projects.filter(
    (x) => x.companyId === employee.companyId,
  );
  const employeeProjects = [];

  employeeCompanyProjects.forEach((project) => {
    if (project.employeesId.includes(employeeId))
      employeeProjects.push(project);
  });

  return (
    <PageContainer pageTitle={`${employee.firstName} ${employee.lastName}`}>
      <section className="my-4">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="text-white">Details</h2>
        </div>
        <Card className="employee-details">
          <Card.Body>
            <Row>
              <Col sm="4" className="mb-3 mb-sm-0">
                <h5>Date of Birth</h5>
                {formatDate(employee.dateOfBirth)}
              </Col>
              <Col sm="4" className="mb-3 mb-sm-0">
                <h5>Job Area</h5>
                {employee.jobArea}
              </Col>
              <Col sm="4" className="mb-3 mb-sm-0">
                <h5>Job Type</h5>
                {employee.jobType}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </section>

      {employeeProjects.length > 0 && (
        <section className="my-4">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="text-white">Projects</h2>
          </div>

          <ListGroup className="employee-projects">
            {employeeProjects.map((item) => (
              <ListGroup.Item key={item.id}>
                <span>{item.name}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </section>
      )}
    </PageContainer>
  );
}
