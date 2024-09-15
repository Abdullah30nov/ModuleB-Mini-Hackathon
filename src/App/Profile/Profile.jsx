
// import { useState } from "react";
// import { Box, Container, Typography, Button, Avatar } from "@mui/material";
// import Header from "../../Component/Header/Header";

// const Profile = () => {
//   // Fetch data from localStorage
//   const userData = JSON.parse(localStorage.getItem("userData")) || {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     profilePicture: "",
//   };

//   const [profilePicture, setProfilePicture] = useState(userData.profilePicture || "https://via.placeholder.com/150");

//   const handleProfileChange = () => {
//     // Logic for changing the profile picture
//     const newProfilePic = prompt("Enter the new profile picture URL:");
//     if (newProfilePic) {
//       setProfilePicture(newProfilePic);
//       // Update the new profile picture in localStorage
//       const updatedUserData = { ...userData, profilePicture: newProfilePic };
//       localStorage.setItem("userData", JSON.stringify(updatedUserData));
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//           backgroundColor: "#f5f5f5",
//           padding: 4,
//         }}
//       >
//         <Container
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#fff",
//             boxShadow: 3,
//             borderRadius: 2,
//             padding: 4,
//             width: "400px",
//           }}
//         >
//           <Avatar
//             src={profilePicture}
//             alt="Profile Picture"
//             sx={{
//               width: 100,
//               height: 100,
//               marginBottom: 2,
//             }}
//           />
//           <Typography variant="h5" sx={{ marginBottom: 1 }}>
//             {userData.name}
//           </Typography>
//           <Typography variant="body1" sx={{ marginBottom: 3, color: "gray" }}>
//             {userData.email}
//           </Typography>
//           <Button variant="contained" color="primary" onClick={handleProfileChange}>
//             Change Profile Picture
//           </Button>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default Profile;


import { useState } from "react";
import { Box, Container, Typography, Button, Avatar, TextField } from "@mui/material";
import Header from "../../Component/Header/Header";

const Profile = () => {
  // Fetch data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData")) || {
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "",
  };

  const [profilePicture, setProfilePicture] = useState(userData.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4VZjWaF6rLr7L1f9VC5OJ-0dohREglolvr5qorhFt-YrC-dP0oWP7HKoHcUJGMZavLk&usqp=CAU");
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfilePicture, setTempProfilePicture] = useState(profilePicture);

  const handleProfileChange = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfilePicture(tempProfilePicture);
    setIsEditing(false);
    const updatedUserData = { ...userData, profilePicture: tempProfilePicture };
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
  };

  const handleCancel = () => {
    setTempProfilePicture(profilePicture); // Revert changes
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          padding: 4,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            boxShadow: 3,
            borderRadius: 2,
            paddingTop: 4,
            paddingBottom: 4,
            width: "100%",
          }}
        >
          <Avatar
            src={profilePicture}
            alt="Profile Picture"
            sx={{
              width: 150,
              height: 150,
              marginBottom: 2,
            }}
          />
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            {userData.username}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            {userData.name}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3, color: "gray" }}>
            {userData.email}
          </Typography>

          {isEditing ? (
            <>
              <TextField
                label="Profile Picture URL"
                variant="outlined"
                fullWidth
                value={tempProfilePicture}
                onChange={(e) => setTempProfilePicture(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleProfileChange}>
              Change Profile Picture
            </Button>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Profile;
