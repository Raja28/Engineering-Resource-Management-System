import { useForm } from "react-hook-form";
import { useStore } from "../store";
import type { ProjectForm } from "../types/project";
import { useNavigate } from "react-router";
import { useFetchEngineers } from "../hooks/useFetchEngineers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ProjectList } from "./ProjectList";

const _status = "loading";
export function ManagerDashboard() {

    const user = useStore((state) => state.user);
    const clearUser = useStore((state) => state.clearUser);
    const status = useStore((state) => state.status);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProjectForm>()
    const [updateProjectId, setUpdateProjectId] = useState<string | null>(null)

    const navigate = useNavigate();

    const { data, fetchData } = useFetchEngineers()

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        const selectedProject = user?.projects?.find((project) => project._id === updateProjectId);

        if (selectedProject) {
            setValue("name", selectedProject.name);
            setValue("startDate", selectedProject.startDate.slice(0, 10));
            setValue("endDate", selectedProject.endDate.slice(0, 10));
            setValue("teamSize", selectedProject.teamSize);
            setValue("status", selectedProject.status);
            // setValue("engineer", selectedProject.engineer._id); 
            setValue("requiredSkills", selectedProject.requiredSkills.join(", "));
            setValue("description", selectedProject.description);
        }

    }, [updateProjectId]);


    function logouthandler() {
        clearUser();
        navigate("/")
    }

    async function addProjectHandler(data: ProjectForm) {
        try {
            await useStore.getState().addProject(data)
            toast.success("Project added successfully!");
        } catch (error: any) {
            console.error("Error adding project:", error);
            const errorMessage = error?.message || "Failed to add project";
            toast.error(errorMessage);
        } finally {
            reset();
        }
    }

    async function updateProjectHandler(data: ProjectForm) {
        if (!updateProjectId) {
            toast.error("No project selected for update.");
            return;
        }
        const selectedProject = user?.projects?.find((project) => project._id === updateProjectId);
        const updatedData: ProjectForm = {
            ...data,
            projectId: selectedProject._id,
            // requiredSkills: typeof data.requiredSkills === "string" ? data.requiredSkills.split(",").map((skill) => skill.trim()) : selectedProject?.requiredSkills || [],
            requiredSkills: data.requiredSkills
        }

        try {
            await useStore.getState().updateProject(updatedData);
            toast.success("Project updated successfully!");
            setUpdateProjectId(null);
            reset();
        } catch (error: any) {
            console.error("Error updating project:", error);
            const errorMessage = error?.message || "Failed to update project";
            toast.error(errorMessage);
        }
    }

    return (
        <>
            <section className="w-full px-4 py-6 mt-6">
                <div

                    className=" w-11/12 mx-auto flex flex-wrap justify-center gap-6">
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
                                Add New Project:
                            </p>
                        </div>

                        <div className=" flex max-md:flex-wrap justify-center gap-4 ">
                            <form action=""
                                onSubmit={updateProjectId ? handleSubmit(updateProjectHandler) : handleSubmit(addProjectHandler)}
                                className="w-full "
                            >

                                <div className="mt-4 flex max-sm:flex-wrap justify-center gap-4 w-full ">
                                    <div className=" mb-1 w-full">
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
                                        <div className="">
                                            <small className={`text-red-500 ${errors.name ? "block" : "hidden"}`}>Name required.</small>
                                        </div>
                                    </div>
                                    <div className="mb-1 w-full">
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
                                        <div className="">
                                            <small className={`text-red-500 ${errors.startDate ? "block" : "hidden"}`}>startDate required.</small>
                                        </div>
                                    </div>

                                    <div className="mb-1 w-full">
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
                                        <div className="">
                                            <small className={`text-red-500 ${errors.endDate ? "block" : "hidden"}`}>End Date required.</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex gap-4 max-sm:flex-wrap">
                                    <div className="mb-1 w-full">
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
                                        <div className="">
                                            <small className={`text-red-500 ${errors.teamSize ? "block" : "hidden"}`}>Team size required.</small>
                                        </div>

                                    </div>
                                    <div className="mb-1 w-full">
                                        <div className="w-full">
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
                                            <div className=" ">
                                                <small className={`text-red-500 ${errors.status ? "block" : "hidden"}`}>Status required.</small>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mb-1 w-full">
                                        <div className="w-full">
                                            <label htmlFor="Engineer" className=" mb-2 text-sm font-medium">Engineer <sup>*</sup></label>
                                            <select id="Engineer"
                                                className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500
                                                     focus:border-blue-500 block w-full p-2.5"
                                                {...register(
                                                    "engineer",
                                                    {
                                                        required: false
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
                                            <div className=" ">
                                                <small className={`text-red-500 ${errors.engineer ? "block" : "hidden"}`}>Engineer required.</small>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className=" flex max-sm:flex-wrap justify-center gap-4 w-full">
                                    <div className="mb-1 w-full">
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

                                    <div className="mb-1 w-full">
                                        <label htmlFor="Description" className=" mb-2 text-sm font-medium ">Description:<sup>*</sup></label>
                                        <textarea
                                            rows={1}
                                            cols={50}
                                            id="Description"
                                            className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter your Project Description"

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
                                    {
                                        updateProjectId ? (
                                            <div>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setUpdateProjectId(null);
                                                        reset();
                                                    }}
                                                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center mr-2 mb-2">
                                                    Cancel
                                                </button>
                                                <button
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
                                                     disabled={status === _status ? true : false}
                                                >
                                                    Update
                                                </button>
                                            </div>

                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={status === _status ? true : false}
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                                Add project
                                            </button>
                                        )
                                    }

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


            <section className="w-11/12 my-8 mx-auto flex justify-center items-center ">
                <div className="my-4 w-full px-5">
                    <ProjectList setUpdateProjectId={setUpdateProjectId} />
                </div>
            </section>

        </>
    );
}