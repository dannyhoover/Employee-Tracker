
const inquirer = require("inquirer");
const db = require("./orm");
require("console.table");

// async loop function example
// async function loop() {
//   const value = Math.random();
//   console.log(value);
//   if (value < 0.9) {
//     await loop();
//   }
// }

async function menu() {
  console.log('Employee Tracker: ')
  let choice = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View departments, roles, or employees",
        "Add a department, role, or employee",
        "Update an employee role",
        "Update employee managers",
        "View employees by manager",
        "Delete departments, roles, or employees",
        "View the total utilized budget of a department"
      ]
    }]);
  if (choice = "View departments, roles, or employees") {
    listEmployees();
  }
}

async function listEmployees() {
  const choiceView = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to view?",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees"
      ]
    }
  ])
  if (choiceView === "View Departments") {
    console.log(db.getDepartments());
  } else if (choiceView === "View Roles") {
    console.log(db.getRoles());
  } else {
    console.log(db.getEmployees());
  }
  return choiceView;
}

(async () => {
  let exitRequested = false;
  while (!exitRequested) {
    const { actionFunc } = await inquirer.prompt([
      {
        type: "list",
        name: "actionFunc",
        message: "What would you like to do?",
        loop: false,
        choices: [
          {
            name: "View Departments", value: async () => {
              const departments = await db.getDepartments();
              console.table(departments)
            }
          },
          {
            name: "View Roles", value: async () => {
              const roles = await db.getRoles();
              console.table(roles);
            }
          },
          {
            name: "View Employees", value: async () => {
              const employees = await db.getEmployees();
              console.table(employees);
            }
          },
          {
            name: "Add Department", value: async () => {
              const { name } = await inquirer.prompt([
                {
                  type: "input",
                  name: "name",
                  message: "What is the department name?",
                  validate: (value) => !!value || "Please enter a name"
                }
              ]);
              await db.createDepartment({ name });
            }
          },
          {
            name: "Add Role", value: async () => {
              const departments = await db.getDepartments();
              const { title, salary, departmentId } = await inquirer.prompt([
                {
                  type: "input",
                  name: "title",
                  message: "What is the role title?",
                  validate: (value) => !!value || "Please enter a title"
                },
                {
                  type: "input",
                  name: "salary",
                  message: "What is the role salary?",
                  validate: (value) => {
                    value = Number.parseFloat(value);
                    if (Number.isNaN(value)) return "Please enter a number";
                    if (value < 0) return "Please enter a positive number";
                    if (value === 0) return "Please compensate your employees";
                    if (value < 40_000) return "Please pay your employees a living wage";
                    return true;
                  }
                },
                {
                  type: "list",
                  name: "departmentId",
                  message: "Which department is this role in?",
                  choices: departments.map(({ id, name }) => ({ name, value: id }))
                }
              ]);
              await db.createRole({ title, salary: Number.parseFloat(salary), departmentId });
            }
          },
          {
            name: "Add Employee", value: async () => {
              const [roles, employees] = await Promise.all([db.getRoles(), db.getEmployees()]);
              const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                {
                  type: "input",
                  name: "firstName",
                  message: "What the employee's given name?",
                  validate: (value) => !!value || "Please enter a name"
                },
                {
                  type: "input",
                  name: "lastName",
                  message: "What the employee's family name?",
                  validate: (value) => !!value || "Please enter a name"
                },
                {
                  type: "list",
                  name: "roleId",
                  message: "What is the employee's role?",
                  choices: roles.map(({ id, title }) => ({ name: title, value: id }))
                },
                {
                  type: "list",
                  name: "managerId",
                  message: "Who is the employee's manager?",
                  choices: [{ name: "None", value: null }, ...employees.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }))]
                }
              ]);
              await db.createEmployee({ firstName, lastName, roleId, managerId });
            }
          },
          {
            name: "Update Employee Role", value: async () => {
              const [roles, employees] = await Promise.all([db.getRoles(), db.getEmployees()]);
              const { employeeId, roleId } = await inquirer.prompt([
                {
                  type: "list",
                  name: "employeeId",
                  message: "Which employee would you like to update?",
                  choices: employees.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }))
                },
                {
                  type: "list",
                  name: "roleId",
                  message: "What would you like to update their role to?",
                  choices: roles.map(({ id, title }) => ({ name: title, value: id }))
                }
              ]);
              await db.updateEmployee({ id: employeeId, roleId });
            }
          },
          {
            name: "Exit", value: () => {
              exitRequested = true;
            }
          }
        ]
      }
    ]);
    await actionFunc();
  }
  db.disconnect();
})()

// menu();

// menu().catch(err => { console.log(err) });