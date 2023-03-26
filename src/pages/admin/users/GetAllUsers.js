import { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import AuthService from "services/auth.services";
import UIContext from "store/ui/UiContext";

const authServices = new AuthService();

function GetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const { setSpinner } = useContext(UIContext);

  const getAllUsers = async () => {
    setSpinner(true);
    try {
      const res = await authServices.getAllUsers();
      if (res?.status === "success") {
        setAllUsers(res?.users);
      }
      console.log({ res });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setSpinner(false);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div style={{ marginTop: "4.5rem" }} className="container">
      {allUsers?.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user, i) => (
              <tr key={user?._id}>
                <td>{i + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="fs-3">No Users Found</p>
      )}
    </div>
  );
}

export default GetAllUsers;
