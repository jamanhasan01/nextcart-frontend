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
  SettingsIcon,
  TicketPercentIcon,
  UsersIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  LayoutDashboardIcon,
  PackageIcon,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useAuth } from "@/hooks/auth/useAuth";

// This is sample data.
const data = {
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
          title: "Manage Products",
          url: "/dashboard/products",
        },
        {
          title: "Add Products",
          url: "/dashboard/products/create",
        },

        {
          title: "Manage Categories",
          url: "/dashboard/categories",
        },
        {
          title: "Add Categories",
          url: "/dashboard/categories/create",
        },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: <ShoppingCartIcon />,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: <UsersIcon />,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: <PackageIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { me: user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    window.location.href = "/login";
    return null;
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1>logo</h1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
