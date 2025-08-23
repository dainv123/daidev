import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { siteSettingsAPI } from "../services/api";
import { Edit, Save, X } from "lucide-react";

export function SiteSettings() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ["site-settings"],
    queryFn: siteSettingsAPI.getAll,
  });
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<any>(null);

  const updateMutation = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: any }) => {
      await siteSettingsAPI.update(id, { value });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      setEditingKey(null);
      setEditValue(null);
      window.dispatchEvent(
        new CustomEvent("app-success", { detail: "Cập nhật thành công!" })
      );
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || error.message || "Có lỗi xảy ra!";
      window.dispatchEvent(new CustomEvent("app-error", { detail: msg }));
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        All Site Settings
      </h1>
      <div className="card">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tenant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {settings?.map((item: any) => (
              <tr key={item._id}>
                <td className="px-6 py-4 font-mono text-xs">{item.key}</td>
                <td className="px-6 py-4">
                  {editingKey === item._id ? (
                    <textarea
                      className="w-full border rounded p-2 text-xs font-mono"
                      rows={3}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap break-all text-xs font-mono bg-gray-50 p-2 rounded">
                      {typeof item.value === "object"
                        ? JSON.stringify(item.value, null, 2)
                        : String(item.value)}
                    </pre>
                  )}
                </td>
                <td className="px-6 py-4 text-xs">{item.tenantId}</td>
                <td className="px-6 py-4">
                  {editingKey === item._id ? (
                    <div className="flex gap-2">
                      <button
                        className="btn-primary btn-xs flex items-center"
                        onClick={() =>
                          updateMutation.mutate({
                            id: item._id,
                            value: (() => {
                              try {
                                return JSON.parse(editValue);
                              } catch {
                                return editValue;
                              }
                            })(),
                          })
                        }
                        disabled={updateMutation.isLoading}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </button>
                      <button
                        className="btn-secondary btn-xs flex items-center"
                        onClick={() => {
                          setEditingKey(null);
                          setEditValue(null);
                        }}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn-secondary btn-xs flex items-center"
                      onClick={() => {
                        setEditingKey(item._id);
                        setEditValue(
                          typeof item.value === "object"
                            ? JSON.stringify(item.value, null, 2)
                            : String(item.value)
                        );
                      }}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
