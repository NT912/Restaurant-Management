function filterEmployees() {
    const searchName = document.getElementById('searchName').value.toLowerCase();
    const filterDepartment = document.getElementById('filterDepartment').value;

    const api = `/api/employees?name=${searchName}` + (filterDepartment ? `&department=${filterDepartment}` : '');
    fetch(api)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('employeeTableBody');
            tableBody.innerHTML = ''; 

            data.forEach((employee, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${employee.Name}</td>
                        <td>${employee.roleName}</td>
                        <td>${employee.departmentIcon} ${employee.departmentName}</td>
                        <td>${employee.PhoneNumber}</td>
                        <td>
                            <button class="btn btn-primary btn-sm">Edit</button>
                            <button class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching employees:', error));
}

function submitCreateAccountForm() {
    const accountName = document.getElementById('accountName').value;
    const accountRole = document.getElementById('accountRole').value;
    const accountPhone = document.getElementById('accountPhone').value;
    const accountPassword = document.getElementById('accountPassword').value;

    console.log("Account Name:", accountName);
    console.log("Account Role:", accountRole);
    console.log("Account Phone:", accountPhone);
    console.log("Account Password:", accountPassword);

    $('#addAccountModal').modal('hide');
    
    document.getElementById('addAccountForm').reset();
}