import * as React from "react";

import { cn } from "./utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    type,
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    fullWidth,
    id,
    ...props
  },
  ref,
) {
  const generatedId = React.useId();
  const inputId = id ?? `input-${generatedId}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  let describedBy: string | undefined;
  let supportingText: React.ReactNode = null;
  if (error) {
    describedBy = errorId;
    supportingText = (
      <p id={errorId} role="alert" className="mt-2 text-sm text-destructive">
        {error}
      </p>
    );
  } else if (helperText) {
    describedBy = helperId;
    supportingText = (
      <p id={helperId} className="mt-2 text-sm text-muted-foreground">
        {helperText}
      </p>
    );
  }

  return (
    <div className={cn(fullWidth && "w-full")}> 
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          data-slot="input"
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </span>
        )}
      </div>
      {supportingText}
    </div>
  );
});

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

function Textarea({
  className,
  label,
  helperText,
  error,
  fullWidth,
  id,
  ...props
}: Readonly<TextareaProps>) {
  const generatedId = React.useId();
  const textareaId = id ?? `textarea-${generatedId}`;
  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;
  let describedBy: string | undefined;
  let supportingText: React.ReactNode = null;
  if (error) {
    describedBy = errorId;
    supportingText = (
      <p id={errorId} role="alert" className="mt-2 text-sm text-destructive">
        {error}
      </p>
    );
  } else if (helperText) {
    describedBy = helperId;
    supportingText = (
      <p id={helperId} className="mt-2 text-sm text-muted-foreground">
        {helperText}
      </p>
    );
  }

  return (
    <div className={cn(fullWidth && "w-full")}> 
      {label && (
        <label htmlFor={textareaId} className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        data-slot="textarea"
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={cn(
          "border-input min-h-24 w-full rounded-md border bg-input-background px-3 py-2 text-base md:text-sm",
          "placeholder:text-muted-foreground outline-none transition-[color,box-shadow]",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      {supportingText}
    </div>
  );
}

interface RadioProps extends Omit<React.ComponentProps<"input">, "type"> {
  label: string;
  description?: string;
}

function Radio({ label, description, className, id, ...props }: Readonly<RadioProps>) {
  const generatedId = React.useId();
  const radioId = id ?? `radio-${generatedId}`;
  return (
    <label htmlFor={radioId} className={cn("flex cursor-pointer items-start gap-3", className)}>
      <input id={radioId} type="radio" className="mt-1 h-4 w-4" {...props} />
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        {description && <span className="block text-sm text-muted-foreground">{description}</span>}
      </span>
    </label>
  );
}

interface SwitchProps extends Omit<React.ComponentProps<"input">, "type"> {
  label: string;
  description?: string;
}

function Switch({ label, description, className, id, ...props }: Readonly<SwitchProps>) {
  const generatedId = React.useId();
  const switchId = id ?? `switch-${generatedId}`;
  return (
    <label
      htmlFor={switchId}
      className={cn("flex cursor-pointer items-start justify-between gap-3 rounded-lg border p-3", className)}
    >
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        {description && <span className="block text-sm text-muted-foreground">{description}</span>}
      </span>
      <input id={switchId} type="checkbox" className="mt-1 h-4 w-4" {...props} />
    </label>
  );
}

export { Input, Radio, Switch, Textarea };
