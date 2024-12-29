import Footer from "../components/Footer"
import Header from "../components/Header"
import image1 from "../assets/content/homeClient/image-content-1.png"
import image2 from "../assets/content/homeClient/image-content-2.png"
import { HomeDish, Homeown } from "../constants"
import Decorate from "../components/Decorate"
import { Link } from 'react-router-dom';

const HomeClient = () => {
  return (
      <div>
          <Header />
          <div>
              <div className="flex px-36 py-36 justify-between gap-40">
                  <div>
                      <p className="text-4xl">
                          Eat <span className="text-yellow">Sushi</span><br/> The Right Way
                      </p>
                      <p className="py-4 opacity-50">
                          Sushi made by Japanese sushi chefs, using native ingedients. Enjoy sushi the traditional way. We offer you an unforgettable experience.Our doors are open on 8:00 AM to 11:00 PM.
                      </p>
                      <button className="bg-yellow text-white text-sm py-4 px-8 rounded-xl hover:opacity-80">
                          <a href="/reserve">Make The Reservation</a>
                      </button>
                  </div>
                  <img src={image1} alt="image1" width={600} height={600} />
              </div>
              <div className="flex px-36 py-20 justify-between gap-40 items-center">
                  <img src={image2} alt="image1" width={600} height={600} />
                  <div>
                      <p className="text-4xl text-yellow font-play font-bold">
                          About Us
                      </p>
                      <p className="text-4xl opacity-80 font-amethysta py-2">
                          We Provide <br/>Healthy Food
                      </p>
                      <p className="py-4 opacity-50">
                          Food for us come from ours relatives. Whether they have Wings or Fins or Roots. That is How we consider the food. Food has a culture. It has a history. It has a story. It has a relationship. 
                      </p>
                  </div>
              </div>
              <section className="flex flex-col items-center gap-2">
                  <p className="text-4xl text-yellow font-play text-center font-bold">Menu Dish</p>
                  <Decorate />
                  <div className="flex flex-col px-500">
                  {HomeDish.map((dish, index) => (
                      <div key={index} className="flex justify-between items-center px-[400px] py-2">
                      <p className="text-left">{dish.name}</p>
                      <span className="flex-1 border-b border-dotted mx-2"></span>
                      <p className="text-right text-gray-900 font-bold">{dish.price}</p>
                      </div>
                  ))}
                    <Link
                        to="/Menu" // Chuyển hướng đến trang Dish
                        className="bg-yellow text-white text-sm py-4 px-8 rounded-xl hover:opacity-80 w-[200px] mx-[660px] text-center inline-block"
                        >
                        View More
                    </Link>
              </div>
              </section>
              
              <section className="flex flex-col items-center py-10">
                  <p className="text-4xl text-yellow font-play text-center font-bold">Collaboration</p>
                  <Decorate />
              <div className="flex flex-col py-6">
                  <div className="flex gap-20 justify-center items-center py-8">
                      {Homeown.map((own, index) => (
                      <div key={index} className="flex flex-col items-center justify-center">
                          <img src={own.image} alt="own" width={120} height={120} className="rounded-full" />
                          <p className="text-center text-2xl text-yellow">{own.name}</p>
                          <p className="text-center text-xl w-[200px]">{own.description}</p>
                      </div>
                    ))}
                  </div>
                  </div>
                  </section>
          </div>
          <Footer />
    </div>
  )
}

export default HomeClient