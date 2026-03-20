# Android Release Automation — Strategy & Comparison

> Context: Automating the AAB build → testing → production pipeline for Prudeno Android app.

---

## The Core Constraint: UAT vs PROD Credentials

Environment variables (API URLs, tokens, etc.) are **baked into the binary at build time**. This means:

> **You cannot promote the same AAB from UAT testing to production.** Two separate builds are always required — one with UAT creds, one with PROD creds.

This is true regardless of distribution method. Both options below assume this 2-build requirement.

---

## Options Compared

### Option 1: Google Play Console API (both tracks)

Upload AABs directly to Play Console tracks using a Google Service Account.

**UAT flow:**
- Build UAT AAB (UAT creds) → upload to **Internal Testing track** via `r0adkll/upload-google-play` action
- Testers install via Play Store

**PROD flow:**
- Build PROD AAB (PROD creds) → upload to **Production track** via same action
- Optional: stage through Alpha/Beta tracks first

**GitHub Actions step:**
```yaml
- name: Upload to Google Play
  uses: r0adkll/upload-google-play@v1
  with:
    serviceAccountJsonPlainText: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON }}
    packageName: com.prudeno.app
    releaseFiles: ${{ env.AAB_FILENAME }}
    track: internal          # or: alpha, beta, production
    status: completed
```

**Secrets needed:**
- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` — service account JSON from Google Cloud Console with Release Manager role on Play Console

---

### Option 2: Firebase App Distribution + Google Play API (Hybrid)

Use Firebase for UAT/testing cycles, Google Play API for production.

**UAT flow:**
- Build UAT AAB (UAT creds) → distribute via **Firebase App Distribution**
- Testers install via Firebase App Tester
- Crashes/errors visible in **Firebase Crashlytics**

**PROD flow:**
- Build PROD AAB (PROD creds) → upload to **Play Console Production track** via Google Play API

**GitHub Actions step (UAT):**
```yaml
- name: Upload to Firebase App Distribution
  uses: wzieba/Firebase-Distribution-Github-Action@v1
  with:
    appId: ${{ secrets.FIREBASE_APP_ID }}
    token: ${{ secrets.FIREBASE_TOKEN }}
    groups: internal-testers
    file: ${{ env.AAB_FILENAME }}
    releaseNotes: "UAT v${{ github.event.inputs.version }} - Build ${{ github.run_number }}"
```

**Secrets needed:**
- `FIREBASE_APP_ID` — Android app ID from Firebase project settings
- `FIREBASE_TOKEN` — generated via `firebase login:ci`
- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` — for production deployment

---

## Goal-by-Goal Breakdown

### 1. Automate AAB to Testing Path

| | Google Play API | Firebase App Distribution |
|---|---|---|
| Where testers install | Play Store (Internal Testing track) | Firebase App Tester / web link |
| Time to reach testers | 5–30 min (Google processing) | Instant |
| Tester onboarding | Add to Internal Testing group in Play Console | Email invite, install Firebase App Tester once |
| Max testers | 100 on Internal track | Unlimited |
| Works with AAB | Yes (native) | Yes (Firebase repackages it) |

### 2. Push Tested Build to Production

Both options require a **separate PROD build** — there is no "promote" path since creds differ.

| | Google Play API | Firebase App Distribution |
|---|---|---|
| Production deployment | Upload PROD AAB to `production` track via action | Firebase has no production deployment — still need Play Console separately |
| Staged rollout | Yes — Alpha → Beta → Production tracks | No native concept |
| Release notes | Per locale via `whatsNewDirectory` | Free text only |

### 3. UAT vs PROD Credentials — Realistic Flow

**Option 1 (Google Play only):**
```
UAT Build (UAT creds) → Internal Testing track → Testers validate
                                                        ↓ sign-off
PROD Build (PROD creds) → Production track → Public release
```

**Option 2 (Hybrid):**
```
UAT Build (UAT creds) → Firebase App Distribution → Testers validate (with Crashlytics)
                                                              ↓ sign-off
PROD Build (PROD creds) → Google Play API → Production track → Public release
```

In both cases, triggering the PROD build is a manual decision after UAT sign-off. The existing workflow `environment` input (`UAT` / `production`) already maps to separate GitHub environment secrets — just needs the deployment step added.

### 4. Monitor Logs During Testing

| | Google Play API (Internal Track) | Firebase App Distribution |
|---|---|---|
| Crash reports | Android Vitals — **production only**, blind for internal testing | Firebase Crashlytics — works pre-production |
| ANR detection | Production only | Yes, via Crashlytics |
| Non-fatal errors | No | Yes, with `Crashlytics.log()` instrumentation |
| Per-tester visibility | No | Yes — crashes tagged by tester |
| Real-time device logs | Not available remotely | Not available remotely |
| Performance monitoring | No | Firebase Performance (network calls, traces) |

**Clear winner for UAT monitoring: Firebase.** Google Play's tooling is essentially blind until production scale.

---

## Recommendation: Hybrid Approach

```
UAT AAB (UAT creds baked in)
    └─→ Firebase App Distribution   ← fast delivery, Crashlytics monitoring
            └─→ Testers validate & report issues
                        ↓ sign-off

PROD AAB (PROD creds baked in)      ← separate workflow, manually triggered
    └─→ Google Play API
            ├─→ Internal track (optional prod-creds sanity check)
            └─→ Production track → public release
```

### Why this split works

- Firebase handles iterative UAT cycles — fast deploys, real crash data, no Play Store delays
- Google Play API handles production — proper staged rollout, Play Store compliance
- UAT can have many fast iterations; PROD only gets intentional, deliberate triggers
- Both paths are independent; a bad UAT build never blocks or risks the production track

### Secrets to add

| Secret | Used for |
|---|---|
| `FIREBASE_APP_ID` | Firebase project Android app ID |
| `FIREBASE_TOKEN` | Firebase CI token (`firebase login:ci`) |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` | Service account JSON for Play Console API |

### One-time setup

**Firebase:**
1. Create Firebase project → add Android app with your package name
2. Enable App Distribution and Crashlytics
3. Run `firebase login:ci` locally → save token as GitHub secret
4. Create a tester group (e.g. `internal-testers`) in Firebase Console

**Google Play:**
1. Google Cloud Console → create Service Account → download JSON key
2. Google Play Console → Setup → API Access → link the service account
3. Grant **Release Manager** role
4. Save JSON as `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` GitHub secret
