import React, {useState, useEffect} from 'react'
import {getReportRevenueOverviewByDate} from '../service/Services'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Decorate from '../components/Decorate';
import { useNavigate } from 'react-router-dom';

const ReportByDate = () => {

    function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString); // Chuyển đổi chuỗi về đối tượng Date

    // Lấy ngày, tháng và năm
    const day = date.getDate().toString().padStart(2, '0'); // Đảm bảo 2 chữ số
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Trả về chuỗi ngày dạng DD-MM-YYYY
    return `${day}-${month}-${year}`;
}
    const [reportOverviewByDate, setReportOverviewByDate] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const branchID = localStorage.getItem('BranchID');
        const loadData = async (branchID) => {
            const response = await getReportRevenueOverviewByDate(branchID);
            setReportOverviewByDate(response);
        };
        loadData(branchID);
        console.log(reportOverviewByDate);
    }, []);
    const reportDetailByDate = (date) => {
        localStorage.setItem('date', date);
        navigate(`/report-detail/date/${date}`);
    }
  return (
      <div className='min-h-screen flex flex-col'>
          <Header />
            <div className="flex flex-col items-center justify-center py-6">
                <div className="flex flex-col pb-6 items-center">
                    <p className="text-yellow text-4xl font-play py-2 font-bold">
                        REPORT BY DATE
                    </p>
                    <Decorate />
                </div>
              <table className='table text-center px-2 w-11/12 font-play shadow-lg'>
                  <thead className='table-header-group border bg-red text-white'>
                      <tr className='table-row font-play'>
                          <th className='table-cell border h-12 bg-red border-black'>Date</th>
                          <th className='table-cell border h-12 bg-red border-black'>Total</th>
                          <th className='table-cell border h-12 bg-red border-black'>Actions</th>
                      </tr>
                  </thead>   
                    <tbody className='md:text-lg text-base font-play'>
                      {reportOverviewByDate.map((report, index) => (
                              <tr key={index}>
                                  <td className='border p-1 font-bold'>{formatDateToDDMMYYYY(report.PayDate)}</td>
                                  <td className='border p-1'>{report.TotalRevenue}</td>
                                  <td className='border p-1'>
                                      <button type='button' className='border text-yellow px-2 py-1 rounded hover:opacity-80 text-center' onClick={() => reportDetailByDate(formatDateToDDMMYYYY(report.PayDate))}>
                                          Check Detail
                                      </button>
                                  </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              
          </div>
          <Footer/>
    </div>
  )
}

export default ReportByDate