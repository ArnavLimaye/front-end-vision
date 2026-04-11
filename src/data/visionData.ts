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
          'All frontend apps (Web + Mobile) in a single monorepo',
          'Shared core systems (Config, API, Validation)',
          'Web CI/CD stable, Android builds stable, iOS builds stable',
          'Zero platform-specific bugs and zero duplication',
        ],
        pointers: [
          'Phase 1: Foundation Build (Weeks 1–3, Compressed)',
          'Phase 2: Mobile Integration + Stabilization (Weeks 4–7)',
          'Phase 3: Hardening & Confidence (Weeks 8–9)',
          'Phase 4: Integration Buffer (Weeks 10–11)',
          'Non-Negotiable Rule: Build → Deploy → Test → Then Proceed',
          'Key Insight: Web proves structure, Mobile proves system maturity',
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
        title: '3. Platform Observability, Performance & Release Engineering',
        outcome: [
          'Full observability across web (ELK) and mobile (Crashlytics)',
          'High-performance apps across API, rendering, and BFF layers',
          'Stable, automated CI/CD pipelines',
          'Zero downtime deployments for web apps',
          'Seamless tester & store distribution',
          'Scalable multi-tenant mobile architecture',
        ],
        pointers: [
          'Phase 1 (0–3 Months): Setup ELK logging with tenant-aware monitoring; Integrate Firebase Crashlytics + performance monitoring; Optimize web performance; Standardize CI/CD; Define multi-tenant mobile architecture (EAS); Focus execution on web, stabilize mobile.',
          'Phase 2 (3–6 Months): Automate mobile builds (Play Store + TestFlight); Expand observability and alerting; Optimize mobile performance; Enable full release pipelines with rollback + playbooks.',
        ]
      },
      {
        title: '4. Leadership (Ownership-Driven Execution)',
        outcome: [
          'Clear ownership across Web & Mobile with full accountability',
          '2+ features delivered per developer per week',
          'High autonomy — developers propose and execute solutions',
          '<10% ticket reopen rate (only edge cases)',
          'Strong cross-domain collaboration',
          'Tech Lead dependency reduced to <10%',
          'KPI 1, KPI 2, KPI 3 achieved through team execution',
        ],
        pointers: [
          'Assign one owner each for Web and Mobile',
          'Enforce end-to-end ownership (problem → solution → delivery)',
          'Developers must propose solutions before escalation',
          'Map every task to KPI 1, KPI 2, or KPI 3',
          'Track 2+ feature deliveries per developer weekly',
          'Enforce strict quality checks',
          'Ensure cross-domain contribution every sprint',
          'Limit Tech Lead to review, guidance, unblocking',
          'Track autonomy, speed, and quality weekly',
        ]
      }
    ]
  },
  kpis: [
    {
      id: 'kpi-1-standardization',
      title: 'KPI 1: 11-Week Execution Plan (Compressed + Test-Driven + Mobile Included)',
      goal: 'Establish a unified monorepo for web + mobile apps. Web proves structure, Mobile proves system maturity. At every stage: Build → Deploy → Test → Proceed.',
      description: 'Guiding Principles: 1. Same tenant, same behavior. 2. Zero platform-specific bugs. 3. Zero duplication. 4. Shared Config, API, Validate across all apps.',
      metrics: [
        { name: 'Monorepo Setup (Web)', target: 'Completed', current: 'Pending' },
        { name: 'Deployment Pipeline', target: 'Stable', current: 'Pending' },
        { name: 'Shared Systems (Web)', target: 'Integrated', current: 'Pending' },
        { name: 'Mobile in Monorepo', target: 'Working', current: 'Pending' },
        { name: 'Android Build (EC2)', target: 'Stable', current: 'Pending' },
        { name: 'iOS Build (EAS)', target: 'Stable', current: 'Pending' },
        { name: 'Shared Systems (Mobile)', target: 'Integrated', current: 'Pending' },
        { name: 'Zero Platform Bugs', target: 'Achieved', current: 'Pending' },
        { name: 'Zero Tenant Bugs', target: 'Achieved', current: 'Pending' },
        { name: 'Zero Duplication', target: 'Achieved', current: 'Pending' }
      ],
      executionPhases: [
        { phase: 'Phase 1: Foundation Build (Weeks 1–3, Compressed)', desc: 'Monorepo supports Advisor Web App, Deployment Pipeline, Shared Systems (Config, API, Validation), and Initial Mobile Readiness.', status: 'current' },
        { phase: 'Phase 2: Mobile Integration + Stabilization (Weeks 4–7)', desc: 'Mobile apps inside monorepo, builds working (Android + iOS), shared systems used across web + mobile.', status: 'upcoming' },
        { phase: 'Phase 3: Hardening & Confidence (Weeks 8–9)', desc: 'Fix mobile build issues, standardize config + API usage, full regression testing (web + mobile).', status: 'upcoming' },
        { phase: 'Phase 4: Integration Buffer (Weeks 10–11)', desc: 'System stable under real usage, component library integrated safely across web + mobile.', status: 'upcoming' }
      ],
      weeklyProgress: [
        { week: 'Week 1', focus: 'Foundation & Monorepo Setup', status: 'completed', leadTasks: ['Monorepo setup (web)', 'Local run stable', 'Web regression testing'], achievements: ['App runs locally without issues', 'No code refactoring done'] },
        { week: 'Week 2', focus: 'Deployment Pipeline', status: 'in-progress', leadTasks: ['Deployment setup (GitHub Actions)', 'Docker/build from root', 'Deployment validation'], achievements: ['Production parity', 'Stable build pipeline'] },
        { week: 'Week 3', focus: 'Shared Systems & Mobile Prep', status: 'upcoming', leadTasks: ['Shared systems (Config, API, Validation)', 'Add client web app', 'Audit mobile repo & align env handling', 'Tenant switching validation'], achievements: [] },
        { week: 'Week 4', focus: 'Mobile Migration', status: 'upcoming', leadTasks: ['Move mobile app to apps/client-mobile', 'Ensure Expo runs in monorepo', 'Mobile app runtime testing'], achievements: [] },
        { week: 'Week 5', focus: 'Mobile Deployment', status: 'upcoming', leadTasks: ['Android build (GitHub Actions + EC2)', 'iOS build (EAS)', 'Env variable correctness'], achievements: [] },
        { week: 'Week 6', focus: 'Shared System Adoption (Mobile)', status: 'upcoming', leadTasks: ['Use shared Config', 'Use shared API', 'Use shared Validation', 'API validation'], achievements: [] },
        { week: 'Week 7', focus: 'Cross-App Integration', status: 'upcoming', leadTasks: ['All apps in monorepo (Advisor, Client, Mobile)', 'Shared systems consistent across all', 'Cross-platform consistency testing'], achievements: [] },
        { week: 'Week 8', focus: 'Mobile Hardening', status: 'upcoming', leadTasks: ['Fix mobile build issues', 'Standardize config + API usage', 'Clean structure'], achievements: [] },
        { week: 'Week 9', focus: 'System Confidence', status: 'upcoming', leadTasks: ['Full regression (web + mobile)', 'Tenant-level validation', 'Failure scenario testing'], achievements: [] },
        { week: 'Week 10', focus: 'Component Library Integration', status: 'upcoming', leadTasks: ['Integrate shared components', 'Validate across web + mobile', 'UI regression testing'], achievements: [] },
        { week: 'Week 11', focus: 'Final Stabilization', status: 'upcoming', leadTasks: ['Navigation flows validation', 'Performance checks', 'Verify Final Success Criteria'], achievements: [] }
      ],
    },
    {
      id: 'kpi-2-ui-platform',
      title: 'KPI 2: Component Library & Design System Execution Plan (Revised)',
      goal: 'Complete end-to-end delivery and adoption of shared, themeable component library for web and mobile.',
      description: 'Zero duplication goal. Level 1 (Base UI/Crunch week), Level 2 (Forms/Data), Level 3 (Business). Leadership must enforce adoption as strictly as creation.',
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
      weeklyProgress: [
        { week: 'Week 1', focus: 'Foundation Setup', status: 'completed', leadTasks: ['Setup design-tokens, ui-web, ui-mobile', 'Configure shadcn + NativeWind + Gluestack', 'Define design tokens'], achievements: ['Packages created & consumed', 'Tokens available globally'] },
        { week: 'Week 2', focus: 'Theme System', status: 'in-progress', leadTasks: ['Implement ThemeProvider (web)', 'Implement theme injection (mobile)', 'Connect tenant config → tokens'], achievements: ['2 tenants working with different themes'] },
        { week: 'Week 3', focus: 'Build ALL Level 1 Components', status: 'upcoming', leadTasks: ['Button, Input, Textarea, Label', 'Select, Checkbox, Radio, Switch, DatePicker', 'Card, Modal, Drawer, Spinner, Toast'], achievements: [] },
        { week: 'Week 4', focus: 'Adopt Level 1 Components', status: 'upcoming', leadTasks: ['Replace base components in apps', 'Use Level 1 in real screens'], achievements: [] },
        { week: 'Week 5', focus: 'Build Level 2 (Forms + Data)', status: 'upcoming', leadTasks: ['FormField, FormSection, ErrorMessage', 'AsyncSelect, FieldWrapper', 'DataTable, ListCard'], achievements: [] },
        { week: 'Week 6', focus: 'Build Level 2 (Nav + Structure)', status: 'upcoming', leadTasks: ['Tabs, Accordion', 'Pagination, EmptyState', 'SectionHeader, PageHeader'], achievements: [] },
        { week: 'Week 7', focus: 'Adopt Level 2 Components', status: 'upcoming', leadTasks: ['Refactor forms and data screens', 'Replace implementations with shared components'], achievements: [] },
        { week: 'Week 8', focus: 'Build Level 3 (Batch 1)', status: 'upcoming', leadTasks: ['OTPInput', 'AddressForm', 'ProfileSection'], achievements: [] },
        { week: 'Week 9', focus: 'Build Level 3 (Batch 2)', status: 'upcoming', leadTasks: ['KYCSection', 'InvestmentCard', 'Identify high-reuse components'], achievements: [] },
        { week: 'Week 10', focus: 'Adopt Level 3 (Phase 1)', status: 'upcoming', leadTasks: ['Integrate Level 3 in onboarding/profile flows'], achievements: [] },
        { week: 'Week 11', focus: 'Adoption Completion & Hardening', status: 'upcoming', leadTasks: ['Complete migration across all apps', 'Remove ALL duplicate components', 'Finalize Storybook/Preview'], achievements: [] }
      ],
    },
    {
      id: 'kpi-3-reliability',
      title: 'KPI 3: Platform Observability & Release Engineering',
      goal: 'Establish a scalable and robust platform enabling full visibility, fast applications, automated pipelines, seamless distribution, and scalable mobile architecture.',
      description: 'Web = Execution Focus. Mobile = Research + Stabilization. Covers ELK Stack for web, Firebase for mobile, CI/CD foundations, and multi-tenant mobile architectural definitions.',
      metrics: [
        { name: 'ELK Stack setup', target: 'Operational', current: 'Pending' },
        { name: 'Web Performance', target: 'Improved', current: 'Pending' },
        { name: 'Mobile Observability', target: 'Firebase active', current: 'Pending' },
        { name: 'CI/CD Pipelines', target: 'Stable', current: 'Pending' },
        { name: 'Zero Downtime Deploys', target: 'Enabled', current: 'Pending' },
        { name: 'App Distribution', target: 'Functional', current: 'Pending' },
        { name: 'Mobile Architecture', target: 'Defined', current: 'Pending' }
      ],
      executionPhases: [
        { phase: 'Phase 1 (Months 0-3)', desc: 'Preparation & Foundation (Web Observability, Mobile Stabilization, CI/CD Foundation).', status: 'current' },
        { phase: 'Phase 2 (Months 3-6)', desc: 'Full Implementation (Multi-tenant Mobile Architecture, Full automation, Production grade release pipelines).', status: 'upcoming' }
      ],
      weeklyProgress: [
        { week: 'Weeks 1-2', focus: 'Observability Foundation', status: 'in-progress', leadTasks: ['Setup ELK Stack for Web (Elasticsearch, Logstash, Kibana)', 'Integrate Firebase Crashlytics for Mobile'], achievements: [] },
        { week: 'Weeks 3-4', focus: 'Monitoring & Alerting', status: 'upcoming', leadTasks: ['Kibana dashboards (latency, errors)', 'Slack alerts', 'Firebase Performance Monitoring'], achievements: [] },
        { week: 'Weeks 5-6', focus: 'Performance Optimization', status: 'upcoming', leadTasks: ['Optimize API latency (Web)', 'Improve rendering (Web)', 'Audit mobile performance'], achievements: [] },
        { week: 'Weeks 7-8', focus: 'CI/CD & Distribution Foundation', status: 'upcoming', leadTasks: ['Setup Firebase App Distribution', 'Standardize GitHub Actions', 'Setup artifact storage (S3)', 'Enable zero downtime deploys (Web)'], achievements: [] },
        { week: 'Weeks 9-10', focus: 'Mobile Architecture Research', status: 'upcoming', leadTasks: ['Explore Expo multi-tenant builds', 'EAS profiles per tenant', 'iOS bundle ID strategy'], achievements: [] },
        { week: 'Weeks 11-12', focus: 'Consolidation & Readiness', status: 'upcoming', leadTasks: ['Finalize documentation', 'Define SOPs (alert/release/rollback)', 'Fix monitoring gaps'], achievements: [] }
      ],
    },
    {
      id: 'kpi-4-leadership',
      title: 'KPI 4: Leadership (Ownership-Driven Execution)',
      goal: 'Build a self-sufficient frontend team with strong ownership (Web & Mobile) that independently delivers KPI 1, 2, 3.',
      description: '1 Web Owner, 1 Mobile Owner. High execution speed, low rework, strong autonomy. Devs own problem → solution → delivery.',
      metrics: [
        { name: 'Ownership Clarity', target: '100%', current: '100%' },
        { name: 'Dev Autonomy', target: '90%', current: '60%' },
        { name: 'Features/Dev/Week', target: '2+', current: '1' },
        { name: 'Lead Dependency', target: '<10%', current: '80%' },
        { name: 'Reopened Tickets', target: '<10%', current: '15%' },
        { name: 'Cross-Domain', target: '100%', current: 'Partial' }
      ],
      executionPhases: [
        { phase: 'Weeks 1-3: Setup & Alignment', desc: 'Detailed ownership boundaries, shift from execution to ownership, map all tasks to KPI 1,2,3.', status: 'current' },
        { phase: 'Weeks 4-6: Independent Delivery Start', desc: 'Reduce technical leadership dependency to 40%, speed stabilization, quality enforcement.', status: 'upcoming' },
        { phase: 'Weeks 7-10: Ownership Maturity & Success', desc: 'Cross domain contribution, System Efficiency, and hitting Leadership Success state (<10% Dependency).', status: 'upcoming' }
      ],
      weeklyProgress: [
        { week: 'Week 1', focus: 'Ownership Setup', status: 'completed', leadTasks: ['Assign Mobile & Web Owner', 'Define responsibilities clearly', 'Define "Definition of Done"'], achievements: ['Ownership clarity: 100%'] },
        { week: 'Week 2', focus: 'Autonomy Kickoff', status: 'in-progress', leadTasks: ['Shift mindset to ownership', 'Devs propose solutions first', 'Lead avoids direct answers'], achievements: ['Dev-proposed approach ≥ 60%'] },
        { week: 'Week 3', focus: 'KPI Alignment', status: 'upcoming', leadTasks: ['Align all work to KPI 1, 2, 3', 'Tag all tasks'], achievements: [] },
        { week: 'Week 4', focus: 'Independent Delivery Start', status: 'upcoming', leadTasks: ['Reduce Tech Lead dependency', 'Lead shifts to review-only mode'], achievements: [] },
        { week: 'Week 5', focus: 'Speed Stabilization', status: 'upcoming', leadTasks: ['Better task breakdown', 'Remove blockers proactively'], achievements: [] },
        { week: 'Week 6', focus: 'Quality Enforcement', status: 'upcoming', leadTasks: ['Strong pre-QA validation by devs', 'Edge-case thinking enforced'], achievements: [] },
        { week: 'Week 7', focus: 'Ownership Maturity', status: 'upcoming', leadTasks: ['Web owner handles web decisions', 'Mobile owner handles mobile decisions'], achievements: [] },
        { week: 'Week 8', focus: 'Cross-Domain Contribution', status: 'upcoming', leadTasks: ['Web dev contributes to mobile/shared', 'Mobile dev contributes to config/API/shared'], achievements: [] },
        { week: 'Week 9', focus: 'System Efficiency', status: 'upcoming', leadTasks: ['Identify bottlenecks', 'Improve workflows'], achievements: [] },
        { week: 'Week 10', focus: 'Leadership Success State', status: 'upcoming', leadTasks: ['Lead steps back from execution', 'Team runs independently'], achievements: [] }
      ],
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
