import styles from "../Data/data-page.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAccount, ROLE } from "../../services/types";
import { getAllUsers, usersData } from "../../services/utils";

enum Status {
  Active = "Active",
  Inactive = "Inactive",
}

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IAccount[]>( []/* usersData */);
  const [searchableUsers, setSearchableUsers] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

    useEffect(() => {
    const userStored = localStorage.getItem("userData");
    if (userStored) {
      const userData = JSON.parse(userStored);
      if (!userData.status || userData.role !== ROLE.Admin) {
        navigate("/profile");
      }
    }
  }, []);

  useEffect(() => {
    const getMolecules = async () => {
      setLoading(true);
      const response = await getAllUsers();
      if (response?.status === 200) {
        setUsers(response.data);
        setSearchableUsers(response.data);
      }
      setLoading(false);
    };

    getMolecules();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filteredMolecules = searchableUsers.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchableUsers(filteredMolecules);
  };

  const handleDelete = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setSearchableUsers(updatedUsers);
  }

  const handleRoleChange = (id:number, newRole : string ) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSearchableUsers(updatedUsers);
    // Here you could also send update to backend
  };

  const handleStatusChange = (id:number, ChosenStatus : string ) => {
    const newStatus = ChosenStatus === Status.Active;
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSearchableUsers(updatedUsers);
    // Here you could also send update to backend
  };

    if (loading)
    return (
      <div className={styles.no_data}>
        <span className="loader" />{" "}
      </div>
    );

  return (
    <div className={styles.tableContainer}>
      <p>{error}</p>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search by Molecule or User Name"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        style={{ margin: "20px 0" }}
      />
      {users?.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id!, e.target.value)}
                  >
                    <option value={ROLE.Admin}>Admin</option>
                    <option value={ROLE.MedicalDepartment}>Medical Department</option>
                  </select>
                </td>
                <td>
                  <select
                    value={user.status! ? Status.Active : Status.Inactive}
                    onChange={(e) => handleStatusChange(user.id!, e.target.value)}
                  >
                    <option value={Status.Active}>Active</option>
                    <option value={Status.Inactive}>Inactive</option>
                  </select>
                </td>
                <td>
                  <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                    <div className={styles.delete_icon} onClick={() => handleDelete(user.id!)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.no_data}>No data found</div>
      )}
    </div>
  );
};

export default UsersPage;
