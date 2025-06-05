
import engineerFlow_image from "../assets/engineerFlow.png"

import { useForm } from "react-hook-form"

import { useStore } from "../store";
import { useState } from "react";
import { EngineerSignupForm } from "./EngineerSignupForm";
import { ManagerSignupForm } from "./ManagerSignupForm";
import type { FormData } from "../types/form";

const _status = "loading"
const engineer = "engineer"
const manager = "manager"

interface Props {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Signup({ setShowForm }: Props) {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>()
    const user = useStore((state) => state.user);
    const status = useStore((state) => state.status);
    const [formType, setFormType] = useState(manager)


    function loginHandler(data: FormData) {
        // e.preventDefault()
        console.log(data);

    }

    return (
        <section className="w-11/12 mx-auto h-fit  flex justify-center items-center">
            <div className="p-3 mx-2 my-4 rounded-2xl border flex flex-col gap-3 justify-center items-center" style={{ width: "30rem", }}>

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
                    <h4 className="m-0 font-semibold text-2xl">Signup</h4>
                </div>
                <div className="flex  w-full gap-1 mt-3">
                    <div className={`w-full text-center py-2 font-semibold ${formType === manager ? "border-b-3 text-green-700  border-green-700 " : ""} `}
                        style={{ cursor: "pointer" }}
                        onClick={() => setFormType(manager)}
                    >
                        Manager
                    </div>
                    <div className={`w-full text-center py-2 font-semibold ${formType !== manager ? "border-b-3 text-green-700  border-green-700 " : ""} `}
                        style={{ cursor: "pointer" }}
                        onClick={() => setFormType(engineer)}
                    >
                        Engineer
                    </div>
                </div>
                <div className=" w-full">

                    {
                        formType === manager ? (<ManagerSignupForm handleSubmit={handleSubmit} register={register} errors={errors} setShowForm={setShowForm} />)
                            : (<EngineerSignupForm handleSubmit={handleSubmit} register={register} errors={errors} setShowForm={setShowForm} />)
                    }
                </div>
            </div>
        </section >
    )
}