import Footer from "../components/Footer"
import Header from "../components/Header"
import image1 from "../assets/content/homeClient/image-content-1.png"
import image2 from "../assets/content/homeClient/image-content-2.png"

const HomeClient = () => {
  return (
      <div>
          <Header />
          <div>
              <div className="flex px-36 py-20 justify-between gap-40">
                  <div>
                      <p className="text-4xl">
                          Eat <span className="text-orange">Sushi</span><br/> The Right Way
                      </p>
                      <p className="py-4 opacity-50">
                          Sushi made by Japanese sushi chefs, using native ingedients. Enjoy sushi the traditional way. We offer you an unforgettable experience.Our doors are open on 8:00 AM to 11:00 PM.
                      </p>
                      <button className="bg-orange text-white text-xl py-4 px-6 rounded-xl hover:opacity-80">
                          Make The Reservation
                      </button>
                  </div>
                  <img src={image1} alt="image1" width={600} height={600} />
              </div>
          </div>
          <Footer />
    </div>
  )
}

export default HomeClient