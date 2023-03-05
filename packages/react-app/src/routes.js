import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import LeaderboardPage from "./pages/LeaderboardPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import JobsPage from "./pages/JobsPage";
import DashboardPage from "./pages/DashboardPage";
import ReferralPage from "./pages/ReferralPage";
import VisitorPage from "./pages/VisitorPage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <SimpleLayout />,
      children: [
        { path: "404", element: <Page404 /> },
        { element: <Navigate to="/dashboard/app" />, index: true },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardPage /> },
        { path: "jobs", element: <JobsPage /> },
        { path: "referral", element: <ReferralPage /> },
        { path: "leaderboard", element: <LeaderboardPage /> },
        { path: "admin-panel", element: <AdminPage /> },
        { path: "visitor", element: <VisitorPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
