import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { themesAPI, tagsAPI } from "../services/api";
import { Plus, Edit, Trash2, Search, Palette, Eye } from "lucide-react";
import { ThemeForm } from "../components/forms/ThemeForm";
import { usePermission } from "../hooks/usePermission";

// Standardize interface to match API
interface Theme {
  _id: string;
  title: { en: string; vi: string };
  description: { en: string; vi: string };
  isPublished: boolean;
  previewImage?: string;
  tags?: string[];
  category?: string;
  // technologies?: string[];
  createdAt: string;
}

export function Themes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const queryClient = useQueryClient();
  const { canCreate, canEdit, canDelete, tooltip } = usePermission();

  const { data: themes, isLoading } = useQuery<Theme[]>({
    queryKey: ["themes"],
    queryFn: themesAPI.getAll,
  });

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: tagsAPI.getAll,
  });

  const deleteThemeMutation = useMutation({
    mutationFn: async (themeId: string) => {
      await themesAPI.delete(themeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
    },
  });

  const createThemeMutation = useMutation({
    mutationFn: async (data: any) => {
      await themesAPI.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
      setShowAddModal(false);
    },
  });

  const updateThemeMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await themesAPI.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
      setEditingTheme(null);
    },
  });

  const filteredThemes = Array.isArray(themes)
    ? themes.filter(
        (theme) =>
          theme.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          theme.title?.vi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof theme.description?.en === "string" &&
            theme.description.en
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (typeof theme.description?.vi === "string" &&
            theme.description.vi
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleDeleteTheme = (themeId: string) => {
    if (window.confirm("Are you sure you want to delete this theme?")) {
      deleteThemeMutation.mutate(themeId);
    }
  };

  const handleCreateTheme = (data: any) => {
    createThemeMutation.mutate(data);
  };

  const handleUpdateTheme = (data: any) => {
    if (editingTheme) {
      updateThemeMutation.mutate({ id: editingTheme._id, data });
    }
  };

  const handleEditTheme = (theme: Theme) => {
    setEditingTheme(theme);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Themes</h1>
          <p className="text-gray-600">Manage website themes and appearance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
          disabled={!canCreate}
          title={!canCreate ? tooltip : ""}>
          <Plus className="h-4 w-4 mr-2" />
          Add Theme
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search themes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Themes Grid */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme) => (
            <div key={theme._id} className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {theme.previewImage ? (
                  <img
                    src={theme.previewImage}
                    alt={theme.title?.en || "Theme"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Palette className="h-16 w-16 text-gray-400" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {theme.title?.en || theme.title?.vi || "Theme"}
                  </h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      theme.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                    {theme.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {theme.description?.en || theme.description?.vi}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(theme.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditTheme(theme)}
                      disabled={!canEdit}
                      title={!canEdit ? tooltip : ""}
                      className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTheme(theme._id)}
                      disabled={!canDelete}
                      title={!canDelete ? tooltip : ""}
                      className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Forms */}
      <ThemeForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateTheme}
        isLoading={createThemeMutation.isLoading}
        availableTags={tags || []}
      />

      <ThemeForm
        isOpen={!!editingTheme}
        onClose={() => setEditingTheme(null)}
        onSubmit={handleUpdateTheme}
        initialData={
          editingTheme
            ? {
                ...editingTheme,
                tags: Array.isArray(editingTheme.tags)
                  ? editingTheme.tags.map((t: any) =>
                      typeof t === "string" ? t : t._id
                    )
                  : [],
              }
            : undefined
        }
        isLoading={updateThemeMutation.isLoading}
        availableTags={tags || []}
      />
    </div>
  );
}
