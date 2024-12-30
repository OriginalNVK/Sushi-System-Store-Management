  import React, {useState, useEffect} from 'react';
  import {getReportRevenueDetailByDate} from '../service/Services';
  import Header from '../components/Header';
  import Footer from '../components/Footer';
  import Decorate from '../components/Decorate';

  const TableHeader = () => (
    <thead className="bg-red text-white">
      <tr>
        <th className="border px-4 py-2">No</th>
        <th className="border px-4 py-2">Dish Name</th>
        <th className="border px-4 py-2">Revenue</th>
      </tr>
    </thead>
  );

  const TableRow = ({ detail, index }) => (
    <tr className="hover:bg-gray-100">
      <td className="border px-4 py-2">{index + 1}</td>
      <td className="border px-4 py-2">{detail.DishName}</td>
      <td className="border px-4 py-2">{detail.Revenue}</td>
    </tr>
  );

  const ReportDetailByDate = () => {
    const [reportDetailByDate, setReportDetailByDate] = useState({
    summaryData: {  },
    dishDetails: []
  });
    useEffect(() => {
    const branchID = localStorage.getItem('BranchID');
    const date = localStorage.getItem('date');

    console.log('Fetched from localStorage:', { branchID, date });

    if (!branchID || !date) {
      console.error('Missing branchID or date');
      return;
    }

    const loadData = async (branchID, date) => {
      try {
        const response = await getReportRevenueDetailByDate(date, branchID);
        console.log('API Response:', response);
        setReportDetailByDate({
          summaryData: response.summaryData[0], // Lấy phần tử đầu tiên của mảng summaryData
          dishDetails: response.dishDetails
        });
      } catch (err) {
        console.error('Error in loadData:', err);
      }
    };

      loadData(branchID, date);
      console.log(reportDetailByDate);
  }, []);
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex flex-col items-center py-6">
          <p className="text-yellow text-4xl font-play font-bold py-2">
            REPORT DETAIL: {reportDetailByDate.summaryData.Date}
          </p>
          <Decorate />
        </div>

        <div className="flex items-center justify-center py-6">
          <div className="grid grid-cols-3 gap-6 w-3/4 text-center text-lg font-play font-bold">
            <div className="shadow-lg bg-white p-4 rounded-lg">
              <p>Date:</p>
              <span className="text-yellow text-xl">{reportDetailByDate.summaryData.Date}</span>
            </div>
            <div className="shadow-lg bg-white p-4 rounded-lg">
              <p>Branch Name:</p>
              <span className="text-green text-xl">{reportDetailByDate.summaryData.BranchName}</span>
            </div>
            <div className="shadow-lg bg-white p-4 rounded-lg">
              <p>Total Revenue:</p>
              <span className="text-blue-500 text-xl">
                {reportDetailByDate.summaryData.TotalRevenue}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-6 w-full">
          <table className="w-11/12 text-center font-play shadow-lg bg-white rounded-lg">
            <TableHeader />
            <tbody className="text-gray-800">
              {reportDetailByDate.dishDetails.length > 0 ? (
                reportDetailByDate.dishDetails.map((detail, index) => (
                  <TableRow key={index} detail={detail} index={index} />
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border px-4 py-4 text-red-500">
                    No data available for this report.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  };

  export default ReportDetailByDate;
