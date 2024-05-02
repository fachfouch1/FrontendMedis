import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../services/types";

const UsersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userStored = localStorage.getItem("userData");
    if (userStored) {
      const userData = JSON.parse(userStored);
      if(!userData.status || userData.role !== ROLE.Admin) {
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