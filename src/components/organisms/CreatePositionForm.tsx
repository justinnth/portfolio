"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ITickers } from "@polygon.io/client-js";
import { CommandLoading } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@components/atoms/Badge";
import { Button } from "@components/atoms/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/atoms/Command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/atoms/Form";
import { Input } from "@components/atoms/Input";
import { Label } from "@components/atoms/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/atoms/Popover";
import { cn } from "@utils/cn";

const createPositionFormSchema = z.object({
  ticker: z.string({ required_error: "Veuillez selectionner une action" }),
  amount: z.string({ required_error: "Veuillez entrer un montant" }),
});

type CreatePositionFormProps = {
  portfolioId: number;
};

export const CreatePositionForm = ({
  portfolioId,
}: CreatePositionFormProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ITickers["results"]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);

  const router = useRouter();

  useEffect(() => {
    async function getItems() {
      setLoading(true);
      const res = await fetch(`/api/tickers?search=${search}`);
      const tickers = await res.json();
      setItems(tickers);
      setLoading(false);
    }

    getItems();
  }, [search]);

  const form = useForm<z.infer<typeof createPositionFormSchema>>({
    resolver: zodResolver(createPositionFormSchema),
  });

  useEffect(() => {
    async function getPrice() {
      if (!form.getValues().ticker) return;

      const res = await fetch(`/api/price?ticker=${form.getValues().ticker}`);
      const price = await res.json();
      setPrice(price[0].c);
    }

    getPrice();
  }, [form.getValues().ticker]);

  const onSubmit = async (data: z.infer<typeof createPositionFormSchema>) => {
    const valuesToSend = {
      portfolioId,
      ticker: data.ticker,
      amount: data.amount,
    };

    try {
      await fetch("/api/positions", {
        method: "POST",
        body: JSON.stringify(valuesToSend),
      });

      router.push(`/portfolio/${portfolioId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="ticker"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ticker</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      aria-expanded={open}
                      role="combobox"
                      className={cn(
                        "w-[400px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? items.find(
                            (ticker) =>
                              ticker.ticker.toLowerCase() === field.value
                          )?.name
                        : "Select ticker"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput
                      value={search}
                      onValueChange={setSearch}
                      placeholder="Search framework..."
                    />
                    {loading && <CommandLoading>Loading...</CommandLoading>}
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {items.map((ticker) => (
                        <CommandItem
                          value={ticker.ticker}
                          key={ticker.ticker}
                          onSelect={(value) => {
                            form.setValue("ticker", value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              ticker.ticker === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {ticker.ticker} - {ticker.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de parts</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Nombre de parts" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Label>Prix</Label>
          <div className="flex gap-2">
            <Input disabled value={price} placeholder="Court de l'action" />
            <Badge>$USD</Badge>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
