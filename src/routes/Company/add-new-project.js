import React, { useState, useRef } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "./add-new-project.scss";

export default function AddNewProject(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const firstInput = useRef(null);

  const { allProjects, setAllProjects, companyId } = props;

  const createProject = () => {
    const project = {
      id: new Date().getTime(),
      name,
      department,
      companyId,
      employees: [],
      employeesId: [],
    };

    setAllProjects([...allProjects, project]);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleShown = () => {
    if (firstInput.current) firstInput.current.focus();
  };

  const handleClose = () => {
    setName("");
    setDepartment("");
    setFormErrors([]);
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    createProject();
    handleClose();
  };

  const validate = () => {
    const errorsClone = [...formErrors];
    if (!name.length) errorsClone.push("name");
    if (!department.length) errorsClone.push("department");

    setFormErrors(errorsClone);

    if (errorsClone.length > 0) {
      setFormErrors(errorsClone);
      return false;
    }

    return true;
  };

  return (
    <div className="add-new-project">
      <Modal show={show} onHide={handleClose} onShow={handleShown}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add new project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={name}
                ref={firstInput}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFormErrors([])}
              />
              {formErrors.includes("name") && (
                <Form.Text className="text-danger">
                  Project name is required.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                onFocus={() => setFormErrors([])}
              />
              {formErrors.includes("department") && (
                <Form.Text className="text-danger">
                  Project name is required.
                </Form.Text>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Button className="add-btn" onClick={handleShow}>
        <span className="fa fa-plus mr-1"></span> Add new
      </Button>
    </div>
  );
}
