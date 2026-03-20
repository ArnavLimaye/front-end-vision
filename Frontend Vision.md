# Frontend Vision
## Multi-Tenant SaaS Frontend Architecture for Wealth Management Platform

> This document mirrors the structure of the Frappe Vision on the Spring Money OS site.
> It covers all 4 frontend apps, multi-tenant strategy, deployment, and infrastructure.

---

## Overview

### Architecture Objective

Spring Money's frontend layer serves two user personas (Advisors and Clients) across two surfaces (Web and Mobile), all from a single shared codebase per app — with zero code changes needed to onboard a new tenant.

| Objective | Description |
|---|---|
| **Scalability** | Support 40–100+ advisor firms without forking code |
| **Tenant Isolation** | Each firm gets its own branding, feature set, and data boundaries |
| **Single Codebase** | One repo per app; tenants differ only in config + assets |
| **Mobile-First** | Native iOS + Android apps per client, published under client's App Store account |
| **Maintainability** | Zero divergence between tenant branches — eliminated by config-driven architecture |
| **Rapid Onboarding** | New tenant live in < 1 day after assets + config are added |

### 4 Frontend Apps

```
┌─────────────────────────────────────────────────────────────────┐
│                    SPRING MONEY FRONTEND                         │
├───────────────────────────┬─────────────────────────────────────┤
│         WEB               │           MOBILE                    │
│                           │                                     │
│  ┌─────────────────────┐  │  ┌──────────────────────────────┐   │
│  │  Advisor Web Portal │  │  │  Client Mobile App (RN Expo) │   │
│  │  (Next.js 15+)      │  │  │  manthan-ria-app             │   │
│  │  manthan-ria-       │  │  │  iOS + Android, per tenant   │   │
│  │  planner-portal     │  │  └──────────────────────────────┘   │
│  └─────────────────────┘  │                                     │
│                           │  ┌──────────────────────────────┐   │
│  ┌─────────────────────┐  │  │  Advisor Mobile App (RN Expo)│   │
│  │  Client Web Portal  │  │  │  manthan-ria-advisor-app     │   │
│  │  (Next.js 16)       │  │  │  NEW — to be built           │   │
│  │  manthan-ria-       │  │  └──────────────────────────────┘   │
│  │  client-web-portal  │  │                                     │
│  └─────────────────────┘  │                                     │
└───────────────────────────┴─────────────────────────────────────┘
```

### Shared Architecture Principles

1. **Core Product First** — Core features stay in `main` branch; tenant differences are config, never code forks
2. **Customizations Isolated** — Branding, section ordering, field visibility, feature toggling via config objects
3. **BFF Pattern** — All external API calls go through Next.js API routes (web) or `/app/api/` SDK modules (mobile), never direct from components
4. **Tier-Based Components** — Tier 1 (base/dumb) → Tier 2 (functional) → Tier 3 (business logic)
5. **Feature Flag Gates** — Every tenant-specific UI element is wrapped in `<FeatureGate>` — never raw conditionals

---

## Environments

### Environment Topology

```
                         GitHub (main branch)
                               │
              ┌────────────────┼──────────────────┐
              │                │                   │
         Shared QA         Per-Tenant          Per-Tenant
      (all tenants)          UAT                  PROD
              │                │                   │
    tenant switcher    nswealth-uat.x       nswealth.x
     in UI to pick     prudeno-uat.x        prudeno.x
     any tenant        advent-uat.x         advent.x
```

### Shared QA
- **URL pattern**: `qa.springmoney.in`
- **Purpose**: Internal developer and QA testing
- **Tenant switcher**: A floating UI widget (dev-only) lets testers pick any `CLIENT_ID` without redeployment
- **Data**: Shared test data; no real client data
- **Deployment trigger**: Every push to `main` branch

### Per-Tenant UAT
- **URL pattern**: `[tenant]-uat.[clientdomain].[tld]` — e.g. `nswealth-uat.nswealth.in`
- **Purpose**: Client acceptance testing; business team validates before go-live
- **Data**: Staging Frappe site per tenant (e.g. `nswealthuat.frappe.cloud`)
- **Deployment trigger**: Manual trigger or tag on `main` after QA sign-off

### Per-Tenant PROD
- **URL pattern**: `[tenant].[clientdomain].[tld]` — e.g. `app.nswealth.in`
- **Purpose**: Live advisors and clients; real data
- **Data**: Production Frappe site per tenant (e.g. `nswealth.frappe.cloud`)
- **Deployment trigger**: Manual approval gate after UAT sign-off

### URL Naming Convention

| App | QA | UAT | PROD |
|---|---|---|---|
| Advisor Web | `qa-advisor.springmoney.in` | `nswealth-uat.nswealth.in` | `app.nswealth.in` |
| Client Web | `qa-client.springmoney.in` | `client-uat.nswealth.in` | `client.nswealth.in` |
| Client Mobile | TestFlight / internal track | UAT build on TestFlight | App Store (client account) |
| Advisor Mobile | TestFlight / internal track | UAT build on TestFlight | App Store (client account) |

### Environment Variables Per App (Web)

```bash
# Shared QA — one deployment, tenant chosen at runtime
NEXT_PUBLIC_CLIENT_ID=qa           # special value; loads all tenants for switcher
NEXT_PUBLIC_FRAPPE_BASE_URL=...    # shared QA Frappe site

# Per-Tenant UAT (one container per tenant)
NEXT_PUBLIC_CLIENT_ID=nswealth-uat
NEXT_PUBLIC_FRAPPE_BASE_URL=https://nswealthuat.frappe.cloud

# Per-Tenant PROD
NEXT_PUBLIC_CLIENT_ID=nswealth-prod
NEXT_PUBLIC_FRAPPE_BASE_URL=https://nswealth.frappe.cloud
```

---

## Multi-Tenant

### Problem: Git Branches = Divergence

**Current state** (both web and mobile): Each tenant has its own git branch (`ria-nswealth`, `ria-prudeno`, `nsw-ria`, `prudeno-ria`). This creates:
- Code divergence: Bug fixes applied to one branch, missed in others
- Manual sync required on every release
- Impossible to onboard tenant #5+ without exponential maintenance overhead

### Target State: Config-Driven Single Repo

```
main branch
  └── config/features/client-configs.ts
        ├── nswealth: { branding: {...}, features: {...}, sectionConfig: {...} }
        ├── prudeno:  { branding: {...}, features: {...}, sectionConfig: {...} }
        └── advent:   { branding: {...}, features: {...}, sectionConfig: {...} }
```

One deployment per environment; `NEXT_PUBLIC_CLIENT_ID` selects the config at build time.

### Three Levels of Tenant Customization

#### Level 1: Branding (Colors, Logo, Firm Name)

Each client config includes a `branding` block:
```typescript
branding: {
  firmName: 'NS Wealth',
  logoPath: '/tenant-assets/nswealth/logo.svg',
  logoIconPath: '/tenant-assets/nswealth/logo-icon.svg',
  primaryColor: '32 72 82',          // R G B — injected as CSS var
  primaryDark: '20 48 58',
  primaryLight: '64 128 148',
  primaryGradient: 'linear-gradient(90deg, ...)',
  favicon: '/tenant-assets/nswealth/favicon.ico',
}
```

`ThemeProvider` component injects these as CSS custom properties on `document.documentElement` at runtime, overriding the defaults in `globals.css` without touching that file.

#### Level 2: Structural Customization (Tabs, Sections, Ordering)

```typescript
sectionConfig: {
  profile: {
    accordions: [
      { key: 'personal_details', label: 'Personal Details', subsections: [...] },
      { key: 'assets', label: 'Assets' },              // prudeno: assets before cashflow
      { key: 'liabilities', label: 'Liabilities' },
      { key: 'cash_flow', label: 'Cash Flow' },
      { key: 'health_lifestyle', label: 'Health & Lifestyle', featureFlag: 'data_collection.health_lifestyle' }
    ]
  },
  planning: {
    tabs: [
      { key: 'asset_mapping', label: 'Asset Mapping' },
      { key: 'financial_plan', label: 'Financial Plan', variant: 'coming_soon' }, // prudeno
      { key: 'calculators', label: 'Calculators' },
      { key: 'tools', label: 'Tools', featureFlag: 'planning.retirement_expense_tracker' } // nswealth only
    ]
  }
}
```

#### Level 3: Field-Level Customization

```typescript
fieldConfig: {
  'personal_details.address': {
    visibleFields: ['address_line1', 'city', 'state', 'pin', 'country'],
    layout: 'two-col'
  },
  'personal_details.basic': {
    visibleFields: ['name', 'dob', 'pan', 'tax_id', 'citizenship'],  // prudeno: adds tax_id for NRI
  }
}
```

Validation rules per tenant already stored in:
```
lib/validation/rules/clients/
  prudeno-prod/validation.json    ← NRI/OCI custom field requirements
  nswealth-uat/validation.json
  default/...
```

### Mobile Multi-Tenancy

Same codebase, separate build configs per tenant → each tenant gets their own App Store listing.

**Android (AAB)**: GitHub Actions on self-hosted EC2 runner (same infra as web)
**iOS (IPA)**: GitHub Actions on GitHub-hosted `macos-latest` runner (no self-hosted Mac required)

Each tenant's app is submitted under the **client's own Apple Developer / Google Play account**.

**Android build config** (env vars injected at build time):
```bash
EXPO_PUBLIC_CLIENT_ID=nswealth-prod
EXPO_PUBLIC_APP_NAME="NS Wealth"
EXPO_PUBLIC_API_SUITE_BASE_URL=https://api.nswealth.springmoney.in
EXPO_PUBLIC_FRAPPE_BASE_URL=https://nswealth.frappe.cloud
```

**iOS** still uses EAS Build (no self-hosted Mac runner option) — one EAS profile per tenant in `eas.json`.

---

## App Architecture

### Advisor Web Portal (`manthan-ria-planner-portal`)

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS + CSS variables (theme-driven)
- **State**: React Query + React Context
- **Forms**: React Hook Form + FormRenderer (dynamic)
- **Auth**: OTP + session cookie via `/api/create-session`

**Key Modules**:
```
app/
  accounts/[id]/   ← Client internal page (Profile / Planning / Portfolio tabs)
  clients/         ← Client list with filters and bulk actions
  crm/             ← Leads, Deals, Contacts, Organizations, Notes, Tasks, Call Logs
  task-center/     ← Task management
  reconciliation/  ← CAS import, RTA feed
  api/             ← BFF routes — all external API calls
components/
  BaseComponents/  ← Tier 1: dumb UI
  BSE/             ← Tier 2/3: BSE exchange integration
  account/         ← Tier 3: client-internal business logic
  SidePanels/      ← Right-side slide panels
config/features/   ← Multi-tenant feature flags + branding + section config
```

**Component Hierarchy (3 Tiers)**:
- Tier 1 (Base): TextInput, SelectInput, DataTable, BaseAccordion — zero business logic
- Tier 2 (Functional): EmailInput with validation, CityDropdown fetching cities — light logic
- Tier 3 (Business): UserAdditionForm, PlanCreator wizard — full business rules

### Client Web Portal (`manthan-ria-client-web-portal`)

- **Framework**: Next.js 16 with Turbopack + App Router
- **Same stack and tier pattern** as advisor portal
- **Key difference**: Client-facing flows (onboarding, KYC, risk profile, portfolio view)

**Key Modules**:
```
app/
  dashboard/          ← Portfolio overview, action centre
  portfolio/          ← Holdings, allocation, performance charts
  goals/              ← Financial goals
  onboarding/         ← KYC, risk profile, agreements, fee payment
  account-aggregator/ ← Bank linkage via AA
  data-collection-dashboard/ ← Multi-step data collection
  login/              ← OTPless-based auth
```

### Client Mobile App (`manthan-ria-app`)

- **Framework**: Expo SDK 54, React Native 0.81.5
- **Routing**: Expo Router v6 (file-based, mirrors web App Router)
- **Styling**: NativeWind v4 (TailwindCSS for RN)
- **Build**: GitHub Actions self-hosted EC2 (Android AAB) + GitHub-hosted macOS (iOS IPA)
- **Feature flags**: Same `config/features/` system as web

**Key Screens**:
```
app/
  login/              ← OTP auth
  onboarding/         ← KYC, risk profile, agreements
  dashboard/          ← Portfolio overview, goals summary
  account-aggregator/ ← Bank linkage
  data-collection-dashboard/
  visitor/            ← Guest/demo mode
```

**Multi-tenant**: Move from git branches to per-tenant build configs + same feature flag system as web portals.

### Advisor Mobile App (New — To Be Built)

- **Framework**: Expo SDK 54, React Native (same as client mobile)
- **Target**: Mirror key functionality of the advisor web portal on mobile
- **Priority screens**:
  - Client list with search/filter
  - Client profile view (read-only initially)
  - Task centre
  - CRM quick actions (add lead, log call)
  - Notifications

**Architecture**: Start from same base as `manthan-ria-app` with advisor-specific screens added.

---

## Deployment

### Web Portal Deployment Pipeline

```
Developer
    │ push code
    ▼
GitHub (main branch)
    │ GitHub Actions CI/CD
    ▼
Docker image built + pushed to ECR / GHCR
    │
    ├──► Shared QA EC2
    │      └── docker-compose up (single container, all tenants selectable)
    │
    ├──► Per-Tenant UAT EC2 (manual trigger)
    │      └── Traefik routes *.uat.domain → correct container
    │          nswealth-uat container / prudeno-uat container / ...
    │
    └──► Per-Tenant PROD EC2 (approval gate)
           └── Traefik routes *.domain → correct container
               Blue-green swap for zero downtime
```

### Infrastructure Option Comparison

| Option | Zero Downtime | Complexity | Cost | Recommendation |
|---|---|---|---|---|
| **Traefik + Docker Compose** | ✅ Rolling restart | Low | ~EC2 only | ✅ **Best for current scale** |
| **Docker Swarm** | ✅ Rolling update | Medium | ~EC2 only | Good alternative |
| **Kubernetes (K8s)** | ✅ Rolling update | Very High | Higher (EKS) | Overkill for <50 tenants |
| **Vercel** | ✅ Built-in | Very Low | $$$ per tenant | Consider only if EC2 becomes painful |

### Recommended: Traefik + Docker Compose

**Why Traefik:**
- Routes `nswealth-uat.nswealth.in` → `nswealth-uat` Docker container automatically via labels
- Automatic Let's Encrypt SSL per subdomain
- Built-in health checks and circuit breakers
- Zero downtime via container replacement (start new → verify healthy → stop old)
- Dashboard for visibility

**Setup per EC2:**
```yaml
# docker-compose.yml (UAT server)
services:
  traefik:
    image: traefik:v3
    ports: ["80:80", "443:443"]
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./letsencrypt:/letsencrypt

  nswealth-advisor-uat:
    image: springmoney/advisor-portal:latest
    environment:
      - NEXT_PUBLIC_CLIENT_ID=nswealth-uat
    labels:
      - "traefik.http.routers.nswealth-advisor-uat.rule=Host(`nswealth-uat.nswealth.in`)"

  prudeno-advisor-uat:
    image: springmoney/advisor-portal:latest
    environment:
      - NEXT_PUBLIC_CLIENT_ID=prudeno-uat
    labels:
      - "traefik.http.routers.prudeno-advisor-uat.rule=Host(`prudeno-uat.prudeno.in`)"
```

**Zero downtime update flow:**
1. GitHub Actions builds new Docker image
2. Tags it with git SHA: `springmoney/advisor-portal:abc1234`
3. SSH into EC2 → pulls new image
4. `docker-compose up -d --no-deps --build [service]` → Traefik drains and switches
5. Old container stops only after new is healthy (health check endpoint: `/api/health`)

**Log management:**
- All container logs → `docker-compose logs -f` or forwarded to CloudWatch via `awslogs` driver
- Traefik access logs → separate file for per-tenant request tracing

### Mobile Deployment Pipeline

#### Android (AAB) — Self-Hosted EC2 Runner

```
Developer
    │ push to main / manual trigger
    ▼
GitHub Actions (runs-on: self-hosted EC2)
    │ Pre-installed: Node, Java 17, Android SDK
    │ Inject env vars from GitHub Secrets (per-tenant environment)
    │ Set versionCode + versionName in build.gradle
    │ Setup keystore signing from ANDROID_KEYSTORE_BASE64 secret
    │ ./gradlew bundleRelease
    ▼
.aab artifact → uploaded to S3 (builds/[timestamp]/[TENANT]-[version].aab)
    │
    └──► Slack notification (S3 download link)
         → Developer submits to client's Google Play Console
```

**Key GitHub Secrets per tenant environment**:
```
EXPO_PUBLIC_CLIENT_ID
EXPO_PUBLIC_API_SUITE_BASE_URL
EXPO_PUBLIC_FRAPPE_BASE_URL
ANDROID_KEYSTORE_BASE64        ← base64 encoded .keystore file
ANDROID_KEYSTORE_PASSWORD
ANDROID_KEY_ALIAS
ANDROID_KEY_PASSWORD
AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY  ← for S3 upload
SLACK_WEBHOOK_URL
```

**Post-build cleanup**: Gradle build dir + `.gradle` cache cleared to manage EC2 disk space. If disk >80%, `node_modules` and Gradle wrapper are also purged.

#### iOS (IPA) — GitHub-Hosted macOS Runner

```
Developer
    │ push to main / manual trigger
    ▼
GitHub Actions (runs-on: macos-latest)
    │ EAS Build for iOS (no self-hosted Mac available)
    │ eas build --profile [nswealth-prod|prudeno-prod|...] --platform ios
    ▼
.ipa → submitted to client's Apple Developer account via EAS Submit
```

Each tenant provides their Apple credentials → stored in EAS secrets per profile.

### Deployment Process Steps

1. Developer pushes code to `main`
2. GitHub Actions runs: lint → tests → build
3. If QA: auto-deploy shared QA container
4. If UAT: PM manually triggers workflow for specific tenant
5. QA team verifies on UAT (real Frappe UAT site, real data)
6. Tech Lead approves Production deployment
7. GitHub Actions builds production image
8. Zero-downtime swap via Traefik on PROD EC2
9. Smoke test via `/api/health` + manual spot check

---

## Security

### Security Principles

| Principle | Implementation |
|---|---|
| **Tenant Isolation** | `NEXT_PUBLIC_CLIENT_ID` determines which Frappe site (DB) is called — never mixed |
| **API Route Protection** | All external calls via Next.js BFF routes; `requireFeature()` guard blocks disabled features |
| **OTP Authentication** | OTPless integration — no passwords stored; session cookies are httpOnly |
| **Feature-Based Access** | `FeatureGate` component + `requireFeature()` API wrapper — 403 if feature disabled for tenant |
| **No Hardcoded Credentials** | All API keys + secrets in env vars / GitHub Secrets / EAS secrets; never in code |
| **HTTPS** | Traefik + Let's Encrypt auto-renews SSL per subdomain |
| **Audit Logging** | All API calls through BFF routes — request logs capture tenant + user ID |

### Security Architecture Layers

```
Browser / Mobile App
      │ HTTPS (TLS 1.3 via Traefik)
      ▼
Next.js BFF (API Routes)
      │ requireFeature() check → 403 if disabled
      │ Session validation
      ▼
Frappe ERPNext (per-tenant site)
      │ Role-based permissions (Advisor Admin, Advisor Staff, Client, Spring Money Support)
      │ Site-level DB isolation (separate DB per advisor firm)
      ▼
Data Layer
```

### Mobile Security

- API calls from mobile go through the same API Suite BFF — not directly to Frappe
- `EXPO_PUBLIC_*` vars are build-time — sensitive keys never exposed at runtime
- GitHub Secrets (per-environment) store Android keystore + API credentials — never in repo
- EAS Secrets store iOS per-tenant credentials for App Store submission
- Biometric auth support (FaceID / Fingerprint) for mobile login

---

## Infrastructure

### Current Setup

| App | Hosting | Instance |
|---|---|---|
| Advisor Web Portal | AWS EC2 | t3.medium (per tenant deployment) |
| Client Web Portal | AWS EC2 | t3.medium (per tenant deployment) |
| Client Mobile App (Android) | Self-hosted EC2 runner + S3 | Shared with web infra EC2 |
| Client Mobile App (iOS) | GitHub-hosted macOS + EAS | EAS for iOS only |
| Advisor Mobile App (Android) | Self-hosted EC2 runner + S3 | Shared with web infra EC2 |
| Advisor Mobile App (iOS) | GitHub-hosted macOS + EAS | EAS for iOS only |

### Proposed EC2 Layout

```
AWS Region: ap-south-1 (Mumbai)

EC2: springmoney-qa (t3.medium)
  └── Docker Compose
        ├── traefik (reverse proxy + SSL)
        ├── advisor-portal-qa    (NEXT_PUBLIC_CLIENT_ID=qa)
        └── client-portal-qa     (NEXT_PUBLIC_CLIENT_ID=qa)

EC2: springmoney-uat (t3.medium)
  └── Docker Compose
        ├── traefik
        ├── nswealth-advisor-uat
        ├── nswealth-client-uat
        ├── prudeno-advisor-uat
        ├── prudeno-client-uat
        └── advent-advisor-uat

EC2: springmoney-prod (t3.large or c5.xlarge)
  └── Docker Compose
        ├── traefik
        ├── nswealth-advisor-prod
        ├── nswealth-client-prod
        ├── prudeno-advisor-prod
        └── ...
```

### Cost at 10 Tenants

| Component | Cost/month |
|---|---|
| QA EC2 (t3.medium) | ~₹2,500 |
| UAT EC2 (t3.medium) | ~₹2,500 |
| PROD EC2 (t3.large) | ~₹5,000 |
| S3 (build artifacts) | ~₹500 |
| EAS Build (iOS only) | ~$29/month (~₹2,400) |
| Route 53 / DNS | ~₹500 |
| **Total** | **~₹13,400/month** |

Note: Same EC2 serves all tenants via Docker containers — no per-tenant infra cost for web. Android AAB builds reuse existing EC2 self-hosted runner — no additional infra cost.

### Autoheal & Zero Downtime

```yaml
# docker-compose.yml addition
services:
  autoheal:
    image: willfarrell/autoheal
    environment:
      - AUTOHEAL_CONTAINER_LABEL=autoheal
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

- Each app container has `HEALTHCHECK` → `/api/health` endpoint (returns 200)
- `autoheal` restarts any container that fails health check
- Traefik zero-downtime: new container is healthy before old is stopped

---

## Monorepo, Shared Packages & Micro-Frontends

### The Case for a Monorepo

Currently Spring Money maintains 4 separate repos. The same business logic appears in multiple places: tenant configs in advisor web, client web, and both mobile apps. TypeScript types for API responses are duplicated. Validation rules live in per-app JSON files. Feature flag configs must be kept in sync manually.

A **monorepo** (single git repo, multiple apps and packages) eliminates this duplication.

### Proposed Monorepo Structure (Turborepo)

```
spring-money-frontend/           ← one monorepo
  apps/
    advisor-web/                 ← manthan-ria-planner-portal (Next.js 15)
    client-web/                  ← manthan-ria-client-web-portal (Next.js 16)
    advisor-mobile/              ← manthan-ria-advisor-app (Expo 54)
    client-mobile/               ← manthan-ria-app (Expo 54)
  packages/
    config/                      ← feature flags, tenant configs, branding (SHARED)
    ui-web/                      ← React component library (web only)
    ui-mobile/                   ← React Native component library (mobile only)
    design-tokens/               ← platform-agnostic design system (colors, spacing, type)
    api-client/                  ← TypeScript types for all API responses (SHARED)
    validation/                  ← shared validation rules + per-tenant JSONs
  turbo.json                     ← build pipeline config
  package.json                   ← workspace root
```

**Why Turborepo:**
- Incremental builds — only rebuild what changed
- Remote caching — CI doesn't rebuild unchanged packages
- Parallel task execution across apps
- Simple migration from existing repos (git history preserved via git subtree)

### What Gets Shared (packages/)

| Package | What it contains | Used by |
|---|---|---|
| `@spring/config` | Feature flags, `client-configs.ts`, branding, `sectionConfig`, `fieldConfig` | All 4 apps |
| `@spring/api-client` | TypeScript types for Frappe/API Suite responses, request utilities | All 4 apps |
| `@spring/validation` | Validation rule engine + per-tenant JSON files | All 4 apps |
| `@spring/design-tokens` | Color palette, spacing scale, typography — platform-agnostic | ui-web + ui-mobile |
| `@spring/ui-web` | React components (TextInput, DataTable, SidePanel, etc.) | advisor-web + client-web |
| `@spring/ui-mobile` | React Native components (Input, Card, Modal, etc.) | advisor-mobile + client-mobile |

### Migration Path

1. Create new monorepo with Turborepo
2. Move `config/features/` from advisor-web into `packages/config/` — update imports
3. Move shared TypeScript types into `packages/api-client/`
4. Copy existing apps into `apps/` directory (with git history via git subtree)
5. Gradually extract shared components into `packages/ui-web/` and `packages/ui-mobile/`

---

### Shared Component Library + Design System

#### Design Tokens (Platform-Agnostic)

A single source of truth for the design language — consumed by both web (CSS vars) and mobile (NativeWind theme):

```typescript
// packages/design-tokens/tokens.ts
export const tokens = {
  colors: {
    primary: { DEFAULT: 'rgb(32 72 82)', dark: 'rgb(20 48 58)', light: 'rgb(64 128 148)' },
    text: { primary: '#1A1A2E', secondary: '#6B7280', disabled: '#9CA3AF', inverse: '#FFFFFF' },
    status: { success: '#10B981', error: '#EF4444', warning: '#F59E0B' },
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48 },
  radius: { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
  typography: {
    fontFamily: { sans: 'Inter', mono: 'JetBrains Mono' },
    fontSize: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24 },
  }
}
```

- **Web** (`packages/ui-web`): Tokens injected as CSS variables via `ThemeProvider`; components use Tailwind CSS
- **Mobile** (`packages/ui-mobile`): Tokens map to NativeWind theme config; components use `className` with NativeWind

#### Web Component Library (`@spring/ui-web`)

Built on top of existing `BaseComponents/` — extracted into the shared package:
- **Forms**: TextInput, SelectInput, NumberInput, DatePicker, FileUpload
- **Data**: DataTable, DataGrid, Pagination, EmptyState
- **Feedback**: Toast, Modal, Drawer/SidePanel, Skeleton, Spinner
- **Navigation**: Tabs, Accordion, Breadcrumb, Pagination
- **Layout**: Card, Section, PageHeader

Tooling: **Storybook** for documentation + visual regression testing (one story per component, all variants shown).

#### Mobile Component Library (`@spring/ui-mobile`)

Mirror of web components adapted for React Native:
- **Forms**: TextInput, SelectInput, DatePicker (native modal), OTP input
- **Data**: FlatList card, EmptyState, PullToRefresh wrapper
- **Feedback**: Toast (Animated), BottomSheet, Skeleton, ActivityIndicator
- **Navigation**: TabBar, Accordion (Reanimated), BackButton

Tooling: **Storybook React Native** (optional) or a dedicated `screens/Storybook` debug screen in the app.

---

### Micro-Frontends (Brainstorm — Future Architecture)

> This section is forward-looking. At current team size (4 devs), micro-frontends add overhead. Revisit when the team grows to 3+ feature teams or when the platform has 5+ major sections with independent release cadences.

#### What Are Micro-Frontends?

Instead of one monolithic Next.js app, each major section becomes an independently deployable frontend module:

```
advisor-portal/            ← Shell app (nav, auth, routing)
  ↳ mfe-client-profile/   ← Profile + Planning + Portfolio
  ↳ mfe-crm/              ← CRM (Leads, Deals, Contacts, Orgs)
  ↳ mfe-reconciliation/   ← CAS import, RTA feed
  ↳ mfe-task-center/      ← Task management
```

Each MFE is independently deployable — the CRM team can ship without touching profile code.

#### Options Compared

| Approach | How it works | Best for |
|---|---|---|
| **Next.js Multi-Zones** | Separate Next.js apps on same domain, composed via `rewrites` in root `next.config.js` | Simple, no new tooling — recommended if we go this route |
| **Module Federation** | Webpack 5 shares live components between apps at runtime | Complex, powerful — overkill until 5+ teams |
| **iFrame composition** | Legacy approach, poor UX (shared state, scrolling issues) | Not recommended |

#### Current Verdict

**Not now.** Multi-zones add build complexity and shared state management overhead. The current monorepo approach with a shared component library achieves most of the benefits without the deployment complexity.

**Trigger to revisit**: Team grows to 3+ squads each owning a major section, or release cadences diverge significantly (CRM shipping daily while Portfolio ships monthly).

---

## Tenant Tiers

### Three Tiers of Tenants

Spring Money serves three categories of financial firms with different levels of customization need, onboarding complexity, and infrastructure requirements.

| | **Tier A** | **Tier B** | **Tier C** |
|---|---|---|---|
| **Who** | Small MFDs (<₹100cr AUM) | Large MFDs + RIAs | Big PMS / AMCs |
| **Customization** | Branding + feature hiding only | Branding + structural config + field config | Full custom + on-premises deployment option |
| **Onboarding SLA** | **< 1 day** | **< 1 week** | **< 3 weeks** |
| **Timeline** | Now | Now | Planned: 6 months out |

---

### Tier A — Small MFDs (Self-Service, <1 day onboarding)

**Who**: Mutual fund distributors with less than ₹100cr AUM. Single advisor or small team. Want a branded client app fast with minimal IT overhead.

**What they get**:
- Branding: logo, firm name, brand colors, favicon
- Feature hide/show: disable CRM, Reconciliation, advanced tools they don't need
- Standard section layout — no structural changes

**Onboarding process** (< 1 business day):
1. Client submits branding assets + color codes via onboarding form
2. Spring Money engineer adds config entry in `client-configs.ts` + branding assets
3. DNS record added for subdomain (`[tenant].springmoney.in` or client domain)
4. Traefik label added to docker-compose + container deployed
5. Mobile AAB/IPA built with tenant build config → handed to client for store upload
6. **Done** — no code changes, no custom development

**Technical profile**: Fully covered by existing feature flag system. No `sectionConfig` needed.

---

### Tier B — Large MFDs + RIAs (Guided Onboarding, <1 week)

**Who**: Established wealth managers and RIAs with larger teams. Need white-label app with sections tailored to their workflow (e.g., different accordion order, extra data fields for NRI clients, custom planning tabs).

**What they get**:
- Everything in Tier A
- Structural customization: `sectionConfig` (tab order, section order, which sections appear)
- Field-level customization: `fieldConfig` (which fields visible per section, field layouts)
- Custom validation rules per tenant (`lib/validation/rules/clients/[tenant]/validation.json`)
- Tenant-specific BFF routes where needed (e.g., EPF fetch, credit card APIs)

**Onboarding process** (< 1 week):
1. Discovery call: Spring Money engineer documents the structural differences required
2. Config work: `sectionConfig`, `fieldConfig`, validation JSON authored for this tenant
3. Any net-new sections/components built if not already in component registry
4. QA on UAT environment (tenant-specific Frappe site)
5. PROD deployment + mobile build + store submission

**Technical profile**: Uses all 3 levels of customization (branding + structural + field). May require 1–2 days of dev work for net-new components.

---

### Tier C — Big PMS / AMCs (Enterprise, <3 weeks — Planned: 6 months out)

**Who**: Portfolio Management Services firms and Asset Management Companies. Regulated entities with specific compliance requirements. May need on-premises deployment due to data residency or internal IT policy.

**What they get**:
- Everything in Tier A + B
- On-premises deployment: Docker Compose package or Kubernetes Helm chart for client's own infrastructure
- Custom branding at a deeper level (custom login flows, custom dashboard layouts if needed)
- Dedicated support SLA during rollout
- Possible dedicated Frappe site on client's own cloud account

**Onboarding process** (< 3 weeks):
1. Week 1: Technical scoping, infrastructure audit, compliance review
2. Week 2: Configuration + any custom components, integration testing on client's staging infra
3. Week 3: UAT on production infrastructure, sign-off, go-live

**Infrastructure deliverable**:
```
# Docker Compose package for on-premises deployment
docker-compose.yml        ← pre-configured for client
.env.template             ← secrets template
nginx.conf / traefik.yml  ← reverse proxy config
scripts/
  setup.sh                ← automated setup script
  update.sh               ← pull latest image + zero-downtime swap
  health-check.sh
README.md                 ← ops runbook for client's IT team
```

**Additional resources needed for Tier C** (when we onboard first Tier C client):
- **1 DevOps Engineer** (contract/part-time): Manages on-premises deployment packaging, K8s Helm chart if needed, client infra support
- **1 additional Senior Developer** (or Tech Lead bandwidth): Custom component work for unique AMC/PMS workflows

---

### Tier Summary Table

| Capability | Tier A | Tier B | Tier C |
|---|---|---|---|
| Branding (colors, logo, favicon) | ✅ | ✅ | ✅ |
| Feature flag toggling | ✅ | ✅ | ✅ |
| Section/tab ordering | ❌ | ✅ | ✅ |
| Field-level customization | ❌ | ✅ | ✅ |
| Custom validation rules | ❌ | ✅ | ✅ |
| Net-new custom components | ❌ | Limited | ✅ |
| On-premises deployment | ❌ | ❌ | ✅ |
| Mobile app (own store account) | ✅ | ✅ | ✅ |
| Dedicated support SLA | ❌ | ❌ | ✅ |
| **Onboarding SLA** | **< 1 day** | **< 1 week** | **< 3 weeks** |

---

## Team Structure

### Frontend Engineering Team

| Role | Count | Primary Focus | Secondary |
|---|---|---|---|
| **Frontend Tech Lead (Senior)** | 1 | Architecture across all 4 apps, multi-tenant system design, PR reviews, DevOps/infra decisions | Hands-on for complex features across web + mobile |
| **App Developer** | 1 | Client mobile app + Advisor mobile app (React Native Expo) | Mobile build pipelines (GitHub Actions, EC2 runner) |
| **Web Developer** | 1 | Advisor web portal + Client web portal (Next.js) | Multi-tenant config system, BFF API routes |
| **UI/UX Engineer** | 1 | Design system, animations, micro-interactions, UI polish across all 4 apps | Component library (`@spring/ui-web` + `@spring/ui-mobile`), Storybook |
| **QA Engineer** | 2 | Web + mobile testing across all tenants and environments | Regression testing, cross-tenant validation |

### Role Details

**App Developer (1–2 yrs exp)**
- Owns `manthan-ria-app` (client) and `manthan-ria-advisor-app` (advisor)
- Implements screens, navigation, and API integrations
- Manages Android build pipeline (self-hosted EC2 runner) and EAS iOS builds
- Maintains build configs and `config/features/` for mobile

**Web Developer (1–2 yrs exp)**
- Owns `manthan-ria-planner-portal` (advisor) and `manthan-ria-client-web-portal` (client)
- Implements features, API routes (BFF pattern), and tenant config
- Manages multi-tenant `sectionConfig`, `fieldConfig`, and validation rules per client

**UI/UX Engineer (1–2 yrs exp)**
- Owns the visual quality layer across all 4 apps
- Implements animations (Framer Motion on web, Reanimated on mobile), transitions, skeleton loaders
- Maintains the design token system (`packages/design-tokens`) — CSS vars on web, NativeWind tokens on mobile
- Owns `@spring/ui-web` and `@spring/ui-mobile` shared component libraries + Storybook
- Bridges Figma designs to production code; owns component polish and pixel-perfectness
- Works across both web and mobile — not locked to one surface

### Engineering Philosophy — 3 Strict Principles

1. **Core Product First**: All features go to `main`. Never develop on tenant branches.
2. **Config Not Code**: Any tenant difference = a config change, never a code fork.
3. **Feature Flag Everything**: Any UI that is tenant-conditional must be behind `<FeatureGate>`.

### Time Breakdown (Target)

| Activity | % Time |
|---|---|
| Core platform development | 35% |
| UI refinement (animations, polish, client-side UX) | 10% |
| Tenant onboarding / config | 15% |
| Bug fixes & maintenance | 15% |
| Mobile apps | 15% |
| DevOps / infra | 10% |

---

## Developer FAQ

**Q1: Why not use separate branches per tenant?**
Branch-based multi-tenancy causes divergence. A bug fix on `main` must be manually cherry-picked to every tenant branch — this becomes impossible at 10+ tenants. Config-driven architecture puts the difference in a data structure, not code.

**Q2: How do I add a new tenant?**
1. Add a client config entry in `config/features/client-configs.ts`
2. Add branding assets in `public/tenant-assets/[tenant]/`
3. Add `.env` file for the new tenant's Frappe URLs
4. Add Traefik label for new subdomain in `docker-compose.yml`
5. Done — no code changes.

**Q3: How do I add a new section that only one tenant needs?**
1. Add a feature flag key in `config/features/types.ts`
2. Build the section component
3. Register it in `config/features/component-registry.ts`
4. Add it to that tenant's `sectionConfig.profile.accordions`
5. Set `featureFlag` to guard it — other tenants see nothing.

**Q4: How do mobile builds work for multiple tenants?**
**Android**: GitHub Actions workflow on self-hosted EC2 runner. Workflow is manually triggered with `versionCode` + `version` inputs. Per-tenant env vars and keystore are injected from GitHub Secrets (per environment). `gradlew bundleRelease` produces an `.aab`, which is uploaded to S3. A Slack message with the download link is sent. The developer then submits to the client's Google Play Console.

**iOS**: EAS Build on GitHub-hosted `macos-latest` runner. Each tenant = one EAS build profile in `eas.json`. Running `eas build --profile nswealth-prod --platform ios` produces an `.ipa`. Spring Money engineers hand over the build artifact; client manages their own App Store listing.

**Q5: How do I test locally for a specific tenant?**
Set `NEXT_PUBLIC_CLIENT_ID=prudeno-uat` in `.env.local` and restart the dev server. For mobile: set `EXPO_PUBLIC_CLIENT_ID=prudeno-uat` in `.env` and run `npx expo start`.

**Q6: How do I test for ALL tenants quickly?**
Use the Shared QA environment — it has a floating tenant switcher (dev-only UI widget) that changes `CLIENT_ID` at runtime without redeploy.

**Q7: Can the same Next.js Docker image serve multiple tenants?**
Yes — `NEXT_PUBLIC_CLIENT_ID` is a build-time variable baked into the image. Each tenant requires its own image build. This is intentional: tenant config is compiled in, preventing runtime leakage. Each container runs independently.

**Q8: Why a monorepo instead of separate repos?**
Separate repos cause the same problem as separate git branches: `config/features/client-configs.ts` would need to be updated in 4 places every time a new tenant is added. TypeScript API types would diverge. The monorepo puts `@spring/config`, `@spring/api-client`, and `@spring/validation` in shared packages — one change, reflected in all apps.

**Q9: Where should I add new API calls?**
- **Web**: Always add a Next.js API route in `app/api/[feature]/route.ts` — never call external APIs directly from client components
- **Mobile**: Add an API function in `app/api/[feature]/` SDK module — consumed via React hooks
- Wrap with `requireFeature()` if the API is tenant-specific

---

## Summary: What Changes Per Tenant

| Element | Customizable | Mechanism |
|---|---|---|
| Brand colors (buttons, borders, active states) | ✅ | CSS vars via ThemeProvider |
| Logo (sidebar, login page, mobile splash) | ✅ | Branding config → dynamic src |
| Firm name / page title | ✅ | Branding config |
| Favicon | ✅ | Branding config |
| Sidebar nav items (CRM, Reconciliation…) | ✅ | Feature flags (existing) |
| Profile accordion ORDER | ✅ | sectionConfig.profile.accordions ordering |
| Which accordions/sections appear | ✅ | sectionConfig + feature flags |
| Subsections within an accordion | ✅ | sectionConfig subsections array |
| Planning sub-tabs (which, order, variant) | ✅ | sectionConfig.planning.tabs |
| Fields shown within a subsection | ✅ | fieldConfig per section key |
| Validation rules per field | ✅ | lib/validation/rules/clients/[tenant]/ |
| Tenant-specific API routes (credit cards, EPF…) | ✅ | BFF routes with requireFeature() |
| Mobile app bundle ID + store account | ✅ | Per-tenant build config (Android: GitHub Secrets, iOS: EAS profile) |
| Mobile app name + icon on home screen | ✅ | Build env vars + app.json per profile |
| Layout structure (sidebar + main area) | ❌ | Same for all tenants |
| Component visual hierarchy | ❌ | Same for all tenants |
| Navigation framework | ❌ | Same for all tenants |

---

## Appendix: Repo Map

| Repo | Purpose | Stack | Status |
|---|---|---|---|
| `manthan-ria-planner-portal` | Advisor Web Portal | Next.js 15 | Live (multi-branch → migrate to config) |
| `manthan-ria-client-web-portal` | Client Web Portal | Next.js 16 | Live (feature flags partially done) |
| `manthan-ria-app` | Client Mobile App | Expo 54 / RN | Live (multi-branch → migrate to per-tenant build config) |
| `manthan-ria-advisor-app` | Advisor Mobile App | Expo 54 / RN | To be built |
| `humfauji-app` | HumFauji Client App | Expo 54 / RN | Live (single-tenant, separate product) |

**Future**: All 4 manthan apps → single Turborepo monorepo (`spring-money-frontend`) with shared `packages/`.
