import {useState, useEffect} from "react"
import Decorate from "../components/Decorate"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { customerList } from "../constants"
import { getCustomer } from "../service/Services"

const Customer = () => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const loadCustomers = async () => {
            const data = await getCustomer();
            setCustomers(data);
        }
        loadCustomers();
    })

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
            <thead className="table-h eader-group border bg-red text-white">
                <tr className="table-row border">
                    <th className="table-cell h-12 border">NO</th>
                    <th className="table-cell h-12 border">Name</th>
                    <th className="table-cell h-12 border">Email</th>
                    <th className="table-cell h-12 border">Gender</th>
                    <th className="table-cell h-12 border">CCCD</th>
                    <th className="table-cell h-12 border">Mobile Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    customers.map((customer, index) => {
                        return (
                            <tr key={index} className="border border-gray">
                                <td className="table-cell p-2 border">{index + 1}</td>
                                <td className="table-cell p-2 border">{customer.CustomerName}</td>
                                <td className="table-cell p-2 border">{customer.CustomerEmail}</td>
                                <td className="table-cell p-2 border">{customer.CustomerGender}</td>
                                <td className="table-cell p-2 border">{customer.CCCD}</td>
                                <td className="table-cell p-2 border">{customer.CustomerPhone}</td>
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