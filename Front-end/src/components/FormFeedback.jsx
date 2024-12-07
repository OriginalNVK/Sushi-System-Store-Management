const FormFeedback = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form
      className="w-full max-w-lg mx-auto shadow-md p-5 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-[48%]">
          <legend className="text-sm font-medium mb-1">Area</legend>
          <select
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            name="area"
            id="area"
          >
            <option value="HoChiMinh">Ho Chi Minh</option>
            <option value="HaNoi">Ha Noi</option>
            <option value="DaNang">Da Nang</option>
          </select>
        </div>
        <div className="w-full sm:w-[48%]">
          <legend className="text-sm font-medium mb-1">Branch</legend>
          <select
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            name="branch"
            id="branch"
          >
            <option value="branch01">Branch 01</option>
            <option value="branch02">Branch 02</option>
            <option value="branch03">Branch 03</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <legend className="text-sm font-medium mb-1">Description</legend>
        <textarea
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          name="description"
          id="description"
          cols="30"
          rows="6"
          aria-label="Description"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-yellow hover:bg-yellow-600 text-white text-center text-lg p-3 rounded-md font-bold transition font-play hover:opacity-80"
      >
        Submit
      </button>
    </form>
  );
};

export default FormFeedback;
