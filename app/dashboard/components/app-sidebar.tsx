"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  TerminalSquareIcon,
  BotIcon,
  BookOpenIcon,
  Settings2Icon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  BarChart3Icon,
  SettingsIcon,
  TicketPercentIcon,
  CreditCardIcon,
  TruckIcon,
  UsersIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  LayoutDashboardIcon,
  PackageIcon,
} from "lucide-react";

import { NavMain } from "./nav-main";

import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: <ShoppingBagIcon />,
      items: [
        {
          title: "All Products",
          url: "/dashboard/products",
        },
        {
          title: "Categories",
          url: "/categories",
        },
        {
          title: "Brands",
          url: "/brands",
        },
      ],
    },
    {
      title: "Orders",
      url: "/orders",
      icon: <ShoppingCartIcon />,
    },
    {
      title: "Users",
      url: "/users",
      icon: <UsersIcon />,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: <PackageIcon />,
    },
    {
      title: "Coupons",
      url: "/coupons",
      icon: <TicketPercentIcon />,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <SettingsIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1>logo</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
