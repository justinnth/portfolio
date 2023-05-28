"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@components/atoms/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/atoms/Form";
import { Input } from "@components/atoms/Input";

export const createPortfolioFormSchema = z.object({
  name: z.string().min(2).max(50),
});

export const CreatePortfolioForm = () => {
  const { user } = useUser();

  const form = useForm<z.infer<typeof createPortfolioFormSchema>>({
    resolver: zodResolver(createPortfolioFormSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (
    values: z.infer<typeof createPortfolioFormSchema>
  ) => {
    const valuesToSend = { name: values.name, userId: user?.id };

    try {
      await fetch("/api/portfolios", {
        method: "POST",
        body: JSON.stringify(valuesToSend),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du portfolio</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
