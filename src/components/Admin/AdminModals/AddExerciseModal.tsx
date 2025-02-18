import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// import muscleGroupsData from "../../../../assets/data/muscleGroups.json";
// import equipmentData from "../../../assets/data/equipmentList.json";
// import addDataToFirestore from "../../../utils/add-collection";
import { GenericDataModel } from "../../../types/interfaces";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { v4 as uuidv4 } from "uuid";
import addDataToFirestore from "../../../utils/add-collection";
import toggleLoading from "../../../utils/toggle-loading";
// import addDataToFirestore from "../../../utils/add-collection";

interface AddExerciseModalProps {
  show: boolean;
  onHide: () => void;
  muscleGroupData: GenericDataModel[];
  equipmentData: GenericDataModel[];
  triggerFetch: () => void;  
}

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({
  show,
  onHide,
  muscleGroupData,
  equipmentData,
  triggerFetch
}) => {
  const collectionName = "exercises";
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [equipment, setEquipment] = useState("");

  const AddData = async () => {
    try {
      if (name.trim() && name.trim().length < 30) {
        toggleLoading('.modal-content', true);
        const collectionData = collection(db, collectionName);
        const q = query(collectionData, where("name", "==", name));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          console.log(
            `${collectionName} with the name "${name}" already exists!`
          );
          return;
        }
        const exerciseId = uuidv4();
        const newData = {
          name: name.trim(),
          active: true,
          exerciseId: exerciseId,
          muscleGroups: [muscleGroup],
          variations: [],
          equipment: [equipment],
        };
        await addDataToFirestore(collectionName, [newData]);
         
        toggleLoading('.modal-content', false);
        setName("");
        setMuscleGroup("");
        setEquipment("");
        triggerFetch();
        onHide();
      }
    } catch (error) {
      console.error("Error in adding muscle groups", error);
      toggleLoading('.modal-content', false);
    }
  };
 
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Exercise</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exerciseForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exerciseForm.muscleGroup">
            <Form.Label>Muscle Group</Form.Label>
            <Form.Select
              aria-label="Select muscle group"
              onChange={(event) => setMuscleGroup(event.target.value)}
            >
              <option>Select</option>
              {muscleGroupData.map(
                (
                  group // Map over the loaded data
                ) => (
                  <option key={group.id} value={group.name}>
                    {group.name}
                  </option>
                )
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exerciseForm.equipment">
            <Form.Label>Equipment</Form.Label>
            <Form.Select
              aria-label="Select equipment"
              onChange={(event) => setEquipment(event.target.value)}
            >
              <option>Select</option>
              {equipmentData.map(
                (
                  group // Map over the loaded data
                ) => (
                  <option key={group.id} value={group.name}>
                    {group.name}
                  </option>
                )
              )}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={AddData}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExerciseModal;
