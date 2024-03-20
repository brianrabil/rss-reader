import { NextResponse } from "next/server";
import axios from "axios";
import Parser from "rss-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const parser = new Parser();

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	return Response.json({});
}
