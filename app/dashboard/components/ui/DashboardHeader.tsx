import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonIcon?: ReactNode;
}

export default function DashboardHeader({
  title,
  subtitle,
  buttonText,
  buttonLink,
  buttonIcon,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>

      {buttonText &&
        (buttonLink ? (
          // Use asChild when the button should render as a Link
          <Button>
            <Link
              className="flex justify-center items-center"
              href={buttonLink}
            >
              {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
              {buttonText}
            </Link>
          </Button>
        ) : (
          // Render a standard button if there is no link
          <Button className="flex justify-center items-center">
            {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
            {buttonText}
          </Button>
        ))}
    </div>
  );
}
