import toast from "react-hot-toast";
import { useStore } from "../store";

export function ProjectList({ setUpdateProjectId }: { setUpdateProjectId: React.Dispatch<React.SetStateAction<null | string>> }) {
    const user = useStore((state) => state.user);
    const status = useStore((state) => state.status);

    async function handleDeleteProject(projectId: string) {
        try {
            await useStore.getState().deleteProject(projectId);
            toast.success("Project deleted successfully!");
        } catch (error: any) {
            console.error("Error deleting project:", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to delete project";
            toast.error(errorMessage);
        }
    }
    return (
        <div className=" w-full ">
            <h2 className="text-2xl font-semibold my-4 text-center">Project List</h2>
            {/* Project items will be rendered here */}
            <div className="">
                <div className="px-2  grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 max-sm:grid-cols-1  gap-5 my-3">
                    {user?.projects?.length ? (
                        user.projects.map((project) => (
                            <div key={project._id} className="bg-white p-4 border rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300">
                                <h3 className="text-lg font-semibold">{project.name}</h3>
                                <p className="text-gray-600 my-4  h-[5.5rem]">
                                    {
                                        project.description.split(" ").length > 20
                                            ? project.description.split(" ").slice(0, 20).join(" ") + "..." :
                                            project.description
                                    }

                                </p>
                                <div className="flex justify-end gap-4">
                                    <button className="click-btn btn-style5" 
                                    onClick={() => handleDeleteProject(project._id)}
                                     disabled={status === "loading" ? true : false}
                                    >
                                        Delete
                                        </button>
                                    <button className="click-btn btn-style4" onClick={() => setUpdateProjectId(project._id)}>Update</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No projects found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}