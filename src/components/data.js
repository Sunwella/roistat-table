export function getEmployees() {
    const employees = localStorage.getItem('employees');
    return (employees == null) ? [] : JSON.parse(employees);
}

export function saveEmployee(newEmployee) {
    const employees = getEmployees();
    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees));
}


// export function employeesList() {
//     return [
//         {
//             id: 1,
//             name: 'Aleksandra',
//             phone: '+71234567890',
//             bossId: null,
//         },
//         {
//             id: 2,
//             name: 'Kris',
//             phone: '+71234567890',
//             bossId: null,
//         },
//         {
//             id: 3,
//             name: 'Sofi',
//             phone: '+71234567890',
//             bossId: 1,
//         },
//         {
//             id: 4,
//             name: 'Mike',
//             phone: '+71234567890',
//             bossId: 3,
//         },
//     ];
// } 