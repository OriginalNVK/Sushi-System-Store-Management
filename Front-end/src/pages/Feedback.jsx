import Header from "../components/Header"
import Footer from "../components/Footer"
import FormFeedback from "../components/FormFeedback"
import Decorate from "../components/Decorate"

const Feedback = () => {
  return (
      <div>
          <Header />
          <div className="flex flex-col justify-center items-center py-4">
        <h1 className="text-yellow text-4xl font-play py-2 font-bold ">Feedback</h1>
        <Decorate />
              <FormFeedback />
          </div>
            
          <Footer/>
    </div>
  )
}

export default Feedback