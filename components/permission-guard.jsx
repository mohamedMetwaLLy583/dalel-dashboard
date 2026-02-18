"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

/**
 * Route-to-permission mapping.
 * Maps dashboard route segments to the permission name(s) required.
 * The backend CheckPermission middleware is the real enforcement;
 * this is a UI-only guard that shows "Access Denied" early.
 */
const ROUTE_PERMISSIONS = {
  // Accounts
  "/roles": ["role"],
  "/show-roles": ["role"],
  "/store-role": ["role"],
  "/edit-role": ["role"],
  "/admins": ["admin"],
  "/show-admins": ["admin"],
  "/store-admin": ["admin"],
  "/edit-admin": ["admin"],

  // Real Estate
  "/show-realestate": ["property"],
  "/store-realestate": ["property"],
  "/edit-realestate": ["property"],
  "/show-realestate-categories": ["type"],
  "/store-realestate-category": ["type"],
  "/edit-realestate-category": ["type"],

  // Contact
  "/contact-us-msgs": ["contact_us"],

  // Inspections
  "/show-inspection": ["inspection-request"],
  "/show-inspection-history": ["inspection-request"],

  // Reservations
  "/show-reservation": ["reservation"],
  "/show-reservation-history": ["reservation"],

  // Blocked Numbers
  "/show-blocked-numbers": ["blocked-phones"],
  "/store-blocked-number": ["blocked-phones"],

  // Home Sections
  "/edit-home-title": ["home_banner"],
  "/statistics": ["statistics"],
  "/edit-about": ["about_us"],

  // Choose Us / Partners / Steps
  "/show-choose-us": ["choose-us"],
  "/show-partners": ["choose-us"],
  "/store-partners": ["choose-us"],
  "/edit-partners": ["choose-us"],
  "/show-marketing-steps": ["our-steps"],

  // Other Sections
  "/about": ["about_us"],
  "/banner": ["pages_banner"],
  "/show-reviews": ["review"],

  // SEO
  "/seo-home": ["seo"],
  "/seo-rent": ["seo"],
  "/seo-sale": ["seo"],
  "/seo-about": ["seo"],
  "/seo-contact": ["seo"],
};

/**
 * Extracts the route segment from the full pathname.
 * Strips the locale prefix (e.g., /en/ or /ar/) to get the dashboard route.
 */
function getRouteSegment(pathname) {
  // Remove locale prefix: /en/show-roles -> /show-roles
  const withoutLocale = pathname.replace(/^\/[a-z]{2}\//, "/");
  return withoutLocale;
}

/**
 * Checks if the current route requires a permission and whether the user has it.
 */
function checkPermission(pathname, userPermissions) {
  const route = getRouteSegment(pathname);

  // Find matching route permission
  for (const [routePattern, requiredPermissions] of Object.entries(
    ROUTE_PERMISSIONS
  )) {
    // Match exact or prefix (for dynamic routes like /edit-role/[id])
    if (route === routePattern || route.startsWith(routePattern + "/")) {
      // User needs at least one of the required permissions
      return requiredPermissions.some((perm) =>
        userPermissions.includes(perm)
      );
    }
  }

  // No permission mapping found → allow access (e.g., dashboard home, profile, settings)
  return true;
}

const PermissionGuard = ({ children, session }) => {
  const pathname = usePathname();
  const t = useTranslations();

  // Extract permission names from session roles
  const userPermissions =
    session?.roles?.flatMap((role) =>
      role.permissions.map((permission) => permission.name)
    ) || [];

  const hasAccess = checkPermission(pathname, userPermissions);

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <Icon
            icon="heroicons:shield-exclamation"
            className="w-8 h-8 text-destructive"
          />
        </div>
        <h2 className="text-xl font-semibold text-default-900">
          {t("Permissions.accessDenied")}
        </h2>
        <p className="text-sm text-default-500 text-center max-w-md">
          {t("Permissions.noPermission")}
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default PermissionGuard;
