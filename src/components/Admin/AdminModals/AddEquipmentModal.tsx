import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { db } from "../../../config/firebase-config";
import addDataToFirestore from "../../../utils/add-collection";
import dataFromJson from "../../../assets/data/equipmentList.json";
import toggleLoading from "../../../utils/toggle-loading";

interface AddEqupipmentModalProps {
    show: boolean;
    onHide: () => void; 
    triggerFetch: () => void;  
  } 
   
  const AddEqupipmentModal: React.FC<AddEqupipmentModalProps> = ({
    show,
    onHide,
    triggerFetch 
  }) => { 
    const [name, setName] = useState('');
    
  const AddData = async () => {
    try {
      if (name.trim() && name.trim().length < 30){
        toggleLoading('.modal-content', true);
        const collectionData = collection(db, "equipment");
        const q = query(collectionData, where("name", "==", name)); 
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) { 
          console.log(`Equipment with the name "${name}" already exists!`);
          return; 
        }
  
        await addDataToFirestore("equipment", [{ name: name.trim(), active: true }]);   
         
        toggleLoading('.modal-content', false);
        setName("");
        triggerFetch();
        onHide(); 
      }
    } catch (error) {
      console.error("Error in adding equipment", error);
      toggleLoading('.modal-content', false);
    }
  };   
  
  const AddJSONData = async () => {
    try {
      const newData = dataFromJson.map(dataItem => ({ name: dataItem, active: true }));   
      await addDataToFirestore("equipment", newData);  
    } catch (error) {
      console.error("Error in adding equipment", error);
    }
  }; 
      
    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Equipment</Modal.Title>
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

export default AddEqupipmentModal;