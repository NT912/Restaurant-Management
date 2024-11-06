function fileterEmpleyee() {
    const searchName = document.getElementById('searchInput').value.trim(); 
    const filterDepartment = document.getElementById('filterDepartment').value; 
    const filterRole = document.getElementById('filterRole').value; 

    // if (!searchName && !filterDepartment && !filterRole) return

    const apiUrl = `/api/auth/staff?` + (searchName ? `&name=${searchName}` : '') + (filterDepartment ? `&department=${filterDepartment}` : '') + (filterRole ? `&role=${filterRole}` : '');

    axios.get(apiUrl)
        .then(response => {
            console.log(response);
            const data = response.data;
            const tableBody = document.getElementById('employeeTableBody');
            tableBody.innerHTML = ''; 
            console.log(data);

            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="7" class="text-center">No employees found</td></tr>';
                return;
            }

            data.forEach((employee, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${employee.Name}</td>
                        <td>${employee.roleName}</td>
                        <td>${employee.departmentIcon} ${employee.departmentName}</td>
                        <td>${employee.PhoneNumber}</td>
                        <td><span class="badge badge-soft-${employee.status === 'Active' ? 'success' : 'danger'}">${employee.status}</span></td>
                        <td>
                            <a class="action-icon" href="#" data-toggle="modal" data-target="#employeeDetailModal"
                               data-name="${employee.Name}"
                               data-role="${employee.roleName}"
                               data-department="${employee.departmentName}"
                               data-phone="${employee.PhoneNumber}"
                               onclick="OnShowViewDetailAccount(this)">
                               <i class="bi bi-eye"></i>
                            </a>
                            <a class="action-icon" href="#" data-toggle="modal" data-target="#employeeEditModal"
                               data-name="${employee.Name}"
                               data-role="${employee.roleName}"
                               data-department="${employee.departmentName}"
                               data-phone="${employee.PhoneNumber}" 
                               onclick="OnShowEditAccount(this)">
                               <i class="bi bi-pencil-square"></i>
                            </a>
                            <a class="action-icon" href="#" data-bs-toggle="modal" data-bs-target="#deleteAccountModal"
                               data-id="${employee.id}" data-name="${employee.Name}"
                               onclick="OnShowDeleteAccount(this)">
                               <i class="bi bi-trash"></i>
                            </a>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row; 
            });
        })
        .catch(error => {
            console.error('Error fetching employees:', error);
        });
}



function getPanelOfAdmin(panel, date) {
    const url = `/dashboard/panel/admin-panel?name=${panel}` + (date ? `&date=${date}` : '');
    axios.get(url)
        .then(response => {
            const panelContent = document.getElementById('layoutSidenav_content');
            panelContent.innerHTML = response.data;
            if (panel == 'main') {
                LoadChart('daily', date);
            }
        })
        .catch(error => {
            console.error('Error fetching panel content:', error);
        });
}

function refreshPanelMain() {
    const selectedDate = document.getElementById('selectedDate').value; 
    getPanelOfAdmin('main', selectedDate); 
}

function submitCreateAccountForm() {
    const accountName = document.getElementById('accountName').value;
    const accountUserName = document.getElementById('accountUserName').value;
    const accountRole = document.getElementById('addEmployeeRole').value;
    const accountPhone = document.getElementById('accountPhone').value;
    const accountPassword = document.getElementById('accountPassword').value;
    
    // Validation (You can add more validation if needed)
    if (!accountName || !accountRole || !accountPassword || !accountUserName) {
        toastr.error('Please fill out all required fields.');
        return;
    }

    // Prepare data to send
    const data = {
        name: accountName,
        username: accountUserName,
        roleId: accountRole,
        phone: accountPhone,
        password: accountPassword
    };

    axios.post('/api/auth/staff/create', data)
        .then(function (response) {
            toastr.success('Account created successfully!');

            var modal = bootstrap.Modal.getInstance(document.getElementById('addAccountModal'));
            modal.hide();

            document.getElementById('addAccountForm').reset();
        })
        .catch(function (error) {
            toastr.error('Failed to create account. Please try again.');
            console.error('Error creating account:', error);
        });
}

function updateRoleAddAccount() {
    const selectedRoleId = document.getElementById('addEmployeeRole').value; 

    axios.get(`/api/department/getDepartmentByRole/${selectedRoleId}`)
        .then(function (response) {
            const department = response.data;

            const departmentSelect = document.getElementById('addEmployeeDepartment'); 
            departmentSelect.disabled = false; 

            for (let i = 0; i < departmentSelect.options.length; i++) {
                if (departmentSelect.options[i].value == department.DepartmentID) {
                    departmentSelect.selectedIndex = i; 
                    break;
                }
            }
        })
        .catch(function (error) {
            console.error('Error fetching departments:', error);
        });
}


function OnShowViewDetailAccount(button) {
    var modalDetail = document.getElementById('employeeDetailModal');
    var name = button.getAttribute('data-name');
    var role = button.getAttribute('data-role');
    var department = button.getAttribute('data-department');
    var phone = button.getAttribute('data-phone');

    document.getElementById('employeeName').textContent = name;
    document.getElementById('employeeRole').textContent = role;
    document.getElementById('employeeDepartment').textContent = department;
    document.getElementById('employeePhone').textContent = phone;
    var modal = new bootstrap.Modal(modalDetail);
    modal.show();
}

function OnShowEditAccount(button) {
    const modalEdit = document.getElementById('employeeEditModal');

    var id = button.getAttribute('data-id');
    var name = button.getAttribute('data-name');
    var role = button.getAttribute('data-role');
    var department = button.getAttribute('data-department');
    var phone = button.getAttribute('data-phone');

    document.getElementById('editEmployeeID').value = id;
    document.getElementById('editEmployeeName').value = name;
    document.getElementById('editEmployeeRole').value = role;
    document.getElementById('editEmployeeDepartment').value = department;
    document.getElementById('editEmployeePhone').value = phone;
    var modal = new bootstrap.Modal(modalEdit);

    modal.show();
}

function updateRoleEditAccount() {
    const selectedRoleId = document.getElementById('editEmployeeRole').value;

    axios.get(`/api/department/getDepartmentByRole/${selectedRoleId}`)
        .then(function (response) {
            const department = response.data;
            console.log(department);

            const departmentSelect = document.getElementById('editEmployeeDepartment');

            for (let i = 0; i < departmentSelect.options.length; i++) {
                if (departmentSelect.options[i].value == department.DepartmentID) {
                    departmentSelect.selectedIndex = i; // Set the department as selected
                    break;
                }
            }
        })
        .catch(function (error) {
            console.error('Error fetching departments:', error);
        });
}

function confirmUpdateAccount()
{
    var id = document.getElementById('editEmployeeID').value;
    var name = document.getElementById('editEmployeeName').value;
    var role = document.getElementById('editEmployeeRole').value;
    var department = document.getElementById('editEmployeeDepartment').value;
    var phone = document.getElementById('editEmployeePhone').value;

    axios.post('/api/auth/staff/update', {
        id: id, 
        name: name,
        roleId: role, 
        departmentId: department, 
        phone: phone
    })
    .then(function (response) {
        toastr.success('Employee updated successfully!');

        var modalEdit = document.getElementById('employeeEditModal');
        var modal = bootstrap.Modal.getInstance(modalEdit); 
        if (modal) {
            modal.hide(); 
        }
    })
    .catch(function (error) {
        toastr.error('Employee updated failed!');
    });
}

function OnShowDeleteAccount(button) {
    const modalDelete = document.getElementById('deleteAccountModal');

    const accountName = button.getAttribute('data-name');
    const accountId = button.getAttribute('data-id');

    document.getElementById('deleteAccountName').textContent = accountName;
    document.getElementById('deleteEmployeeID').value = accountId;
    console.log(document.getElementById('deleteEmployeeID').value);

    var modal = new bootstrap.Modal(modalDelete);
    
    modal.show();
}

function confirmDeleteAccount()
{
    var accountId = document.getElementById('deleteEmployeeID').value;

    console.log(accountId);
    axios.post('/api/auth/staff/delete', {
        accountId: accountId, 
    })
    .then(function (response) {
        toastr.success('Employee deleted successfully!');

        var modalDelete = document.getElementById('deleteAccountModal');
        var modal = bootstrap.Modal.getInstance(modalDelete); 
        if (modal) {
            modal.hide(); 
        }
    })
    .catch(function (error) {
        toastr.error('Employee deleted failed!');
    });
}

function LoadChart(type, date) {
    let titleText = '';

    date = document.getElementById('selectedDate').value; 

    document.getElementById('daily-btn').classList.remove('active');
    document.getElementById('weekly-btn').classList.remove('active');
    document.getElementById('monthly-btn').classList.remove('active');

    if (type === 'daily') {
        document.getElementById('daily-btn').classList.add('active');
        titleText = 'Total Revenue and Number of Customers per Day';
    } else if (type === 'weekly') {
        titleText = 'Total Revenue and Number of Customers per Week';
        document.getElementById('weekly-btn').classList.add('active');
    } else if (type === 'monthly') {
        document.getElementById('monthly-btn').classList.add('active');
        titleText = 'Total Revenue and Number of Customers per Month';
    } else {
        return;
    }

    const url = `/api/finance/chart?name=${type}` + (date ? `&date=${date}` : date); 
    axios.get(url)
        .then(response => {
            const data = response.data.result;
            
            if (!data || data.length === 0) {
                console.error('No data available.');
                return;
            }

            const revenueData = data.map(item => Math.round(item.TotalRevenue));
            const customerCountData = data.map(item => item.TotalCustomers);

            const dateData = data.map((item, index) => {
                const date = new Date(item.Date);
                
                if (type === 'daily') {
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                } else if (type === 'weekly') {
                    if (index === 0) {
                        return 'This Week';
                    } else {
                        return `${index} Week${index > 1 ? 's' : ''} Ago`;
                    }
                } else if (type === 'monthly') {
                    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
                }
            });

            // Chart container
            const chartElement = document.querySelector("#salesAnalyticsChart");
            if (!chartElement) {
                console.error("Element #salesAnalyticsChart not found");
                return;
            }

            // Set chart options dynamically
            var options = {
                chart: {
                    height: 350,
                    type: 'line',
                    stacked: false
                },
                series: [
                    {
                        name: 'Total Revenue',
                        type: 'column',
                        data: revenueData
                    },
                    {
                        name: 'Customers',
                        type: 'line',
                        data: customerCountData
                    }
                ],
                xaxis: {
                    categories: dateData
                },
                yaxis: [
                    {
                        title: {
                            text: 'Revenue (in USD)'
                        },
                        labels: {
                            formatter: function(value) {
                                return '$' + Math.round(value).toLocaleString();
                            }
                        }
                    },
                    {
                        opposite: true,
                        title: {
                            text: 'Number of Customers'
                        }
                    }
                ],
                title: {
                    text: titleText,
                    align: 'center'
                },
                markers: {
                    size: 4
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1] 
                }
            };

            var chart = new ApexCharts(chartElement, options);
            chart.render();
        })
        .catch(error => {
            console.error('Error fetching panel content:', error);
        });
}
