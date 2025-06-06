import { type UseFormRegister, type FieldErrors, type UseFormHandleSubmit } from "react-hook-form";
import type { FormData } from "../types/form";
import { useStore } from "../store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


const _status = "loading"
interface Props {
    register: UseFormRegister<FormData>;
    handleSubmit: UseFormHandleSubmit<FormData, FormData>
    errors: FieldErrors<FormData>;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export function EngineerSignupForm({ handleSubmit, register, errors, setShowForm }: Props) {
    const status = useStore((state) => state.status);
    const userSignup = useStore((state) => state.userSignup)

    const navigate = useNavigate()

    async function signupHandler(data: FormData): Promise<void> {

        const parsedSkills = (data.skills ?? "")
            .toString()
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

        const normalizedData = {
            ...data,
            role: "Engineer",
            skills: parsedSkills,
        };


        try {
           await userSignup(normalizedData);
          
            toast.success("Signup successful");
            navigate("/dashboard");
        } catch (error: any) {
            console.log(error);
            toast.error(error?.message || "Signup failed");
        }
    }

    return (<>
        <form className=""
            onSubmit={handleSubmit(signupHandler)}
        >
            <div className="flex max-sm:flex-col gap-1">
                <div className="mb-5 w-full">
                    <label htmlFor="name" className=" mb-2 text-sm font-medium ">Name <sup>*</sup></label>
                    <input
                        type="text"
                        id="name"
                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="John Deo"

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
                        <small className={`text-red-500 ${errors.name ? "block" : "hidden"}`}>Name required.</small>
                    </div>
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="email" className=" mb-2 text-sm font-medium ">Email <sup>*</sup></label>
                    <input
                        type="email"
                        id="email"
                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="manger@example.com"

                        {...register(
                            "email",
                            {
                                required: true
                            }
                        )}
                        disabled={status === _status ? true : false}
                        required
                    />
                    <div className="mb-3 ">
                        <small className={`text-red-500 ${errors.email ? "block" : "hidden"}`}>Email required.</small>
                    </div>
                </div>
            </div>
            <div className="flex max-sm:flex-col gap-1">
                <div className="mb-2 w-full">
                    <label htmlFor="password" className=" mb-2 text-sm font-medium">Password <sup>*</sup></label>
                    <input
                        type="password"
                        id="password"
                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500
                         focus:border-blue-500 block w-full p-2.5"
                        required
                        {...register(
                            "password",
                            {
                                required: true
                            }
                        )}
                        disabled={status === _status ? true : false}

                    />
                    <div className="mb-3 ">
                        <small className={`text-red-500 ${errors.password ? "block" : "hidden"}`}>Password required.</small>
                    </div>
                </div>

                <div className="mb-2 w-full">
                    <label htmlFor="confirmPassword" className=" mb-2 text-sm font-medium">Confirm Password <sup>*</sup></label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500
                         focus:border-blue-500 block w-full p-2.5"
                        required
                        {...register(
                            "confirmPassword",
                            {
                                required: true
                            }
                        )}
                        disabled={status === _status ? true : false}
                    />
                    <div className="mb-3 ">
                        <small className={`text-red-500 ${errors.confirmPassword ? "block" : "hidden"}`}>Confirm Password required.</small>
                    </div>
                </div>
            </div>
            <div className="flex max-sm:flex-col gap-1">
                <div className="mb-2 w-full">
                    <label htmlFor="seniority" className=" mb-2 text-sm font-medium">Seniority <sup>*</sup></label>
                    <select id="seniority"
                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500
                         focus:border-blue-500 block w-full p-2.5"
                        required
                        {...register(
                            "seniority",
                            {
                                required: true
                            }
                        )}
                    >
                        <option value="" >Select your seniority</option>
                        <option value="junior">Junior</option>
                        <option value="mid">Mid</option>
                        <option value="senior">Senior</option>
                    </select>
                    <div className="mb-3 ">
                        <small className={`text-red-500 ${errors.seniority ? "block" : "hidden"}`}>Seniority required.</small>
                    </div>
                </div>

                <div className="mb-2 w-full">
                    <label htmlFor="maxCapacity" className=" mb-2 text-sm font-medium">Max Capacity <sup>*</sup></label>
                    <input
                        type="number"
                        id="maxCapacity"
                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500
                         focus:border-blue-500 block w-full p-2.5"
                        placeholder="100 for full-time or 50 for part-time"
                        required
                        {...register(
                            "maxCapacity",
                            {
                                required: true
                            }
                        )}
                        disabled={status === _status ? true : false}
                    />
                    <div className="mb-3 ">
                        <small className={`text-red-500 ${errors.maxCapacity ? "block" : "hidden"}`}>Max Capacity required.</small>
                    </div>
                </div>
            </div>
            <div>
                <div className="mb-5 w-full">
                    <label htmlFor="department" className=" mb-2 text-sm font-medium ">Department <sup>*</sup></label>
                    <input
                        type="text"
                        id="department"
                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Development"

                        {...register(
                            "department",
                            {
                                required: true
                            }
                        )}
                        disabled={status === _status ? true : false}
                        required
                    />
                    <div className="mb-3 ">
                        <small className={`text-red-500 ${errors.department ? "block" : "hidden"}`}>Department required.</small>
                    </div>
                </div>

            </div>
            <div>
                <div className="mb-5 w-full">
                    <label htmlFor="skills" className=" mb-2 text-sm font-medium ">Skills <sup>*</sup></label>
                    <input
                        type="text"
                        id="skills"
                        className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="JavaScript, React, Node.js"

                        {...register(
                            "skills",
                            {
                                required: true
                            }
                        )}
                        disabled={status === _status ? true : false}
                        required
                    />
                    <div className="mb-3 ">
                        <small className={`text-red-500 ${errors.skills ? "block" : "hidden"}`}>Skills required.</small>
                    </div>
                </div>

            </div>
            <div
                className="flex  justify-end text-blue-500 mb-5"
                onClick={() => setShowForm(prev => !prev)}
            >
                Login
            </div>
            <div className=" flex justify-center">
                <button type="submit"
                    disabled={status === _status ? true : false}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    {status === _status ? "Please wait...":"Submit"}
                </button>
            </div>
        </form>
    </>)
}