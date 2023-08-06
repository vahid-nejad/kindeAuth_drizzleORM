import { AuthEndpoints, handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

interface Props {
  params: {
    kindAuth: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  const endpoint = params.kindAuth as AuthEndpoints;
  return handleAuth(request, endpoint);
}
