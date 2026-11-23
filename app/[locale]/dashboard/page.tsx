import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
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
import { OverviewStats } from "@/features/dashboard/components/overview-stats";
import { AnalyticsChart } from "@/features/dashboard/components/analytics-chart";
import { DataTable } from "@/features/dashboard/components/data-table";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DashboardContent />;
}

function DashboardContent() {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
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
                      <BreadcrumbPage>{tCommon("dashboard")}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              }
            />

            {/* Dashboard Sections */}
            <div className="space-y-6">
              {/* 1. Overview Metric Cards */}
              <OverviewStats />

              {/* 2. Analytics Chart */}
              <AnalyticsChart />

              {/* 3. User Management Interactive Table */}
              <div className="space-y-3">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    {t("table.title")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t("table.description")}
                  </p>
                </div>
                <DataTable />
              </div>
            </div>
          </PageContainer>
        </main>

        <Footer />
      </div>
    </div>
  );
}
