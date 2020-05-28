export default function createProjectsTree(company, employees, projects) {
  const arr = [];

  projects.forEach((project) => {
    if (project.companyId === company.id) {
      const projectClone = { ...project };
      const employeeIds = projectClone.employeesId;
      projectClone.employees = [];

      employeeIds.forEach((employeeId) => {
        const employee = employees.find((x) => x.id === employeeId);
        projectClone.employees.push(employee);
      });
      arr.push(projectClone);
    }
  });

  return arr;
}
