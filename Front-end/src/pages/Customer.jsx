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
                    <th className="table-cell h-12">NO</th>
                    <th className="table-cell h-12">Name</th>
                    <th className="table-cell h-12">Email</th>
                    <th className="table-cell h-12">Gender</th>
                    <th className="table-cell h-12">CCCD</th>
                    <th className="table-cell h-12">Mobile Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    customers.map((customer, index) => {
                        return (
                            <tr key={index} className="border border-gray">
                                <td className="table-cell p-2">{index + 1}</td>
                                <td className="table-cell p-2">{customer.CustomerName}</td>
                                <td className="table-cell p-2">{customer.CustomerEmail}</td>
                                <td className="table-cell p-2">{customer.CustomerGender}</td>
                                <td className="table-cell p-2">{customer.CCCD}</td>
                                <td className="table-cell p-2">{customer.CustomerPhone}</td>
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