import Header from "../../Component/Header/Header"
import Input from "../../Component/Inupt"
import ButtonMUI from "../../Component/Button"

const Home = () => {
 
  return (
    <>
    <Header/>
    <Input placeholder='Enter Name' type='text' />
    <ButtonMUI variant='contained' BtnVal='Submit'/>
    </>
  )
}

export default Home