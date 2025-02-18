import { faHome, faChartLine, faClipboardList, faUser } from "@fortawesome/free-solid-svg-icons";
import { Page } from "../types/interfaces";
 
export const pages: Page[] = [
  { title: "Home", path: "/", icon: faHome, active: true }, 
  { title: "Admin", path: "/admin-manage", icon: faChartLine, active: true }, 
  { title: "Record", path: "/record", icon: faClipboardList, active: false }, 
  { title: "Profile", path: "/profile", icon: faUser, active: true  }, 
];