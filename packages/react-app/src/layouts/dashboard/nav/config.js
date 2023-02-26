// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = name => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "jobs",
    path: "/dashboard/jobs",
    icon: icon("ic_cart"),
  },
  {
    title: "leaderboard",
    path: "/dashboard/blog",
    icon: icon("ic_blog"),
  },
  {
    title: "Admin panel",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
];

export default navConfig;
