import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15.5 6.8a5.6 5.6 0 0 0-6.9 0" stroke="hsl(var(--primary))" />
      <path d="M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" stroke="hsl(var(--accent))" />
      <path d="M12 16v2" stroke="hsl(var(--primary))" />
    </svg>
  ),
};
