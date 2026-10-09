"use client";

import { createContext, useContext } from "react";

/** True for a viewer: run controls that start work (Retry) are hidden, reading stays. */
const AwcProjectTasksReadOnlyContext = createContext(false);

export const AwcProjectTasksReadOnlyProvider =
  AwcProjectTasksReadOnlyContext.Provider;

export const useAwcProjectTasksReadOnly = (): boolean =>
  useContext(AwcProjectTasksReadOnlyContext);
