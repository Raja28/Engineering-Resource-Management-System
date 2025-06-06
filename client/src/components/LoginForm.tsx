
import engineerFlow_image from "../assets/engineerFlow.png"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useStore } from "../store";
import toast from "react-hot-toast";
import type { LoginData } from "../types/form";

const _status = "loading"

interface Props {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginForm({ setShowForm }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>()
    const status = useStore((state) => state.status);
    const userLogin = useStore((state) => state.userLogin)
    const navigate = useNavigate();

    async function loginHandler(data: LoginData) {

        try {
            await userLogin(data);
            toast.success("Login successful");
            navigate("/dashboard");
        } catch (error: any) {
            console.log(error);
            toast.error(error?.message || "Login failed");
        }
    }

    return (
        <section className="w-11/12 mx-auto h-screen  flex justify-center items-center">
            <div className="p-3 mx-2  rounded-2xl border flex flex-col gap-3 justify-center items-center" style={{ width: "30rem", }}>

                <div className="mx-auto ">
                    <div className=" mx-auto" style={{ maxWidth: "14rem" }}>
                        <img src={engineerFlow_image} alt="engineerFlow logo" className="w-full " />

                    </div>
                    <div className="text-center p-1 text-[0.8rem] sm:text-[0.9rem] font-semibold" >
                        <p className="m-0">Start managing your tasks smarter </p>
                        <p className="m-0">and get organized.</p>
                    </div>
                </div>
                <div>
                    <h4 className="m-0 font-semibold text-2xl">Login</h4>
                </div>


                <form className="w-full" onSubmit={handleSubmit(loginHandler)}>
                    <div className="mb-5">
                        <label htmlFor="email" className=" mb-2 text-sm font-medium ">Your email <sup>*</sup></label>
                        <input
                            type="email"
                            id="email"
                            className="border-2 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="email@example.com"
                            required
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
                        <label htmlFor="password" className=" mb-2 text-sm font-medium">Your password <sup>*</sup></label>
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
                    <div
                        className="flex justify-end text-blue-500 mb-5"
                        onClick={() => setShowForm(prev => !prev)}
                    >
                        Signup
                    </div>
                    <div className=" flex justify-center">
                        <button type="submit"
                            disabled={status === _status ? true : false}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            {status === _status ? "Please wait...":"Submit"}
                        </button>
                    </div>
                </form>


            </div>
        </section>
    )
}