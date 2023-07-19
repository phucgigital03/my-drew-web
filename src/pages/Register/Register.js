import clsx from "clsx";
import styles from './Register.module.scss'
import { Link } from "react-router-dom";
import { Form,Formik,FastField } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';

import FormGroup from "~/components/FormGroup"
import Button from "~/components/Button";
import configs from "~/configs";
import { register,verifyOtp } from "~/services/authentication";
import FeedbackError from "~/components/FeedbackError";

function Register() {
    const registerSchema = Yup.object().shape({
        activeButton: Yup.object({
            name: Yup.string()
        }),
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(70, 'Too Long!')
          .required('Required'),
        lastName: Yup.string()
          .min(2, 'Too Short!')
          .max(70, 'Too Long!')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email')
          .required('Required'),
        password: Yup.string().required('Password is required'),
    });
    const [errorForm,setErrorForm] = useState(null);
    const [showOtp,setShowOtp] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [timeResend,setTimeResend] = useState(0);
    // use handleSubmit and handleResend
    const checkCreateOTP = (result)=>{
        if(result.statusCode === 500){
            setErrorForm(result.errorMessage)
        }else if(result.statusCode === 409){
            setErrorForm(result.errorMessage)
        }else if(result.statusCode === 401){
            setErrorForm(result.errorMessage)
        }else if(result.statusCode === 403){
            setErrorForm(result.errorMessage)
        }else if(result.statusCode === 200){
            setErrorForm(null)
            setShowOtp(true)
            setTimeResend(60)
        }
    }
    // handle submit
    const handleSubmit = async (values, actions)=>{
        if(values.activeButton){
            if(values.activeButton.name === 'create'){
                setIsLoading(true);
                const result = await register({
                    email: values.email
                })
                setIsLoading(false);
                checkCreateOTP(result);
                console.log(result,values)
            }else if(values.activeButton.name === 'resend'){
                setIsLoading(true);
                const result = await register({
                    email: values.email
                })
                setIsLoading(false);
                checkCreateOTP(result);
                console.log(result,values)
            }else if(values.activeButton.name === 'verify'){
                const result = await verifyOtp({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    otp: otp
                })
                if(result.statusCode === 500){
                    setErrorForm(result.errorMessage)
                }else if(result.statusCode === 409){
                    setErrorForm(result.errorMessage)
                }else if(result.statusCode === 401){
                    setErrorForm(result.errorMessage)
                }else if(result.statusCode === 200){
                    setShowOtp(false)
                    setOtp('');
                    setErrorForm('success')
                    actions.resetForm()
                }
                console.log(result,values)
            }
        }
    }
    useEffect(()=>{
        const deleTimeId = setTimeout(()=>{
            setTimeResend(prev => {
                if(prev <= 0){
                    return 0;
                }
                return prev - 1;
            })
        },1000)
        if(timeResend === 0){
            clearTimeout(deleTimeId)
            return;
        }
        return ()=>{
            clearTimeout(deleTimeId)
        }
    },[timeResend])
    console.log('re-render: register page')
    return (
        <div className={clsx(styles.register)}>
            <div className={clsx(styles.contentRegister)}>
                {isLoading && <p>Loading...</p>}
                <h1 className={clsx(styles.titleRegister)}>
                    {showOtp ? 'Verify OTP' : 'Create account'}
                </h1>
                <FeedbackError success={errorForm === 'success'}>
                    {errorForm}
                </FeedbackError>
                <Formik
                    initialValues={{
                        activeButton: { name: '' },
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                    }}
                    validationSchema={registerSchema}
                    onSubmit={handleSubmit}
                >
                {(formikProps)=>{
                    const { handleSubmit,setFieldValue } = formikProps
                    // console.log(values,errors,touched)
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div className={clsx(styles.wrapForm)}>
                                {showOtp ? (
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                        containerStyle={clsx(styles.wrapOtp)}
                                        inputStyle={clsx(styles.inputOtp)}
                                    />
                                ) : (
                                    <>
                                        <FastField
                                            type={"text"}
                                            name={"firstName"}
                                            component={FormGroup}
                                            label={"FirstName"}
                                        />
                                        <FastField
                                            type={"text"}
                                            name={"lastName"}
                                            component={FormGroup}
                                            label={"LastName"}
                                        />
                                        <FastField
                                            type={"email"}
                                            name={"email"}
                                            component={FormGroup}
                                            label={"Email"}
                                        />
                                        <FastField
                                            type={"password"}
                                            name={"password"}
                                            component={FormGroup}
                                            label={"Password"}
                                        />
                                    </>
                                )}
                            </div>
                            {showOtp ? (
                                <>
                                    <div className={clsx(styles.btnWrap)}>
                                        <Button 
                                            yellow 
                                            classBtn={clsx(styles.verifyBtn)}
                                            name={"submitButton1"} 
                                            type={"submit"} 
                                            onClick={() => setFieldValue('activeButton', { name: 'verify' })}
                                        >
                                            verify
                                        </Button>
                                        <Button 
                                            yellow
                                            className={clsx(styles.resendBtn)}
                                            disabled={timeResend >= 1}
                                            name={"submitButton3"} 
                                            type={"submit"} 
                                            onClick={() => setFieldValue('activeButton', { name: 'resend' })}
                                        >
                                            resend {timeResend ? timeResend : ''}
                                        </Button>
                                    </div>
                                    <Link onClick={()=>{setShowOtp(false)}} className={clsx(styles.backBtn)} to={'#'}>create account</Link>
                                </>
                            ) : (
                                <>
                                    <Button 
                                        yellow 
                                        classBtn={clsx(styles.registerBtn)}
                                        name={"submitButton2"} 
                                        type={"submit"} 
                                        onClick={() => setFieldValue('activeButton', { name: 'create' })}
                                    >
                                        create
                                    </Button>
                                    <Link className={clsx(styles.linkLogin)} to={configs.routes.login}>Do you have account ? Login</Link>
                                </>
                            )}
                        </Form>
                    )
                }}
                </Formik>
            </div>
        </div>
    );
}

export default Register;