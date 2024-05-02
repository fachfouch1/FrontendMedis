import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userStored = localStorage.getItem("userData");
    if (userStored) {
      const userData = JSON.parse(userStored);
      if(!userData.status) {
        navigate("/profile");
      }
    }
  }, []);

  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}

export default UsersPage;