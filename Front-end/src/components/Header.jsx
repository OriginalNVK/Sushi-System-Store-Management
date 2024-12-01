import { logo } from "../assets";
import { navLinks } from "../constants";
import email from "../assets/email.png";

const Header = () => {
	return (
        <nav className="flex items-center border-b-2 border-gray bg-gray2 px-20">
            <div className="w-300 flex items-center justify-center pr-20">
                <a href="/" className="">
				<img
					src={logo}
					alt="logo"
					className="md:w-[140px] md:p-4 px-2 w-[100px]"
				/>
                </a>
                <div className="flex justify-center items-center flex-col font-play text-white font-bold">
                    <p className="text-2xl">OISHII SUSHI</p>
                    <p className="text-2xl">HCM STREET FOOD</p>
                </div>
            </div>
            <div className="flex flex-col flex-1 flex-wrap justify-between gap-8">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 cursor-pointer">
                        <img src={email} alt="email" className="w-8 h-8" />
                        <p className="text-xl text-white">Support@oishii.com</p>
                    </div>
                    <div className="text-xl text-white ">
                        <button className="cursor-pointer hover:text-orange">
                            Register
                        </button>|  
                        <button className="cursor-pointer hover:text-orange">
                            Login
                        </button>
                    </div>
                </div>
                <ul className="list-none flex flex-1 flex-wrap justify-between px-4 md:py-0 py-2">
				{navLinks.map((link) => (
					<li
						key={link.id}
						className="font-play cursor-pointer md:text-xl text-xl text-white hover:text-orange uppercase"
					>
						<a
							href={`${link.id !== "" ? `/${link.id}` : "/"}`}
							className="flex gap-2 items-center"
						>
							<img src={link.icon} alt={link.title} className="w-6 h-6" />
							{link.title}
						</a>
					</li>
				))}
			</ul>
            </div>

			
		</nav>
	);
};

export default Header;
