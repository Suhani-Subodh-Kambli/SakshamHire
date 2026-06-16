import { Link } from "react-router-dom";

import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        SakshamHire
      </div>

      <nav>
        <ul className={styles.menu}>
          <li>
            <Link to="/employer">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/post-job">
              Post Job
            </Link>
          </li>

          <li>
            <Link to="/previous-posts">
              Previous Posts
            </Link>
          </li>

          <li>
            <Link to="/candidates">
              Candidates
            </Link>
          </li>

          <li>
            <Link to="/awareness">
              Awareness Hub
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;