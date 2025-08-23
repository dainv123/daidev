import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skillsAPI } from "../services/api";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { SkillForm } from "../components/forms/SkillForm";
import { usePermission } from "../hooks/usePermission";

export function Skills() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const queryClient = useQueryClient();
  const { canCreate, canEdit, canDelete, tooltip } = usePermission();

  const { data: skills, isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: skillsAPI.getAll,
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (id) => {
      await skillsAPI.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });

  const createSkillMutation = useMutation({
    mutationFn: async (data) => {
      await skillsAPI.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      setShowAddModal(false);
    },
  });

  const updateSkillMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await skillsAPI.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      setEditingSkill(null);
    },
  });

  const filteredSkills = Array.isArray(skills)
    ? skills.filter(
        (skill) =>
          skill.name?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.name?.vi?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skills</h1>
          <p className="text-gray-600">Manage your skills</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
          disabled={!canCreate}
          title={!canCreate ? tooltip : ""}>
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </button>
      </div>
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill._id}
              className="border rounded-lg overflow-hidden p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className={skill.icon}></span>
                <span className="font-semibold">
                  {skill.name.en} / {skill.name.vi}
                </span>
              </div>
              <div>
                Level: {skill.level.en} / {skill.level.vi}
              </div>
              <div>Stars: {skill.stars}</div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setEditingSkill(skill)}
                  className="text-indigo-600 hover:text-indigo-900"
                  disabled={!canEdit}
                  title={!canEdit ? tooltip : ""}>
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteSkillMutation.mutate(skill._id)}
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
      <SkillForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={createSkillMutation.mutate}
        isLoading={createSkillMutation.isLoading}
      />
      <SkillForm
        isOpen={!!editingSkill}
        onClose={() => setEditingSkill(null)}
        onSubmit={(data) =>
          updateSkillMutation.mutate({ id: editingSkill._id, data })
        }
        initialData={editingSkill}
        isLoading={updateSkillMutation.isLoading}
      />
    </div>
  );
}
