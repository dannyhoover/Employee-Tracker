
const inquirer = require("inquirer");
const { getDepartments, getRoles, getEmployees } = require("./orm");

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
  const choice = await inquirer.prompt([
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
  if (choice = choices[0]) {
    listEmployees();
  }
}

async function listEmployees () {
    const choiceView = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to view?",
        choices: [
          "View departments",
          "View Roles",
          "View Employees"
        ]
      }
    ])
  if (choiceView = choices[0]) {
    console.log(getDepartments);
  } else if (choice = choices[1]) {
    console.log(getRoles);
  } else {
    console.log(getEmployees)
  }
}

menu();

menu().catch(err => { console.log(err) });