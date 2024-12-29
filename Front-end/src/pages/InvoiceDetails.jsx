import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Decorate from '../components/Decorate';
import { logo } from '../assets';
import { sushiInformation } from '../constants';
import Footer from '../components/Footer';
import { getInvoiceDetail } from '../service/Services';
import html2pdf from 'html2pdf.js';
import { useParams } from 'react-router-dom';

const InvoiceDetails = () => {
  const [invoiceDetail, setInvoiceDetail] = useState({});
  const { id } = useParams(); // Get ID from route
  const invoiceRef = useRef();

  // Load invoice data
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getInvoiceDetail(id); // Fetch invoice details
        setInvoiceDetail(result); // Update state
        console.log("Invoice detail: ", result); // Log fetched data
      } catch (error) {
        console.error("Error fetching invoice details:", error);
      }
    };

    if (id) {
      loadData();
    } else {
      console.error("ID is not defined");
    }
  }, [id]); // Add `id` as a dependency

  // Log invoiceDetail whenever it updates
  useEffect(() => {
    console.log("Updated invoice detail: ", invoiceDetail);
  }, [invoiceDetail]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Function to handle downloading PDF
  const handleDownload = () => {
    const opt = {
      filename: `invoice_details.pdf`,
    };
    html2pdf().from(invoiceRef.current).set(opt).save(); // Use html2pdf library
  };

  return (
    <div className='flex flex-col'>
      <Header />
      <div className='flex flex-col items-center justify-center mt-5'>
        <p className='font-play text-4xl font-bold text-yellow'>INVOICE DETAIL</p>
        <Decorate />
      </div>
      <div className="flex flex-col items-center justify-center p-5 w-full" ref={invoiceRef}>
        {/* Company Information */}
        <div className='flex items-center justify-between gap-4 bg-gray w-1/2 p-5'>
          <img src={logo} alt='logo' className='' width={125} height={125} />
          <div className='font-play flex flex-col gap-4 text-xl'>
            <p className='text-3xl text-yellow font-bold'>{sushiInformation.name}</p>
            <p>{sushiInformation.phone}</p>
            <p>{sushiInformation.email}</p>
          </div>
          <div className='flex flex-col gap-2 text-xl items-center pt-14'>
            <p>{sushiInformation.address.split(",")[0]}, {sushiInformation.address.split(",")[1]}</p>
            <p>{sushiInformation.address.split(",")[2]}, {sushiInformation.address.split(",")[3]}</p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="flex justify-between items-start bg-white w-1/2 mt-4 p-6 rounded-lg">
          <div className="flex flex-col text-xl font-play font-bold">
            <p className="text-gray">Billed to:</p>
            <p>{invoiceDetail.customerName}</p>
            <p className="text-gray mt-2">Email:</p>
            <p>{invoiceDetail.customerEmail}</p>
          </div>
          <div className="flex flex-col text-xl font-play font-bold text-right">
            <p className="text-gray">Invoice Number:</p>
            <p>#{invoiceDetail.invoiceId}</p>
            <p className="text-gray mt-2">Date:</p>
            <p>{formatDate(invoiceDetail.invoiceDate)}</p>
          </div>
        </div>

        {/* Decorative Lines */}
        <div className="flex gap-2 my-6">
          <Decorate />
          <Decorate />
        </div>

        {/* Order List Table */}
        <div className="flex flex-col w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="bg-red text-white font-play text-lg">
                <th className="border px-2 py-2">NO</th>
                <th className="border px-2 py-2">Dish Name</th>
                <th className="border px-2 py-2">Quantity</th>
                <th className="border px-2 py-2">Amount</th>
              </tr>
            </thead>
            <tbody className="font-play">
              {invoiceDetail.dishDetail?.map((dish, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-2 py-2">{index + 1}</td>
                  <td className="border px-2 py-2">{dish.dishName}</td>
                  <td className="border px-2 py-2">{dish.quantity}</td>
                  <td className="border px-2 py-2">{dish.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Amount */}
          <div className="mt-4 text-right font-play text-xl font-bold">
            <p>Subtotal: <span className="text-gray-700">{invoiceDetail.totalMoney}</span></p>
            <p>Discount: <span className="text-gray-700">{invoiceDetail.discountMoney}</span></p>
            <p>Total: <span className="text-yellow-600">{invoiceDetail.totalMoney - invoiceDetail.discountMoney}</span></p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 m-4 font-play">
        <button
          className="bg-green text-white py-2 px-6 rounded-md hover:opacity-80 transition-all duration-300"
          onClick={handleDownload}
        >
          Export PDF
        </button>
        <button
          className="bg-orange text-white py-2 px-6 rounded-md hover:opacity-80 transition-all duration-300"
          onClick={handlePrint}
        >
          Print Invoice
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default InvoiceDetails;
