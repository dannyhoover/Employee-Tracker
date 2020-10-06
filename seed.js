const orm = require("./orm");


(async function() {
  await orm.createDepartment({name: "HR"});
  await orm.createDepartment({name: "IT"});
  const [hr, it] = await orm.getDepartments();
  const []
  await orm.createRole({title:"Relations Manager", salary: 20000, departmentId: hr.id});
  await orm.createRole({title:"Tech Support Specialist", salary: 40000, departmentId: it.id});
  await orm.createEmployee({firstName:"Danny", lastName:"Hoover", roleId: it.id, managerId: role.id})
})();