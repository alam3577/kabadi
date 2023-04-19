import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SlotServices from "services/slot.services";
import DataContext from "store/data/DataContext";
import UIContext from "store/ui/UiContext";

const slotServices = new SlotServices();

function Slots() {
  const { allAvailableSlots, setAllAvailableSlots, setSingleSlotData } = useContext(DataContext);
  const { setSpinner } = useContext(UIContext);
  const navigate = useNavigate();

  const handleDeleteClick = async (id) => {
    try {
      setSpinner(true);
      const res = await slotServices.deleteSlot(id);
      if (res?.status === "success") {
        const updatedSlot = allAvailableSlots.filter(
          (slot) => slot?._id !== id
        );
        setAllAvailableSlots(updatedSlot);
        toast.success("Slot deleted from database");
      }
      setSpinner(false);
    } catch (error) {
      toast.warn(error?.response?.data?.message);
      setSpinner(false);
    }
  };

  const handleUpdateClick = async (id) => {
    try {
      setSpinner(true);
      const res = await slotServices.getSlot(id);
      if (res?.status === 'success') {
        setSingleSlotData(res?.data?.slot)
        navigate('/admin/update-slot');
      }
      setSpinner(false);
    } catch (error) {
      toast.warn(error?.response?.data?.message);
      setSpinner(false);
    }
  };

  const handleAddSlotBtnClick = () => {
    navigate("/admin/add-slot");
  };

  return (
    <div style={{ marginTop: "4.5rem", marginBottom: "5rem" }}>
      <div className="d-flex flex-row-reverse me-4 mb-3">
        <button className="btn btn-primary" onClick={handleAddSlotBtnClick}>
          Add Slot
        </button>
      </div>
      {allAvailableSlots?.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Time Starts At</th>
              <th>Time Ends At</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {[...allAvailableSlots]?.map((slot, i) => (
              <tr key={slot?._id}>
                <td>{i + 1}</td>
                <td>
                  {slot?.startTime + " "} {slot?.startTimeMeridiem}{" "}
                </td>
                <td>
                  {slot?.endTime + " "} {slot?.endTimeMeridiem}{" "}
                </td>
                <td className="d-flex">
                  <>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleUpdateClick(slot?._id)}
                      className="mx-2"
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDeleteClick(slot?._id)}
                    >
                      Delete
                    </Button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
      {!allAvailableSlots?.length && (
        <p className="d-flex justify-content-center align-item-center fs-5">No Slots Available, Please Add new one.</p>
      )}
    </div>
  );
}

export default Slots;
