import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex text-xl h-[54px] lg:h-[72px] lg:w-[160px] font-bold w-full rounded-lg border caret-fuschia border-light-gray px-4 py-3 lg:px-6 lg:text-[32px] hover:border-fuschia focus:border-fuschia outline-none lg:tracking-[0.02em]",
          error ? "border-red hover:border-red focus:border-red" : "",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
