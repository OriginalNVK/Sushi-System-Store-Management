import { useEffect, useState } from "react";
import Decorate from "../components/Decorate";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getDishes } from "../service/Services"; // Import hàm getDishes
import { useNavigate } from "react-router-dom";

const Dish = () => {
  const [searchDish, setSearchDish] = useState(""); // Tìm kiếm món ăn
  const [dishes, setDishes] = useState([]); // Danh sách món ăn sau khi lọc
  const [allDishes, setAllDishes] = useState([]); // Danh sách tất cả món ăn
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const dishesPerPage = 10; // Số món ăn mỗi trang
  const [error, setError] = useState(""); // Lỗi nếu có khi tải dữ liệu
  const [branchID, setBranchID] = useState(1); // Mặc định branchID là 1 cho khách hàng
  const [userRole, setUserRole] = useState(""); // Để lưu role của user
  const navigate = useNavigate();

  // Danh sách 15 chi nhánh (code cứng)
  const branchNames = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Huế",
    "Nha Trang",
    "Vũng Tàu",
    "Quảng Ninh",
    "Thanh Hóa",
    "Nghệ An",
    "Quảng Nam",
    "Bình Dương",
    "Đồng Nai",
    "Lâm Đồng",
  ];
  
  const branches = branchNames.map((name, index) => ({
    id: index + 1,
    name,
  }));
  

  // Tải danh sách món ăn ban đầu
  useEffect(() => {
    const loadDishes = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
        setUserRole(user.role); // Set role của user

        // Kiểm tra role của user
        let data;
        if (user.role === "customer") {
          data = await getDishes(branchID); // Gọi hàm với branchID
        } else {
          const branchIDFromStorage = localStorage.getItem("BranchID");
          data = await getDishes(branchIDFromStorage); // Gọi hàm cho manager branch
        }
  
        setDishes(data);
        setAllDishes(data);
      } catch (err) {
        setError("Không thể tải dữ liệu món ăn. Vui lòng thử lại.");
      }
    };

    loadDishes();
  }, [branchID]); // Tải lại dữ liệu khi branchID thay đổi

  // Lấy món ăn của trang hiện tại
  const startIndex = (currentPage - 1) * dishesPerPage;
  const currentDishes = dishes.slice(startIndex, startIndex + dishesPerPage);

  // Tính tổng số trang
  const totalPages = Math.ceil(dishes.length / dishesPerPage);

  // Hàm tạo danh sách nút phân trang
  const getPaginationNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    if (page === "...") return; // Không làm gì nếu bấm "..."
    setCurrentPage(page);
  };

  // Tìm kiếm món ăn
  const searchDishes = () => {
    let filtered = allDishes;

    if (searchDish) {
      filtered = filtered.filter((dish) =>
        dish.DishName.toLowerCase().includes(searchDish.toLowerCase())
      );
    }

    setDishes(filtered);
    setCurrentPage(1); // Reset về trang đầu
  };

  useEffect(() => {
    searchDishes();
  }, [searchDish]);

  const handleReset = () => {
    setSearchDish("");
    setDishes(allDishes); // Khôi phục danh sách món ăn ban đầu
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center flex-col py-6">
        <div className="flex flex-col pb-6">
          <p className="text-yellow text-5xl font-play py-3 font-bold ">
            LIST DISHES
          </p>
          <Decorate />
        </div>
        
        {/* Dropdown chọn chi nhánh chỉ hiện cho người có role là "customer" */}
        {userRole === "customer" && (
          <div className="flex items-center justify-end pb-6 w-8/12">
            <div className="flex gap-4 lg:text-xl text-base font-play">
              <select
                value={branchID}
                onChange={(e) => setBranchID(Number(e.target.value))}
                className="border rounded-md px-2 font-bold lg:w-30 w-[125px]"
              >
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="🔍 Dish Name"
                className="border rounded-md px-2 font-bold lg:w-52 w-[125px]"
                value={searchDish}
                onChange={(e) => setSearchDish(e.target.value)}
              />
              <button
                className="border p-2 rounded-lg font-bold font-play bg-green text-white hover:bg-white hover:text-green transition-all duration-300"
                onClick={handleReset}
              >
                🔄 Reset
              </button>
            </div>
          </div>
        )}

        {/* Hiển thị lỗi nếu có */}
        {error && <div className="text-red-500">{error}</div>}

        {/* Bảng món ăn */}
        {dishes.length > 0 ? (
          <table className="table text-center px-2 w-11/12 font-play shadow-lg">
            <thead className="table-header-group md:text-xl text-lg text-white">
              <tr className="table-row">
                <th className="table-cell border h-12 bg-red border-black">No</th>
                <th className="table-cell border h-12 bg-red border-black">DirectoryName</th>
                <th className="table-cell border h-12 bg-red border-black">Dish Name</th>
                <th className="table-cell border h-12 bg-red border-black">Price</th>
              </tr>
            </thead>
            <tbody className="md:text-lg text-base">
              {currentDishes.map((dish, index) => (
                <tr key={dish.DishID}>
                  <td className="border p-1">{startIndex + index + 1}</td>
                  <td className="border px-1">{dish.DirectoryName}</td>
                  <td className="border px-1">{dish.DishName}</td>
                  <td className="border px-1">{dish.Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500">Không có món ăn nào để hiển thị.</div>
        )}

        {/* Phân trang */}
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

export default Dish;
