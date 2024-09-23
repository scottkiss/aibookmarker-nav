interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ variant = "p", className, children }) => {
  const Tag = variant;
  return <Tag className={className}>{children}</Tag>;
};

export default Typography;
