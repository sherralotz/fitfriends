import React, { useCallback, useEffect, useRef, useState } from "react"; 
import AdminExercises from "../../components/Admin/AdminTabs/AdminExercises";
import AdminMuscleGroups from "../../components/Admin/AdminTabs/AdminMuscleGroups";
import { Tabs, Tab } from 'react-bootstrap';  
import AddExerciseModal from "../../components/Admin/AdminModals/AddExerciseModal";
import AdminEquipment from "../../components/Admin/AdminTabs/AdminEquipment";
import { BasicDataModel} from "../../types/interfaces";
import "./AdminManage.css";
import AddMuscleGroupModal from "../../components/Admin/AdminModals/AddMuscleGroupModal";
import AddEqupipmentModal from "../../components/Admin/AdminModals/AddEquipmentModal";
import toggleLoading from "../../utils/toggle-loading";
import packageJson from '../../../package.json';

const AdminManage: React.FC = () => {
  const [loading, setLoading] = useState(true);  
  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] = useState(false);
  const [isAddMuscleGroupModalVisible, setIsAddMuscleGroupModalVisible] = useState(false);
  const [isIsAddEquipmentModalVisible, setIsAddEquipmentModalVisible] = useState(false);
  const [muscleGroupsData, setMuscleGroupsData] = useState<BasicDataModel[]>([]);
  const [equipmentData, setEquipmentData] = useState<BasicDataModel[]>([]);
  const [activeTab, setActiveTab] = useState('exercises'); 
 
  const fetchExercisesDataRef = useRef<(() => void) | null>(null);
  const fetchMuscleGroupDataRef = useRef<(() => void) | null>(null);
  const fetchEquipmentDataRef = useRef<(() => void) | null>(null);

  useEffect(() => {   
    setLoading(true);
  }, []);  

  useEffect(() => {   
    console.log('loading', loading)
    toggleLoading('.admin-container', loading);
  }, [loading]);   

  const handleTabSelect = (key: string | null) => { 
    setActiveTab(key as string); 
  };
  
  const handleMuscleGroupData = useCallback((muscleGroups: BasicDataModel[]) => {
    const muscleGroupData = muscleGroups.filter(d=> d.active); 
    setMuscleGroupsData(muscleGroupData); 
  }, []);

  const handleEquipmentData = useCallback((equipment: BasicDataModel[]) => {
    const equipmentData = equipment.filter(d=> d.active);
    setEquipmentData(equipmentData); 
  }, []);   


  const handleAddExerciseModal= () => {
    setIsAddExerciseModalVisible(true); 
  }

  return (
    <>
      <div className="admin-container">  
        <div className="d-flex">
          <small className="ms-auto">v{packageJson.version}</small>
        </div>
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} id="admin-tabs">
          <Tab eventKey="exercises" title="Exercises">  
            <AddExerciseModal  
              muscleGroupData={muscleGroupsData}
              equipmentData={equipmentData}
              show={isAddExerciseModalVisible} 
              onHide={() => setIsAddExerciseModalVisible(false)}
              triggerFetch={() => fetchExercisesDataRef.current?.()}
            />
            <div className="modal-actions-container">
              <button className="btn btn-primary float-end" onClick={handleAddExerciseModal}>
              Add
              </button>  
            </div> 
            <AdminExercises setLoading={setLoading}  
            setFetchData={(fetchFn) => ( fetchExercisesDataRef.current = fetchFn)}
            />
          </Tab>
          <Tab eventKey="muscle-groups" title="Muscle Groups"> 
            <AddMuscleGroupModal 
            show={isAddMuscleGroupModalVisible} 
            onHide={() => setIsAddMuscleGroupModalVisible(false)}
            triggerFetch={() => fetchMuscleGroupDataRef.current?.()}
            />
            <div className="modal-actions-container">
              <button className="btn btn-primary float-end" onClick={()=> setIsAddMuscleGroupModalVisible(true)}>
              Add
              </button>  
            </div> 

            <AdminMuscleGroups 
            setLoading={setLoading} 
            onMuscleGroupData={handleMuscleGroupData} 
            setFetchData={(fetchFn) => ( fetchMuscleGroupDataRef.current = fetchFn)}
            />
          </Tab>
          <Tab eventKey="equipment" title="Equipment"> 
            <AddEqupipmentModal 
            show={isIsAddEquipmentModalVisible} 
            onHide={() => setIsAddEquipmentModalVisible(false)}
            triggerFetch={() => fetchEquipmentDataRef.current?.()}
            />

            <div className="modal-actions-container">
              <button className="btn btn-primary float-end" onClick={()=> setIsAddEquipmentModalVisible(true)}>
              Add
              </button>  
            </div> 
            <AdminEquipment 
            setLoading={setLoading} 
            onEquipmentData={handleEquipmentData} 
            setFetchData={(fetchFn) => ( fetchEquipmentDataRef.current = fetchFn)}
            />
          </Tab>
        </Tabs>
        
      </div>
    </>
  );
};

export default AdminManage;
