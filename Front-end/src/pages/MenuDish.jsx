import Footer from '../components/Footer'
import Header from '../components/Header'
import { menuDish } from '../constants'
import { useState, useEffect } from 'react'    
const MenuDish = () => {
    const [searchNumber, setSearchNumber] = useState('');
    const [filterCategory, setFilterCatagory] = useState('all');
    const [listCatagory, setListCatagory] = useState([]);

    return (
        <div>
            <Header />
                
                <div className="flex flex-col px-500 py-10">
                <p className="text-4xl text-yellow font-play text-center font-bold">Oishii Sushi Menu</p>
                <div className="flex gap-2 lg:text-xl text-base font-play px-[750px] py-4">
            <input
              type="number"
              placeholder="🔍 Dish Name"
              className="border rounded-md px-2 font-bold lg:w-52 w-[125px]"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
            />
            <select
              className="border rounded-md font-bold px-2"
              value={filterCategory}
              onChange={(e) => setFilterCatagory(e.target.value)}
            >
              <option value="all">Catagory</option>
              {listCatagory.map((catagory, index) => (
                <option key={index} value={catagory.Catagory.toLowerCase()}>
                  {catagory.Catagory}
                </option>
              ))}
                    </select>
                </div>
             {menuDish.map((dish, index) => (
                 <div key={index} className="flex justify-between items-center px-[400px] py-2">
                 <p className="text-left">{dish.name}</p>
                 <span className="flex-1 border-b border-dotted mx-2"></span>
                 <p className="text-right text-gray-900 font-bold">{dish.price}</p>
                 </div>
             ))}
            </div>
            <Footer />  
      </div>
    
  )
}

export default MenuDish