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

export function ManagerSignupForm({ handleSubmit, register, errors, setShowForm }: Props) {
    const status = useStore((state) => state.status);
    const userSignup = useStore((state) => state.userSignup)

    const navigate = useNavigate()

    async function signupHandler(data: FormData): Promise<void> {
          const normalizedData = {
            ...data,
            role: "Manager",
        };
        try {
            await userSignup(normalizedData)
            toast.success("Signup successful");
            navigate("/dashboard")
        } catch (error:any) {
            toast.error(error?.message || "Signup failed");
        }
    }

    return (<>
        <form className=""
            onSubmit={handleSubmit(signupHandler)}
        >
            <div className="mb-5">
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
                />
                <div className="mb-3 ">
                    <small className={`text-danger ${errors.name ? "block" : "hidden"}`}>Name required.</small>
                </div>
            </div>
            <div className="mb-5">
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
                />
                <div className="mb-3 ">
                    <small className={`text-danger ${errors.email ? "block" : "hidden"}`}>Email required.</small>
                </div>
            </div>
            <div className="mb-2">
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
                    <small className={`text-danger ${errors.password ? "block" : "hidden"}`}>Password required.</small>
                </div>
            </div>
            <div className="mb-2">
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
                    <small className={`text-danger ${errors.confirmPassword ? "block" : "hidden"}`}>Confirm Password required.</small>
                </div>
            </div>
            <div
                className="flex justify-end text-blue-500 mb-5"
                onClick={() => setShowForm(prev => !prev)}
            >
                Login
            </div>
            <div className=" flex justify-center">
                <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Submit
                </button>
            </div>
        </form>
    </>)
}