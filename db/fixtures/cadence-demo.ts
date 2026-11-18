/**
 * DEVELOPMENT FIXTURE. Values come from the Stitch screens.
 * Used until the Drizzle repository is wired. Never imported by production
 * components or by any code path that runs when NODE_ENV is "production".
 */
import type { Currency, MilestoneStatus, ProjectStage } from "@/db/schema";

export type FixtureMilestone = {
  position: number;
  title: string;
  description?: string;
  amountMinor: number;
  status: MilestoneStatus;
  dueDate?: string;
};

export type FixtureProject = {
  id: string;
  studioId: string;
  reference: string;
  title: string;
  studioName: string;
  clientName: string;
  currency: Currency;
  stage: ProjectStage;
  contactUserIds: string[];
  milestones: FixtureMilestone[];
};

export type FixtureProposal = {
  id: string;
  projectId: string;
  version: number;
  issuedOn: string;
  revisionTerms: string;
  status: "draft" | "sent" | "signed";
};

export const demoViewerId = "usr_demo_sofia_marin";

export const demoProjects: FixtureProject[] = [
  {
    id: "prj_cad_2026_089",
    studioId: "stu_lumen",
    reference: "CAD-2026-089",
    title: "Brand identity and website",
    studioName: "Lumen Studio",
    clientName: "Apex Holdings LLC",
    currency: "USD",
    stage: "in_progress",
    contactUserIds: [demoViewerId],
    milestones: [
      { position: 1, title: "Brand strategy and discovery", amountMinor: 180000, status: "approved", dueDate: "2026-11-18" },
      { position: 2, title: "Website design and UX", amountMinor: 240000, status: "payment_due", dueDate: "2026-11-20" },
      { position: 3, title: "Production storefront build", amountMinor: 180000, status: "upcoming", dueDate: "2026-12-12" },
    ],
  },
  {
    id: "prj_cad_2026_090",
    studioId: "stu_lumen",
    reference: "CAD-2026-090",
    title: "Brand identity and website",
    studioName: "Lumen Studio",
    clientName: "Apex Holdings LLC",
    currency: "USD",
    stage: "proposal",
    contactUserIds: [demoViewerId],
    milestones: [
      {
        position: 1,
        title: "Kickoff and strategic positioning",
        description: "Due immediately on counter-signature.",
        amountMinor: 180000,
        status: "upcoming",
      },
      {
        position: 2,
        title: "Prototype acceptance",
        description: "Approved design system and a clickable high-fidelity interactive prototype.",
        amountMinor: 240000,
        status: "upcoming",
      },
      {
        position: 3,
        title: "Final handover and production deploy",
        description: "Production asset repository delivery, DNS mapping and code deployment.",
        amountMinor: 180000,
        status: "upcoming",
      },
    ],
  },
];

export const demoProposals: FixtureProposal[] = [
  {
    id: "prp_cad_2026_090_v4",
    projectId: "prj_cad_2026_090",
    version: 4,
    issuedOn: "2026-11-14",
    revisionTerms:
      "Two formal revision cycles per deliverable phase. Further revisions are billed at $145 per hour.",
    status: "sent",
  },
];

/** Email used for the development viewer. A reserved example domain, not a real address. */
export const demoViewerEmail = "sofia.marin@example.com";

/** Studio tenancy. A user can be a member of one or more studios; the dashboard shows the one they belong to. */
export type FixtureStudio = { id: string; name: string };
export type FixtureMembership = { studioId: string; userId: string; role: "owner" | "admin" | "member" | "viewer" };

export const demoStudioOwnerId = "usr_demo_lumen_owner";
export const demoStudioOwnerEmail = "owner@example.com";

export const demoStudios: FixtureStudio[] = [{ id: "stu_lumen", name: "Lumen Studio" }];

export const demoMemberships: FixtureMembership[] = [
  { studioId: "stu_lumen", userId: demoStudioOwnerId, role: "owner" },
];
