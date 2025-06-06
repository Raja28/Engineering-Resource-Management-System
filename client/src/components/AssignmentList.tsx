import { useStore } from "../store";


export function AssignmentList() {
    const user = useStore((state) => state.user);

    return (
        <div className=" w-full ">
            <h2 className="text-2xl font-semibold my-4 text-center">Assignment List</h2>
            {/* Project items will be rendered here */}
            <div className="">
                <div className="px-2  grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 max-sm:grid-cols-1  gap-5 my-3">
                    {user?.assignments?.length ? (
                        user.assignments.map((assignments) => (
                            <div key={assignments._id} className="bg-white p-4 border rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300">
                                <h3 className="text-lg font-semibold">{assignments.projectId.name}</h3>
                                <p className="text-gray-600 my-4  h-[5.5rem]">
                                    {
                                        assignments.projectId.description.split(" ").length > 20
                                            ? assignments.projectId.description.split(" ").slice(0, 20).join(" ") + "..." :
                                            assignments.projectId.description
                                    }

                                </p>
                                <div className="flex justify-end gap-4">
                                    <p>
                                       Start: {assignments.projectId.startDate.toString().split("T")[0]
                                            .replace(/-/g, "/")}
                                    </p>
                                    <p>
                                       End: {assignments.projectId.endDate.toString().split("T")[0]
                                            .replace(/-/g, "/")}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No assignent found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}