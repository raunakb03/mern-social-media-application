import Home from "./pages/home/Home";
import { Person } from "@mui/icons-material";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/login" element= {<Login/>}/>
        <Route path="/register" element= {<Register/>}/>
        <Route path="/profile/:id" element= {<Profile/>}/>
      </Routes>
    </BrowserRouter>
    );
}

export default App;
