import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import CompanyAddress from "./company-address";
import Item from "./item";
import AddNewProject from "./add-new-project";
import createProjectsTree from "./create-tree";
import { fetchData } from "../../utils/";
import "./index.scss";

export default function Company() {
  const [companies, setCompanies] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);
  const [tree, setTree] = useState(null);
  const history = useHistory();

  const companyId = history.location.pathname.replace("/companies/", "");
  const company = companies ? companies.find((x) => x.id === companyId) : null;
  const companyEmployees = employees
    ? employees.filter((x) => x.companyId === companyId)
    : null;

  useEffect(() => {
    fetchData(`/data/companies.json`)
      .then((data) => {
        setCompanies(data);
      })
      .catch((error) => {
        setError(error);
      });

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
  }, [setCompanies, setEmployees, setProjects, setError]);

  useEffect(() => {
    if (companies && employees && projects) {
      setTree(createProjectsTree(company, employees, projects));
    }
  }, [companies, company, employees, projects]);

  if (!tree) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <PageContainer pageTitle={company.name}>
      <section className="my-5">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="text-white">Address</h2>
        </div>
        <CompanyAddress companyId={companyId} />
      </section>

      <section>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="text-white">Projects</h2>
          <AddNewProject
            allProjects={projects}
            setAllProjects={setProjects}
            companyId={companyId}
          />
        </div>

        <div className="companies-tree">
          {tree.map((project) => (
            <Item
              key={project.id}
              project={project}
              allProjects={projects}
              setAllProjects={setProjects}
              companyEmployees={companyEmployees}
            />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
