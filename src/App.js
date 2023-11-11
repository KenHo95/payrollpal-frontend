import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import ApprovePage from "./Pages/ApprovePage";
import NavBar from "./Components/NavBar";

function App() {
  const [userPermission, setUserPermission] = useState(null);
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    // set user permission based on auth0 permission
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_API_AUDIENCE,
            scope: "profile email",
          },
        });
        // decode access token to get user permission
        var decoded = jwt_decode(accessToken);

        // set user permission
        switch (decoded.permissions[0]) {
          case "write:contract":
            setUserPermission("Admin");
            break;
          case "write:approve-contract":
            setUserPermission("Content Manager");
            break;
          default:
            setUserPermission("Creator");
        }
      } catch (e) {
        console.log(e.message);
      }
    };

    user && getToken();

    return;
  }, [getAccessTokenSilently, user?.sub]);

  // popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const contractStatuses = [
    <p>
      <strong>
        <em>Payroll Admin</em>
      </strong>
      <br />
      Actions: Create contract/ creator
      <br />
      Email: payrolladmin@gmail.com
      <br />
      Password: bavdu5-naskUb-funwok
    </p>,
    <p>
      <strong>
        <em>Content Manager</em>
      </strong>
      <br />
      Actions: View Insights, Preview creator post, Approve contract, Simulate
      batch payment
      <br />
      Email: content_manager@gmail.com
      <br />
      Password: Jezwig-potqah-takno1
    </p>,
    <p>
      <strong>
        <em>Content Creator</em>
      </strong>
      <br />
      Actions: Upload Tiktok post link, Download Payslip
      <br />
      Email: yk@gmail.com
      <br />
      Password: tUtpys-nencub-zevfy6
    </p>,
  ];

  const popover = (
    <div>
      <br />
      <Button variant="contained" onClick={handlePopoverOpen}>
        Demo Credentials
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
      >
        <ol>
          {contractStatuses.map((status, ind) => (
            <Typography key={ind} sx={{ p: 1 }}>
              <li>{status}</li>
            </Typography>
          ))}
        </ol>
      </Popover>
    </div>
  );

  return (
    <div
      className={`App ${
        isAuthenticated ? "after-auth-background" : "before-auth-background"
      }`}
    >
      {isAuthenticated && (
        <NavBar user={user} userPermission={userPermission} />
      )}
      <header>
        {!isAuthenticated && (
          <div className="logo-container">
            <h1>💼</h1>
            <h2>PayrollPal</h2>
            <p>
              {" "}
              Empowering HR and Content Creators to Seamlessly Manage Payrolls
              and Projects, All in One Place. Log in to try our app now!
            </p>
            <br />
            <Button
              variant="outlined"
              onClick={() => loginWithRedirect()}
              startIcon={<LoginRoundedIcon />}
              size="large"
            >
              {isLoading ? "Loading ..." : "Log In"}
            </Button>
            {popover}
          </div>
        )}
        <br />

        {isAuthenticated && (
          <Routes>
            <Route
              path="/"
              element={<HomePage userPermission={userPermission} />}
            />
            <Route path="/create" element={<CreatePage />} />
            <Route
              path="/approve"
              element={<ApprovePage userPermission={userPermission} />}
            />
          </Routes>
        )}
      </header>
    </div>
  );
}

export default App;
