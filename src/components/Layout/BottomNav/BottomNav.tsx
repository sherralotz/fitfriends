// src/components/BottomNav.tsx
import { Link, useLocation } from "react-router-dom";
import { pages } from "../../../config/pages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomNav: React.FC = () => {
  const location = useLocation(); 
  return (
    <nav className="d-md-none fixed-bottom bg-dark text-white p-2">
      <div className="container d-flex justify-content-around">
        {pages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className={`btn btn-dark p-2 ${
              location.pathname === page.path ? "text-warning" : ""
            }  ${page.active ? "text-white":"nav-text-disabled"}`}
          >
            <FontAwesomeIcon icon={page.icon} /> 
            <div className="">{page.title}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
