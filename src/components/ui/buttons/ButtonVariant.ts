export type ButtonVariant = "primary" | "secondary" | "outline";

export const variantClassNames = (variant: ButtonVariant): string => {
  const primary = "bg-blue-500 hover:bg-opacity-80 active:bg-opacity-70 text-white";
  const secondary = "bg-slate-400 dark:bg-neutral-800 hover:bg-slate-600 dark:hover:bg-neutral-700 active:bg-slate-700 dark:active:bg-neutral-600 text-white";
  const outline = "outline outline-1 outline-neutral-200 dark:outline-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700";

  switch (variant) {
    case "primary": return primary;
    case "secondary": return secondary;
    case "outline": return outline;
  }
}