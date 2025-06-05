import { useForm } from "react-hook-form";
import { useStore } from "../store";
import type { ProjectForm } from "../types/project";
import { useNavigate } from "react-router";
import { useFetchEngineers } from "../hooks/useFetchEngineers";
import { useEffect } from "react";

const _status = "loading";
export function ManagerDashboard() {
    const user = useStore((state) => state.user);
    const clearUser = useStore((state) => state.clearUser);
    const status = useStore((state) => state.status);
    const { register, handleSubmit, formState: { errors } } = useForm<ProjectForm>()

    const navigate = useNavigate();

    const { data, fetchData } = useFetchEngineers()

    useEffect(() => {
        fetchData();
    }, [])


    function logouthandler() {
        clearUser();
        navigate("/")
    }

    async function addProjectHandler(data: ProjectForm) {
        console.log(data);
        
        // try {
        //     // const response =  
        // } catch (error) {

        // }
    }

    return (
        <>
            <section className="w-full px-4 py-6 mt-6">
                <form 
                onSubmit={handleSubmit(addProjectHandler)}
                className="flex flex-wrap justify-center gap-6">
                    {/* Left Card */}
                    <div className="max-w-xs w-full border shadow-md p-4 rounded-2xl flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                            <img src={user?.profileImage} alt="user image" className="w-full h-full object-cover" />
                        </div>

                        <div className="my-4 text-center w-full">
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <div className="flex">
                                    <p><strong>Account:</strong></p>
                                    {/* <p> {(user?.role)}</p> */}
                                </div>
                                <div className="flex">
                                    <p><strong>Email:</strong></p>
                                    {/* <p>{" " + user?.email}</p> */}
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
                                Add New Project:
                            </p>
                        </div>



                        <div className=" flex flex-wrap justify-center gap-4">

                            <div className="mt-4 flex max-sm:flex-wrap justify-center gap-4 w-full">
                                <div className=" w-full">
                                    <label htmlFor="name" className=" mb-2 text-sm font-medium ">Project name <sup>*</sup></label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Enter your Project Name"

                                        {...register(
                                            "name",
                                            {
                                                required: true
                                            }
                                        )}
                                        disabled={status === _status ? true : false}
                                        required
                                    />
                                    <div className="mb-3 ">
                                        <small className={`text-red-500 ${errors.name ? "block" : "hidden"}`}>Email required.</small>
                                    </div>
                                </div>
                                <div className=" w-full">
                                    <label htmlFor="startDate" className=" mb-2 text-sm font-medium ">start Date <sup>*</sup></label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="100 for full-time or 50 for part-time"
                                        {...register(
                                            "startDate",
                                            {
                                                required: true
                                            }
                                        )}
                                        disabled={status === _status ? true : false}
                                        required
                                    />
                                    <div className="mb-3 ">
                                        <small className={`text-red-500 ${errors.startDate ? "block" : "hidden"}`}>startDate required.</small>
                                    </div>
                                </div>

                                <div className=" w-full">
                                    <label htmlFor="endDate" className=" mb-2 text-sm font-medium ">End Date <sup>*</sup></label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="100 for full-time or 50 for part-time"
                                        {...register(
                                            "endDate",
                                            {
                                                required: true
                                            }
                                        )}
                                        disabled={status === _status ? true : false}
                                        required
                                    />
                                    <div className="mb-3 ">
                                        <small className={`text-red-500 ${errors.endDate ? "block" : "hidden"}`}>End Date required.</small>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex gap-2 max-sm:flex-wrap">
                                <div className=" w-full">
                                    <label htmlFor="teamSize" className=" mb-2 text-sm font-medium">Team size: <sup>*</sup></label>
                                    <input id="teamSize"
                                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500
                                        focus:border-blue-500 block w-full p-2.5"
                                        {...register(
                                            "teamSize",
                                            {
                                                required: true
                                            }
                                        )}
                                        disabled={status === _status ? true : false}
                                        required
                                    />
                                    <div className="mb-3 ">
                                        <small className={`text-red-500 ${errors.teamSize ? "block" : "hidden"}`}>Team size required.</small>
                                    </div>

                                </div>
                                <div className=" w-full">
                                    <div className="mb-2 w-full">
                                        <label htmlFor="Status" className=" mb-2 text-sm font-medium">Status <sup>*</sup></label>
                                        <select id="Status"
                                            className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500
                                                     focus:border-blue-500 block w-full p-2.5"
                                            required
                                            {...register(
                                                "status",
                                                {
                                                    required: true
                                                }
                                            )}
                                        >
                                            <>
                                                <option value={""}>Select status</option>
                                                <option value={"planning"}>Planning</option>
                                                <option value={"active"}>Active</option>
                                                <option value={"completed"}>Completed</option>
                                            </>
                                        </select>
                                        <div className="mb-3 ">
                                            <small className={`text-red-500 ${errors.status ? "block" : "hidden"}`}>Status required.</small>
                                        </div>
                                    </div>

                                </div>

                                <div className=" w-full">
                                    <div className="mb-2 w-full">
                                        <label htmlFor="Engineer" className=" mb-2 text-sm font-medium">Engineer <sup>*</sup></label>
                                        <select id="Engineer"
                                            className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500
                                                     focus:border-blue-500 block w-full p-2.5"
                                            required
                                            {...register(
                                                "engineer",
                                                {
                                                    required: true
                                                }
                                            )}
                                        >
                                            <>
                                                <option value={""}>Select Engineer</option>
                                                {
                                                    data && data?.length > 0 &&
                                                    data.map((engineer: any) => (
                                                        <option key={engineer._id} value={engineer._id}>
                                                            {engineer.name}
                                                        </option>
                                                    ))
                                                }
                                            </>
                                        </select>
                                        <div className="mb-3 ">
                                            <small className={`text-red-500 ${errors.status ? "block" : "hidden"}`}>Status required.</small>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className=" flex max-sm:flex-wrap justify-center gap-4 w-full">
                                <div className=" w-full">
                                    <label htmlFor="skills" className=" mb-2 text-sm font-medium ">Skills<sup>*</sup></label>
                                    <input
                                        type="text"
                                        id="skills"
                                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="JavaScript, React, Node.js"

                                        {...register(
                                            "requiredSkills",
                                            {
                                                required: true
                                            }
                                        )}
                                        disabled={status === _status ? true : false}
                                        required
                                    />
                                    <div className="mb-3 ">
                                        <small className={`text-red-500 ${errors.requiredSkills ? "block" : "hidden"}`}>Skills required.</small>
                                    </div>
                                </div>

                                <div className=" w-full">
                                    <label htmlFor="Description" className=" mb-2 text-sm font-medium ">Description:<sup>*</sup></label>
                                    <input
                                        type="text"
                                        id="Description"
                                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="JavaScript, React, Node.js"

                                        {...register(
                                            "description",
                                            {
                                                required: true
                                            }
                                        )}
                                        disabled={status === _status ? true : false}
                                        required
                                    />
                                    <div className="mb-3 ">
                                        <small className={`text-red-500 ${errors.description ? "block" : "hidden"}`}>Description required.</small>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={status === _status ? true : false}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                    Add project
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>


        </>
    );
}