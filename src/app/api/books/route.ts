import type { NextApiRequest, NextApiResponse } from "next";
import { BookSearchResult } from "@/components/types";
import { NextRequest } from "next/server";
import { searchBooks } from "./utils";

export async function POST(request: NextRequest) {
  const options = await request.json();

  const result = await searchBooks(options);

  return Response.json(result);
}
