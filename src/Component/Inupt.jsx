import { TextField } from "@mui/material";
const Input = ({ placeholder, type }) => {
  return (
    <>
<TextField id="outlined-basic" label={placeholder} type={type} variant="outlined" />
    </>
  );
};
export default Input;
