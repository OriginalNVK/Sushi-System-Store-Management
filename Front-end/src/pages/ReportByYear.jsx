import React, {useState, useEffect} from 'react'
import {getReportRevenueOverviewByYear} from '../service/Services'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Decorate from '../components/Decorate';
import { useNavigate } from 'react-router-dom';

const ReportByYear = () => {
    const [reportOverviewByYear, setReportOverviewByYear] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const branchID = localStorage.getItem('BranchID');
        const loadData = async (branchID) => {
            const response = await getReportRevenueOverviewByYear(branchID);
            setReportOverviewByYear(response);
        };
        loadData(branchID);
    }, []);
    const reportDetailByYear = (year) => {
        localStorage.setItem('year', year);
        navigate(`/report-detail/year/${year}`);
    }
  return (
      <div className='min-h-screen flex flex-col'>
          <Header />
            <div className="flex flex-col items-center justify-center py-6">
                <div className="flex flex-col pb-6 items-center">
                    <p className="text-yellow text-4xl font-play py-2 font-bold">
                        REPORT BY YEAR
                    </p>
                    <Decorate />
                </div>
              <table className='table text-center px-2 w-11/12 font-play shadow-lg'>
                  <thead className='table-header-group border bg-red text-white'>
                      <tr className='table-row font-play'>
                          <th className='table-cell border h-12 bg-red border-black'>Year</th>
                          <th className='table-cell border h-12 bg-red border-black'>Total</th>
                          <th className='table-cell border h-12 bg-red border-black'>Actions</th>
                      </tr>
                  </thead>   
                    <tbody className='md:text-lg text-base font-play'>
                      {reportOverviewByYear.map((report, index) => (
                              <tr key={index}>
                              <td className='border p-1 font-bold'>{report.Year}</td>
                                  <td className='border p-1'>{report.TotalRevenue}</td>
                                  <td className='border p-1'>
                                      <button type='button' className='border text-yellow px-2 py-1 rounded hover:opacity-80 text-center' onClick={() => reportDetailByYear(report.Year)}>
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

export default ReportByYear