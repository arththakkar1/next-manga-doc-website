"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-zinc-700 bg-zinc-800 transition-colors duration-300 ease-in-out data-[state=checked]:bg-black/20 data-[state=unchecked]:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#610094] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
