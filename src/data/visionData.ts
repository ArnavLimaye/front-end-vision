// ============================================================
// FRONTEND VISION DATA — mirrors Architecture Objective content
// ============================================================

export const frontendVisionData = {
  tabs: [
    { id: 'overview', label: 'Overview', icon: '🧱' },
    { id: 'environments', label: 'Environments', icon: '🌐' },
    { id: 'multi-tenant', label: 'Multi-Tenant', icon: '🏗️' },
    { id: 'app-architecture', label: 'App Architecture', icon: '⚙️' },
    { id: 'deployment', label: 'Deployment', icon: '🚀' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'infrastructure', label: 'Infrastructure', icon: '🖥️' },
    { id: 'monorepo', label: 'Monorepo', icon: '📦' },
    { id: 'design-system', label: 'Design System', icon: '🎨' },
    { id: 'observability', label: 'Observability', icon: '📡' },
  ],
  objectives: [
    { title: 'Scalability', desc: 'Support 40–100+ advisor firms without forking code' },
    { title: 'Tenant Isolation', desc: 'Each firm gets its own branding, features, and data boundaries' },
    { title: 'Single Codebase', desc: 'One repo per app; tenants differ only in config + assets' },
    { title: 'Mobile-First', desc: 'Native iOS + Android per client, under client\'s App Store account' },
    { title: 'Maintainability', desc: 'Zero divergence between tenant branches — eliminated by config' },
    { title: 'Rapid Onboarding', desc: 'New tenant live in < 1 day after assets + config are added' },
  ],
  apps: [
    {
      name: 'Advisor Web Portal',
      repo: 'manthan-ria-planner-portal',
      icon: '💼',
      surface: 'Web',
      framework: 'Next.js 15+',
      stack: ['Next.js 15', 'TypeScript', 'TailwindCSS', 'React Query', 'React Hook Form'],
      desc: 'Full-featured advisor platform: client management, CRM, portfolio, task centre, reconciliation.',
      status: 'Live',
    },
    {
      name: 'Client Web Portal',
      repo: 'manthan-ria-client-web-portal',
      icon: '🌱',
      surface: 'Web',
      framework: 'Next.js 16',
      stack: ['Next.js 16', 'TypeScript', 'TailwindCSS', 'Turbopack', 'OTPless Auth'],
      desc: 'Client-facing: onboarding, KYC, risk profile, portfolio view, account aggregator.',
      status: 'Live',
    },
    {
      name: 'Client Mobile App',
      repo: 'manthan-ria-app',
      icon: '📱',
      surface: 'Mobile',
      framework: 'Expo SDK 54',
      stack: ['Expo SDK 54', 'React Native 0.81.5', 'Expo Router v6', 'NativeWind v4'],
      desc: 'Client mobile app: portfolio overview, goals, KYC, account aggregator, biometric login.',
      status: 'Live',
    },
    {
      name: 'Advisor Mobile App',
      repo: 'manthan-ria-advisor-app',
      icon: '📲',
      surface: 'Mobile',
      framework: 'Expo SDK 54',
      stack: ['Expo SDK 54', 'React Native', 'Expo Router', 'NativeWind v4'],
      desc: 'New advisor app: client list, profile view, task centre, CRM quick actions, notifications.',
      status: 'To Be Built',
    },
  ],
  environments: [
    {
      name: 'Shared QA',
      type: 'qa',
      url: 'qa.springmoney.in',
      trigger: 'Every push to main',
      data: 'Shared test data — no real client data',
      desc: 'Internal developer and QA testing. Floating dev-only tenant switcher lets testers pick any CLIENT_ID without redeployment.',
    },
    {
      name: 'Per-Tenant UAT',
      type: 'uat',
      url: '[tenant]-uat.[domain].in',
      trigger: 'Manual trigger or tag after QA sign-off',
      data: 'Staging Frappe site per tenant',
      desc: 'Client acceptance testing. Business team validates before go-live. Real Frappe UAT site per tenant.',
    },
    {
      name: 'Per-Tenant PROD',
      type: 'prod',
      url: 'app.[domain].in',
      trigger: 'Manual approval gate after UAT sign-off',
      data: 'Production Frappe site per tenant',
      desc: 'Live advisors and clients with real data. Blue-green swap via Traefik for zero downtime.',
    },
  ],
  multiTenantLevels: [
    {
      level: 'Level 1',
      title: 'Branding',
      desc: 'Colors, Logo, Firm Name',
      items: ['firmName', 'logoPath', 'primaryColor', 'primaryGradient', 'favicon'],
      detail: 'ThemeProvider injects CSS custom properties on document.documentElement — overrides defaults without touching globals.css.',
    },
    {
      level: 'Level 2',
      title: 'Structural Customization',
      desc: 'Tabs, Sections, Ordering',
      items: ['sectionConfig.profile.accordions', 'sectionConfig.planning.tabs', 'featureFlag gates', 'subsection ordering'],
      detail: 'sectionConfig controls which accordions appear, their order, and what planning tabs are visible per tenant.',
    },
    {
      level: 'Level 3',
      title: 'Field-Level Customization',
      desc: 'Visible Fields, Layouts, Validation',
      items: ['fieldConfig per section key', 'visibleFields array', 'layout grid config', 'per-tenant validation.json'],
      detail: 'Validation rules per tenant stored in lib/validation/rules/clients/[tenant]/. NRI clients get extra fields.',
    },
  ],
  deploymentSteps: [
    { icon: '👨‍💻', title: 'Developer Pushes', desc: 'Push to main branch on GitHub' },
    { icon: '🔄', title: 'GitHub Actions', desc: 'Lint → Tests → Docker image build → Push to ECR/GHCR' },
    { icon: '🐳', title: 'Container Deploy', desc: 'Shared QA: auto-deploy. UAT: manual trigger per tenant. PROD: approval gate.' },
    { icon: '🔀', title: 'Traefik Routing', desc: 'Routes nswealth.in → nswealth container. Auto Let\'s Encrypt SSL.' },
    { icon: '✅', title: 'Health Check', desc: 'New container must pass /api/health → old container stops. Zero downtime.' },
    { icon: '📣', title: 'Slack Notification', desc: 'S3 artifact link + deploy status notification to engineering channel.' },
  ],
  securityPrinciples: [
    { icon: '🔐', key: 'Tenant Isolation', val: 'NEXT_PUBLIC_CLIENT_ID determines which Frappe site (DB) is called — never mixed' },
    { icon: '🛡️', key: 'API Route Protection', val: 'All external calls via Next.js BFF routes; requireFeature() guard blocks disabled features' },
    { icon: '🔑', key: 'OTP Authentication', val: 'OTPless integration — no passwords stored; session cookies are httpOnly' },
    { icon: '🚧', key: 'Feature-Based Access', val: '<FeatureGate> component + requireFeature() API wrapper — 403 if feature disabled for tenant' },
    { icon: '🔒', key: 'No Hardcoded Credentials', val: 'All API keys + secrets in env vars / GitHub Secrets / EAS secrets; never in code' },
    { icon: '🌐', key: 'HTTPS', val: 'Traefik + Let\'s Encrypt auto-renews SSL per subdomain (TLS 1.3)' },
  ],
  infraCosts: [
    { component: 'QA EC2 (t3.medium)', cost: '~₹2,500' },
    { component: 'UAT EC2 (t3.medium)', cost: '~₹2,500' },
    { component: 'PROD EC2 (t3.large)', cost: '~₹5,000' },
    { component: 'S3 (build artifacts)', cost: '~₹500' },
    { component: 'EAS Build (iOS only)', cost: '~₹2,400' },
    { component: 'Route 53 / DNS', cost: '~₹500' },
  ],
  monorepoPackages: [
    { pkg: '@spring/config', desc: 'Feature flags, client-configs.ts, branding, sectionConfig, fieldConfig', usedBy: 'All 4 apps' },
    { pkg: '@spring/api-client', desc: 'TypeScript types for Frappe/API Suite responses, request utilities', usedBy: 'All 4 apps' },
    { pkg: '@spring/validation', desc: 'Validation rule engine + per-tenant JSON files', usedBy: 'All 4 apps' },
    { pkg: '@spring/design-tokens', desc: 'Color palette, spacing scale, typography — platform-agnostic', usedBy: 'ui-web + ui-mobile' },
    { pkg: '@spring/ui-web', desc: 'React components (TextInput, DataTable, SidePanel, etc.)', usedBy: 'advisor-web + client-web' },
    { pkg: '@spring/ui-mobile', desc: 'React Native components (Input, Card, Modal, etc.)', usedBy: 'advisor-mobile + client-mobile' },
  ],
  monorepoGuidingPrinciples: [
    { title: 'Same tenant, same behavior', desc: 'A tenant configured on web must produce identical experience on mobile — same feature flags, same data, same layout logic.' },
    { title: 'Zero platform-specific bugs', desc: 'Bugs that only appear on one platform are architectural failures. Shared Config and API packages eliminate the divergence.' },
    { title: 'Zero duplication', desc: 'Every piece of config, type, or validation logic must live in exactly one package. Copy-paste is a red flag.' },
    { title: 'Shared Config, API, Validate across all apps', desc: '@spring/config, @spring/api-client, and @spring/validation are consumed by all 4 apps — web and mobile alike.' },
  ],
  monorepoExecutionPhases: [
    { phase: 'Phase 1: Monorepo Adoption', weeks: 'Weeks 1–2', desc: 'Adopt monorepo immediately while supporting existing backend constraints via tenant branches.', status: 'current' },
    { phase: 'Phase 2: Shared System Extraction', weeks: 'Weeks 3–6', desc: 'Reduce tenant differences by introducing shared frontend systems (API layer, feature flags, config-driven UI).', status: 'upcoming' },
    { phase: 'Phase 3: Advisor Mobile App Build', weeks: 'Weeks 7–8', desc: 'Build and integrate advisor mobile app using stabilized shared systems.', status: 'upcoming' },
    { phase: 'Phase 4: Unified Multi-Tenant Architecture', weeks: 'Weeks 9–11', desc: 'Move from branch-based tenants to single branch, config-driven multi-tenancy.', status: 'upcoming' },
  ],
}

// ============================================================
// DESIGN SYSTEM DATA — mirrors KPI 2 (Component Library)
// ============================================================

export const designSystemData = {
  adoptionGoals: [
    { metric: 'Shared UI Coverage', target: '≥80%', desc: 'Of all rendered UI elements across all 4 apps' },
    { metric: 'Duplicate Components', target: '0', desc: 'Zero components with identical logic in more than one place' },
    { metric: 'L1 Coverage', target: '100% built, ≥50% adopted', desc: 'All base components built in crunch week (Wks 3–4)' },
    { metric: 'L2 Coverage', target: '100% built, ≥70% forms', desc: 'All form/data/nav components replacing raw implementations' },
    { metric: 'L3 Coverage', target: '5–8 components', desc: 'Business components deployed and used in ≥2 apps each' },
  ],
  componentLevels: [
    {
      level: 'L1',
      title: 'Base UI Components',
      color: 'blue',
      buildWeeks: 'Weeks 3–4',
      adoptionTarget: '≥50% screens',
      desc: 'Primitive, theme-compliant components with zero business logic. Same API surface across web (React) and mobile (React Native).',
      components: ['Button', 'Input', 'Textarea', 'Label', 'Select', 'Checkbox', 'Radio', 'Switch', 'DatePicker', 'Card', 'Modal', 'Drawer', 'Spinner', 'Toast'],
    },
    {
      level: 'L2',
      title: 'Forms, Data & Navigation',
      color: 'amber',
      buildWeeks: 'Weeks 5–7',
      adoptionTarget: '≥70% forms, ≥60% data views',
      desc: 'Composed from L1. Handle layout, data display, navigation structure, and form orchestration. Feature-flag aware.',
      components: ['FormField', 'FormSection', 'ErrorMessage', 'AsyncSelect', 'FieldWrapper', 'DataTable', 'ListCard', 'Tabs', 'Accordion', 'Pagination', 'EmptyState', 'SectionHeader', 'PageHeader'],
    },
    {
      level: 'L3',
      title: 'Business Components',
      color: 'emerald',
      buildWeeks: 'Weeks 8–11',
      adoptionTarget: '5–8 components, used in ≥2 apps',
      desc: 'Domain-aware, cross-app reusable. No tenant-specific logic — tenant behavior flows in via config and feature flags only.',
      components: ['OTPInput', 'AddressForm', 'ProfileSection', 'KYCSection', 'InvestmentCard'],
    },
  ],
  themeArchitecture: {
    flow: [
      { step: 'Tenant Config', desc: 'client-configs.ts provides primaryColor, firmName, logoPath per tenant — the single source of truth.' },
      { step: 'ThemeProvider (Web)', desc: 'Injects CSS custom properties onto document.documentElement at runtime, scoped per tenant.' },
      { step: 'Design Tokens', desc: '@spring/design-tokens — color palette, spacing scale, typography. Platform-agnostic; consumed by both web and mobile packages.' },
      { step: 'CSS Custom Props (Web)', desc: '--color-primary, --color-accent etc. consumed by Tailwind config and all shared web components.' },
      { step: 'NativeWind / Gluestack (Mobile)', desc: 'Theme injected via React context; design tokens map to NativeWind classes and Gluestack theme config.' },
    ],
  },
  timeline: [
    { label: 'Wks 1–2', title: 'Foundation & Theme System', detail: 'Design tokens setup, ThemeProvider (web), theme injection (mobile). 2 tenants running with different themes, 0 hardcoded colors.' },
    { label: 'Wks 3–4', title: 'L1 Build & Adoption (Crunch)', detail: '100% L1 components built in a focused sprint. ≥50% screen adoption across ≥5 key screens per platform.' },
    { label: 'Wks 5–7', title: 'L2 Build & Adoption', detail: 'Forms, Data, Navigation, Structure components. ≥70% of forms use FormField system. ≥60% data views use shared components.' },
    { label: 'Wks 8–11', title: 'L3 Build + Hardening', detail: 'OTPInput → ProfileSection → KYCSection → InvestmentCard. ≥80% shared UI. 0 duplicates. 100% L1 & L2 documented.' },
  ],
}

// ============================================================
// OBSERVABILITY DATA — mirrors KPI 3 (Platform Observability)
// ============================================================

export const observabilityData = {
  zddPipeline: [
    { icon: '👨‍💻', step: 'Developer Pushes', desc: 'Push to main or manual tag triggers the GitHub Actions workflow for the target tenant.' },
    { icon: '🔄', step: 'Build & Test', desc: 'Lint → Tests → Docker image build → Push to GHCR/ECR. All must pass before deploy step begins.' },
    { icon: '🏥', step: 'Traefik Health Gate', desc: 'New container must return HTTP 200 on GET /api/health before Traefik shifts any traffic to it.' },
    { icon: '🔀', step: 'Rolling Swap', desc: 'Traefik atomically shifts traffic to the new container. Old container stops only after health gate passes.' },
    { icon: '🔙', step: 'Automatic Rollback', desc: 'If /api/health fails within 60s → Traefik keeps old container live, new container is stopped, Slack alert fires immediately.' },
  ],
  healthCheckSpec: `# /api/health endpoint contract
GET /api/health → 200 OK
{ "status": "ok", "tenant": "<NEXT_PUBLIC_CLIENT_ID>", "version": "<APP_VERSION>" }

# Traefik docker-compose labels for health gate:
traefik.http.services.advisor.loadbalancer.healthcheck.path=/api/health
traefik.http.services.advisor.loadbalancer.healthcheck.interval=10s
traefik.http.services.advisor.loadbalancer.healthcheck.timeout=5s`,
  loggingArchitecture: [
    {
      platform: 'Web (Next.js BFF)',
      icon: '🌐',
      tool: 'Winston / Bunyan',
      format: 'Structured JSON',
      levels: ['info', 'warn', 'error'],
      detail: 'All API routes emit JSON logs with tenant, version, route, duration, and HTTP status code. Each entry tagged with tenant + app version for Kibana filtering.',
    },
    {
      platform: 'Mobile (React Native)',
      icon: '📱',
      tool: 'Firebase Crashlytics',
      format: 'Crash reports + custom logs',
      levels: ['crash', 'non-fatal', 'custom'],
      detail: 'Crashlytics captures crashes and non-fatal errors. Custom log calls tag tenant + app version for dashboard filtering. Process fully documented for team.',
    },
    {
      platform: 'ELK Stack (Web)',
      icon: '📊',
      tool: 'Elasticsearch + Logstash + Kibana',
      format: 'Kibana dashboards per tenant',
      levels: ['aggregated'],
      detail: 'Logs pulled from all web app containers. Kibana dashboards show per-tenant error rates, API latency, and anomaly spikes. Priority: Production first.',
    },
  ],
  alertingRules: [
    { trigger: 'Error rate spike', threshold: '>5 errors/min for any tenant', channel: 'Slack #engineering', severity: 'critical' },
    { trigger: 'API route failure', threshold: 'HTTP 5xx on /api/* for any tenant', channel: 'Slack #engineering', severity: 'critical' },
    { trigger: 'Slow rendering page', threshold: 'FCP > 3s for 3 consecutive requests', channel: 'Slack #frontend-perf', severity: 'warning' },
    { trigger: 'Mobile crash surge', threshold: '>2 distinct crash signatures in 30 min', channel: 'Slack #mobile-alerts', severity: 'critical' },
  ],
  performanceTargets: [
    { platform: 'Web', metric: 'TTFB', target: '< 200ms', detail: 'Time to First Byte from Next.js BFF — measured via Kibana API latency dashboard.' },
    { platform: 'Web', metric: 'FCP', target: '< 1.8s', detail: 'First Contentful Paint — tracked via Lighthouse CI in GitHub Actions.' },
    { platform: 'Web', metric: 'API Response (p95)', target: '< 500ms', detail: 'BFF-to-Frappe round-trip for core endpoints measured at p95 percentile.' },
    { platform: 'Mobile', metric: 'Tab Load', target: '< 3s', detail: 'Any tab with data fetching — measured from tap to visible data render.' },
    { platform: 'Mobile', metric: 'App Cold Start', target: '< 4s', detail: 'From launch icon tap to interactive home screen — benchmarked per tenant.' },
  ],
  appDistribution: [
    {
      platform: 'Android',
      icon: '🤖',
      tool: 'Firebase App Distribution',
      trigger: 'GitHub Actions (self-hosted EC2)',
      detail: 'Per-tenant AAB built on EC2 runner. Firebase distributes to QA/UAT testers. Slack notification sent on success with download link.',
    },
    {
      platform: 'iOS (Testers)',
      icon: '🍎',
      tool: 'TestFlight',
      trigger: 'GitHub Actions + EAS (macos-latest)',
      detail: 'EAS builds IPA per tenant. Uploaded to TestFlight for UAT sign-off. Per-tenant Apple Connect account used for distribution.',
    },
    {
      platform: 'iOS (Production)',
      icon: '🏪',
      tool: 'App Store',
      trigger: 'Manual submit after TestFlight sign-off',
      detail: 'TestFlight UAT sign-off gates the App Store submission. Target: 1 tenant per week rollout cadence across all active iOS tenants.',
    },
  ],
  frontendObservability: {
    status: 'Planned — Weeks 11–12',
    approach: 'Evaluate 2 frontend logging tools and finalize 1. Pilot on the 5 slowest screens of 1 tenant web app. Add alerts for slow rendering pages. Full instrumentation follows in Week 12.',
    candidates: ['Sentry (Frontend SDK)', 'Datadog RUM'],
    criteria: ['React / Next.js native support', 'Custom performance mark API', 'Per-tenant tagging', 'Slack alerting integration'],
  },
  executionTimeline: [
    { label: 'Wks 1–2', title: 'ZDD & Firebase Distribution', detail: '/api/health endpoint on all tenants, rolling swap via Traefik, Firebase app distribution automated for Android.' },
    { label: 'Wks 3–5', title: 'Logging, ELK & Alerting', detail: 'JSON Winston logs on all web API routes. Crashlytics logging documented for mobile. ELK stack set up with Kibana dashboards. Slack alerting live.' },
    { label: 'Wks 6–8', title: 'Performance Optimization', detail: 'Web: TTFB and FCP targets met. Mobile: no tab exceeds 3s load time. Bottlenecks identified via Kibana and Lighthouse CI.' },
    { label: 'Wks 9–10', title: 'iOS Builds & App Store', detail: 'GitHub Actions automates iOS builds via EAS. First tenant on App Store. Second tenant follows. Full process documented.' },
    { label: 'Wks 11–12', title: 'Frontend Observability', detail: 'Tool evaluated and selected. Slow render alerts configured. Full frontend logging active for 1 web app.' },
  ],
}

// ============================================================
// KPI TRACKER DATA
// ============================================================

export const kpiData = {
  summary: {
    arr: '₹4 Cr',
    targets: '40 WMs',
    tenants: '3 Active',
    teamSize: '6 Eng',
  },
  kpiOverview: {
    document: [
      {
        title: '1. Single Monorepo for Multi-Tenant Frontend (11-Week Plan)',
        outcome: [
          'Monorepo is single source of development (tenant branches initially)',
          'Shared systems (API, flags, config) drastically reduce divergence',
          'Advisor mobile app functional and sharing core systems',
          'Single branch serves all tenants via config-driven architecture',
        ],
        pointers: [
          'Phase 1: Monorepo Adoption with Tenant Branches (Weeks 1–2)',
          'Phase 2: Shared System Extraction (Weeks 3–6)',
          'Phase 3: Advisor Mobile App Build (Weeks 7–8)',
          'Phase 4: Unified Multi-Tenant Architecture (Weeks 9–11)',
          'Key Insight: Immediate value by W2, System maturity by W6, True SaaS state by W11.',
          'One-Line Summary: Adopt fast with branches, stabilize with systems, expand with mobile, and unify into a single config-driven platform.',
        ]
      },
      {
        title: '2. Component Library & Design System (11-Week Plan)',
        outcome: [
          'Unified design system across web and mobile',
          '100% Level 1 & Level 2 components fully reusable',
          '5–8 Level 3 business components deployed',
          '0 duplicate components across apps',
          '≥80% UI uses shared components',
        ],
        pointers: [
          'Week 1-2: Foundation & Theme System (Tokens + Tenant injection)',
          'Week 3-4: Build & Adopt Level 1 Components (Crunch Week)',
          'Week 5-7: Build & Adopt Level 2 Components (Forms, Navigation, Data)',
          'Week 8-10: Build & Adopt Level 3 Components (Business Logic)',
          'Week 11: Adoption Completion & Hardening',
          'Leadership Control: Ensure build AND use. Track adoption. Identify violations.',
          'Hard Stop Criteria: Components built but not used, duplicates appearing, theme mismatch.',
        ]
      },
      {
        title: '3. Platform Observability, Performance & Release Engineering (12-Week Plan)',
        outcome: [
          'Full observability across web (ELK) and mobile (Crashlytics)',
          'High-performance apps across API, rendering, and BFF layers',
          'Stable, automated CI/CD pipelines with rollback',
          'Zero downtime deployments for web apps',
          'Seamless tester & store distribution',
          'Scalable multi-tenant mobile architecture',
        ],
        pointers: [
          'Week 1-2: Zero Downtime Deployment (ZDD) & Firebase App Distribution Execution',
          'Week 3-4: API Logging, Crashlytics & ELK Stack Setup on Production',
          'Week 5-7: Alerting Setup & Web Performance Optimization',
          'Week 8: App Performance Optimization (Tab Loads < 3s)',
          'Week 9-10: iOS Mobile Builds & TestFlight/App Store Distribution',
          'Week 11-12: Frontend Logging Exploration & Slow Render Alerting',
        ]
      },
      {
        title: '4. Leadership — Core Autonomy, Feedback & Velocity (10-Week Plan)',
        outcome: [
          'Web and Mobile operate independently',
          'Team delivers consistently without lead dependency',
          'Rework is minimal (<10%)',
          'Feedback system institutionalized & driving continuous improvement',
          'Development velocity increased via story points',
        ],
        pointers: [
          'Weeks 1-4: Foundation, Feedback Loops & KPI Alignment',
          'Weeks 5-8: Velocity Optimization, Ownership Maturity & Measurement',
          'Weeks 9-10: Complex Engineering Execution & Success State (<10% Lead Dependency)',
        ]
      }
    ]
  },
  kpis: [
    {
      id: 'kpi-1-standardization',
      title: 'KPI 1: Single Monorepo for Multi-Tenant Frontend',
      chatgptLink: 'https://chatgpt.com/share/69da5ccc-54d8-83e8-ad25-4712f2869b23',
      goal: 'Adopt fast with branches, stabilize with systems, expand with mobile, and unify into a single config-driven platform.',
      description: 'Phased evolution to a unified multi-tenant architecture: start with tenant branches to adopt monorepo quickly, build shared systems, expand to mobile, and finally unify all tenants into a single config-driven branch.',
      reviewCadence: 'Weekly with Leadership',
      metrics: [
        { name: 'Monorepo Setup', target: 'Completed', current: 'Pending' },
        { name: 'Tenant Branches', target: 'Live', current: 'Pending' },
        { name: 'Shared API/Config', target: 'Extracted', current: 'Pending' },
        { name: 'Advisor Mobile App', target: 'Functional', current: 'Pending' },
        { name: 'Single Branch Achieved', target: 'Yes', current: 'Pending' },
        { name: 'Zero Tenant-specific Code', target: 'Achieved', current: 'Pending' }
      ],
      executionPhases: [
        { phase: 'Phase 1: Monorepo Adoption with Tenant Branches (Weeks 1–2)', desc: 'Adopt monorepo immediately while supporting existing backend constraints via tenant branches.', status: 'current' },
        { phase: 'Phase 2: Shared System Extraction (Weeks 3–6)', desc: 'Reduce tenant differences by introducing shared frontend systems: API layer, feature flags, conditional visibility, and config-driven UI.', status: 'upcoming' },
        { phase: 'Phase 3: Advisor Mobile App Build (Weeks 7–8)', desc: 'Build and integrate advisor mobile app using stabilized shared systems (config, API, validation).', status: 'upcoming' },
        { phase: 'Phase 4: Unified Multi-Tenant Architecture (Weeks 9–11)', desc: 'Move from branch-based tenants to a single branch, config-driven multi-tenancy. Eliminate all tenant branches.', status: 'upcoming' }
      ],
      leadNotes: [
        'No new tenant-specific code in Phase 2. Convert all differences into config or shared systems.'
      ],
      weeklyProgress: [
        {
          week: 'Week 1',
          focus: 'Setup monorepo & Tenant Branches',
          status: 'completed',
          targetOutcomes: [
            { title: 'Monorepo initialized', status: 'completed', link: 'https://github.com/Spring-money/manthan-os-monorepo' },
            { title: 'Tenant branches ready', status: 'completed', notes: 'Done on local. Dev tested. (Commits till Friday 17 April are present in the respective branches)' }
          ],
          leadNotes: ['Minor branding changes are remaining.'],
          additionalOutcomes: [
            'Dev tested App as well as Client Portals for respected tenants. App for prudeno and nswealth and Client portal for advent',
            'Started creating tenant-manthan -> which is a super set of the all the features that we have across tenants'
          ],
          actionItems: [
            { title: 'In some tenants, borders are not shown as existing borders. Will be picked up in April week 4 sprint.', owner: 'Frontend Team', dueDate: '24 Apr 2026' }
          ]
        },
        { week: 'Week 2', focus: 'CI/CD & Deployment', status: 'upcoming', leadTasks: ['Shift daily development to monorepo', 'Setup CI/CD per tenant branch', 'Deploy all tenants via new repo', 'Phase out old repo'], achievements: ['Monorepo is single source of development', 'All tenants deployed via monorepo branches', 'Old repo fully deprecated'], leadNotes: ['Ensure zero downtime in shift'] },
        { week: 'Week 3', focus: 'API Abstraction Layer', status: 'upcoming', leadTasks: ['Design common API layer', 'Extract API differences into shared module'], achievements: ['API differences abstracted'], leadNotes: ['Reduce divergence in data fetching logic'] },
        { week: 'Week 4', focus: 'Feature Flag System', status: 'upcoming', leadTasks: ['Create Feature flag system', 'Implement gates for tenant specific features'], achievements: ['Feature flags replace hardcoded conditions'], leadNotes: ['No hardcoded tenant checks in UI'] },
        { week: 'Week 5', focus: 'Conditional Visibility & Config', status: 'upcoming', leadTasks: ['Abstract conditional visibility', 'Start config-driven UI behavior logic'], achievements: ['UI differences managed externally'], leadNotes: ['All new differences must go through config'] },
        { week: 'Week 6', focus: 'Shared Systems Stabilization', status: 'upcoming', leadTasks: ['Cross-tenant regression testing', 'Validate feature flags & config correctness'], achievements: ['Significant reduction in branch divergence', 'Config correctness tested'], leadNotes: ['Leadership Focus: No new tenant-specific code'] },
        { week: 'Week 7', focus: 'Advisor Mobile App Init', status: 'upcoming', leadTasks: ['Develop advisor mobile app inside monorepo', 'Hook up shared config and API layer'], achievements: ['Mobile app builds in monorepo'], leadNotes: ['Reuse web foundation'] },
        { week: 'Week 8', focus: 'Mobile Core Systems & Flows', status: 'upcoming', leadTasks: ['Integrate validation system', 'Build mobile app flows (login, client view, tasks)', 'Cross-platform consistency tests'], achievements: ['Advisor mobile app functional', 'Consistent behavior web vs mobile'], leadNotes: ['Ensure parity between web and mobile experiences'] },
        { week: 'Week 9', focus: 'Single Branch Transition', status: 'upcoming', leadTasks: ['Eliminate tenant branches', 'Introduce client-configs.ts'], achievements: ['Single branch serves multiple tenants'], leadNotes: ['Huge milestone: branch elimination'] },
        { week: 'Week 10', focus: 'Fully Config-Driven Architecture', status: 'upcoming', leadTasks: ['Introduce feature flags & section/field configs globally', 'Ensure zero tenant-specific code in UI chunks'], achievements: ['Zero tenant-specific code remaining'], leadNotes: ['Rigorous review to ensure no `if (tenant === X)`'] },
        { week: 'Week 11', focus: 'Unified Architecture Validation', status: 'upcoming', leadTasks: ['Full regression across all tenants', 'Config-driven behavior validation', 'Ensure no tenant bugs'], achievements: ['Single branch serves all tenants', 'Fully config-driven architecture confirmed'], leadNotes: ['Deployment and true SaaS state achieved'] }
      ],
      impact: {
        sections: [
          { title: '🚀 Business Impact', items: ['Immediate value delivered via branches (Week 2)', 'Platform expansion to mobile built on solid base (Week 8)', 'True SaaS state achieved (Week 11) for infinite scalability'] },
          { title: '⚙️ Engineering Impact', items: ['Zero tenant divergence via config', 'Single codebase for all firms', 'System maturity eliminates duplication (Week 6)'] },
          { title: '🧪 QA Impact', items: ['Cross-tenant testing simplified', 'Unified regression suits', 'Fully config-driven behavior validation'] },
          { title: '📱 Platform Impact', items: ['Consistent behavior across web + mobile', 'Standardized, reliable deployments'] },
          { title: '🧑‍💼 Team Impact', items: ['Shift to platform thinking', 'Higher productivity with same team', 'Reduced tech debt'] },
          { title: '🧠 Strategic Impact', items: ['Moves from custom builds → true SaaS', 'Foundation for all future scalability'] }
        ],
        oneLine: 'Adopt fast with branches, stabilize with systems, expand with mobile, and unify into a single config-driven platform.'
      },
    },
    {
      id: 'kpi-2-ui-platform',
      title: 'KPI 2: Component Library & Design System',
      chatgptLink: 'https://chatgpt.com/share/69da5d1d-984c-83e8-8fc2-fe4171f451ad',
      goal: 'Complete end-to-end delivery and adoption of shared, themeable component library for web and mobile.',
      description: 'Zero duplication goal. Level 1 (Base UI/Crunch week), Level 2 (Forms/Data), Level 3 (Business). Leadership must enforce adoption as strictly as creation.',
      reviewCadence: 'Weekly with Leadership',
      metrics: [
        { name: 'Foundation / Themes', target: 'Complete', current: 'Pending' },
        { name: 'L1 Built / Adopted', target: '100% / >50%', current: 'Pending' },
        { name: 'L2 Built / Adopted', target: '100% / >70%', current: 'Pending' },
        { name: 'L3 Built / Adopted', target: '5-8 used', current: 'Pending' },
        { name: 'Overall Adoption', target: '≥80%', current: 'Pending' },
        { name: 'Duplicates', target: '0', current: 'Pending' }
      ],
      executionPhases: [
        { phase: 'Weeks 1-2: Foundation & Theme System', desc: 'Design tokens, mono-repo packages, ThemeProvider (web) & theme injection (mobile). 2 tenants working with different themes.', status: 'current' },
        { phase: 'Weeks 3-4: Level 1 Components', desc: 'Build 100% L1 components (Crunch Week) and achieve ≥50% adoption across at least 5 key screens per platform.', status: 'upcoming' },
        { phase: 'Weeks 5-7: Level 2 Components', desc: 'Build and adopt Forms, Data, Navigation, & Structure. ≥70% forms use FormField system.', status: 'upcoming' },
        { phase: 'Weeks 8-11: Level 3 Components & Hardening', desc: 'Build OTPInput, ProfileSection, KYCSection. Achieve ≥80% shared UI adoption. Eliminate 0 duplicates.', status: 'upcoming' }
      ],
      leadNotes: ['Add reflections and notes here...'],
      weeklyProgress: [
        {
          week: 'Week 1',
          focus: 'Foundation Setup',
          status: 'completed',
          targetOutcomes: [
            { title: 'Separate shared packages created and consumed in apps', status: 'completed' },
            { title: 'Configure shadcn (web) + NativeWind + Gluestack (mobile)', status: 'completed' },
            { title: 'Tokens available in both platforms', status: 'completed' }
          ],
          additionalOutcomes: [
            'Use getTheme in apps to swith theme per tenant -> Done',
            'All tenants working with their own themes based on the environment variable -> Done'
          ]
        },
        { week: 'Week 2', focus: 'Theme System', status: 'upcoming', leadTasks: ['Implement ThemeProvider (web)', 'Implement theme injection (mobile)', 'Connect tenant config → tokens'], achievements: ['2 tenants working with different themes', 'Theme changes reflect instantly', '0 hardcoded colors'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 3', focus: 'Build ALL Level 1 Components', status: 'upcoming', leadTasks: ['Button, Input, Textarea, Label', 'Select, Checkbox, Radio, Switch, DatePicker', 'Card, Modal, Drawer, Spinner, Toast'], achievements: ['100% Level 1 components built', 'Same API across platforms', 'All states supported', 'Theme-compliant'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 4', focus: 'Adopt Level 1 Components', status: 'upcoming', leadTasks: ['Replace base components in apps', 'Use Level 1 in real screens'], achievements: ['≥50% screens using L1', '5 key screens migrated/platform', 'No new base components created', 'Duplicate components removed'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 5', focus: 'Build Level 2 (Forms + Data)', status: 'upcoming', leadTasks: ['FormField, FormSection, ErrorMessage', 'AsyncSelect, FieldWrapper', 'DataTable, ListCard'], achievements: ['Core form abstraction ready', 'Data components support states', 'APIs consistent across platforms'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 6', focus: 'Build Level 2 (Nav + Structure)', status: 'upcoming', leadTasks: ['Tabs, Accordion', 'Pagination, EmptyState', 'SectionHeader, PageHeader'], achievements: ['Full L2 library complete', 'Works with feature flags', 'Components tested in isolation'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 7', focus: 'Adopt Level 2 Components', status: 'upcoming', leadTasks: ['Refactor forms and data screens', 'Replace implementations with shared components'], achievements: ['≥70% forms use FormField', '≥60% data views use shared', '5 screens migrated per app', 'Reduction in duplicate logic'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 8', focus: 'Build Level 3 (Batch 1)', status: 'upcoming', leadTasks: ['OTPInput', 'AddressForm', 'ProfileSection'], achievements: ['3–4 reusable business components', 'No tenant-specific logic', 'Used in at least 1 app'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 9', focus: 'Build Level 3 (Batch 2)', status: 'upcoming', leadTasks: ['KYCSection', 'InvestmentCard', 'Identify high-reuse components'], achievements: ['5–8 Level 3 components built', 'Standardized APIs', 'Ready for cross-app reuse'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 10', focus: 'Adopt Level 3 (Phase 1)', status: 'upcoming', leadTasks: ['Integrate Level 3 in onboarding/profile flows'], achievements: ['Used in at least 2 apps', 'Core flows using shared', 'Reduced duplication in UI flows'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 11', focus: 'Adoption Completion & Hardening', status: 'upcoming', leadTasks: ['Complete migration across all apps', 'Remove ALL duplicate components', 'Finalize Storybook/Preview'], achievements: ['≥80% UI uses shared components', '0 duplicate components', '100% L1 & L2 documented', 'All new development uses shared'], leadNotes: ['Add reflections and notes here...'] }
      ],
      impact: {
        sections: [
          { title: '🚀 Business Impact', items: ['Faster feature delivery → 2–3x development speed', 'Faster onboarding → near <1 day per tenant', 'Lower cost per tenant → minimal incremental engineering cost', 'Enables scaling to 50–100+ tenants'] },
          { title: '⚙️ Engineering Impact', items: ['No duplication → faster development cycles', 'Fix once, fix everywhere → fewer bugs', 'Standardized components → higher release confidence'] },
          { title: '📱 Platform Impact', items: ['Consistent UI/UX across web + mobile', 'Theme-driven multi-tenant system', 'Stable, predictable product behavior'] },
          { title: '🧪 QA Impact', items: ['Test once, reuse everywhere → reduced testing effort', 'Fewer regressions due to standardized components', 'Faster QA cycles with predictable UI behavior'] },
          { title: '🧑‍💼 Team Impact', items: ['Shift from feature-building to platform-building', 'Higher productivity with same team size', 'Reduced dependency on senior engineers'] },
          { title: '🧠 Strategic Impact', items: ['Moves from fragmented UI → unified design system', 'Enables true multi-tenant SaaS scalability', 'Foundation for Tier B & Tier C growth'] }
        ],
        oneLine: 'Turns UI development into a reusable platform that scales the business without scaling the team.'
      },
    },
    {
      id: 'kpi-3-reliability',
      title: 'KPI 3: Platform Observability, Performance & Release Engineering',
      chatgptLink: 'https://chatgpt.com/share/69da5ee5-90a4-83e8-830c-0cf592dbf2f5',
      goal: 'Establish a scalable and robust platform enabling full visibility, fast applications, automated pipelines, seamless distribution, and scalable mobile architecture.',
      description: 'Web = Execution Focus. Mobile = Research + Stabilization. Covers ELK Stack for web, Firebase for mobile, CI/CD foundations, and multi-tenant mobile architectural definitions.',
      reviewCadence: 'Weekly with Leadership',
      metrics: [
        { name: 'ZDD & Firebase Dist.', target: 'Automated', current: 'In Progress' },
        { name: 'API Logging & ELK', target: '100% Core APIs', current: 'Pending' },
        { name: 'Alerting System', target: 'Active (Slack)', current: 'Pending' },
        { name: 'Web Performance', target: 'Optimised (TTFB/FCP)', current: 'Pending' },
        { name: 'App Performance', target: '< 3s load per tab', current: 'Pending' },
        { name: 'iOS App Store', target: 'All Tenants Live', current: 'Pending' },
        { name: 'Frontend Logging', target: 'Active & Alerting', current: 'Pending' }
      ],
      executionPhases: [
        { phase: 'Weeks 1-2: ZDD & App Dist', desc: 'Zero downtime deployments and App Distribution via Firebase.', status: 'current' },
        { phase: 'Weeks 3-5: Logging, ELK & Alerts', desc: 'JSON API logging, Crashlytics, ELK setup, and Slack alerting.', status: 'upcoming' },
        { phase: 'Weeks 6-8: Performance Optimization', desc: 'Web and App performance optimizations (Tabs load < 3s).', status: 'upcoming' },
        { phase: 'Weeks 9-10: iOS Mobile Builds', desc: 'GitHub Actions for iOS builds and TestFlight/App Store distribution.', status: 'upcoming' },
        { phase: 'Weeks 11-12: Frontend Observability', desc: 'Frontend logging evaluation and slow rendering alerts.', status: 'upcoming' }
      ],
      leadNotes: ['Pre-requisite -> Finalise API response schema for Error as well as success response'],
      weeklyProgress: [
        {
          week: 'Week 1',
          focus: 'ZDD & Firebase distribution planning',
          status: 'completed',
          targetOutcomes: [
            { title: 'ZDD plan ready and sample deployment done (prudeno-mfd)', status: 'completed' },
            { title: '/api/health added for all tenants', status: 'completed' },
            { title: 'Rollback plan is ready', status: 'completed' },
            { title: 'Firebase distribution plan ready and sample deployment done (humfauji)', status: 'completed' }
          ],
          leadNotes: [
            'Decided to wait on this in second week as we will shift existing repos to use monorepo and use above ZDD strategy in monorepo directly instead of doing it on existing deployments'
          ],
          additionalOutcomes: [
            'Firebase distriubtion setup for all Humfauji, NSW and Prudeno'
          ],
          actionItems: [
            { title: 'Identify safe tenant to test UAT monorepo deployment', owner: 'Omkar', dueDate: '21 Apr 2026' },
            { title: 'Finalize monorepo migration plan', owner: 'Nikhil & Arnav', dueDate: '22 Apr 2026' }
          ]
        },
        { week: 'Week 2', focus: 'Execution: ZDD & Firebase distribution', status: 'upcoming', leadTasks: ['Add ZDD actions for all tenants on Production and deploy', 'Automate firebase distribution for NSW and Prudeno'], achievements: ['Successful deployment on Production; EC2 shows traefik containers', 'Firebase distribution automated for NSW and Prudeno'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 3', focus: 'Log coverage & Visibility', status: 'upcoming', leadTasks: ['Decide log levels and json log for each level', 'JSON api logging using winston/bunyan on web apps (info, warn, error)', 'Document Crashlytics logging for mobile app API errors', 'App -> tenant + version tagging'], achievements: ['Logs logged for each api route; All tenants start logging properly', 'Crashlytics logging documented', 'Tenant and version tagging active'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 4', focus: 'ELK setup (Prioritize Production)', status: 'upcoming', leadTasks: ['Pull logs from 1 tenant web app and show on Kibana', 'Show other 3 tenants web app logs on Kibana', 'Explore how to monitor Front-end logs for performance monitoring'], achievements: ['Logs pulled and visualized on Kibana for all 4 tenants', 'Front-end log monitoring approach defined'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 5', focus: 'Alerting Setup', status: 'upcoming', leadTasks: ['Configure alerts for anomalies/errors', 'Set up Slack notifications for critical alerts'], achievements: ['Alerting successfully configured', 'Real-time notifications working for critical errors'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 6', focus: 'Web Performance Optimization', status: 'upcoming', leadTasks: ['Analyze slow rendering web pages', 'Optimize web performance bottlenecks'], achievements: ['Visible improvement in load times', 'Performance metrics captured'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 7', focus: 'Web Performance Optimization (continue)', status: 'upcoming', leadTasks: ['Continue optimizing heavy endpoints', 'Reduce page load times and network waterfall'], achievements: ['Sustained performance gains on web apps', 'Target TTFB and FCP metrics met'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 8', focus: 'App performance Optimization', status: 'upcoming', leadTasks: ['Improve loading time for tabs (especially data heavy)'], achievements: ['No tab takes more than 3 seconds to load'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 9', focus: 'Mobile iOS builds', status: 'upcoming', leadTasks: ['Github Action to build iOS app', 'Put 1 tenant on iOS app store', 'Document all the process (including TestFlight)'], achievements: ['iOS build automated via GitHub Actions', '1 tenant successfully submitted to iOS App Store', 'Documentation complete for iOS builds and TestFlight'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 10', focus: 'iOS App Expansion', status: 'upcoming', leadTasks: ['Put 1 more tenant on iOS app store', 'Update Firebase to create iOS apps for all tenants'], achievements: ['2nd tenant on iOS app store', 'Firebase correctly generating iOS apps for all tenants'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 11', focus: 'Frontend logging planning', status: 'upcoming', leadTasks: ['Explore Frontend logging (compare 2 tools, finalise 1)', 'Try frontend logging for 1 tenant\'s 5 slowest screens', 'Document process'], achievements: ['Frontend logging tool finalised', 'Logging successfully implemented for 5 slowest screens on 1 tenant', 'Process fully documented'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 12', focus: 'Execute Frontend logging & Alerts', status: 'upcoming', leadTasks: ['Add full fledged frontend logging for 1 web app', 'Add alerts for slow rendering pages'], achievements: ['Full fledged frontend logging active for 1 web app', 'Alerts successfully added for slow rendering pages'], leadNotes: ['Add reflections and notes here...'] }
      ],
      impact: {
        sections: [
          { title: '🚀 Business Impact', items: ['Faster and safer releases → improved client experience and trust', 'Reduced production issues → lower churn and higher retention', 'Faster onboarding → scalable tenant growth without delays', 'Supports scaling to 50–100+ tenants without increasing support overhead'] },
          { title: '⚙️ Engineering Impact', items: ['Data-driven debugging → faster root cause resolution', 'Zero-downtime releases → higher deployment confidence', 'Standardized pipelines → predictable and repeatable releases', 'Reduced firefighting → more focus on core product development'] },
          { title: '📱 Platform Impact', items: ['Fully observable system across web and mobile', 'Zero-downtime deployment capability for all web apps', 'Scalable multi-tenant architecture across platforms', 'Consistent and reliable system behavior across environments'] },
          { title: '🧪 QA Impact', items: ['Better visibility into failures via logs and alerts → faster issue validation', 'Reduced regression risk due to standardized pipelines and deployments', 'Ability to test in production-like environments with confidence', 'Faster QA cycles with reliable builds and distribution'] },
          { title: '🧑‍💼 Team Impact', items: ['Reduced stress from production issues and firefighting', 'Clear workflows for deploy, monitor, and rollback', 'Improved developer confidence in releases', 'Less dependency on individual contributors'] },
          { title: '🧠 Strategic Impact', items: ['Enables enterprise-grade reliability required for Tier B and Tier C clients', 'Builds foundation for multi-tenant scale aligned with platform vision', 'Supports faster iteration without compromising stability', 'Strengthens platform maturity and long-term scalability'] }
        ],
        oneLine: 'Transforms the platform into a reliable, observable, and scalable system that supports rapid growth without increasing operational complexity.'
      },
    },
    {
      id: 'kpi-4-leadership',
      title: 'KPI 4: Leadership',
      chatgptLink: 'https://chatgpt.com/share/69da5f0e-6a0c-83e8-8b2d-41c4dae48930',
      goal: 'Build a self-sufficient frontend team with strong ownership that independently delivers and continuously improves through feedback cycles and velocity optimization.',
      description: 'Web Owner & Mobile Owner handle deployments. High execution speed via story points, structured feedback loops, strong autonomy, and low rework.',
      reviewCadence: 'Weekly with Leadership',
      metrics: [
        { name: 'Ownership Clarity', target: '100%', current: '100%' },
        { name: 'Feedback System', target: 'Institutionalized', current: 'Pending' },
        { name: 'Dev-led Solutions', target: '≥60%', current: 'Pending' },
        { name: 'Independent Delivery', target: '≥50%', current: 'Pending' },
        { name: 'Story Point Velocity', target: '+20%', current: 'Pending' },
        { name: 'Reopened Tickets', target: '<10%', current: '15%' },
        { name: 'Lead Dependency', target: '<10%', current: '80%' }
      ],
      executionPhases: [
        { phase: 'Weeks 1-4: Foundation & Feedback Loops', desc: 'Define ownership, establish feedback system, map KPIs, adopt story point estimation, and initiate first feedback cycles.', status: 'current' },
        { phase: 'Weeks 5-8: Velocity & Maturity', desc: 'Track and optimize velocity, establish full ownership domain behavior, encourage cross-domain contributions, and measure feedback impact.', status: 'upcoming' },
        { phase: 'Weeks 9-10: Advanced Execution & Success', desc: 'Handle complex engineering problems, finalize feedback systems, achieve <10% lead dependency and consistent predictable delivery.', status: 'upcoming' }
      ],
      leadNotes: ['Add reflections and notes here...'],
      weeklyProgress: [
        {
          week: 'Week 1',
          focus: 'Ownership + Feedback Foundation',
          status: 'in-progress',
          targetOutcomes: [
            { title: 'Ownership Clarity', status: 'completed', link: 'https://docs.google.com/document/d/1mNB-02vPLXp7cM-DkBx2fKOkofXATn9E2dORvgxbQM0/edit?usp=sharing', notes: 'Doc created and shared with front-end team.' },
            { title: 'Feedback format finalized', status: 'in-progress', links: ['https://docs.google.com/document/d/1AGrH4RDcGZcPpucCFP_bPZGH6cAJ29-DEYIwVFHbg2U/edit?usp=sharing', 'https://docs.google.com/document/d/1MavMfg9XbhvUQwslzbUQll6Ve4XMaGX58E_xgm_1ZD0/edit?tab=t.0#heading=h.gngzcqqm05cd'], reason: 'Need help from Nikhil to not make format generic but to have a specific format so that feedback sessions become much more useful.' }
          ],
          leadNotes: ['Need help from Nikhil in finalising Feedback format'],
          actionItems: [
            { title: 'Schedule feedback sessions with the whole team.', owner: 'Arnav', dueDate: '22 Apr 2026' }
          ]
        },
        { week: 'Week 2', focus: 'Autonomy + First Feedback Cycle', status: 'upcoming', leadTasks: ['Devs propose solutions', 'Conduct 1st feedback session'], achievements: ['≥60% tasks with dev-led approach', 'First feedback cycle completed', 'Improvement areas identified'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 3', focus: 'KPI Alignment + Velocity System + Quality', status: 'upcoming', leadTasks: ['Map all tasks to KPI 1, 2, 3', 'Start estimating in story points (not hours)', 'Improve task breakdown', 'Strong pre-QA validation'], achievements: ['100% KPI mapping', 'Story point estimation adopted', 'Reopened tickets trending <15%'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 4', focus: 'Independent Delivery + Feedback Cycle 2', status: 'upcoming', leadTasks: ['Devs execute features independently', 'Conduct 2nd feedback session', 'Implement improvements from feedback'], achievements: ['≥50% independent delivery', 'Second feedback cycle completed', 'Visible improvement from feedback'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 5', focus: 'Velocity Optimization (Team Level)', status: 'upcoming', leadTasks: ['Track team velocity in story points', 'Identify bottlenecks', 'Improve sprint planning'], achievements: ['Team velocity increases by 20%', 'More predictable sprint delivery'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 6', focus: 'Ownership Maturity', status: 'upcoming', leadTasks: ['Web owner handles all web decisions', 'Mobile owner handles all mobile decisions', 'Devs drive execution independently'], achievements: ['Lead intervention <30%', 'Strong ownership across domains'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 7', focus: 'Cross-Domain Contribution', status: 'upcoming', leadTasks: ['Cross-domain contributions', 'Apply learnings from feedback cycles'], achievements: ['1 cross-domain contribution/dev', 'Improved system understanding across team'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 8', focus: 'Feedback Impact + System Stability', status: 'upcoming', leadTasks: ['Evaluate impact of past feedback', 'Refine workflows'], achievements: ['Measurable improvements from feedback cycles', 'Stable delivery system'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 9', focus: 'Advanced Execution Capability', status: 'upcoming', leadTasks: ['Take up difficult tasks (Performance optimization, Complex flows)', 'Deliver complex tasks end-to-end'], achievements: ['Complex tasks delivered successfully', 'Team demonstrates high engineering maturity'], leadNotes: ['Add reflections and notes here...'] },
        { week: 'Week 10', focus: 'Leadership Maturity + System Completion', status: 'upcoming', leadTasks: ['Conduct final feedback cycle', 'Evaluate overall system maturity'], achievements: ['Lead dependency <10%', 'Reopened tickets <10%', 'Feedback system institutionalized', 'Consistent, predictable delivery achieved'], leadNotes: ['Add reflections and notes here...'] }
      ],
      impact: {
        sections: [
          { title: '🚀 Business Impact', items: ['Faster feature delivery → optimized development velocity', 'Consistent delivery → accurate sprint planning with story points', 'Lower cost per tenant → no additional team scaling required', 'Enables scaling reliably via independent execution'] },
          { title: '⚙️ Engineering Impact', items: ['Institutionalized feedback → continuous system improvement', 'Low rework (<10%) → higher efficiency', 'Reduced Tech Lead dependency → better scalability', 'Cross-domain contributions → avoiding silos'] },
          { title: '📱 Platform Impact', items: ['High engineering maturity handles complex flows and performance optimizations', 'Stable delivery system handles feature throughput predictably', 'Config-driven multi-tenant system fully realized'] },
          { title: '🧪 QA Impact', items: ['<10% reopen rate → higher first-time quality', 'Strong pre-QA validation ensures cleaner staging transitions', 'Faster and more predictable QA cycles based on measured velocity'] },
          { title: '🧑‍💼 Team Impact', items: ['Developers operate with high autonomy and execute end-to-end', 'Constructive feedback loop enhances team collaboration', 'Reduced dependency on Tech Lead', 'Silos broken through cross-domain collaboration'] },
          { title: '🧠 Strategic Impact', items: ['Frontend becomes a scalable, self-improving technical function', 'Supports long-term platform scalability', 'Builds culture of continuous learning and data-driven improvement'] }
        ],
        oneLine: 'Builds an autonomous, ownership-driven team that scales product, platform, and continuous improvement without scaling leadership dependency.'
      }
    }
  ],
}
export const navItems = [
  {
    id: 'frontend-vision',
    icon: '🎨',
    label: 'Frontend Vision',
    children: [
      { id: 'overview', icon: '🧱', label: 'Overview' },
      { id: 'environments', icon: '🌐', label: 'Environments' },
      { id: 'multi-tenant', icon: '🏗️', label: 'Multi-Tenant' },
      { id: 'app-architecture', icon: '⚙️', label: 'App Architecture' },
      { id: 'deployment', icon: '🚀', label: 'Deployment' },
      { id: 'security', icon: '🔒', label: 'Security' },
      { id: 'infrastructure', icon: '🖥️', label: 'Infrastructure' },
      { id: 'monorepo', icon: '📦', label: 'Monorepo' },
      { id: 'design-system', icon: '🎨', label: 'Design System' },
      { id: 'observability', icon: '📡', label: 'Observability' },
    ],
  },
  {
    id: 'kpi-tracker',
    icon: '📊',
    label: 'KPI Tracker',
    children: [
      { id: 'kpi-overview', icon: '🎯', label: 'Overview' },
      { id: 'kpi-1-standardization', icon: '📦', label: 'Monorepo Setup' },
      { id: 'kpi-2-ui-platform', icon: '🎨', label: 'Component Library' },
      { id: 'kpi-3-reliability', icon: '🚀', label: 'Observability' },
      { id: 'kpi-4-leadership', icon: '👥', label: 'Leadership' },
    ],
  },
]
