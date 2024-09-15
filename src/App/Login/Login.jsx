import { Box, Button, Container, Paper, CircularProgress, Backdrop } from "@mui/material";
import './Login.scss';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../index.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../Config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Bounce, toast } from "react-toastify";

export default function Login() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ShowPassword, setShowPassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        signInWithEmailAndPassword(auth, Email, Password)
            .then(async (userCredential) => {
                localStorage.setItem("userId", userCredential.user.uid);
                const getData = await getDoc(
                    doc(database, "Users", userCredential.user.uid)
                );
                localStorage.setItem("userData", JSON.stringify(getData.data()));

                setIsLoading(false);

                toast.success('Successfully Logged In', {
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
                navigate('/home');
            })
            .catch((error)=>{
                setIsLoading();
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
            })
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
        <>
            <Box className='login-main'>
                <Container className="login-container">
                    

                        {isLoading ? (
                            <div>
                                <Backdrop
                                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                                    open={open}
                                    // onClick={handleClose}>
                                    >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </div>
                        ) : (
                            <Paper className="login">
                        <h1 className="login-heading">Login</h1>
                            <form action="" onSubmit={handleSubmit} className="Login_Field">
                                <input type="email"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email'
                                    required
                                    className="Input_Field" /><br />

                                {ShowPassword ? (
                                    <input
                                        type="password"
                                        value={Password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                        className="Input_Field" />
                                ) : (
                                    <input
                                        type="text"
                                        value={Password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                        className="Input_Field" />
                                )}

                                <br />
                                <div className="showpasswordcheck">
                                    <input type="checkbox" onClick={() => { setShowPassword(!ShowPassword) }} className="checkBox" />
                                    <span className="Show_password">Show Password</span><br />
                                </div><br />

                                <Button type="Submit" className="btn">Login</Button>

                                <Button className="newAccount" onClick={() => navigate('/Signup')}>
                                    Create new Account
                                </Button><br />
                            </form>
                    </Paper>
                        )}
                </Container>
            </Box>
        </>
    )
}

































// import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
// import './Login.scss'
// import { Visibility, VisibilityOff } from '@mui/icons-material'
// import { useState } from 'react';
// const TailwindWork = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [email,setEmail]=useState()
//     const [password,setPassword]=useState()
//       const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleMouseUpPassword = (event) => {
//     event.preventDefault();
//   };
//   const handlesubmit =(e)=>{
//     e.preventDefault()
//     console.log({
//         email:email,
//         password:password
//     })
//     setEmail('')
//     setPassword('')
//   }
//     return (<>
//         <div className="w-screen text-center justify-center grid grid-cols-1 gap-6 py-3 p-3  md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-1">
//             <div className="shadow-lg m-auto w-[500px] py-5">
//             <h1>Login</h1>
//             <form action="" onSubmit={handlesubmit}>
//                 <TextField className='w-[90%]'
//                 placeholder='Email'
//                 label='Email'
//                 variant="outlined"
//                 required
//                 name='Email'
//                 value={email}
//                 onChange={(e)=>setEmail(e.target.value)}
//                 />
//             <FormControl sx={{ m: 1, width: '90%' }}  variant="outlined">
//           <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-password"
//             type={showPassword ? 'text' : 'password'}
//             required
//             name='Password'
//             value={password}
//             onChange={(e)=>setPassword(e.target.value)}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   onMouseUp={handleMouseUpPassword}
//                   edge="end"
//                   className='w-full'
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl>
//         <Button type='submit' variant='contained'>Login</Button>
//             </form>
//             </div>
//         </div>
//     </>
//     )
// }

// export default TailwindWork