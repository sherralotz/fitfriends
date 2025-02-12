// src/components/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { pages } from "../../config/pages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="d-none d-md-flex flex-column p-3 bg-dark vh-100">
      <h1 className="fs-4 fw-bold text-center mb-4 text-white">FitFriends</h1>
      <nav className="nav flex-column">
        {pages.map((page: any, index: number) => (
          <Link
            key={`page-${index}`}
            to={page.path}
            className={`nav-link d-flex align-items-center py-2 px-3 ${
              location.pathname === page.path ? "text-warning" : ""
            } ${page.active ? "text-white":"nav-text-disabled"}`}
          >
            <FontAwesomeIcon icon={page.icon} />{" "}
            <span className="ms-2">{page.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
