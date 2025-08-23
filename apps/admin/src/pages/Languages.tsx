import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { languagesAPI } from "../services/api";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { LanguageForm } from "../components/forms/LanguageForm";
import { usePermission } from "../hooks/usePermission";

export function Languages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const queryClient = useQueryClient();
  const { canCreate, canEdit, canDelete, tooltip } = usePermission();

  const { data: languages, isLoading } = useQuery({
    queryKey: ["languages"],
    queryFn: languagesAPI.getAll,
  });

  const deleteLanguageMutation = useMutation({
    mutationFn: async (id) => {
      await languagesAPI.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
    },
  });

  const createLanguageMutation = useMutation({
    mutationFn: async (data) => {
      await languagesAPI.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      setShowAddModal(false);
    },
  });

  const updateLanguageMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await languagesAPI.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      setEditingLanguage(null);
    },
  });

  const filteredLanguages = Array.isArray(languages)
    ? languages.filter(
        (lang) =>
          lang.name?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lang.name?.vi?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Languages</h1>
          <p className="text-gray-600">Manage your languages</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
          disabled={!canCreate}
          title={!canCreate ? tooltip : ""}>
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </button>
      </div>
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLanguages.map((lang) => (
            <div
              key={lang._id}
              className="border rounded-lg overflow-hidden p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className={lang.icon}></span>
                <span className="font-semibold">
                  {lang.name.en} / {lang.name.vi}
                </span>
              </div>
              <div>
                Level: {lang.level.en} / {lang.level.vi}
              </div>
              <div>Stars: {lang.stars}</div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setEditingLanguage(lang)}
                  className="text-indigo-600 hover:text-indigo-900"
                  disabled={!canEdit}
                  title={!canEdit ? tooltip : ""}>
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteLanguageMutation.mutate(lang._id)}
                  className="text-red-600 hover:text-red-900"
                  disabled={!canDelete}
                  title={!canDelete ? tooltip : ""}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LanguageForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={createLanguageMutation.mutate}
        isLoading={createLanguageMutation.isLoading}
      />
      <LanguageForm
        isOpen={!!editingLanguage}
        onClose={() => setEditingLanguage(null)}
        onSubmit={(data) =>
          updateLanguageMutation.mutate({ id: editingLanguage._id, data })
        }
        initialData={editingLanguage}
        isLoading={updateLanguageMutation.isLoading}
      />
    </div>
  );
}
