
import { useStore } from "../store";

import { useNavigate } from "react-router";

// const _status = "loading";

export function EngineerDashboard() {
    const user = useStore((state) => state.user);
    // const status = useStore((state) => state.status);
    const clearUser = useStore((state) => state.clearUser);
    const navigate = useNavigate()
    console.log(user);


    function logouthandler() {
        clearUser();
        navigate("/")
    }

    return (
        <>
            <section className="w-full px-4 py-6 mt-6">
                <div className="flex flex-wrap justify-center gap-6">
                    {/* Left Card */}
                    <div className="max-w-xs w-full border shadow-md p-4 rounded-2xl flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                            <img src={user?.profileImage} alt="user image" className="w-full h-full object-cover" />
                        </div>

                        <div className="my-4 text-center w-full">
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <div className="flex">
                                    <p><strong>Account:</strong></p>
                                    <p> {(user?.role)}</p>
                                </div>
                                <div className="flex">
                                    <p><strong>Email:</strong></p>
                                    <p>{" " + user?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={logouthandler}
                                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="flex-1 min-w-[300px] max-w-4xl border rounded-2xl shadow-md p-6">
                        <div>
                            <p className="text-gray-600">
                                User details:
                            </p>
                        </div>



                        <div className=" flex flex-wrap justify-center gap-4">
                            <div className="mt-4 flex max-sm:flex-wrap justify-center gap-4 w-full">
                                <div className=" w-full">
                                    <label htmlFor="name" className=" mb-2 text-sm font-medium ">Name <sup>*</sup></label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="John Deo"
                                        disabled={true}
                                        value={user?.name}
                                    />

                                </div>
                                <div className=" w-full">
                                    <label htmlFor="maxCapacity" className=" mb-2 text-sm font-medium ">Max Capacity <sup>*</sup></label>
                                    <input
                                        type="text"
                                        id="maxCapacity"
                                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="100 for full-time or 50 for part-time"
                                        disabled={true}
                                        value={user?.maxCapacity}
                                    />

                                </div>
                            </div>

                            <div className="w-full flex gap-2 max-sm:flex-wrap">
                                <div className=" w-full">
                                    <label htmlFor="seniority" className=" mb-2 text-sm font-medium">Seniority <sup>*</sup></label>
                                    <input id="seniority"
                                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500
                                        focus:border-blue-500 block w-full p-2.5"
                                        disabled={true}
                                        value={user?.seniority}
                                    />
                                </div>

                                <div className=" w-full">
                                    <label htmlFor="skills" className=" mb-2 text-sm font-medium">Skills <sup>*</sup></label>
                                    <input
                                        type="text"
                                        id="skills"
                                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="100 for full-time or 50 for part-time"
                                        value={user?.skills?.join(", ") || ""}
                                        disabled={true}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}