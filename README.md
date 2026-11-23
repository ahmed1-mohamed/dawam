# Modern Next.js Frontend Starter Template

A production-ready, feature-based, and highly scalable **Frontend Starter Template** built with **Next.js 15 (App Router)**, **TypeScript (Strict Mode)**, **Tailwind CSS**, and **shadcn/ui**.

Designed specifically for enterprise-grade applications, multi-tenant SaaS dashboards, and modern web portals requiring robust internationalization (English & Arabic with full RTL support), light/dark theming, resilient API state management, and type-safe form validations.

---

## 🌟 Key Highlights

- **Next.js 15 App Router Architecture**: Leverages Server Components by default with client interactivity isolated to boundary components.
- **Bilingual Internationalization (next-intl)**: Seamless English (`/en`, LTR) and Arabic (`/ar`, RTL) routing with instant client-side switching that preserves route parameters and state.
- **Flawless RTL Design**: Comprehensive direction-aware styling (`ps-`, `pe-`, `start-`, `end-`, mirrored chevrons/icons, RTL font integration with Cairo and Inter).
- **Theming Engine (next-themes)**: Zero-flash Light, Dark, and System theme switching using semantic CSS variables.
- **Full shadcn/ui Component Suite**: Production implementations of Buttons, Inputs, Selects, Checkboxes, Radio Groups, Dialogs, Dropdown Menus, Data Tables, Cards, Tabs, Tooltips, Badges, Breadcrumbs, Pagination, Skeletons, Empty States, and Error States.
- **Server State & Caching (@tanstack/react-query)**: Centralized QueryClient with configured stale times, background refetching, and reusable mutation hooks.
- **Centralized API Client (Axios)**: Request and response interceptors, bearer token management, standardized error normalization, and clean service abstractions.
- **Type-Safe Form Management**: Built on **React Hook Form** paired with **Zod** schemas and localized validation messages.
- **Global Client State (Zustand)**: Lightweight, persisted store for sidebar collapse state, filters, and global UI preferences.
- **Toast Notifications (Sonner)**: Direction-aware toasts automatically aligning with active RTL/LTR layout.
- **Data Visualizations (Recharts)**: Responsive charts with gradients, custom tooltips, and RTL axis handling.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) based on Radix UI primitives |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Internationalization** | [next-intl](https://next-intl-docs.vercel.app/) |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Server State / Caching** | [TanStack React Query v5](https://tanstack.com/query/latest) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Client State** | [Zustand](https://zustand-demo.pmnd.rs/) with LocalStorage persistence |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Dates** | [date-fns](https://date-fns.org/) |
| **Utility Classes** | [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) |

---

## 📁 Project Architecture & Folder Structure

> 💡 **In-Depth Guide**: A complete architectural breakdown with data flow diagrams, state decision matrices, and folder responsibilities is available in [STRUCTURE.md](file:///c:/Users/Backend1/OneDrive/Desktop/basic/STRUCTURE.md).

```
├── app/                              # Next.js App Router layer
│   ├── [locale]/                     # Internationalized route groups (/en, /ar)
│   │   ├── components-showcase/      # Interactive UI component design system
│   │   │   └── page.tsx
│   │   ├── dashboard/                # Executive demo dashboard
│   │   │   └── page.tsx
│   │   ├── error.tsx                 # Per-locale error boundary
│   │   ├── layout.tsx                # Root HTML, fonts, and direction wrapper
│   │   ├── loading.tsx               # Skeleton loading boundary
│   │   ├── not-found.tsx             # 404 handler within locale
│   │   └── page.tsx                  # Landing / Home page
│   ├── globals.css                   # Semantic CSS variables & typography
│   ├── global-error.tsx              # Root fallback global error
│   └── not-found.tsx                 # Root 404 handler
├── components/                       # Shared components
│   ├── layout/                       # Structural layout components
│   │   ├── footer.tsx
│   │   ├── language-switcher.tsx     # Route-preserving locale switcher
│   │   ├── mobile-nav.tsx            # Responsive mobile drawer
│   │   ├── navbar.tsx                # Desktop header navigation
│   │   ├── page-container.tsx        # Responsive content wrapper
│   │   ├── page-header.tsx           # Reusable title and action bar
│   │   ├── sidebar.tsx               # Collapsible dashboard sidebar
│   │   └── theme-toggle.tsx          # Light / Dark / System mode toggle
│   ├── providers/                    # Client providers
│   │   ├── app-providers.tsx         # Composite provider (Theme, Query, Toaster)
│   │   ├── query-provider.tsx        # TanStack Query client provider
│   │   └── theme-provider.tsx        # next-themes provider
│   └── ui/                           # Primitive shadcn/ui components
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── empty-state.tsx           # Standardized empty state
│       ├── error-state.tsx           # Standardized retryable error state
│       ├── input.tsx
│       ├── label.tsx
│       ├── pagination.tsx
│       ├── radio-group.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       └── tooltip.tsx
├── constants/                        # Global immutable constants & navigation
│   └── index.ts
├── features/                         # Feature-driven modular domains
│   └── dashboard/
│       ├── components/
│       │   ├── analytics-chart.tsx   # Recharts area graph with gradients
│       │   ├── data-table.tsx        # Filterable & paginated user management
│       │   ├── overview-stats.tsx    # Responsive KPI metric cards
│       │   └── user-form-dialog.tsx  # React Hook Form + Zod modal
│       ├── hooks/
│       │   └── use-dashboard-data.ts # TanStack Query hooks & mutations
│       └── types.ts
├── hooks/                            # Reusable React hooks
│   ├── use-debounce.ts               # Input search debounce
│   ├── use-direction.ts              # Direction & active locale detector
│   ├── use-mobile.ts                 # Viewport responsive breakpoint detector
│   └── use-mounted.ts                # Client hydration guard
├── i18n/                             # next-intl configuration
│   ├── request.ts                    # Per-request locale messages loader
│   └── routing.ts                    # Routing definition & navigation primitives
├── lib/                              # Shared utilities and client configurations
│   ├── api/
│   │   └── axios-client.ts           # Centralized Axios with interceptors
│   ├── query-client.ts               # TanStack Query client factory
│   └── utils.ts                      # clsx + twMerge helper & formatters
├── messages/                         # Translation dictionaries
│   ├── ar.json                       # Natural, professional Arabic
│   └── en.json                       # Professional English
├── services/                         # External API service integrations
│   └── user-service.ts               # Type-safe user management API client
├── store/                            # Global Zustand stores
│   └── use-app-store.ts              # Sidebar & filter state with persistence
└── types/                            # Global TypeScript contracts
    ├── api.ts                        # Standard ApiResponse, ApiError, PaginatedResponse
    └── index.ts                      # Core entities and domain types
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or later (v20+ or v22+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 1. Installation

Clone or extract the template files, navigate to the directory, and install dependencies:

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to create your local environment file:

```bash
cp .env.example .env.local
```

Configure your variables in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.example.com/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

### 3. Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Next.js will automatically redirect to `/en` or `/ar`.

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| **Development** | `npm run dev` | Starts local Next.js dev server with hot reload |
| **Type Check** | `npm run type-check` | Runs `tsc --noEmit` in TypeScript strict mode |
| **Lint** | `npm run lint` | Runs Next.js ESLint validation |
| **Production Build** | `npm run build` | Compiles optimized production bundle |
| **Start Production** | `npm run start` | Serves the production build locally |

---

## 🌐 Internationalization (Arabic & English) Guide

Internationalization is powered by **next-intl**.

### How Language Switching Works
1. When a user changes language in `LanguageSwitcher`, it invokes `router.replace(pathname, { locale: nextLocale })` from `@/i18n/routing`.
2. This preserves the exact pathname, query parameters, and scroll position without triggering a full browser refresh.
3. The root layout automatically sets `html dir="rtl"` and `lang="ar"` for Arabic, or `html dir="ltr"` and `lang="en"` for English.

### Adding New Translation Strings
1. Open `messages/en.json` and add your keys under a logical namespace:
   ```json
   {
     "settings": {
       "title": "Account Settings",
       "notifications": "Email Notifications"
     }
   }
   ```
2. Open `messages/ar.json` and add the corresponding natural Arabic translation:
   ```json
   {
     "settings": {
       "title": "إعدادات الحساب",
       "notifications": "إشعارات البريد الإلكتروني"
     }
   }
   ```
3. Use the keys in your component:
   ```tsx
   import { useTranslations } from "next-intl";

   export function SettingsHeader() {
     const t = useTranslations("settings");
     return <h1>{t("title")}</h1>;
   }
   ```

---

## 🎨 Theme Customization

Themes are controlled through `next-themes` and CSS variables in `app/globals.css`.

- **Light Mode Variables**: Defined inside `:root { ... }`
- **Dark Mode Variables**: Defined inside `.dark { ... }`
- **Component Design Tokens**: Backgrounds, borders, inputs, cards, and primary colors adapt automatically based on the active `.dark` class.

To change the primary brand color, adjust `--primary` and `--primary-foreground` in `app/globals.css`.

---

## 📡 API & State Management Guide

### Centralized Axios Client (`lib/api/axios-client.ts`)
- Automatically reads the API base URL from `NEXT_PUBLIC_API_URL`.
- Automatically attaches `Authorization: Bearer <token>` when available in storage.
- Standardizes all API errors into the `ApiError` interface (`types/api.ts`).
- Automatically handles 401 Unauthorized status by clearing invalid tokens.

### TanStack Query Integration (`features/.../hooks/`)
- Encapsulate all API fetches within custom query hooks:
  ```tsx
  export function useUsersQuery(params: PaginationParams) {
    return useQuery({
      queryKey: ["users", params],
      queryFn: () => userService.getUsers(params),
    });
  }
  ```
- Mutations automatically trigger cache invalidation and display toast feedback via **Sonner**.

---

## 🧱 Adding New Pages & Features

### 1. Adding a New Route
Create a new folder inside `app/[locale]/`:
```
app/[locale]/
  └── billing/
      └── page.tsx
```
Inside `page.tsx`:
```tsx
import { setRequestLocale } from "next-intl/server";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

export default async function BillingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageContainer>
      <PageHeader title="Billing & Plans" />
      {/* Content */}
    </PageContainer>
  );
}
```

### 2. Adding a New Feature Module
Group feature-specific code in `features/<feature-name>/`:
- `components/`: UI components exclusive to the feature.
- `hooks/`: TanStack Query hooks and feature state.
- `services/`: Dedicated API callers.
- `types.ts`: TypeScript contracts for the domain.

---

## ♿ Accessibility & SEO

- **Semantic Elements**: Proper usage of `main`, `aside`, `header`, `footer`, `nav`, and heading hierarchies (`h1` - `h4`).
- **Keyboard Navigation**: Full focus trap and escape key handling across all Radix dialogs, dropdowns, and selects.
- **RTL Care**: `text-start`, `text-end`, `ps-`, `pe-`, and flipped directional navigation icons (`rtl:rotate-180`).
- **Dynamic Metadata**: Complete Open Graph, alternate language canonicals, and localized titles and descriptions via Next.js Metadata API.

---

## 📄 License

This starter template is released under the [MIT License](LICENSE). Feel free to use it for personal, open-source, and commercial projects.
