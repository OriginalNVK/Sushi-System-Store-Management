import Decorate from "../components/Decorate"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { employeeList } from "../constants"

const Employee = () => {
  return (
      <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6">
          <p className="text-yellow text-4xl font-play py-2 font-bold ">
          LIST EMPLOYEE
        </p>
        <Decorate />
        </div>
        <table className="table text-center px-2 w-11/12 font-play shadow-lg">
        <thead  className="table-header-group md:text-xl text-lg text-white">
          <tr className="table-row">
            <th key="No" className="table-cell border h-12 bg-red border-black">No</th>
            <th className="table-cell border h-12 bg-red border-black">Name</th>
            <th className="table-cell border h-12 bg-red border-black">Birthdate</th>
            <th className="table-cell border h-12 bg-red border-black">Gender</th>
            <th className="table-cell border h-12 bg-red border-black">Mobile Phone</th>
            <th className="table-cell border h-12 bg-red border-black">Address</th>
            <th className="table-cell border h-12 bg-red border-black">BranchID</th>
            <th className="table-cell border h-12 bg-red border-black">DepartmentID</th>
            <th className="table-cell border h-12 bg-red border-black">Entry date</th>
            <th className="table-cell border h-12 bg-red border-black">Salary</th>
            <th className="table-cell border h-12 bg-red border-black">History Employee</th>
          </tr>
        </thead>
        <tbody className="md:text-lg text-base">
          {
            employeeList.map((employee) => {
              return (
                <tr key={employee.Id}>
                  <td className="border p-1">{employee.Id}</td>
                  <td className="border px-1">{employee.Name}</td>
                  <td className="border px-1">{employee.Birth}</td>
                  <td className="border px-1">{employee.Gender}</td>
                  <td className="border px-1">{employee.Phone}</td>
                  <td className="border px-1">{employee.EmployeeAddress}</td>
                  <td className="border px-1">{employee.BranchID}</td>
                  <td className="border px-1">{employee.DepartmentID}</td>
                  <td className="border px-1">{employee.EntryDate}</td>
                  <td className="border px-1">{employee.Salary}</td>
                  <td className="border px-1"><button type="button" className="border text-yellow px-2 py-1 rounded hover:opacity-80 text-center">Check history</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      </div>
          <Footer />
    </div>
  )
}

export default Employee