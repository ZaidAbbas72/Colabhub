"use client";

import { Toaster, toast } from "sonner";

export const useToast = () => {
  return { toast };
};

export function ToasterProvider() {
  return <Toaster position="top-right" />;
}
