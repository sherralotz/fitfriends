import React, { useEffect, useState } from "react";
import GetDataFromFirestore from "../../../utils/get-collection";
import { filterData, sortData } from "../../../utils/data-utils";
import "../../../pages/AdminManage/AdminManage.css"; 
import { BasicDataModel } from "../../../types/interfaces";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
interface AdminExercisesProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    onMuscleGroupData: (muscleGroups: BasicDataModel[]) => void;
    setFetchData: (fetchFn: () => void) => void;
}
 
const AdminMuscleGroups: React.FC<AdminExercisesProps> = ({setLoading, onMuscleGroupData, setFetchData }) => {
    const [muscleGroups, setMuscleGroups] = useState<BasicDataModel[]>([]);
    const [sortFieldMuscleGroups, setSortFieldMuscleGroups] = useState<keyof BasicDataModel | null>(null);
    const [sortOrderMuscleGroups, setSortOrderMuscleGroups] = useState<"asc" | "desc">("asc");
    const [searchMuscleGroup, setSearchMuscleGroup] = useState("");
    const [filteredMuscleGroups, setFilteredMuscleGroups] = useState<BasicDataModel[]>([]);

    const tableHeaders: { key: keyof BasicDataModel; label: string }[] = [
        { key: "name", label: "Name" },
        { key: "active", label: "Status" }
      ];

    const handleSortMuscleGroups = (field: keyof BasicDataModel) => {
        if (sortFieldMuscleGroups === field) {
            setSortOrderMuscleGroups(
            sortOrderMuscleGroups === "asc" ? "desc" : "asc"
            );
        } else {
            setSortFieldMuscleGroups(field);
            setSortOrderMuscleGroups("asc");
        }
    };

    const fetchData = async () => { 
        try {
            const data = await GetDataFromFirestore<BasicDataModel>("muscleGroups");
            setMuscleGroups(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching muscle groups:", error);
            setLoading(false);
        }
    };

    useEffect(() => {   
        const fetchDataAndSort = async () => {
            setLoading(true);
            try {
                const data = await GetDataFromFirestore<BasicDataModel>("muscleGroups");
              const sortedData = sortData(data, "name", "asc");  
              setMuscleGroups(sortedData);
              onMuscleGroupData(sortedData);
            } catch (error) {
              console.error("Error fetching exercises:", error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchDataAndSort();
          setFetchData(fetchData);
          
      }, [onMuscleGroupData, setLoading]);  
 
     useEffect(()=>{ 
        const sortedMuscleGroups = sortData(
            muscleGroups,
            sortFieldMuscleGroups,
            sortOrderMuscleGroups
          );
          const searchTermsMuscleGroups = searchMuscleGroup.split(" ");
          const searchFieldsMuscleGroups: (keyof BasicDataModel)[] = ["name"];
          const filteredMuscleGroups = filterData(
            sortedMuscleGroups,
            searchTermsMuscleGroups,
            searchFieldsMuscleGroups
          );
          setFilteredMuscleGroups(filteredMuscleGroups);
     }, [ muscleGroups,sortFieldMuscleGroups,sortOrderMuscleGroups,searchMuscleGroup]);
 

     const toggleActiveSwitch = async (id: string, currentActive: boolean) => {
      setLoading(true);
      try {
        const dataRef = doc(db, "muscleGroups", id);  
        await updateDoc(dataRef, { active: !currentActive }); 
  
        fetchData();
      } catch (error) {
        console.error("Error updating muscle group:", error);
      } finally {
        setLoading(false);
      }
    };


    return (
        <div> 
             <div className="mt-3 d-flex">
              <input
                type="text"
                placeholder="Search muscle group..."
                className="p-2 border rounded w-full mb-4"
                value={searchMuscleGroup}
                onChange={(e) => setSearchMuscleGroup(e.target.value)}
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
                        onClick={() => handleSortMuscleGroups(key)}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredMuscleGroups.map((muscleGroup) => (
                    <tr key={muscleGroup.id}>
                      <td className="py-2 px-4">{muscleGroup.name}</td>
                    
                      <td className="py-2 px-4">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`switch-${muscleGroup.id}`}
                            checked={muscleGroup.active}
                            onChange={() =>
                              toggleActiveSwitch(
                                muscleGroup.id,
                                muscleGroup.active
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`switch-${muscleGroup.id}`}
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

export default AdminMuscleGroups;