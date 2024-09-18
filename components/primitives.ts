import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      tiny: "text-xl lg:text-2xl",
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    mb: {
      none: "",
      sm: "mb-2",
      md: "mb-5",
      lg: "mb-10",
    },
    bold: {
      medium: "font-medium",
      bold: "font-bold",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
    bold: "medium",
    mb: "none",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "text-lg lg:text-xl text-default-600",
  variants: {
    fullWidth: {
      true: "w-full max-w-full",
    },
    lineCamp: {
      one: "line-clamp-1",
      two: "line-clamp-2",
      three: "line-clamp-3",
    },
    color: {
      default: "text-black dark:text-white",
    },
    mb: {
      none: "",
      sm: "mb-2",
      md: "mb-5",
      lg: "mb-10",
    },
    align: {
      center: "text-center",
      left: "text-left",
      right: "text-right",
    },
    size: {
      tiny: "text-xs lg:text-sm",
      sm: "text-sm lg:text-base",
      md: "text-lg lg:text-xl",
    },
  },
  defaultVariants: {
    size: "md",
    align: "left",
    mb: "none",
  },
});
