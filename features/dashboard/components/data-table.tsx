"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import {
  useUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../hooks/use-dashboard-data";
import { UserFormDialog, type UserFormData } from "./user-form-dialog";
import { useDebounce } from "@/hooks/use-debounce";
import type { User, UserRole, UserStatus } from "@/types";

export function DataTable() {
  const t = useTranslations("dashboard.table");
  const tCommon = useTranslations("common");

  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const [formDialogOpen, setFormDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const { data, isLoading, isError, refetch } = useUsersQuery({
    search: debouncedSearch,
    role: roleFilter,
    status: statusFilter,
    page,
    limit: pageSize,
  });

  const createMutation = useCreateUserMutation();
  const updateMutation = useUpdateUserMutation();
  const deleteMutation = useDeleteUserMutation();

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setFormDialogOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setFormDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormSubmit = (formData: UserFormData) => {
    if (selectedUser) {
      updateMutation.mutate(
        { ...selectedUser, ...formData },
        {
          onSuccess: () => setFormDialogOpen(false),
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setFormDialogOpen(false),
      });
    }
  };

  const renderStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>{tCommon("active")}</span>
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            <span>{tCommon("inactive")}</span>
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="warning" className="gap-1">
            <Clock className="h-3 w-3" />
            <span>{tCommon("pending")}</span>
          </Badge>
        );
    }
  };

  const renderRoleLabel = (role: UserRole) => {
    return t(`roles.${role}` as any);
  };

  return (
    <div className="space-y-4">
      {/* Controls Header: Search, Filters, Add Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-center">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute start-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="ps-8 h-9"
            />
          </div>

          {/* Role Filter */}
          <Select
            value={roleFilter}
            onValueChange={(val) => {
              setRoleFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-40 h-9">
              <SelectValue placeholder={t("filterRole")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{tCommon("all")} (Roles)</SelectItem>
              <SelectItem value="admin">{t("roles.admin")}</SelectItem>
              <SelectItem value="developer">{t("roles.developer")}</SelectItem>
              <SelectItem value="designer">{t("roles.designer")}</SelectItem>
              <SelectItem value="manager">{t("roles.manager")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-36 h-9">
              <SelectValue placeholder={t("filterStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{tCommon("all")} (Status)</SelectItem>
              <SelectItem value="active">{tCommon("active")}</SelectItem>
              <SelectItem value="inactive">{tCommon("inactive")}</SelectItem>
              <SelectItem value="pending">{tCommon("pending")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add User Action */}
        <Button onClick={handleOpenCreate} size="sm" className="h-9 gap-1.5 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          <span>{tCommon("create")}</span>
        </Button>
      </div>

      {/* Table Container */}
      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">{t("columns.name")}</TableHead>
              <TableHead>{t("columns.role")}</TableHead>
              <TableHead>{t("columns.status")}</TableHead>
              <TableHead>{t("columns.joined")}</TableHead>
              <TableHead className="text-end">{t("columns.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading Skeleton
              Array.from({ length: 4 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-36" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="text-end">
                    <Skeleton className="h-8 w-8 rounded ms-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : data?.items && data.items.length > 0 ? (
              data.items.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {renderRoleLabel(user.role)}
                  </TableCell>
                  <TableCell>{renderStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          aria-label="User actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleOpenEdit(user)}
                          className="cursor-pointer gap-2"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          <span>{tCommon("edit")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(user.id)}
                          className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>{tCommon("delete")}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="p-0">
                  <EmptyState
                    title={t("noResults")}
                    description={t("noResultsSub")}
                    actionLabel={tCommon("clear")}
                    onAction={() => {
                      setSearch("");
                      setRoleFilter("all");
                      setStatusFilter("all");
                    }}
                    className="border-0 my-4"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
            <div>
              {tCommon("showing")}{" "}
              <span className="font-medium text-foreground">
                {(page - 1) * pageSize + 1}
              </span>{" "}
              {tCommon("to")}{" "}
              <span className="font-medium text-foreground">
                {Math.min(page * pageSize, data.total)}
              </span>{" "}
              {tCommon("of")}{" "}
              <span className="font-medium text-foreground">{data.total}</span>{" "}
              {tCommon("entries")}
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page <= 1}
                className="h-8 px-2.5"
              >
                {tCommon("previous")}
              </Button>
              <div className="px-2 text-foreground font-medium">
                {page} / {data.totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(p + 1, data.totalPages))}
                disabled={page >= data.totalPages}
                className="h-8 px-2.5"
              >
                {tCommon("next")}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* User Form Dialog (Create / Edit) */}
      <UserFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        user={selectedUser}
        onSubmit={handleFormSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
