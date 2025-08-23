import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educationAPI } from "../services/api";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { EducationForm } from "../components/forms/EducationForm";
import { usePermission } from "../hooks/usePermission";

export function Education() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const queryClient = useQueryClient();
  const { canCreate, canEdit, canDelete, tooltip } = usePermission();

  const { data: education, isLoading } = useQuery({
    queryKey: ["education"],
    queryFn: educationAPI.getAll,
  });

  const deleteEducationMutation = useMutation({
    mutationFn: async (id) => {
      await educationAPI.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });

  const createEducationMutation = useMutation({
    mutationFn: async (data) => {
      await educationAPI.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      setShowAddModal(false);
    },
  });

  const updateEducationMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await educationAPI.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      setEditingEducation(null);
    },
  });

  const filteredEducation = Array.isArray(education)
    ? education.filter(
        (edu) =>
          edu.school?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          edu.school?.vi?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Education</h1>
          <p className="text-gray-600">Manage your education</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
          disabled={!canCreate}
          title={!canCreate ? tooltip : ""}>
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </button>
      </div>
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search education..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEducation.map((edu) => (
            <div
              key={edu._id}
              className="border rounded-lg overflow-hidden p-4 flex flex-col gap-2">
              <div className="font-semibold">
                {edu.school.en} / {edu.school.vi}
              </div>
              <div>
                Degree: {edu.degree.en} / {edu.degree.vi}
              </div>
              <div>
                Field: {edu.field.en} / {edu.field.vi}
              </div>
              <div>
                Start:{" "}
                {edu.startDate
                  ? new Date(edu.startDate).toLocaleDateString()
                  : ""}
              </div>
              <div>
                End:{" "}
                {edu.endDate
                  ? new Date(edu.endDate).toLocaleDateString()
                  : "Present"}
              </div>
              <div>
                Description: {edu.description.en} / {edu.description.vi}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setEditingEducation(edu)}
                  className="text-indigo-600 hover:text-indigo-900"
                  disabled={!canEdit}
                  title={!canEdit ? tooltip : ""}>
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteEducationMutation.mutate(edu._id)}
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
      <EducationForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={createEducationMutation.mutate}
        isLoading={createEducationMutation.isLoading}
      />
      <EducationForm
        isOpen={!!editingEducation}
        onClose={() => setEditingEducation(null)}
        onSubmit={(data) =>
          updateEducationMutation.mutate({ id: editingEducation._id, data })
        }
        initialData={editingEducation}
        isLoading={updateEducationMutation.isLoading}
      />
    </div>
  );
}
