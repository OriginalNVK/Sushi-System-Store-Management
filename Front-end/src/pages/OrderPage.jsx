import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Decorate from '../components/Decorate'
import Footer from '../components/Footer'
import { getOrderOnlinePendingOverview, updateOrder } from '../service/Services'
import { useNavigate } from 'react-router-dom'

const OrderPage = () => {

    const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
        const branchID = localStorage.getItem('BranchID');
        const loadData = async (branchID) => {
            const data = await getOrderOnlinePendingOverview(branchID);
            setOrder(data);
        }
        loadData(branchID);
    }, []);

    const handleSelect = (orderID) => {
        setSelectedOrder(orderID);
    }

    const handleDetail = () => { 
        if (!selectedOrder) {
            alert("Please select at least 1 order");
            return;
        }
        navigate(`/order/detail/${selectedOrder}`);
    }

    const handleConfirm = async () => {
        if (!selectedOrder) {
            alert("Please select at least 1 order");
            return;
        }
        const employeeID = localStorage.getItem('EmployeeID');
        const result = await updateOrder(selectedOrder, employeeID);
        if (result.success) {
            alert("Order confirmed successfully. 1 Invoice was created");
            window.location.reload();
        } else {
            alert("Failed to confirm order");
        }
    }

    const handleTime = (time, date) => {
        const formattedTime = new Date(time).toISOString().split("T")[1].split(".")[0];
        const formattedDate = new Date(date).toISOString().split("T")[0];
        return `${formattedTime} - ${formattedDate.split("-").reverse().join("/")}`;
    }

  return (
      <div>
          <div className="min-h-screen flex flex-col">
              <Header />
                <div className="flex flex-1 items-center justify-center flex-col py-6">
                    <div className="flex flex-col pb-6 justify-center items-center">
                        <p className="text-yellow text-4xl font-play py-2 font-bold ">
                            ORDER LIST BRANCH {localStorage.getItem('BranchID')}
                        </p>
                      <Decorate />
                  </div>
                    <div className="w-11/12 flex flex-col items-center justify-center">
                        <table className="table text-center px-2 w-11/12 font-play shadow-lg">
                            <thead className="table-header-group border bg-red text-white">
                                <tr className="table-row border">
                                    <th className="table-cell h-12 border">NO</th>
                                    <th className="table-cell h-12 border">Order ID</th>
                                    <th className="table-cell h-12 border">Branch ID</th>
                                    <th className="table-cell h-12 border">Customer Name</th>
                                    <th className="table-cell h-12 border">Time</th>
                                    <th className="table-cell h-12 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.map((item, index) => (
                                    <tr key={index} className="table-row border h-12">
                                        <td className="table-cell border">{index + 1}</td>
                                        <td className="table-cell border">{item.OrderID}</td>
                                        <td className="table-cell border">{item.BranchID}</td>
                                        <td className="table-cell border">{item.CUSTOMERNAME}</td>
                                        <td className="table-cell border">{handleTime(item.TimeOrder, item.DateOrder)}</td>
                                        <td className="table-cell border">
                                            <input
                                              type="radio"
                                              checked={selectedOrder === item.OrderID}
                                              onChange={() => handleSelect(item.OrderID)}
                                              className='cursor-pointer w-5 h-5 appearance-none border border-gray rounded-md checked:bg-green checked:border-transparent mt-1'
                                            />
                                        </td>
                                    </tr>
                                ))}
                          </tbody>
                      </table>
                      <div className="flex justify-center items-center mt-6 gap-4">
                          <button
                                onClick={handleConfirm}
                                className="bg-green text-white border font-play font-bold text-lg py-2 px-4 rounded-md shadow-md hover:bg-white hover:text-green transition-all"
                            >
                                Confirm Order
                          </button>
                            <button
                                onClick={handleDetail}
                                className="bg-green text-white border font-play font-bold text-lg py-2 px-4 rounded-md shadow-md hover:bg-white hover:text-green transition-all"
                            >
                                Detail
                          </button>
                        </div>
                  </div>
              </div>
            <Footer />
         </div>    
    </div>
  )
}

export default OrderPage