import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ExerciseModel {
    exerciseId: string;
    name: string;
    muscleGroups: string[];
    variations: string[];
    equipment: string[];
    active: boolean;
  }
  
  export interface GenericDataModel {
    id: string;
    name: string;
  }

  
  export interface BasicDataModel {
    id: string;
    name: string;
    active: boolean;
  }

  export interface Page {
    title: string;
    path: string;
    icon: IconProp;  
    active: boolean;
  }