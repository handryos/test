import React from "react";

type ValidTextTags =
  | "p"
  | "span"
  | "div"
  | "label"
  | "strong"
  | "em"
  | "small"
  | "blockquote"
  | "li"
  | "a";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: ValidTextTags;
  colorizedTypography?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  className = "",
  as = "p",
  colorizedTypography = false,
}) => {
  const Component = as;
  const colorClass = colorizedTypography
    ? "text-coffee-primary"
    : "text-ui-label";
  return (
    <Component
      className={`tracking-wide font-sans text-lg md:text-xl mb-1 text-center ${colorClass} ${className}`}
    >
      {children}
    </Component>
  );
};
