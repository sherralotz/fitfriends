import { useEffect, useState } from "react";
import GetDataFromFirestore from "../../../utils/get-collection";
import { filterData, sortData } from "../../../utils/data-utils";
import { BasicDataModel } from "../../../types/interfaces";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";

interface AdminEquipmentProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    onEquipmentData: (equipment: BasicDataModel[]) => void;
    setFetchData: (fetchFn: () => void) => void;
}

   
const AdminEquipment: React.FC<AdminEquipmentProps> = ({setLoading, onEquipmentData, setFetchData}) =>{
    const [equipment, setEquipment] = useState<BasicDataModel[]>([]);
    const [sortFieldEquipment, setSortFieldEquipment] = useState<keyof BasicDataModel | null>(null);
    const [sortOrderEquipment, setSortOrderEquipment] = useState<"asc" | "desc">("asc");
    const [searchEquipment, setSearchEquipment] = useState("");
    const [filteredEquipment, setFilteredEquipment] = useState<BasicDataModel[]>([]);
    const collectionName = "equipment";

    const tableHeaders: { key: keyof BasicDataModel; label: string }[] = [
        { key: "name", label: "Name" },
        { key: "active", label: "Active" }
      ];

    const handleSortEquipment = (field: keyof BasicDataModel) => {
        if (sortFieldEquipment === field) {
            setSortOrderEquipment(
                sortOrderEquipment === "asc" ? "desc" : "asc"
            );
        } else {
            setSortFieldEquipment(field);
            setSortOrderEquipment("asc");
        }
    };

    const fetchData = async () => { 
        try {
            const data = await GetDataFromFirestore<BasicDataModel>(collectionName);
            setEquipment(data);
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
                const data = await GetDataFromFirestore<BasicDataModel>(collectionName);
                const sortedData = sortData(data, "name", "asc");  
                setEquipment(sortedData);
                onEquipmentData(sortedData);
            } catch (error) {
                console.error(`Error fetching ${collectionName}:`, error);
            } finally {
                setLoading(false);
            }
            };
        
        fetchDataAndSort();
        setFetchData(fetchData);
    }, [onEquipmentData, setLoading]); 

    useEffect(()=>{ 
        const sortedEquipment = sortData(
            equipment,
            sortFieldEquipment,
            sortOrderEquipment
        );
        const searchTermsEquipment = searchEquipment.split(" ");
        const searchFieldsEquipment: (keyof BasicDataModel)[] = ["name"];
        const filteredEquipment = filterData(
            sortedEquipment,
            searchTermsEquipment,
            searchFieldsEquipment
        );
        setFilteredEquipment(filteredEquipment);
    }, [ equipment,sortFieldEquipment,sortOrderEquipment,searchEquipment]);
       
    
    const toggleActiveSwitch = async (id: string, currentActive: boolean) => {
      setLoading(true);
      try {
        const dataRef = doc(db, collectionName, id);  
        await updateDoc(dataRef, { active: !currentActive }); 
  
        fetchData();
      } catch (error) {
        console.error(`Error updating ${collectionName}:`, error);
      } finally {
        setLoading(false);
      }
    };

    return (
        <div> 
        <div className="mt-3 d-flex">
         <input
           type="text"
           placeholder={`Search ${collectionName}...`}
           className="p-2 border rounded w-full mb-4"
           value={searchEquipment}
           onChange={(e) => setSearchEquipment(e.target.value)}
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
                   onClick={() => handleSortEquipment(key)}
                 >
                   {label}
                 </th>
               ))}
             </tr>
           </thead>
           <tbody>
             {filteredEquipment.map((equipment) => (
               <tr key={equipment.id}>
                 <td className="py-2 px-4">{equipment.name}</td>
               
               
                 <td className="py-2 px-4">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`switch-${equipment.id}`}
                            checked={equipment.active}
                            onChange={() =>
                              toggleActiveSwitch(
                                equipment.id,
                                equipment.active
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`switch-${equipment.id}`}
                          ></label>
                        </div>
                      </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
   </div>
    )
}

export default AdminEquipment;