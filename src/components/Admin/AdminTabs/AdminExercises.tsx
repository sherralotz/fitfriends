import React, { useEffect, useState } from "react";
import GetDataFromFirestore from "../../../utils/get-collection";
import { filterData, sortData } from "../../../utils/data-utils";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import "../../../pages/AdminManage/AdminManage.css";
import { ExerciseModel } from "../../../types/interfaces";

interface AdminExercisesProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>; 
    setFetchData: (fetchFn: () => void) => void;
}
 
const AdminExercises: React.FC<AdminExercisesProps> = ({setLoading,  setFetchData }) => {
    const [exercises, setExercises] = useState<ExerciseModel[]>([]);
    const [sortFieldExercises, setSortFieldExercises] = useState<keyof ExerciseModel | null>(null);
    const [sortOrderExercises, setSortOrderExercises] = useState<"asc" | "desc">("asc");
    const [searchExercise, setSearchExercise] = useState("");
    const [filteredExercises, setFilteredExercises] = useState<ExerciseModel[]>([]);

    const tableHeaders: { key: keyof ExerciseModel; label: string }[] = [
      { key: "name", label: "Name" },
      { key: "muscleGroups", label: "Muscle Group" },
      { key: "equipment", label: "Equipment" },
      { key: "active", label: "Status" },
    ];
    
    const handleSortExercises = (field: keyof ExerciseModel) => {
      if (sortFieldExercises === field) {
        setSortOrderExercises(sortOrderExercises === "asc" ? "desc" : "asc");
      } else {
        setSortFieldExercises(field);
        setSortOrderExercises("asc");
      }
    };

    const fetchData = async () => { 
        try {
          const data = await GetDataFromFirestore<ExerciseModel>("exercises");
          setExercises(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching exercises:", error);
          setLoading(false);
        }
      };

      const toggleActiveSwitch = async (id: string, currentActive: boolean) => {
        setLoading(true);
        try {
          const exerciseRef = doc(db, "exercises", id); // Reference to the Firestore document
          await updateDoc(exerciseRef, { active: !currentActive }); // Update 'active' field in Firestore
    
          fetchData();
        } catch (error) {
          console.error("Error updating exercise:", error);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
      const fetchDataAndSort = async () => {
        setLoading(true);
        try {
          const data = await GetDataFromFirestore<ExerciseModel>("exercises");
          const sortedData = sortData(data, "name", "asc");  
          setExercises(sortedData); 
        } catch (error) {
          console.error("Error fetching exercises:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDataAndSort();
      setFetchData(fetchData);
    }, []);  

    useEffect(()=>{
      if (exercises.length > 0) {
        const sortedExercises = sortData(exercises,sortFieldExercises,sortOrderExercises);
        const searchTermsExercises = searchExercise.split(" ");
        const searchFieldsExercises: (keyof ExerciseModel)[] = [
          "name",
          "muscleGroups",
          "equipment",
          "variations",
        ];
        const filteredExercises = filterData(sortedExercises,searchTermsExercises,searchFieldsExercises);
        setFilteredExercises(filteredExercises);
      }
    }, [exercises,sortFieldExercises,sortOrderExercises,searchExercise]);
  
    return (
        <div> 
             {/* Search Exercise */}
             <div className="mt-3 d-flex">
              <input
                type="text"
                placeholder="Search exercises..."
                className="p-2 border rounded w-full mb-4"
                value={searchExercise}
                onChange={(e) => setSearchExercise(e.target.value)}
              />
             
            </div>

            <div className="table-container">
              <table className="styled-table">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    {tableHeaders.map(({ key, label }) => (
                      <th
                        key={key}
                        className="sticky-header cursor-pointer"
                        onClick={() => handleSortExercises(key)}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredExercises.map((exercise) => (
                    <tr key={exercise.exerciseId} className="border-t">
                      <td className="py-2 px-4">{exercise.name}</td>
                      <td className="py-2 px-4">
                        {exercise.muscleGroups.join(", ")}
                      </td>

                      <td className="py-2 px-4">
                        {exercise.equipment.join(", ")}
                      </td>

                      <td className="py-2 px-4">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`switch-${exercise.exerciseId}`}
                            checked={exercise.active}
                            onChange={() =>
                              toggleActiveSwitch(
                                exercise.exerciseId,
                                exercise.active
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`switch-${exercise.exerciseId}`}
                          ></label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    );
};

export default AdminExercises;