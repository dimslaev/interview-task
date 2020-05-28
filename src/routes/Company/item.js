import React, { useState, useRef, useEffect } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import Editable from "../../components/Editable";
import "./item.scss";

export default function Item(props) {
  const { project, allProjects, setAllProjects, companyEmployees } = props;
  const { name, department, employees } = project;
  const [expanded, setExpanded] = useState(false);

  const handleUpdateName = (newName) => {
    const projectsClone = [...allProjects];
    const projectClone = projectsClone.find((x) => x.id === project.id);
    projectClone.name = newName;
    setAllProjects(projectsClone);

    // @TODO backend update request
  };

  const handleAddEmployee = (employeeId) => {
    const projectsClone = [...allProjects];
    const projectClone = projectsClone.find((x) => x.id === project.id);
    projectClone.employeesId.push(employeeId);
    setAllProjects(projectsClone);

    // @TODO backend update request
  };

  const handleRemoveEmployee = (employeeId) => {
    const projectsClone = [...allProjects];
    const projectClone = projectsClone.find((x) => x.id === project.id);
    projectClone.employeesId.forEach((x, i) => {
      if (x === employeeId) projectClone.employeesId.splice(i, 1);
    });
    setAllProjects(projectsClone);

    // @TODO backend update request
  };

  const handleDeleteProject = () => {
    setAllProjects(allProjects.filter((x) => x.id !== project.id));
  };

  return (
    <Card className="project-card">
      <Card.Header>
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
          <h3>{name}</h3>
        </Button>
      </Card.Header>

      {expanded && (
        <Card.Body>
          <ListGroup>
            <ProjectName name={name} handleUpdateName={handleUpdateName} />

            <ProjectDepartment department={department} />

            <ProjectEmployees
              projectEmployees={employees}
              projectEmployeesId={project.employeesId}
              companyEmployees={companyEmployees}
              handleAddEmployee={handleAddEmployee}
              handleRemoveEmployee={handleRemoveEmployee}
            />

            <ProjectDelete handleDeleteProject={handleDeleteProject} />
          </ListGroup>
        </Card.Body>
      )}
    </Card>
  );
}

function ProjectName(props) {
  const { name, handleUpdateName } = props;
  const [inputValue, setInputValue] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [textRefWidth, setTextRefWidth] = useState(100);
  const inputRef = useRef(null);
  const textRef = useRef(null);

  const handleEditClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, 0);
    }
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    setIsEditing(false);
    handleUpdateName(inputValue);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setInputValue(name);
  };

  useEffect(() => {
    if (!textRef.current) return;

    setTextRefWidth(textRef.current.getBoundingClientRect().width);
  }, [inputValue, textRef, setTextRefWidth]);

  return (
    <ListGroup.Item>
      <h5>Project name</h5>

      <Editable
        className="title"
        isStarted={isEditing}
        startBtnIcon="fa-pen"
        onStart={handleEditClick}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
      >
        <div className="title-text">
          <input
            type="text"
            value={inputValue}
            ref={inputRef}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: textRefWidth + "px" }}
          />
          <span className="text" ref={textRef}>
            {inputValue}
          </span>
        </div>
      </Editable>
    </ListGroup.Item>
  );
}

function ProjectEmployees(props) {
  const {
    projectEmployees,
    projectEmployeesId,
    companyEmployees,
    handleAddEmployee,
    handleRemoveEmployee,
  } = props;

  const [isRemoving, setIsRemoving] = useState(-1);
  const [isAdding, setIsAdding] = useState(false);
  const [newEmployeeId, setNewEmployeeId] = useState("");

  const handleAddChange = (e) => {
    setNewEmployeeId(e.target.value);
  };

  const handleAddSubmit = () => {
    setIsAdding(false);
    if (newEmployeeId !== "") {
      handleAddEmployee(newEmployeeId);
    }
  };

  const handleAddCancel = () => {
    setIsAdding(false);
    setNewEmployeeId("");
  };

  const handleRemoveSubmit = (employeeId) => {
    handleRemoveEmployee(employeeId);
    setIsRemoving(-1);
  };

  const notAssignedEmployees = () => {
    const arr = [];
    companyEmployees.forEach((x) => {
      if (!projectEmployeesId.includes(x.id)) arr.push(x);
    });
    return arr;
  };

  return (
    <ListGroup.Item>
      <h5>Employees</h5>

      {projectEmployees.map((item, index) => (
        <Editable
          key={index}
          className="remove-employee"
          isStarted={isRemoving === index}
          startBtnIcon="fa-close"
          onStart={() => setIsRemoving(index)}
          onSubmit={() => handleRemoveSubmit(item.id)}
          onCancel={() => setIsRemoving(false)}
        >
          <span className="text-dark">
            {item.firstName} {item.lastName}
          </span>
        </Editable>
      ))}

      {companyEmployees.length > 0 ? (
        <Editable
          className="add-employees"
          isStarted={isAdding}
          startBtnIcon="fa-plus"
          startBtnText="Assign an employee"
          onStart={() => setIsAdding(true)}
          onSubmit={handleAddSubmit}
          onCancel={handleAddCancel}
          disabled={notAssignedEmployees().length === 0}
        >
          <select onChange={handleAddChange} value={newEmployeeId}>
            <option value="">Select</option>

            {notAssignedEmployees().map((item) => (
              <option key={item.id} value={item.id}>
                {item.firstName} {item.lastName}
              </option>
            ))}
          </select>
        </Editable>
      ) : (
        <p>
          The company has <span className="text-danger">0</span> employees.
        </p>
      )}
    </ListGroup.Item>
  );
}

function ProjectDepartment(props) {
  const { department } = props;

  return (
    <ListGroup.Item>
      <h5>Department</h5>
      <p>
        <span className="text">{department}</span>
      </p>
    </ListGroup.Item>
  );
}

function ProjectDelete(props) {
  const { handleDeleteProject } = props;
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <ListGroup.Item>
      <h5>Delete Project</h5>
      <Editable
        className="delete-project"
        isStarted={isDeleting}
        onStart={() => setIsDeleting(true)}
        onSubmit={handleDeleteProject}
        onCancel={() => setIsDeleting(false)}
      >
        <Button size="sm" onClick={() => setIsDeleting(true)}>
          <span className="text-white">Delete</span>
        </Button>
      </Editable>
    </ListGroup.Item>
  );
}
