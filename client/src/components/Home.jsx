import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logValue } from "../api";
import { logout } from "../../../server/utils/authUtils";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [value, setValue] = useState(0);

  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value - 1);
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to the login page after logging out
  };
  const handleLog = async () => {
    try {
      await logValue({ email, value });
      console.log("Value logged successfully");
    } catch (error) {
      console.error("Error logging value:", error);
    }
  };

  const goToPerformance = () => {
    navigate("/performance", { state: { email } });
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {email && <p>Email: {email}</p>}
      <p>Value: {value}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={handleLog}>Log</button>
      <button onClick={goToPerformance}>Performance</button>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
