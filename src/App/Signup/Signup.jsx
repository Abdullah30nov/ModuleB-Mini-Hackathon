import { Box, Button, Container, Paper, CircularProgress, Backdrop } from "@mui/material";
import './Signup.scss';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../Config/Firebase";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
    const [Name, setName] = useState('');
    const [UserName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ShowPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);  // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!Name || !UserName || !Email || !Password) {
            toast.error('Please fill all the fields.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
            const user = userCredential.user;
            await setDoc(doc(database, "Users", user.uid), {
                id: user.uid,
                name: Name,
                username: UserName,
                email: Email,
            });

            setIsLoading(false);

            toast.success('Successfully signed up!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            navigate('/');
        } catch (error) {
            setIsLoading(false);
            toast.error('Credential error. Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

        setName('');
        setUserName('');
        setEmail('');
        setPassword('');
    }
    const [open, setOpen] = useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };
    const handleOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        handleOpen()
    }, [isLoading == true])
    return (
        <Box className='Signup-main'>
            <Container className="Signup-container">
                
                    {isLoading ? (
                        <div>
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={open}
                            // onClick={handleClose}
                            >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </div>
                    ) : (
                        <Paper className="Signup">
                    <h1 className="Signup_heading">Signup</h1>
                        <form onSubmit={handleSubmit} className="Signup_Field">
                            <input
                                type="text"
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                required
                                className="Input_Field"
                            /><br />
                            <input
                                type="text"
                                value={UserName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="User Name"
                                required
                                className="Input_Field"
                            /><br />
                            <input
                                type="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="Input_Field"
                            /><br />
                            <input
                                type={ShowPassword ? "text" : "password"}
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                                className="Input_Field"
                            /><br />
                            <div className="showpasswordcheck">
                                <input
                                    type="checkbox"
                                    checked={ShowPassword}
                                    onChange={() => setShowPassword(!ShowPassword)}
                                    className="checkBox"
                                />
                                <span className="Show_password">Show Password</span><br />
                            </div><br />
                            <Button type="submit" className="btn">Signup</Button>
                        </form>
                        <Button className="newAccount" onClick={() => navigate("/")}>
                        Already have an Account
                    </Button><br />
                </Paper>
                    )}

                    
            </Container>
        </Box>
    )
}

export default Signup;
