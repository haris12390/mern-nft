import { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import "./ForgotPassword.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Alert } from 'reactstrap'



const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [code, setCode] = useState("");
    const [modal, setModal] = useState(false);
    const [token, setToken] = useState('')
    const history = useHistory()

    const toggle = () => setModal(!modal);

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_PORT}/api/auth/forgotpassword`, { email }, config)
            setSuccess(data.data);
            if (data.resetToken) {
                setToken(data.resetToken)
                setModal(!modal)
            }

        } catch (error) {
            setError(error.response.data.error);
            setEmail("");
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    const codeCheckerHandler = async (e) => {
        e.preventDefault()
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(`${process.env.REACT_APP_PORT}/api/auth/verifycode`, { code }, config)
        if (data.success) {
            history.push(`/resetpassword/${token}`)
        }
        console.log(data)
    }


    return (
        <div className="forgotpassword-screen">
            <div>
                <Modal isOpen={modal} toggle={() => toggle}>
                    <ModalHeader >Reset Password</ModalHeader>
                    <ModalBody>
                        Please Enter The 4 Digits Code Sent To Your Email
                        <div className="form-group">
                            <input value={code} required onChange={(e) => setCode(e.target.value)} type="number" className="form-control mt-2" placeholder="Enter Code" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={codeCheckerHandler}>Submit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
            <form
                onSubmit={forgotPasswordHandler}
                className="forgotpassword-screen__form"
            >
                <h3 className="forgotpassword-screen__title">Forgot Password</h3>
                {error && <Alert color="danger">{error}</Alert>}
                {success && <Alert color="success">{success}</Alert>}
                <div className="form-group">
                    <p className="forgotpassword-screen__subtext">
                        Please enter the email address you register your account with. We
                        will send you reset password confirmation to this email
                    </p>
                    <div className="mb-4 w-100 ">
                        <input value={email} required onChange={(e) => setEmail(e.target.value)} type="email" className="form-control " placeholder="Enter Email" />
                    </div>
                </div>

                {/* <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-check-input"
                        required
                        id="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> */}
                <button type="submit" className="btn btn-primary">
                    Send Email
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordScreen;
