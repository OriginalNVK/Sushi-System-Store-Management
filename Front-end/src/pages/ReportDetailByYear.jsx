import React from 'react';
import { reportDetailByYear } from '../constants/index';
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
    <td className="border px-4 py-2">{Number(detail.Revenue).toLocaleString()} VNĐ</td>
  </tr>
);

const ReportDetailByYear = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-col items-center py-6">
        <p className="text-yellow text-4xl font-play font-bold py-2">
                  REPORT DETAIL: {reportDetailByYear.year}
        </p>
        <Decorate />
      </div>

      {/* Overview Section */}
      <div className="flex items-center justify-center py-6">
        <div className="grid grid-cols-3 gap-6 w-3/4 text-center text-lg font-play font-bold">
          <div className="shadow-lg bg-white p-4 rounded-lg">
            <p>Year:</p>
            <span className="text-yellow text-xl">{ reportDetailByYear.year }</span>
          </div>
          <div className="shadow-lg bg-white p-4 rounded-lg">
            <p>Branch Name:</p>
            <span className="text-green text-xl">{reportDetailByYear.branchName}</span>
          </div>
          <div className="shadow-lg bg-white p-4 rounded-lg">
            <p>Total Revenue:</p>
            <span className="text-blue-500 text-xl">
              {Number(reportDetailByYear.totalRevenue).toLocaleString()} VNĐ
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex justify-center py-6 w-full">
        <table className="w-11/12 text-center font-play shadow-lg bg-white rounded-lg">
          <TableHeader />
          <tbody className="text-gray-800">
            {reportDetailByYear.details && reportDetailByYear.details.length > 0 ? (
              reportDetailByYear.details.map((detail, index) => (
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

export default ReportDetailByYear;
