import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

type ActionCardProps = {
  title: string;
  description: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  active?: boolean;
};

export function ActionCard({
  title,
  description,
  active,
  onClick,
  icon,
}: ActionCardProps) {
  return (
    <Card className={`relative isolate flex h-[217px] w-full flex-col justify-center gap-4 overflow-hidden rounded-[24px]  px-10 py-8  ${active ? "bg-[#003EFF] text-white" : ""}`}>
      {icon && (
        <div className=" h-20 w-20 ">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-2 max-w-[259px]">
        <h2 className="font-neue-medium text-[22px] font-medium leading-[27px]">
          {title}
        </h2>
        <p className={"font-neue-medium text-[14px] font-normal leading-[22px] tracking-[0.003em] " + (active ? "text-white" : "text-text-body")}>
          {description}
        </p>
      </div>
    </Card>
  );
}
