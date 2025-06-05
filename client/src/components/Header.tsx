import { Link } from "react-router-dom";
import engineerFlow from "../assets/engineerFlow.png"
import { useStore } from "../store";

export function Header() {
    const token = useStore((state) => state.token);
    const user = useStore((state) => state.user);

    return (
        <header className="border-b-2 h-15 flex items-center border-gray-200 bg-white shadow-m sticky top-0 z-50">
            <div className="w-11/12 mx-auto  flex justify-between items-center py-2 px-2">
                <Link to={"/"} className=" " >
                    <img src={engineerFlow} alt="engineerFlow icon" className='sm:w-[10rem] w-[8rem]  transition-all duration-500 ease-in-out' />
                </Link>
                {
                    token && <Link to={"/dashboard"} className="rounded-full" >
                        <img src={user?.profileImage} alt="user avatar icon"
                            className='sm:w-[2.5rem] sm:h-[2.5rem] w-[2rem] h-[2rem] transition-all duration-500 ease-in-out rounded-full border size-32'
                        />
                    </Link>
                }
            </div>
        </header>
    )
}