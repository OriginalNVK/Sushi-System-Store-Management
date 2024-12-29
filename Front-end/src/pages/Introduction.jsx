import Header from "../components/Header";
import Footer from "../components/Footer";
import {teamMembers} from "../constants";
import Decorate from "../components/Decorate";
const Introduction = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-6 md:px-20 py-6">
        <div className="flex flex-col items-center">
          <h1 className="text-yellow text-4xl font-bold font-play py-4">
          Introduction
        </h1>
        <Decorate />
        </div>
        
        <section className="flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">* Về Nhóm Thực Hiện</h2>
          <p className="text-xl text-gray-700">
            Chúng tôi là một nhóm sinh viên thuộc lớp Cơ Sở Dữ Liệu Nâng Cao, với niềm đam mê trong việc áp dụng kiến thức lý thuyết vào thực tiễn thông qua dự án Quản Lý Hệ Thống Cửa Hàng Sushi. Đội ngũ chúng tôi gồm các thành viên nhiệt huyết, luôn sẵn sàng học hỏi và hợp tác để mang đến một sản phẩm chất lượng:
          </p>
          <ul className="list-disc pl-8 text-gray-700">
            <li><b>Nguyễn Văn Khánh:</b> Trưởng nhóm, chịu trách nhiệm quản lý tiến độ dự án và phân công công việc.</li>
            <li><b>Nguyễn Việt Hoàng:</b> Phụ trách thiết kế cơ sở dữ liệu và tối ưu hóa truy vấn.</li>
            <li><b>Lê Viết Hưng:</b> Phụ trách phát triển giao diện người dùng (UI/UX).</li>
            <li><b>Nguyễn Thành Huy:</b> Đảm nhiệm phần chức năng back-end và xử lý dữ liệu.</li>
            <li><b>Đặng Huy:</b> Đảm bảo chất lượng (QA) và thực hiện kiểm thử dự án.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">* Mục Tiêu Dự Án</h2>
          <p className="text-xl text-gray-700">Mục tiêu của dự án này là giúp sinh viên:</p>
          <ul className="list-disc pl-8 text-gray-700">
            <li>Hiểu rõ quy trình vận hành của một hệ thống thực tế.</li>
            <li>Biết cách thu thập và phân tích dữ liệu để thiết kế và triển khai cơ sở dữ liệu.</li>
            <li>Áp dụng kiến thức đã học để mô phỏng quy trình hoạt động của hệ thống cửa hàng sushi.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">* Lý Do Chọn Dự Án</h2>
          <p className="text-xl text-gray-700">
            Hệ thống quản lý nhà hàng là một chủ đề thiết thực và phổ biến, đặc biệt là với ngành dịch vụ ẩm thực đang phát triển mạnh mẽ. Qua việc triển khai dự án, chúng tôi mong muốn:
          </p>
          <ul className="list-disc pl-8 text-gray-700">
            <li>Nắm vững quy trình quản lý chuỗi nhà hàng từ cơ sở dữ liệu đến chức năng ứng dụng.</li>
            <li>Tìm hiểu cách tối ưu hóa dữ liệu và cải thiện hiệu năng trong quản lý hệ thống lớn.</li>
            <li>Học hỏi và rèn luyện các kỹ năng làm việc nhóm, giải quyết vấn đề.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-800">* Phương Châm Làm Việc</h2>
          <ul className="list-disc pl-8 text-gray-700">
            <li>Đồng hành: Luôn hỗ trợ nhau để cùng phát triển.</li>
            <li>Chất lượng: Đặt chất lượng sản phẩm lên hàng đầu.</li>
            <li>Hiệu quả: Tối ưu hóa thời gian và công sức để đạt được kết quả tốt nhất.</li>
          </ul>
        </section>
        <section className="py-8">
          <div className="flex flex-col items-center py-6">
            <h1 className="text-yellow text-4xl font-bold font-play mb-2">
          My Team
        </h1>
        <Decorate />
          </div>
        

  <section className="flex flex-wrap justify-center gap-8">
    {teamMembers.map((member, index) => (
      <div
        key={index}
        className="flex flex-col items-center gap-4 w-full sm:w-[45%] md:w-[30%] bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <img
          src={member.img}
          alt={member.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <h3 className="text-xl font-semibold text-yellow">{member.name}</h3>
        <p className="text-gray-600 text-center">{member.des}</p>
      </div>
    ))}
  </section>
</section>

      </main>
      <Footer />
    </div>
  );
};

export default Introduction;
