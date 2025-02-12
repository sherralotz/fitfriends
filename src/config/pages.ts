import { faHome, faChartLine, faClipboardList, faUser } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core"; // Import IconProp

interface Page {
  title: string;
  path: string;
  icon: IconProp;  
  active: boolean;
}

export const pages: Page[] = [
  { title: "Home", path: "/", icon: faHome, active: true }, 
  { title: "Analytics", path: "/analytics", icon: faChartLine, active: false }, 
  { title: "Record", path: "/record", icon: faClipboardList, active: false }, 
  { title: "Profile", path: "/profile", icon: faUser, active: true  }, 
];