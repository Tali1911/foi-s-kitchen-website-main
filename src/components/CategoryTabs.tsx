import { cn } from "@/lib/utils";

/** Pill tabs with an animated active pill that slides between options. */
export function CategoryTabs<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
  label: string;
}) {
  return (
    <div className="-mx-5 px-5 sm:mx-0 sm:px-0">
      <div
        role="tablist"
        aria-label={label}
        className="scroll-row rounded-full bg-secondary p-1.5 sm:flex-wrap"
      >
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "label-caps min-h-[44px] rounded-full px-4 whitespace-nowrap transition-all duration-300 ease-out",
                active
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "text-foreground/70 hover:text-primary",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );

}
