import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import LocationServices from "services/location.services";
import DataContext from "store/data/DataContext";
import UIContext from "store/ui/UiContext";
import classes from "./Styles.module.css";

const locationServices = new LocationServices();

function Locations() {
  const [location, setLocation] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const { setSpinner } = useContext(UIContext);
  const { getAllLocations, allAvailableLocations, setAllAvailableLocation } = useContext(DataContext);

  const handleAddLocationClick = async () => {
    setIsUpdate(false);
    try {
      setSpinner(true);
      const res =  await locationServices.addLocation({name: location});
      if (res?.status === 'success') {
        getAllLocations();
        toast.success('Location Added To Database')
      }
      setSpinner(false);
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    }finally{
      setLocation('');
      setSpinner(false);
    }
  }

  const handleUpdateLocationClick = async () => {
    try {
      setSpinner(true);
      const res =  await locationServices.updateLocation(updateId, {name: location});
      if (res?.status === 'success') {
        getAllLocations();
        toast.success('Location Updated')
      }
      setSpinner(false);
    } catch (error) {
      toast.warn(error?.response?.data?.message);
    }finally{
      setSpinner(false);
      setLocation('');
      setIsUpdate(false);
    }
  }

  const handleDeleteClick = async(id) => {
    try {
      setSpinner(true);
      const res = await locationServices.deleteLocation(id);
      if (res?.status === 'success') {
        const updatedLocations = allAvailableLocations.filter(location => location?._id !== id);
        setAllAvailableLocation(updatedLocations);
        toast.success(res?.message);
      }
      setSpinner(false);
    } catch (error) {
      toast.warn(error?.response?.data?.message);
      setSpinner(false);
    }
  }

  const handleUpdateClick = async(id, name) => {
    setIsUpdate(true);
    setLocation(name);
    setUpdateId(id);
    const updatedLocations = allAvailableLocations.filter(location => location?._id !== id);
    setAllAvailableLocation(updatedLocations);
  }

  return (
    <div className={`container ${classes['location-container']}`}>
      <Form.Group controlId="formProductName">
        <Form.Label>Location Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Location name"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        {
         !isUpdate ?
        <Button onClick={handleAddLocationClick} className="my-3" variant="success" type="submit"> Add Location </Button> :
        <Button onClick={handleUpdateLocationClick} className="my-3" variant="success" type="submit"> Update Location </Button>
        }
      </Form.Group>
      <h5>Locations</h5>
      {
        allAvailableLocations?.length ?
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Location</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {
            [...allAvailableLocations].reverse()?.map((location, i) => (
                <tr key={location?._id}>
                   <td>{i+1}</td>
                   <td>{location?.name}</td>
                   <td>
                      <>
                      <Button size="sm" variant="outline-primary" onClick={() => handleUpdateClick(location?._id, location?.name)} className="mx-2">Update</Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleDeleteClick(location?._id)}>Delete</Button>
                      </>
                   </td>
              </tr>
              ))
            }
          </tbody>
      </Table> : null
      }
          {!allAvailableLocations?.length && <h5>No Location Available, Please Add new one.</h5>}
    </div>
  );
}

export default Locations;
