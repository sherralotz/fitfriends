import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import muscleGroupsData from "../../../assets/data/muscleGroups.json";   
import addDataToFirestore from "../../../utils/add-collection";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import toggleLoading from "../../../utils/toggle-loading";

interface AddMuscleGroupModalProps {
  show: boolean;
  onHide: () => void; 
  triggerFetch: () => void;  
} 

const AddMuscleGroupModal: React.FC<AddMuscleGroupModalProps> = ({
  show,
  onHide,
  triggerFetch 
}) => {
  const [name, setName] = useState('');

  const AddData = async () => {
    try {  
      if (name.trim() && name.trim().length < 30){
        toggleLoading('.modal-content', true);
        const collectionData = collection(db, "muscleGroups");
        const q = query(collectionData, where("name", "==", name)); 
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) { 
          console.log(`Muscle group with the name "${name}" already exists!`);
          return; 
        }

        await addDataToFirestore("muscleGroups", [{ name: name.trim(), active: true }]);   
       
        toggleLoading('.modal-content', false);
        setName("");
        triggerFetch();
        onHide();
      }
    } catch (error) {
      console.error("Error in adding muscle groups", error);
      toggleLoading('.modal-content', false);
    }
  };   
  
  const AddJSONData = async () => {
    try {
      const newData = muscleGroupsData.map(muscleGroup => ({ name: muscleGroup, active: true }));   
      await addDataToFirestore("muscleGroups", newData);  
    } catch (error) {
      console.error("Error in adding muscle groups", error);
    }
  }; 

  return ( 
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Muscle Group</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exerciseForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"      
            value={name} 
            onChange={(event) => setName(event.target.value)}/>
          </Form.Group> 
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success"  onClick={AddJSONData} hidden>
          Add Batch
        </Button>
        <Button variant="primary"  onClick={AddData}>
          Add 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMuscleGroupModal;
