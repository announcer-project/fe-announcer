import { Input, Button } from 'antd';
import { RegisterContext } from "../../store/RegisterProvider";
import React, { useContext } from "react";
import RegisterButton from './RegisterButton'

function Step2() {

    const { firstname, lastname, step, nextStep, changeFirstname, changeLastname } = useContext(RegisterContext);
    console.log("fname",firstname)
    console.log("lname",lastname)
    console.log("step",step)

    return (
        <div>
            <div>
                <p>Firstname</p>
                <Input value={firstname} onChange={(e) => changeFirstname(e.target.value)} placeholder="" />
                <p>Lastname</p>
                <Input value={lastname} onChange={(e) => changeLastname(e.target.value)} placeholder="" />
                <div className="mt-3 col-6 mx-auto">
                    <RegisterButton onClick={() => nextStep(1) } type="submit">
                        Next
                    </RegisterButton>
                </div>
            </div>
        </div>
    )
}

export default Step2