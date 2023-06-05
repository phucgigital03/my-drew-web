import clsx from "clsx";
import styles from './Register.module.scss'
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import FormGroup from "~/components/FormGroup"
import Button from "~/components/Button";
import configs from "~/configs";
import Joi from 'joi';

function Register() {
    const formRef = useRef(null);
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(4).max(12).required()
    });
    const [formUser,setFormUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const handleValueFirstName = (e)=>{
        const textFirstName = e.target.value;
        setFormUser((formOld)=>{
            return {
                ...formOld,
                firstName: textFirstName
            }
        })
    }
    const handleValueLastName = (e)=>{
        const textLastName = e.target.value;
        setFormUser((formOld)=>{
            return {
                ...formOld,
                lastName: textLastName
            }
        })
    }
    const handleValueEmail = (e)=>{
        const textEmail = e.target.value;
        setFormUser((formOld)=>{
            return {
                ...formOld,
                email: textEmail
            }
        })
    }
    const handleValuePwd = (e)=>{
        const textPwd = e.target.value;
        setFormUser((formOld)=>{
            return {
                ...formOld,
                password: textPwd
            }
        })
    }
    const handleCreateCustomer = ()=>{
        const { error, value } = schema.validate(formUser,{abortEarly: false});
        if (error) {
          console.log(error.details);
        } else {
          console.log(value);
        }
    }
    return (
        <div className={clsx(styles.register)}>
            <div className={clsx(styles.contentRegister)}>
                <h1 className={clsx(styles.titleRegister)}>
                    Create account
                </h1>
                <div className={clsx(styles.wrapForm)}>
                    <form id="formCreate" ref={formRef} className={clsx(styles.formRegister)}>
                        <FormGroup valueInput={formUser.firstName} nameInput={"firstName"} idInput={"First name"} labelText={"First name"}
                            handleChange={handleValueFirstName}
                        />
                        <FormGroup valueInput={formUser.lastName} nameInput={"lastName"} idInput={"Last name"} labelText={"Last name"}
                            handleChange={handleValueLastName}
                        />
                        <FormGroup valueInput={formUser.email} nameInput={"email"} idInput={"Email"} labelText={"Email"}
                            typeInput={"email"}
                            handleChange={handleValueEmail}
                        />
                        <FormGroup valueInput={formUser.password} nameInput={"password"} idInput={"Password"} labelText={"Password"}
                            typeInput={"password"}
                            handleChange={handleValuePwd}
                        />
                    </form>
                </div>
                <Button onClick={handleCreateCustomer} yellow classBtn={clsx(styles.registerBtn)}>create</Button>
                <Link className={clsx(styles.linkLogin)} to={configs.routes.login}>Do you have account ? Login</Link>
            </div>
        </div>
     );
}

export default Register;