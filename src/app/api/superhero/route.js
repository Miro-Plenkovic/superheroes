import { NextResponse } from "next/server";

let data = [];

export async function GET(req) {
  try {
    return NextResponse.json(
      { data: data.toSorted((a, b) => a.humility - b.humility) },
      {
        status: 200
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    data.push(await req.json());
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
}