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

    if (response.ok && result.token)
    {
      localStorage.setItem("token", result.token);
      localStorage.setItem("BranchID", result.user.branchID);
      localStorage.setItem("EmployeeID", result.user.employeeID);
      return { success: true, role: result.user.role };
    }
    else {
      return { success: false, error: result.error };
    }
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

export const getEmployeeByBranchID = async (branchID) => {
  try {
    const response = await fetch(`http://localhost:3000/api/employees/branch/${branchID}`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error during getEmployeeByBranchID request:", err);
    return [];
  }
}

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

export const updateOrder = async (orderID, employeeID) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/order-online/${orderID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OrderID: orderID, EmployeeID: employeeID }),
      }
    );

    if (!response.ok) {
      // Handle unsuccessful response
      const errorData = await response.json();
      throw new Error(errorData.message || "Error updating order");
    }

    const data = await response.json();
    return data; // Return success message or data from the API
  } catch (error) {
    console.error("Error during updateOrder request:", error);
    return { success: false, error: error.message || "Network error" };
  }
};

export const getOrderOnlinePendingOverview = async (branchID) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/order-online/overview/${branchID}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during getOrderOnlinePendingOverview request:", error);
    return [];
  }
}

export const getOrderOnlinePendingDetail = async (orderID) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/order-online/detail/${orderID}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during getOrrderOnlinePendingDetail request:", error);
    return [];
  }
}

// invoice
export const getInvoicesByBranchID = async (branchID) => {
  try {
    const response = await fetch(`http://localhost:3000/api/invoice/branch/${branchID}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during getInvoicesByBranchID request:", error);
    return [];
  }
}

export const getInvoiceDetail = async (invoiceID) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/invoice/detail/${invoiceID}`
    );
    console.log("response: ", response);
    const result = await response.json();
    console.log("result: ", result);
    return result;
  } catch (error) {
    console.error("Error during getInvoiceDetail request:", error);
    return [];
  }
};

export const updateInvoice = async (invoiceID) => {
  try {
    const date = new Date();
    const response = await fetch(`http://localhost:3000/api/invoice/${invoiceID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentDate: date, invoiceID: invoiceID }),
    });

    // console.log(response);  

    return response;
  } catch (error) {
    console.error("Error during updateInvoice request:", error);
    return { success: false, error: "Network error" };
  }
}