import { Button } from "@mui/material"

const ButtonMUI = ({variant,BtnVal}) => {
  return (
    <>
    <Button variant={variant}>{BtnVal}</Button>
    </>
  )
}

export default ButtonMUI