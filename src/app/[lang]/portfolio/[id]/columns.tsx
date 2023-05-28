"use client";

import { ColumnDef } from "@tanstack/react-table";

type Position = {
  id: number;
  ticker: string | null;
  amount: string | null;
  value: number | undefined;
};

export const columns: ColumnDef<Position>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "ticker",
    header: "Ticker",
  },
  {
    accessorKey: "amount",
    header: "Quantité",
  },
  {
    accessorKey: "value",
    header: "Valeur d'une action",
  },
];
