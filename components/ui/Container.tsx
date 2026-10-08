import type { ReactNode } from "react";

const widths = {
  content: "max-w-content", // 1280px: page layouts
  reading: "max-w-reading", // 720px: text-focused blocks
} as const;

type ContainerProps = {
  children: ReactNode;
  size?: keyof typeof widths;
  className?: string;
};

export default function Container({
  children,
  size = "content",
  className,
}: ContainerProps) {
  return (
    <div
      className={["mx-auto w-full px-gutter", widths[size], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
