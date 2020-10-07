
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

async function listEmployees () {
    let choiceView = await inquirer.prompt([
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
  if (choiceView = "View Departments") {
    console.log(getDepartments());
  } else if (choiceView = "View Roles") {
    console.log(getRoles());
  } else {
    console.log(getEmployees());
  }
  return choiceView;
}

menu();

menu().catch(err => { console.log(err) });