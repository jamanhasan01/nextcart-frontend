"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    // Enforcing text-sidebar-foreground to keep styles unified inside light/dark modes
    <SidebarGroup className="text-sidebar-foreground">
      <SidebarMenu>
        {items.map((item) => {
          const isParentActive = pathname === item.url;
          const isChildActive = item.items?.some((sub) => pathname === sub.url);
          const shouldBeOpen = isParentActive || isChildActive;

          return (
            <Collapsible
              key={item.title}
              defaultOpen={shouldBeOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {item.items && item.items.length > 0 ? (
                  <>
                    <CollapsibleTrigger className={"w-full"}>
                      {/* Flex layout with gap fixes structural clipping */}
                      <SidebarMenuButton
                        render={<div />}
                        tooltip={item.title}
                        isActive={shouldBeOpen}
                        className="w-full flex justify-between items-center gap-3 px-3 py-2 text-sm font-medium"
                      >
                        {item.icon && (
                          <span className="h-4 w-4 shrink-0 flex items-center justify-center">
                            {item.icon}
                          </span>
                        )}
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronRightIcon className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub className="ml-4 border-l border-sidebar-border pl-2 mt-1 space-y-1">
                        {item.items.map((subItem) => {
                          const isSubActive = pathname === subItem.url;

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                render={<Link href={subItem.url} />}
                                isActive={isSubActive}
                                className="w-full text-left px-3 py-1.5 text-xs font-medium"
                              >
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : (
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={isParentActive}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium"
                  >
                    {item.icon && (
                      <span className="h-4 w-4 shrink-0 flex items-center justify-center">
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 text-left">{item.title}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
