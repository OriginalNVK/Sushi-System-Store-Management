const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

const config = {
    user: "sa",
    password: "1303",
    server: "DESKTOP-EKEQ0IF\\SQLEXPRESS",
    database: "SUSHISTORE_MANAGEMENT",
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
    },
    port: 1433
};

app.get('/', (req, res) => {
    return res.json("Hi, I am back");
});

app.get('/area/:AreaID', async function (req, res) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query("SELECT * FROM AREA where AreaID= @AreaID");
        return res.json(result.recordset);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "An error occurred" });
    }
});

// API thêm nhân viên
app.post('/api/new-employee', async (req, res) => {
    const { EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone } = req.body;

    try {
        const result = await sql.query`
            EXEC New_Employee 
                @EmployeeName = ${EmployeeName}, 
                @EmployeeBirth = ${EmployeeBirth}, 
                @EmployeeGender = ${EmployeeGender}, 
                @Salary = ${Salary}, 
                @EntryDate = ${EntryDate}, 
                @DepartmentID = ${DepartmentID}, 
                @BranchID = ${BranchID}, 
                @EmployeeAddress = ${EmployeeAddress}, 
                @EmployeePhone = ${EmployeePhone}`;
        
        res.status(200).json({ message: 'Employee added successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API cập nhật thông tin nhân viên
app.put('/api/update-employee', async (req, res) => {
    const { EmployeeID, EmployeeName, EmployeeBirth, EmployeeGender, Salary, EntryDate, LeaveDate, DepartmentID, BranchID, EmployeeAddress, EmployeePhone } = req.body;

    try {
        const result = await sql.query`
            EXEC Update_Employee 
                @EmployeeID = ${EmployeeID}, 
                @EmployeeName = ${EmployeeName}, 
                @EmployeeBirth = ${EmployeeBirth}, 
                @EmployeeGender = ${EmployeeGender}, 
                @Salary = ${Salary}, 
                @EntryDate = ${EntryDate}, 
                @LeaveDate = ${LeaveDate}, 
                @DepartmentID = ${DepartmentID}, 
                @BranchID = ${BranchID}, 
                @EmployeeAddress = ${EmployeeAddress}, 
                @EmployeePhone = ${EmployeePhone}`;
        
        res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API xóa nhân viên
app.delete('/api/delete-employee/:EmployeeID', async (req, res) => {
    const { EmployeeID } = req.params;

    try {
        const result = await sql.query`
            EXEC Delete_Employee @EmployeeID = ${EmployeeID}`;
        
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API thêm món ăn
app.post('/api/add-new-dish', async (req, res) => {
    const { BranchID, DirectoryName, DishName, Price } = req.body;

    try {
        const result = await sql.query`
            EXEC AddNewDish 
                @BranchID = ${BranchID}, 
                @DirectoryName = ${DirectoryName}, 
                @DishName = ${DishName}, 
                @Price = ${Price}`;
        
        res.status(200).json({ message: 'Dish added successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API xóa món ăn
app.delete('/api/delete-dish/:DishID', async (req, res) => {
    const { DishID } = req.params;

    try {
        const result = await sql.query`
            EXEC DeleteDish @DishID = ${DishID}`;
        
        res.status(200).json({ message: 'Dish deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API cập nhật món ăn
app.put('/api/update-dish', async (req, res) => {
    const { DishID, NewDishName, NewPrice, BranchID, DirectoryName } = req.body;

    try {
        const result = await sql.query`
            EXEC Update_Dish 
                @DishID = ${DishID}, 
                @NewDishName = ${NewDishName}, 
                @NewPrice = ${NewPrice}, 
                @BranchID = ${BranchID}, 
                @DirectoryName = ${DirectoryName}`;
        
        res.status(200).json({ message: 'Dish updated successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
