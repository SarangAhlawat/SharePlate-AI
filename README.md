# SharePlate AI

> Surplus food should have a destination, not a disposal date.

SharePlate AI is a conversational food-rescue platform that helps restaurants, caterers, hotels, venues, and event organizers move edible surplus to nearby organizations and communities before it becomes waste.

Instead of navigating long forms or calling multiple NGOs, a donor describes what they have in natural language. SharePlate AI is designed to gather the details needed for a safe handoff, identify a suitable recipient, coordinate collection, and track the donation through to its outcome.

<p align="center">
  <strong>Describe food.</strong> &nbsp;→&nbsp; <strong>Check safety.</strong> &nbsp;→&nbsp; <strong>Find a recipient.</strong> &nbsp;→&nbsp; <strong>Complete the handoff.</strong>
</p>

> [!IMPORTANT]
> This repository contains an early interface prototype with representative data and simulated interactions. It is not a food-safety certification system, logistics service, or substitute for professional or regulatory advice.

## At A Glance

| Area | What SharePlate AI is designed to do |
| --- | --- |
| Problem | Reduce edible food waste while helping communities facing food insecurity |
| Donor experience | Accept a natural-language description, photo, or voice input |
| Safety | Surface preparation time, packaging, freshness, and handoff timing |
| Matching | Consider recipient capacity, proximity, availability, and travel time |
| Coordination | Track acceptance, collection, route timing, and donation outcome |
| Product principle | Optimize for safe, respectful, verified impact, not listings or volume alone |

## Explore The Prototype

The interface demonstrates two sides of the same donation:

| Donor view | Recipient view |
| --- | --- |
| Describe surplus food conversationally | Review the food and collection details |
| Add photo and voice context | Check quantity, timing, and travel estimate |
| Review safety signals | Accept or decline based on capacity |
| Send a pickup request | Follow the handoff status |

### The journey

| Stage | User need | Prototype signal |
| --- | --- | --- |
| 1. Describe | “What do I have?” | Transcript with meal type, quantity, location, and preparation time |
| 2. Assess | “Can this be shared responsibly?” | Packaging, freshness, food type, and safe-sharing window |
| 3. Match | “Who can use it soon?” | Nearby recipient, capacity, route, and estimated travel time |
| 4. Coordinate | “Will it arrive in time?” | Pickup request, countdown, route status, and fallback matching |
| 5. Verify | “What happened to the donation?” | Confirmation and handoff status |

## Why It Matters

Food rescue is time-sensitive. Knowing that food exists is only the beginning. A successful donation needs a safe assessment, an available recipient, a practical collection plan, and a record of the outcome.

SharePlate AI is intended to reduce coordination work for donors and recipient organizations so more effort can go toward safe handling, respectful service, and people who need the food.

## Social Impact By Design

Social impact is a product requirement, not a reporting layer added later.

<details>
<summary><strong>Safety before volume</strong></summary>

The system must never optimize the number of meals diverted at the expense of food safety. AI output should be decision support, never a replacement for trained judgment, local regulations, or recipient policies.

Production safeguards should capture preparation time, storage conditions, allergens, ingredients, packaging, and temperature where relevant. When information is incomplete, the correct action may be to ask for more detail, route to human review, or decline the match.

</details>

<details>
<summary><strong>Dignity and agency</strong></summary>

Recipient organizations and community groups should control their availability, capacity, dietary requirements, and acceptance criteria. They should be able to decline a donation without penalty, choose pickup arrangements, and avoid exposing personal circumstances that are not needed for coordination.

</details>

<details>
<summary><strong>Fair access</strong></summary>

A matching system can favor organizations that are easier to reach or better represented in its data. The platform should support low-bandwidth and mobile-first workflows, plain language, voice input, accessibility needs, human override, and audits for unequal match rates across communities.

</details>

<details>
<summary><strong>Privacy and data minimization</strong></summary>

Donations can reveal addresses, schedules, staff identities, organizational capacity, and sensitive information about people receiving services. A production system should collect only what is necessary, protect location data, limit retention, explain data use clearly, and require appropriate consent before using personal data for model training.

</details>

<details>
<summary><strong>Accountability and transparency</strong></summary>

Donors and recipients should be able to understand why a match or safety prompt was made, correct inaccurate details, and report a problem. Operators should be able to review failed matches, unsafe recommendations, missed pickups, and complaints without hiding responsibility behind automation.

</details>

<details>
<summary><strong>Environmental trade-offs</strong></summary>

Food rescue can reduce waste, but unnecessary vehicle trips, packaging, refrigeration, and failed pickups create additional costs. Matching should consider route efficiency, collection windows, consolidation opportunities, and whether the recipient can use the food before it expires.

</details>

## Measuring What Counts

Impact should describe food safely reaching people, not merely food being listed in a system.

| Measure | Why it matters | Reporting guardrail |
| --- | --- | --- |
| Offered → accepted → collected → delivered | Shows where donations succeed or fail | Never report offered food as delivered food |
| Weight or meal estimate diverted | Indicates waste reduction | Publish the estimation method and uncertainty |
| Safety declines | Shows whether safeguards are working | Do not frame every decline as a product failure |
| Recipient reach and repeat use | Shows whether the network serves communities consistently | Check for unequal access across locations and groups |
| Travel and emissions impact | Captures the cost of collection | Include failed trips and route assumptions |
| Handoff completion time | Tests whether coordination meets the safe window | Report median and failure cases, not only best cases |

## Responsible AI Boundaries

SharePlate AI should not:

- Claim that food is safe based only on an image or incomplete description.
- Make eligibility decisions about people seeking food assistance.
- Infer sensitive personal traits or household circumstances.
- Replace food-safety authorities, trained staff, or safeguarding policies.
- Present an estimate as a verified impact measurement.
- Conceal uncertainty, failed coordination, or a changed safety assessment.

A production deployment would require food-safety professionals, recipient organizations, community representatives, accessibility practitioners, and people with lived experience of food insecurity.

## Technology

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Language | TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 and project CSS tokens |
| Package manager | pnpm |

## Run Locally

### Prerequisites

- Node.js compatible with the version in `.mise.toml`
- pnpm

```bash
pnpm install
pnpm dev
```

Vite prints the local development URL in the terminal.

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install locked dependencies |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm preview` | Preview the production build |
| `pnpm format` | Format the project |

## Project Structure

```text
src/
  App.tsx       Main SharePlate AI prototype experience
  index.css     Global styles and design tokens
  main.tsx      React entry point
public/         Static assets
index.html      Vite HTML shell
```

## Roadmap

| Phase | Focus | Outcome |
| --- | --- | --- |
| 1 | Community validation | Test the workflow with donors, recipient organizations, logistics partners, and people with lived experience |
| 2 | Safety foundation | Define regional requirements and human review for uncertain cases |
| 3 | Trusted network | Add organization accounts, permissions, consent, audit logs, and verified capacity |
| 4 | Reliable coordination | Add notifications, mapping, pickup confirmation, and delivery outcomes |
| 5 | Evidence-led impact | Establish measurement before making public claims about meals rescued or people served |
| 6 | Inclusion testing | Test accessibility, language coverage, bias, privacy, and failure recovery |

## Project Status

**Early interface prototype.** The current experience demonstrates the intended coordination model with simulated data. It does not yet connect to a production AI model, mapping service, notification provider, identity system, food-safety database, or logistics network.

The most important next step is not adding more automation. It is validating the workflow with the people who donate food, receive it, transport it, and rely on it.
