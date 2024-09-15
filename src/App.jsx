import { Route, Routes } from 'react-router-dom'
import Login from './App/Login/Login'
import Signup from './App/Signup/Signup'
import AuthRoute from './App/Config/AuthRoute'
import ProtectedRoute from './App/Config/ProtectedRoute'
import Home from './App/Home/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Notfound from './App/Config/404'
import About from './App/About/About'
import Videos from './App/Videos/Videos'
import Library from './App/Library/Library'
import Contact from './App/Contact/Contact'
import Profile from './App/Profile/Profile'
function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route index element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/videos' element={<Videos />} />
          <Route path='/library' element={<Library />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      {/* Same as */}
      <ToastContainer />
    </>
  )
}

export default App
