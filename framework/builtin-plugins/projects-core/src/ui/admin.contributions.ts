import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "projects",
      label: "Projects",
      icon: "kanban",
      description: "Project execution, milestones, and budget-aware delivery tracking.",
      permission: "projects.projects.read",
      homePath: "/admin/business/projects",
      quickActions: ["projects-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "projects",
      group: "control-room",
      items: [
        {
          id: "projects-core.overview",
          label: "Control Room",
          icon: "kanban",
          to: "/admin/business/projects",
          permission: "projects.projects.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "projects-core.page",
      kind: "dashboard",
      route: "/admin/business/projects",
      label: "Projects Control Room",
      workspace: "projects",
      group: "control-room",
      permission: "projects.projects.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "projects-core.open.control-room",
      label: "Open Projects Core",
      permission: "projects.projects.read",
      href: "/admin/business/projects",
      keywords: ["projects core","projects","business"]
    })
  ]
};
