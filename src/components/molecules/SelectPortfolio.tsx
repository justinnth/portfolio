"use client";

import { InferModel } from "drizzle-orm";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@components/atoms/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/atoms/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/atoms/Popover";
import { portfolios } from "@db/schema";
import { cn } from "@utils/cn";

type SelectPortfolioProps = {
  portfolios: InferModel<typeof portfolios, "select">[];
};

export const SelectPortfolio = ({ portfolios }: SelectPortfolioProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(portfolios[0]?.id);

  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between"
        >
          {value
            ? portfolios.find((portfolio) => portfolio.id === value)?.name
            : "Chercher un portfolio..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandInput placeholder="Chercher un portfolio..." />
          <CommandEmpty>Aucun portfolio trouvé</CommandEmpty>
          <CommandGroup>
            {portfolios.map((portfolio) => (
              <CommandItem
                key={portfolio.id}
                onSelect={(currentValue) => {
                  const selectedPortfolio = portfolios.find(
                    (portfolio) =>
                      portfolio.name?.toLowerCase() === currentValue
                  );

                  setValue(selectedPortfolio?.id ?? portfolios[0]?.id);
                  setOpen(false);
                  router.push(`/portfolio/${selectedPortfolio?.id}`);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === portfolio.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {portfolio.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
