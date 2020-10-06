const fs = require("fs");
const inquirer = require("inquirer");

// async loop function example
// async function loop() {
//   const value = Math.random();
//   console.log(value);
//   if (value < 0.9) {
//     await loop();
//   }
// }

async function loop() {
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
}

loop();

init().catch(err => { console.log(err) });