import Decorate from '../components/Decorate'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { menuDish } from '../constants'
import React, { useState, useEffect } from 'react'    
const MenuDish = () => {
    const [searchDish, setSearchDish] = useState('');
    const [filterCategory, setFilterCatagory] = useState('all');
    const [listCatagory, setListCatagory] = useState([]);
  const [filterDishes, setFilterDishes] = useState(menuDish);

  const searchDishes = () => {
    let filtered = menuDish;

    if (searchDish) {
      filtered = filtered.filter((dish) =>
        dish.name.toLowerCase().includes(searchDish.toLowerCase()));
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(dish =>
        dish.catagory.toLowerCase() === filterCategory.toLowerCase()
      );
    }
    setFilterDishes(filtered);
  }

  useEffect(() => {
    searchDishes();
  }, [searchDish, filterCategory]);

    return (
        <div>
            <Header />
                
        <div className="flex flex-col px-500 py-10">
          <div className='flex flex-col items-center'>
            <p className="text-4xl text-yellow font-play text-center font-bold mb-4">Oishii Sushi Menu</p>
          <Decorate />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 lg:text-xl text-base font-play px-4 sm:px-[50px] md:px-[100px] lg:px-[450px] xl:px-[800px] py-4">
            <input
              type="text"
              placeholder="🔍 Dish Name"
              className="border rounded-md px-2 font-bold lg:w-52 w-full sm:w-[150px] md:w-[200px]"
              value={searchDish}
              onChange={(e) => setSearchDish(e.target.value)}
            />
            <select
              className="border rounded-md font-bold px-4 py-2 w-full sm:w-[150px] md:w-[200px] lg:w-52"
              value={filterCategory}
              onChange={(e) => setFilterCatagory(e.target.value)}
            >
              <option value="all">Category</option>
              {listCatagory.map((catagory, index) => (
                <option key={index} value={catagory.Catagory.toLowerCase()}>
                  {catagory.Catagory}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col gap-4'>
              {filterDishes.map((dish, index) => (
                 <div key={index} className="sm:px-[20px] lg:px-[200px] flex justify-between items-center  py-2">
                 <p className="text-left">{dish.name}</p>
                 <span className="flex-1 border-b border-dotted mx-2"></span>
                 <p className="text-right text-gray-900 font-bold">{dish.price}</p>
                 </div>
             ))}
          </div>
            </div>
            <Footer />  
      </div>
    
  )
}

export default MenuDish