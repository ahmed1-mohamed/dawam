"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { User, UserRole, UserStatus } from "@/types";

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  onSubmit: (data: UserFormData) => void;
  isSubmitting?: boolean;
}

export type UserFormData = {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  bio?: string;
  receiveEmails: boolean;
};

export function UserFormDialog({
  open,
  onOpenChange,
  user,
  onSubmit,
  isSubmitting = false,
}: UserFormDialogProps) {
  const t = useTranslations("userForm");
  const tCommon = useTranslations("common");

  const formSchema = z.object({
    name: z.string().min(3, { message: t("validation.nameRequired") }),
    email: z.string().email({ message: t("validation.invalidEmail") }),
    role: z.enum(["admin", "developer", "designer", "manager"], {
      message: t("validation.roleRequired"),
    }),
    status: z.enum(["active", "inactive", "pending"], {
      message: t("validation.statusRequired"),
    }),
    bio: z.string().optional(),
    receiveEmails: z.boolean().default(false),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "developer",
      status: "active",
      bio: "",
      receiveEmails: true,
    },
  });

  const selectedRole = watch("role");
  const selectedStatus = watch("status");
  const receiveEmails = watch("receiveEmails");

  React.useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        bio: user.bio || "",
        receiveEmails: !!user.receiveEmails,
      });
    } else {
      reset({
        name: "",
        email: "",
        role: "developer",
        status: "active",
        bio: "",
        receiveEmails: true,
      });
    }
  }, [user, reset]);

  const handleFormSubmit = (data: UserFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {user ? t("editTitle") : t("createTitle")}
          </DialogTitle>
          <DialogDescription>
            {user ? t("editSubtitle") : t("createSubtitle")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-2">
          {/* Full Name Field */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium">
              {t("fields.name")}
            </Label>
            <Input
              id="name"
              placeholder={t("fields.namePlaceholder")}
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email Address Field */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium">
              {t("fields.email")}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("fields.emailPlaceholder")}
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Role & Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Role Field */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">{t("fields.role")}</Label>
              <Select
                value={selectedRole}
                onValueChange={(val) => setValue("role", val as UserRole)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("fields.rolePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">{tCommon("dashboard") === "لوحة التحكم" ? "مدير النظام" : "Admin"}</SelectItem>
                  <SelectItem value="developer">{tCommon("dashboard") === "لوحة التحكم" ? "مطور برمجيات" : "Developer"}</SelectItem>
                  <SelectItem value="designer">{tCommon("dashboard") === "لوحة التحكم" ? "مصمم واجهات" : "Designer"}</SelectItem>
                  <SelectItem value="manager">{tCommon("dashboard") === "لوحة التحكم" ? "مدير مشاريع" : "Manager"}</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-xs text-destructive">{errors.role.message}</p>
              )}
            </div>

            {/* Status Field */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">{t("fields.status")}</Label>
              <Select
                value={selectedStatus}
                onValueChange={(val) => setValue("status", val as UserStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{tCommon("active")}</SelectItem>
                  <SelectItem value="inactive">{tCommon("inactive")}</SelectItem>
                  <SelectItem value="pending">{tCommon("pending")}</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-xs text-destructive">{errors.status.message}</p>
              )}
            </div>
          </div>

          {/* Bio / Notes Field */}
          <div className="space-y-1.5">
            <Label htmlFor="bio" className="text-sm font-medium">
              {t("fields.bio")}
            </Label>
            <Input
              id="bio"
              placeholder={t("fields.bioPlaceholder")}
              {...register("bio")}
            />
          </div>

          {/* Notifications Checkbox */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse pt-2">
            <Checkbox
              id="receiveEmails"
              checked={receiveEmails}
              onCheckedChange={(checked) =>
                setValue("receiveEmails", Boolean(checked))
              }
            />
            <label
              htmlFor="receiveEmails"
              className="text-xs text-muted-foreground leading-none cursor-pointer"
            >
              {t("fields.receiveEmails")}
            </label>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {tCommon("cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? tCommon("loading") : tCommon("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
