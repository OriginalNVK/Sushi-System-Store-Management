import Decorate from "../components/Decorate"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { customerList } from "../constants"

const Customer = () => {
  return (
      <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6">
          <p className="text-yellow text-4xl font-play py-2 font-bold ">
          LIST CUSTOMER
        </p>
        <Decorate />
        </div>
        <table className="table text-center px-2 w-11/12 font-play shadow-lg">
            <thead className="table-header-group border bg-red text-white">
                <tr className="table-row border">
                    <th className="table-cell h-12">NO</th>
                    <th className="table-cell h-12">Name</th>
                    <th className="table-cell h-12">Email</th>
                    <th className="table-cell h-12">Gender</th>
                    <th className="table-cell h-12">CCCD</th>
                    <th className="table-cell h-12">Mobile Phone</th>
                    <th className="table-cell h-12">Password</th>
                </tr>
            </thead>
            <tbody>
                {
                    customerList.map((customer, index) => {
                        return (
                            <tr key={index} className="border border-gray">
                                <td className="table-cell p-2">{index + 1}</td>
                                <td className="table-cell p-2">{customer.name}</td>
                                <td className="table-cell p-2">{customer.email}</td>
                                <td className="table-cell p-2">{customer.gender}</td>
                                <td className="table-cell p-2">{customer.CCCD}</td>
                                <td className="table-cell p-2">{customer.phone}</td>
                                <td className="table-cell p-2">{customer.password}</td>
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

export default Customer