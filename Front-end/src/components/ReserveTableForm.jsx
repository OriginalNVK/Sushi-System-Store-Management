const ReserveTableForm = () => {
  return (
      <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <select className="p-3 border border-gray-300 rounded">
          <option>Ho Chi Minh</option>
          <option>Ha Noi</option>
          <option>Da Nang</option>
        </select>
        <select className="p-3 border border-gray-300 rounded">
          <option>Branch 01</option>
          <option>Branch 02</option>
          <option>Branch 03</option>
        </select>
      </div>

      <input
        type="tel"
        placeholder="Phone"
        className="p-3 border border-gray-300 rounded"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="time"
          className="p-3 border border-gray-300 rounded"
        />
      </div>

      <select className="p-3 border border-gray-300 rounded">
        <option>South Of May</option>
        <option>North Cuisine</option>
        <option>Japanese Style</option>
      </select>

      <div className="grid grid-cols-3 gap-4">
        <input
          type="number"
          placeholder="Amount of Table"
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Amount of Guest"
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Amount of Dish"
          className="p-3 border border-gray-300 rounded"
        />
      </div>

      <textarea
        placeholder="Note"
        rows={3}
        className="p-3 border border-gray-300 rounded resize-none"
      ></textarea>

      <button className="bg-yellow-500 text-white p-3 rounded hover:bg-yellow-600">
        Reserve Now
      </button>
    </div>
  )
}

export default ReserveTableForm