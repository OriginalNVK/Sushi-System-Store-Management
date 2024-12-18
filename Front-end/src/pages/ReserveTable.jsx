import ReserveTableForm from "../components/ReserveTableForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import reserveTable from "../assets/content/homeClient/reserveTable.png";
import Decorate from "../components/Decorate";
const ReserveTable = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <header className="flex flex-col items-center py-6">
          <h1 className="text-3xl font-bold text-yellow mb-2">Reserve Table</h1>
          <Decorate />
        </header>

        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg max-w-5xl">
          <div className="flex-1">
            <img
              src={reserveTable} 
              alt="Sushi"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          <div className="flex-1 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Information</h2>
            <ReserveTableForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReserveTable;