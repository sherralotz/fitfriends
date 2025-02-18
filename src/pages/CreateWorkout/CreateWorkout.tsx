import moment from "moment";
import React, { useEffect, useState } from "react"; 
import { Button, Form } from "react-bootstrap";
import SelectWorkoutModal from "../../components/Modals/SelectWorkoutModal";

const CreateWorkout: React.FC = () => {
  const [title, setTitle] = useState(''); 
  const [isSelectWorkoutModalVisible, setIsSelectWorkoutModalVisible] = useState(false);
   
  useEffect(()=>{
    const formattedDate = moment().format('ddd, MMM DD');
    setTitle(`${formattedDate} Workout`);  
  },[]); 

  

  return (
    <div>
      <h5>Create Workout</h5>

      <Form className="mt-3">
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" 
          value={title} 
          onChange={(event) => setTitle(event.target.value)} />
      </Form.Group> 
      <Form.Group controlId="exampleForm.ControlInput2"> 
        <Button variant="primary" onClick={()=> setIsSelectWorkoutModalVisible(true) }>
            Add Workout
        </Button>
      </Form.Group> 
    </Form> 

    <SelectWorkoutModal  
    show={isSelectWorkoutModalVisible} 
    onHide={() => setIsSelectWorkoutModalVisible(false)}/>
    </div>
  );
};

export default CreateWorkout;
