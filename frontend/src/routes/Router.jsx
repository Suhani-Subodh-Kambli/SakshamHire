import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import JobSeekerProfile from "../pages/JobSeeker/ProfileForm";
import JobListings from "../pages/JobSeeker/JobListings";
import Profile from "../pages/JobSeeker/Profile";

import EmployerDashboard from "../pages/Employer/EmployerDashboard";
import PostJob from "../pages/Employer/PostJob";
import PreviousPosts from "../pages/Employer/PreviousPosts";
import Candidates from "../pages/Employer/Candidates";

import AwarenessPage from "../pages/Awareness/AwarenessPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <RoleProtectedRoute role="jobseeker">
              <JobSeekerProfile />
            </RoleProtectedRoute>
          </ProtectedRoute>
        ),
      },

      {
        path: "jobs",
        element: (
          <ProtectedRoute>
            <RoleProtectedRoute role="jobseeker">
              <JobListings />
            </RoleProtectedRoute>
          </ProtectedRoute>
        ),
      },

      {
        path: "my-profile",
        element: (
          <ProtectedRoute>
            <RoleProtectedRoute role="jobseeker">
              <Profile />
            </RoleProtectedRoute>
          </ProtectedRoute>
        ),
      },

      {
        path: "employer",
        element: (
          <ProtectedRoute>
            <RoleProtectedRoute role="employer">
              <EmployerDashboard />
            </RoleProtectedRoute>
          </ProtectedRoute>
        ),
      },

      {
        path: "post-job",
        element: (
          <ProtectedRoute>
            <RoleProtectedRoute role="employer">
              <PostJob />
            </RoleProtectedRoute>
          </ProtectedRoute>
        ),
      },

      {
        path: "previous-posts",
        element: (
          <ProtectedRoute>
            <RoleProtectedRoute role="employer">
              <PreviousPosts />
            </RoleProtectedRoute>
          </ProtectedRoute>
        ),
      },

      {
        path: "candidates",
        element: (
          <ProtectedRoute>
            <RoleProtectedRoute role="employer">
              <Candidates />
            </RoleProtectedRoute>
          </ProtectedRoute>
        ),
      },

      {
        path: "awareness",
        element: (
          <ProtectedRoute>
            <AwarenessPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;