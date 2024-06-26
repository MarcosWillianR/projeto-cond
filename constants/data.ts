import { NavItem, SidebarNavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Início",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Buscar veículo",
    href: "/dashboard/vehicle",
    icon: "car",
    label: "car",
  },
  {
    title: "Torre",
    href: "/dashboard/tower",
    icon: "towerControl",
    label: "towerControl",
  },
  {
    title: "Apartamentos",
    href: "/dashboard/apartment",
    icon: "building",
    label: "building",
  },
  {
    title: "Morador",
    href: "/dashboard/resident",
    icon: "keyRound",
    label: "keyRound",
  },
  {
    title: "Visitante",
    href: "/dashboard/visitor",
    // icon: "",
    label: "visitor",
  },
  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  },
];
