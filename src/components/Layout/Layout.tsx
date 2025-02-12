// src/components/Layout.tsx

import React, { ReactNode } from "react"; 
import Sidebar from "../Sidebar/Sidebar";
import BottomNav from "../BottomNav/BottomNav";

interface LayoutProps {
  children: ReactNode; // Define children prop type as ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar /> {/* Sidebar component */}
      <main className="flex-grow-1 p-3">
        <div className="container">
        {children}  
        </div>
      </main>
      <BottomNav /> {/* Bottom navigation component */}
    </div>
  );
};

export default Layout;
