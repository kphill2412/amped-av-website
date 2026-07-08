# Amped AV — Google Analytics setup

## 1. Create the GA4 property

1. Go to [analytics.google.com](https://analytics.google.com)
2. **Admin** (gear) → **Create** → **Property** → name it `Amped AV`
3. **Data streams** → **Add stream** → **Web**
4. URL: `https://ampedav.com` (or `https://amped-av-website.pages.dev` until domain is live)
5. Copy the **Measurement ID** (format `G-XXXXXXXXXX`)

## 2. Add the ID to the site

Edit `js/analytics.js` line 8:

```js
var MEASUREMENT_ID = 'G-BPVYEWDEKY';
```

Deploy. Analytics stays off until a real ID replaces the placeholder.

## 3. Events tracked automatically

| GA4 event name | When it fires |
|----------------|---------------|
| `contact_call_click` | Any `tel:` link clicked |
| `contact_text_click` | Any `sms:` link clicked |
| `contact_email_click` | Any `mailto:` link clicked |
| `cta_click` | "Get a Free Estimate", header Contact, links to contact page |
| `form_submit` | Contact form submitted |
| `generate_lead` | Same as form submit (GA4 recommended event) |

Page views are tracked automatically.

## 4. Where to read numbers in GA4

**Reports → Engagement → Events** — filter by event name above.

**Reports → Engagement → Pages and screens** — filter path `/contact.html` for contact page views.

**Reports → Acquisition → Traffic acquisition** — sessions by source.

Tip: Mark `generate_lead` as a **conversion** in Admin → Events → Mark as key event.

## 5. Monthly spreadsheet

Use `analytics/monthly-lead-tracker-template.csv`:

- **GA4 columns** — pull from Analytics once a month (or weekly during launch)
- **John columns** — ask John: "How many calls/texts/emails did you get from the site this month? How many turned into estimates/jobs?"

Clicks measure *intent*; John's numbers measure *real inbounds*.

## 6. Formspree (when wired)

Form submissions will also appear in the Formspree dashboard. Cross-check with GA4 `form_submit` counts.
