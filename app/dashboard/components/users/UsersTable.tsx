"use client";

import { useState } from "react";
import {
  FolderMinus,
  MoreHorizontalIcon,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { convertToDate } from "@/lib/date";
import { IUser } from "@/types/user.type";
import { ConfirmDialog } from "@/app/components/common/ConfirmDialog";
import { useToggleBlockUser } from "@/hooks/users/useToggleBlockUser";
import { useToggleAdminRole } from "@/hooks/users/useToggleAdminRole";
import { useDeleteUser } from "@/hooks/users/useDeleteUser";

interface UserTableProps {
  users: IUser[];
  page: number;
  limit: number;
  onViewDetails?: (user: IUser) => void;
}

const roleClasses: Record<string, string> = {
  super_admin: "bg-rose-800 text-rose-100 border-rose-700",
  admin: "bg-purple-800 text-purple-100 border-purple-700",
  customer: "bg-blue-800 text-blue-100 border-blue-700",
};

type DialogType = "block" | "role" | "delete" | null;

export function UserTable({
  users,
  page,
  limit,
  onViewDetails,
}: UserTableProps) {
  // Queries & Mutations
  const { mutate: toggleBlock, isPending: isBlockPending } =
    useToggleBlockUser();
  const { mutate: toggleRole, isPending: isRolePending } = useToggleAdminRole();
  const { mutate: deleteUser, isPending: isDeletePending } = useDeleteUser();

  // Dialog Control States
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);

  // Stored target user information for confirmation
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    isBlocked: boolean;
    role: string;
  } | null>(null);

  const isMutating = isBlockPending || isRolePending || isDeletePending;

  // Action Triggers
  const handleOpenConfirm = (user: IUser, type: DialogType) => {
    setSelectedUser({
      id: user._id,
      name: user.name,
      isBlocked: user.isBlocked,
      role: user.role,
    });
    setActiveDialog(type);
    setConfirmOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedUser) return;

    const clearState = {
      onSettled: () => {
        setConfirmOpen(false);
        setActiveDialog(null);
        setSelectedUser(null);
      },
    };

    if (activeDialog === "block") {
      toggleBlock(selectedUser.id, clearState);
    } else if (activeDialog === "role") {
      toggleRole(selectedUser.id, clearState);
    } else if (activeDialog === "delete") {
      deleteUser(selectedUser.id, clearState);
    }
  };

  // Dialog Content Matrix Builder
  const getDialogConfig = () => {
    if (!selectedUser) return { title: "", description: "", confirmText: "" };

    switch (activeDialog) {
      case "block":
        return {
          title: selectedUser.isBlocked
            ? "Unblock User Account?"
            : "Block User Account?",
          description: selectedUser.isBlocked
            ? `Are you sure you want to lift the restriction for ${selectedUser.name}? Their access privileges will be instantly restored.`
            : `Are you sure you want to block ${selectedUser.name}? They will lose access to login to their profile immediately.`,
          confirmText: selectedUser.isBlocked
            ? "Restore User"
            : "Restrict User",
        };
      case "role":
        return {
          title:
            selectedUser.role === "admin"
              ? "Demote to User Role?"
              : "Promote to Admin Role?",
          description:
            selectedUser.role === "admin"
              ? `Are you sure you want to remove admin capabilities from ${selectedUser.name}?`
              : `Are you sure you want to grant admin access to ${selectedUser.name}? They will receive system control clearance.`,
          confirmText: "Change Role",
        };
      case "delete":
        return {
          title: "Permanently Delete User?",
          description: `Warning: You are about to remove ${selectedUser.name}. This action is completely irreversible and wipes their data records.`,
          confirmText: "Delete Account",
        };
      default:
        return { title: "", description: "", confirmText: "" };
    }
  };

  const dialogConfig = getDialogConfig();

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center text-muted-foreground">
        <FolderMinus className="mb-3 h-10 w-10 stroke-[1.5]" />
        <h3 className="text-lg font-semibold text-foreground">
          No users found
        </h3>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Registered system users will show up here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[60px] text-center">No</TableHead>
              <TableHead className="min-w-[150px]">Name</TableHead>
              <TableHead className="min-w-[200px]">Contact Info</TableHead>
              <TableHead className="w-[120px]">Role</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[160px]">Joined Date</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user, i) => (
              <TableRow
                key={user._id}
                className="transition-colors hover:bg-muted/40 cursor-pointer group"
                onClick={() => onViewDetails?.(user)}
              >
                {/* Index Number */}
                <TableCell className="text-center font-medium text-muted-foreground text-xs">
                  {(page - 1) * limit + (i + 1)}
                </TableCell>

                {/* Profile Details */}
                <TableCell className="font-semibold text-foreground text-sm">
                  {user.name}
                </TableCell>

                {/* Contact Info */}
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-foreground truncate max-w-[220px]">
                      {user.email}
                    </span>
                    {user.phone && (
                      <span className="text-xs text-muted-foreground font-mono">
                        {user.phone}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Role Badge */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize font-medium text-xs rounded-md shadow-none px-2.5 py-0.5 ${
                      roleClasses[user.role] ?? "bg-zinc-800 text-zinc-100"
                    }`}
                  >
                    {user.role}
                  </Badge>
                </TableCell>

                {/* Status Badge */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`capitalize font-medium text-xs rounded-md shadow-none px-2.5 py-0.5 border-0 ${
                      user.isBlocked
                        ? "bg-red-800 text-red-100"
                        : "bg-green-800 text-green-100"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </Badge>
                </TableCell>

                {/* Registration Date */}
                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                  {user.createdAt ? (
                    convertToDate(user.createdAt)
                  ) : (
                    <span className="text-muted-foreground/40">—</span>
                  )}
                </TableCell>

                {/* Actions Dropdown */}
                <TableCell
                  className="text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Open Menu</span>
                        </Button>
                      }
                    ></DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-52">
                      {/* Access Block Management */}
                      {user.isBlocked ? (
                        <DropdownMenuItem
                          disabled={isMutating}
                          onClick={() => handleOpenConfirm(user, "block")}
                          className="text-green-500 gap-2 focus:text-green-400"
                        >
                          <ShieldCheck className="h-4 w-4" />
                          Unblock User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          disabled={isMutating}
                          onClick={() => handleOpenConfirm(user, "block")}
                          className="text-destructive gap-2"
                        >
                          <ShieldAlert className="h-4 w-4" />
                          Block User
                        </DropdownMenuItem>
                      )}

                      {/* Management Role Toggle */}
                      <DropdownMenuItem
                        disabled={isMutating}
                        onClick={() => handleOpenConfirm(user, "role")}
                        className="gap-2"
                      >
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                        {user.role === "admin"
                          ? "Demote to User"
                          : "Make Admin"}
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      {/* Dangerous Account Deletion */}
                      <DropdownMenuItem
                        disabled={isMutating}
                        onClick={() => handleOpenConfirm(user, "delete")}
                        className="text-destructive gap-2 focus:bg-destructive/10 focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Reusable Action Confirmation Modal */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={dialogConfig.title}
        description={dialogConfig.description}
        confirmText={dialogConfig.confirmText}
        loading={isMutating}
        onConfirm={handleConfirmAction}
      />
    </>
  );
}
