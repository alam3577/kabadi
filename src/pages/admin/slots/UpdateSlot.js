import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SlotServices from "services/slot.services";
import DataContext from "store/data/DataContext";
import UIContext from "store/ui/UiContext";
import { availableTime } from "utils/data";

const slotServices = new SlotServices();

function UpdateSlot() {
  const { setSpinner } = useContext(UIContext);
  const { getAllSlots, singleSlotData } = useContext(DataContext);
  console.log({singleSlotData});

  const [slotFormData, setSlotFormData] = useState({
    startTime: singleSlotData?.startTime,
    endTime: singleSlotData?.endTime,
    startTimeMeridiem: singleSlotData?.startTimeMeridiem,
    endTimeMeridiem: singleSlotData?.endTimeMeridiem,
  });

  const { startTime, endTime, startTimeMeridiem, endTimeMeridiem } =
    slotFormData;
  const navigate = useNavigate();

  const handleOnchange = (name) => (e) => {
    setSlotFormData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
  };

  const handleSlotSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime || !startTimeMeridiem || !endTimeMeridiem) {
      return toast.warn("Some Fields are missing");
    }
    try {
      setSpinner(true);
      const data = await slotServices.updateSlot(singleSlotData?._id, slotFormData);
      if (data?.status === "success") {
        toast.success("Slot Updated to the Database");
        getAllSlots();
        navigate('/admin/slot')
      }
      setSpinner(false);
    } catch (error) {
      console.log({ error });
    } finally {
      setSlotFormData({});
      setSpinner(false);
    }
  };

  const handleBackToSlotBtnClick = () => {
    setSlotFormData({});
    navigate("/admin/slot");
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="d-flex flex-row-reverse me-4 mb-3">
        <button className="btn btn-primary" onClick={handleBackToSlotBtnClick}>
          Back To Slot
        </button>
      </div>
      <Form className="container" onSubmit={handleSlotSubmit}>
        <Form.Group controlId="formBasicTimeStartSelect">
          <Form.Label>Select Time Ends At</Form.Label>
          <Form.Select
            value={startTime}
            onChange={handleOnchange("startTime")}
            aria-label="Select Time Ends At"
          >
            <option>Open this select menu</option>
            {availableTime?.map((time) => (
              <option key={time?.id} value={time?.time}>
                {time?.time}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formBasicTimeStartSelectMeridian">
          <Form.Label>Select Time Start Meridian</Form.Label>
          <Form.Select
            value={startTimeMeridiem}
            onChange={handleOnchange("startTimeMeridiem")}
            aria-label="Select Meridian"
          >
            <option>Open this select menu</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formBasicTimeEndSelect">
          <Form.Label>Select Time Ends At</Form.Label>
          <Form.Select
            value={endTime}
            onChange={handleOnchange("endTime")}
            aria-label="Select Time Ends At"
          >
            <option>Open this select menu</option>
            {availableTime?.map((time) => (
              <option key={`time?.id-${time?.id}`} value={time?.time}>
                {time?.time}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTimeEndSelectMeridian">
          <Form.Label>Select Time End Meridian</Form.Label>
          <Form.Select
            value={endTimeMeridiem}
            onChange={handleOnchange("endTimeMeridiem")}
            aria-label="Select Meridian"
          >
            <option>Open this select menu</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </Form.Select>
        </Form.Group>
        <Button variant="success" type="submit">
          Add Slot
        </Button>
      </Form>
    </div>
  );
}

export default UpdateSlot;
