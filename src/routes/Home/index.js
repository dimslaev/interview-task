import React, { useState, useEffect } from "react";
import createCompaniesTree from "./create-tree";
import PageContainer from "../../components/PageContainer";
import Item from "./item";
import { fetchData } from "../../utils/";
import "./index.scss";

export default function Home() {
  const [companies, setCompanies] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [error, setError] = useState(null);

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
  }, [setCompanies, setEmployees, setError]);

  if (!companies || !employees) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const tree = createCompaniesTree(companies, employees);

  return (
    <PageContainer pageTitle="Interview Task">
      <div className="companies-tree">
        {tree.map((data) => (
          <Item key={data.id} data={data} />
        ))}
      </div>
    </PageContainer>
  );
}
