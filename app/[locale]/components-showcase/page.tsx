"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Bell,
  HelpCircle,
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { PageContainer } from "@/components/layout/page-container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ComponentsShowcasePage() {
  const t = useTranslations("showcase");
  const tCommon = useTranslations("common");
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          <PageContainer>
            <PageHeader
              title={t("title")}
              description={t("description")}
              breadcrumbs={
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">{tCommon("home")}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{t("title")}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              }
            />

            <div className="space-y-10">
              {/* 1. Buttons & Badges */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {t("buttons")}
                </h2>
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    {/* Buttons Row */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="default">Default Button</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link Style</Button>
                      <Button size="sm">Small</Button>
                      <Button size="lg">Large</Button>
                      <Button disabled>Disabled</Button>
                    </div>

                    {/* Badges Row */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
                      <Badge variant="default">Primary Badge</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="success">Success Status</Badge>
                      <Badge variant="warning">Warning Status</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 2. Inputs, Selects, Checkboxes & Radio */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {t("inputs")}
                </h2>
                <Card>
                  <CardContent className="pt-6 grid gap-6 md:grid-cols-2">
                    {/* Input Field */}
                    <div className="space-y-2">
                      <Label htmlFor="demo-input">Standard Text Input</Label>
                      <Input id="demo-input" placeholder="Type something..." />
                    </div>

                    {/* Select Dropdown */}
                    <div className="space-y-2">
                      <Label>Select Dropdown</Label>
                      <Select defaultValue="opt1">
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="opt1">Option 1 - Enterprise</SelectItem>
                          <SelectItem value="opt2">Option 2 - Professional</SelectItem>
                          <SelectItem value="opt3">Option 3 - Starter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Checkbox Group */}
                    <div className="space-y-3">
                      <Label>Checkboxes</Label>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox id="c1" defaultChecked />
                        <label htmlFor="c1" className="text-sm font-medium">
                          Enable automatic synchronization
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox id="c2" />
                        <label htmlFor="c2" className="text-sm font-medium">
                          Send telemetry report
                        </label>
                      </div>
                    </div>

                    {/* Radio Group */}
                    <div className="space-y-3">
                      <Label>Radio Options</Label>
                      <RadioGroup defaultValue="r1">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <RadioGroupItem value="r1" id="r1" />
                          <label htmlFor="r1" className="text-sm">
                            Public access
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <RadioGroupItem value="r2" id="r2" />
                          <label htmlFor="r2" className="text-sm">
                            Private workspace
                          </label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 3. Feedback: Dialog, Toast & Tooltip */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {t("feedback")}
                </h2>
                <Card>
                  <CardContent className="pt-6 flex flex-wrap items-center gap-4">
                    {/* Modal Dialog */}
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">{t("openDialog")}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t("dialogTitle")}</DialogTitle>
                          <DialogDescription>
                            {t("dialogDesc")}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setModalOpen(false)}
                          >
                            {tCommon("cancel")}
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              setModalOpen(false);
                              toast.error("Item was deleted");
                            }}
                          >
                            {t("dialogConfirm")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {/* Toast Notification */}
                    <Button
                      onClick={() => toast.success(t("toastMessage"))}
                      className="gap-2"
                    >
                      <Bell className="h-4 w-4" />
                      <span>{t("triggerToast")}</span>
                    </Button>

                    {/* Tooltip */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <HelpCircle className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Accessible tooltip component</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardContent>
                </Card>
              </section>

              {/* 4. Tabs & Pagination */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {t("navigation")}
                </h2>
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                        <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
                        <TabsTrigger value="analytics">{t("tabs.analytics")}</TabsTrigger>
                        <TabsTrigger value="reports">{t("tabs.reports")}</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="p-4 border rounded-md mt-4 text-sm text-muted-foreground">
                        Overview panel showing general workspace configuration.
                      </TabsContent>
                      <TabsContent value="analytics" className="p-4 border rounded-md mt-4 text-sm text-muted-foreground">
                        Detailed analytics panel data and performance insights.
                      </TabsContent>
                      <TabsContent value="reports" className="p-4 border rounded-md mt-4 text-sm text-muted-foreground">
                        Exportable reports and scheduled audits list.
                      </TabsContent>
                    </Tabs>

                    {/* Pagination Sample */}
                    <div className="pt-4 border-t">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious href="#" />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#" isActive>
                              1
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext href="#" />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* 5. Skeleton, Empty & Error States */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {t("states")}
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Skeletons */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Skeleton Loaders</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-24 w-full rounded-md" />
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Empty State */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Empty State</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <EmptyState
                        title="No Documents"
                        description="Get started by uploading your first contract."
                        actionLabel="Upload File"
                        onAction={() => toast.info("Upload dialog triggered")}
                        className="min-h-[200px] p-4"
                      />
                    </CardContent>
                  </Card>

                  {/* Error State */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Error State</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ErrorState
                        title="Connection Failed"
                        description="Unable to sync data with remote endpoint."
                        retryLabel="Retry Sync"
                        onRetry={() => toast.info("Retrying sync...")}
                        className="min-h-[200px] p-4"
                      />
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </PageContainer>
        </main>

        <Footer />
      </div>
    </div>
  );
}
