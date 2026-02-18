import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { menuConfig } from "@/config/menus";

export const authorizationNavLinks = async (req, res) => {
  try {
    // Get the user session
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return [];
    }

    // Example logic to filter based on user permissions
    const userPermissions =
      session?.roles?.flatMap((role) => role.permissions) || [];

    // Filter the menu based on permissions (optional logic, uncomment if needed)
    // const filteredMenuConfig = menuConfig.filter((link) => {
    //   return link.permissions.some((permission) => userPermissions.includes(permission));
    // });

    return userPermissions; // Return the permissions or the filtered config
  } catch (error) {
    return [];
  }
};
