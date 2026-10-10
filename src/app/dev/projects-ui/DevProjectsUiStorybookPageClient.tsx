"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { AuthSessionProvider } from "@/features/auth/public-api/presentation";
import ProjectsStorybookPageClient from "@/features/projects/storybook/ProjectsStorybookPageClient";

const DevProjectsUiStorybookPageClient = () => (
  <ThemeProvider>
    <AuthSessionProvider>
      <ProjectsStorybookPageClient />
    </AuthSessionProvider>
  </ThemeProvider>
);

export default DevProjectsUiStorybookPageClient;
