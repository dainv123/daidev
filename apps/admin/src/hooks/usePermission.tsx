import { useAuth } from "./useAuth";

export const usePermission = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const tooltip = isAdmin ? "" : "You do not have permission to perform this action";
  return {
    isAdmin,
    canEdit: isAdmin,
    canDelete: isAdmin,
    canCreate: isAdmin,
    tooltip,
  };
};
