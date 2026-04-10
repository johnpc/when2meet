"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/../amplify_outputs.json";
import { ReactNode } from "react";

Amplify.configure(outputs);

export function AmplifyProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
