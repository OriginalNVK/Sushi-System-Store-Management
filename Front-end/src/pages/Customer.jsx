import { useState, useEffect } from "react";
import Decorate from "../components/Decorate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getCustomer } from "../service/Services";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const customersPerPage = 15; // Số dòng mỗi trang

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await getCustomer();
      setCustomers(data);
    };
    loadCustomers();
  }, []);

  // Tính toán chỉ số bắt đầu và kết thúc
  const startIndex = (currentPage - 1) * customersPerPage;
  const endIndex = startIndex + customersPerPage;
  const currentCustomers = customers.slice(startIndex, endIndex); // Lấy khách hàng của trang hiện tại

  // Tính tổng số trang
  const totalPages = Math.ceil(customers.length / customersPerPage);

  // Hàm tạo danh sách nút phân trang rút gọn
  const getPaginationNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      // Hiển thị tất cả trang nếu <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        // Hiển thị 1-5 và trang cuối
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Hiển thị trang đầu và các trang cuối
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Hiển thị trang đầu, các trang xung quanh trang hiện tại, và trang cuối
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    if (page === "...") return; // Không làm gì nếu bấm vào nút "..."
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6">
          <p className="text-yellow text-4xl font-play py-2 font-bold">
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
        {/* Hiển thị nút phân trang */}
        <div className="flex justify-center mt-4">
          {getPaginationNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 mx-1 border ${
                currentPage === page
                  ? "bg-red text-white"
                  : "bg-gray-200 text-black"
              }`}
              disabled={page === "..."} // Vô hiệu hóa nút "..."
            >
              {page}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Customer;
