import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ExerciseModel } from "../../types/interfaces";
import GetDataFromFirestore from "../../utils/get-collection";
import toggleLoading from "../../utils/toggle-loading";

interface SelectWorkoutModalProps {
  show: boolean;
  onHide: () => void;
}

const SelectWorkoutModal: React.FC<SelectWorkoutModalProps> = ({
  show,
  onHide,
}) => {
    const [exercises, setExercises] = useState<ExerciseModel[]>([]); 
    const [searchTerm, setSearchTerm] = useState('');
     
    useEffect(() => {
        fetchData();
    },[]);

    const groupExercisesByLetter = () => {
        const sortedExercises = [...exercises].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
    
        const groupedExercises: { [key: string]: ExerciseModel[] } = {};
        sortedExercises.forEach((exercise) => {
          const firstLetter = exercise.name.charAt(0).toUpperCase();
          if (!groupedExercises[firstLetter]) {
            groupedExercises[firstLetter] = [];
          }
          groupedExercises[firstLetter].push(exercise);
        });
    
        return groupedExercises;
      };

    // const groupExercisesByMuscle = () => {
    //     const sortedExercises = [...exercises].sort((a, b) =>
    //       a.name.localeCompare(b.name)
    //     );
    
    //     const groupedExercises: { [key: string]: ExerciseModel[] } = {};
    //     sortedExercises.forEach((exercise) => {
    //       const firstLetter = exercise.name.charAt(0).toUpperCase();
    //       if (!groupedExercises[firstLetter]) {
    //         groupedExercises[firstLetter] = [];
    //       }
    //       groupedExercises[firstLetter].push(exercise);
    //     });
    
    //     return groupedExercises;
    //   };
    
    
      const renderExerciseList = () => {
        const grouped = groupExercisesByLetter();
        console.log('grouped',grouped)
        return Object.keys(grouped).map((letter) => (
          <div key={letter}>
            <h2>{letter}</h2> {/* Letter as a header */}
            <ul>
              {grouped[letter].map((exercise) => (
                <li key={exercise.exerciseId}>{exercise.name}</li>
              ))}
            </ul>
          </div>
        ));
      };

      const groupExercisesByMuscleGroup = (exercises: ExerciseModel[]): { [key: string]: ExerciseModel[] } => {
        const groupedExercises: { [key: string]: ExerciseModel[] } = {};
    
        exercises.forEach((exercise) => {
          exercise.muscleGroups.forEach((muscleGroup: string) => {
            if (!groupedExercises[muscleGroup]) {
              groupedExercises[muscleGroup] = [];
            }
            groupedExercises[muscleGroup].push(exercise);
          });
        });
        for (const muscleGroup in groupedExercises) {
            groupedExercises[muscleGroup].sort((a, b) => a.name.localeCompare(b.name));
          }
    
        return groupedExercises;
      };
    
      const renderGroupedExercises = () => {
        const grouped = groupExercisesByMuscleGroup(exercises);
    
        return Object.keys(grouped).map((muscleGroup) => (
          <div key={muscleGroup}>
            <h2>{muscleGroup}</h2>
            <ul>
              {grouped[muscleGroup].map((exercise) => (
                <li key={exercise.exerciseId}>{exercise.name}</li>
              ))}
            </ul>
          </div>
        ));
      };
    



    const fetchData = async () => { 
        toggleLoading('.modal-content', true); 
        try {
          const data = await GetDataFromFirestore<ExerciseModel>("exercises");
          setExercises(data);
          
          toggleLoading('.modal-content', false);
        } catch (error) {
          console.error("Error fetching exercises:", error);
          toggleLoading('.modal-content', false);
        }
      };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Body>
          <div>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  All
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Muscle Group
                </button>
              </li> 
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                {exercises.length > 0 && (
                    <div className="modal-tab-body">
                         {renderExerciseList()}
                    </div>
                   
                )} 
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                {exercises.length > 0 && (
                    <div className="modal-tab-body">
                         {renderGroupedExercises()}
                    </div>
                   
                )} 
              </div> 
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SelectWorkoutModal;
