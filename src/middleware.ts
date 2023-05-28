import { authMiddleware } from "@clerk/nextjs";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "fr"];

const getLocale = (request: NextRequest) => {
  const headers = { "accept-language": "fr;q=0.5" };
  const languages = new Negotiator({ headers }).languages();
  const defaultLocale = "fr";

  return match(languages, locales, defaultLocale);
};

const middleware = (request: NextRequest) => {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
};

export default authMiddleware({
  beforeAuth: (req) => {
    return middleware(req);
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next|api).*)", "/"],
};
