import { Button } from "@/shared/components/ui/Button";
import React from "react";

export const CreateCoffeeButton: React.FC<{
  onClick?: () => void;
  label: string;
}> = ({ onClick, label }) => (
  <Button className={`w-fit h-11`} onClick={onClick} variant="primary">
    <span className="flex items-center  justify-center tracking-wider font-medium w-full h-full text-ui-white text-sm md:text-md">
      {label}
    </span>
  </Button>
);
