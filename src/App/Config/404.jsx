import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Notfound = () => {
    const navigate = useNavigate();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">Page Not Found</Typography>
            <Button variant="contained" onClick={() => navigate('/')}>Go to Home</Button>
        </Box>
    );
};

export default Notfound;
