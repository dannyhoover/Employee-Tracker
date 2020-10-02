const orm = require("./orm");


(async function() {
  await orm.createDepartment({name: "HR"});
  await orm.createDepartment({name: "IT"});
  const [hr, it] = await orm.getDepartments();
  await orm.createRole({title:"Relations Manager", salary: 20000, departmentId: hr.id});
})();