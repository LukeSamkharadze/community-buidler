import SvgColor from "../../../components/svg-color";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: <DashboardIcon />,
  },
  {
    title: "jobs",
    path: "/dashboard/jobs",
    icon: <WorkIcon />,
  },
  {
    title: "leaderboard",
    path: "/dashboard/leaderboard",
    icon: <LeaderboardIcon />,
  },
  {
    title: "Referral",
    path: "/dashboard/referral",
    icon: <HandshakeIcon />,
  },
  {
    title: "Admin panel",
    path: "/dashboard/admin-panel",
    icon: <AdminPanelSettingsIcon />,
  },
];

export default navConfig;
