const mysql = require("mysql");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Ashley&Flock08',
  database : 'employee_tracker'
});
 
connection.connect();

module.exports = {
  getDepartments() {
    return new Promise(function(resolve, reject) {
      connection.query(
        'select * from departments',
        function (error, results) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
  },
  getRoles() {
    return new Promise(function(resolve, reject) {
      connection.query(
        'select * from roles',
        function (error, results) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
  },
  getEmployees(managerId) {
    return new Promise(function(resolve, reject) {
      const args = ['select * from employees'];
      if (managerId != null) {
        args[0] += ' where ?';
        args[1] = {manager_id: managerId};
      }
      connection.query(...args,
        function (error, results) {
          if (error) reject(error);
          else resolve(results);
      });
    });
  },
  createDepartment({name}) {
    return new Promise(function(resolve, reject) {
      connection.query(
        'insert into departments set ?',
        {name},
        function (error, results) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
  },
  createRole({title, salary, departmentId}) {
    return new Promise(function(resolve, reject) {
      connection.query(
        'insert into roles set ?',
        {title, salary, department_id: departmentId},
        function (error, results) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
  },
  createEmployee({firstName, lastName, roleId, managerId}) {
    return new Promise(function(resolve, reject) {
      connection.query(
        'insert into employees set ?',
        {first_name:firstName, last_name:lastName, role_id:roleId, manager_id:managerId},
        function (error, results) {
          if (error) reject(error);
          else resolve(results);
        }
      );
    });
  },
  updateEmployee(data) {

  },
  deleteDepartment(id) {

  },
  deleteRole(id) {
    
  },
  deleteEmployee(id) {
    
  },
}