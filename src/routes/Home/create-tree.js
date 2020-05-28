export default function createCompaniesTree(companies, employees) {
  const arr = [];

  companies.forEach((company) => {
    const jobAreas = {};

    const companyEmployees = employees.filter(
      (employee) => employee.companyId === company.id,
    );

    companyEmployees.forEach((employee) => {
      if (!jobAreas.hasOwnProperty(employee.jobArea)) {
        jobAreas[employee.jobArea] = [];
      }

      jobAreas[employee.jobArea].push(employee);
    });

    arr.push({ ...company, jobAreas });
  });

  return arr;
}
