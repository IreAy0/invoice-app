import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Card({
  className,
  children,
  as: Tag = "div",
  ...props
}: CardProps) {
  return (
    <Tag {...props} className={clsx("card p-6", className)}>
      {children}
    </Tag>
  );
}
