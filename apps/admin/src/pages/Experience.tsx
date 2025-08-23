import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { experienceAPI } from "../services/api";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { ExperienceForm } from "../components/forms/ExperienceForm";
import { usePermission } from "../hooks/usePermission";

export function Experience() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const queryClient = useQueryClient();
  const { canCreate, canEdit, canDelete, tooltip } = usePermission();

  const { data: experience, isLoading } = useQuery({
    queryKey: ["experience"],
    queryFn: experienceAPI.getAll,
  });

  const deleteExperienceMutation = useMutation({
    mutationFn: async (id) => {
      await experienceAPI.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
    },
  });

  const createExperienceMutation = useMutation({
    mutationFn: async (data) => {
      await experienceAPI.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      setShowAddModal(false);
    },
  });

  const updateExperienceMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await experienceAPI.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience"] });
      setEditingExperience(null);
    },
  });

  const filteredExperience = Array.isArray(experience)
    ? experience.filter(
        (exp) =>
          exp.company?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exp.company?.vi?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Experience</h1>
          <p className="text-gray-600">Manage your experience</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
          disabled={!canCreate}
          title={!canCreate ? tooltip : ""}>
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </button>
      </div>
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search experience..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperience.map((exp) => (
            <div
              key={exp._id}
              className="border rounded-lg overflow-hidden p-4 flex flex-col gap-2">
              <div className="font-semibold">
                {exp.company.en} / {exp.company.vi}
              </div>
              <div>
                Position: {exp.position.en} / {exp.position.vi}
              </div>
              <div>
                Start:{" "}
                {exp.startDate
                  ? new Date(exp.startDate).toLocaleDateString()
                  : ""}
              </div>
              <div>
                End:{" "}
                {exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString()
                  : "Present"}
              </div>
              <div>
                Description: {exp.description.en} / {exp.description.vi}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setEditingExperience(exp)}
                  className="text-indigo-600 hover:text-indigo-900"
                  disabled={!canEdit}
                  title={!canEdit ? tooltip : ""}>
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteExperienceMutation.mutate(exp._id)}
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
      <ExperienceForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={createExperienceMutation.mutate}
        isLoading={createExperienceMutation.isLoading}
      />
      <ExperienceForm
        isOpen={!!editingExperience}
        onClose={() => setEditingExperience(null)}
        onSubmit={(data) =>
          updateExperienceMutation.mutate({ id: editingExperience._id, data })
        }
        initialData={editingExperience}
        isLoading={updateExperienceMutation.isLoading}
      />
    </div>
  );
}
