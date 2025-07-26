type ValidTitleTags =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "div"
  | "span";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  letterSpacing: "tracking-tighter" | "tracking-normal";
  as?: ValidTitleTags;
}

export const Title: React.FC<TitleProps> = ({
  children,
  className = "text-ui-white",
  letterSpacing = "tracking-normal",
  as = "h1",
}) => {
  const Component = as;
  return (
    <Component
      className={`font-title text-1xl ${letterSpacing} md:text-2xl mb-8 text-center ${className}`}
    >
      {children}
    </Component>
  );
};
