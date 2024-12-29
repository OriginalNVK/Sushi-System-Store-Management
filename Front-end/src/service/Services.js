export const loginUser = async (phone, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });

    const result = await response.json();
    return { success: true, role: result.user.role };
  } catch (err) {
    console.error("Error during login request:", err);
    return { success: false, error: "Network error" };
  }
};

export const getCustomer = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/customers');

    const result = await response.json();
    return result;
  }
  catch (error)
  {
    console.error("Error during getCustomer request:", error);
    return [];
  }
}

export const getBranches = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/branch');
    const result = await response.json();
    return result;
  }
  catch (error)
  {
    console.error("Error during getBranch request:", error);
    return [];
  }
}

export const deleteBranch = async (branchID) => {
  try {
    const response = await fetch(`http://localhost:3000/api/branch/${branchID}`, {
      method: "DELETE",
    });
    
    return response;
  }
  catch (error)
  {
    console.error("Error during deleteBranch request:", error);
    return { success: false, error: "Network error" };
  }
}

export const getDepartments = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/departments');
    const result = await response.json();
    return result;
  }
  catch(error)
  {
    console.error("Error during getDepartments request:", error);
    return [];
  }
}

export const getEmployees = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/employees");
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error during getEmployees request:", err);
    return [];
  }
};

export const createEmployee = async (employee) => {
  try {
    const response = await fetch('http://localhost:3000/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
  }
  catch(error)
  {
    console.error("Error during createEmployee request:", error);
    return { success: false, error: "Network error" };
  }
}

export const putEmployee = async (employee) => {
  try {
    const response = await fetch(`http://localhost:3000/api/employees/${employee.EmployeeID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    return response;
  }
  catch (error) {
    console.error("Error during putEmployee request:", error);
    return { success: false, error: "Network error" };
  }
};

export const deleteEmployee = async (employeeID) => {
  try {
    const response = await fetch(`http://localhost:3000/api/employees/${employeeID}`, {
      method: "DELETE",
    });

    return response;
  }
  catch (error)
  {
    console.error("Error during deleteEmployee request:", error);
    return { success: false, error: "Network error" };
  }
}

export const getDishes = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/dishes');
    const result = await response.json();
    return result;
  }
  catch (error)
  {
    console.error("Error during getDishes request:", error);
    return [];
  }
}

export const bookOrder = async (order) => {
  const response = await fetch("http://localhost:3000/api/order-online", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
}