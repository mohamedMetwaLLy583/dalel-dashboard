import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
