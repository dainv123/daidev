import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tagsAPI } from "../services/api";
import { Plus, Edit, Trash2, Search, Tag } from "lucide-react";
import { TagForm } from "../components/forms/TagForm";
import { usePermission } from "../hooks/usePermission";

interface TagItem {
  _id: string;
  name: string;
  slug: string;
  description: { en: string; vi: string };
  isActive: boolean;
  usageCount: number;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export function Tags() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTag, setEditingTag] = useState<TagItem | null>(null);
  const queryClient = useQueryClient();
  const { canCreate, canEdit, canDelete, tooltip } = usePermission();

  const { data: tags, isLoading } = useQuery<TagItem[]>({
    queryKey: ["tags"],
    queryFn: tagsAPI.getAll,
  });

  const deleteTagMutation = useMutation({
    mutationFn: async (tagId: string) => {
      await tagsAPI.delete(tagId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      window.dispatchEvent(
        new CustomEvent("app-success", { detail: "Xóa tag thành công!" })
      );
    },
  });

  const createTagMutation = useMutation({
    mutationFn: async (data: any) => {
      await tagsAPI.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      setShowAddModal(false);
      window.dispatchEvent(
        new CustomEvent("app-success", { detail: "Tạo tag thành công!" })
      );
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await tagsAPI.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      setEditingTag(null);
      window.dispatchEvent(
        new CustomEvent("app-success", { detail: "Cập nhật tag thành công!" })
      );
    },
  });

  const filteredTags =
    tags?.filter(
      (tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.description.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.description.vi.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleDeleteTag = (tagId: string) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      deleteTagMutation.mutate(tagId);
    }
  };

  const handleCreateTag = (data: any) => {
    createTagMutation.mutate(data);
  };

  const handleUpdateTag = (data: any) => {
    if (editingTag) {
      updateTagMutation.mutate({ id: editingTag._id, data });
    }
  };

  const handleEditTag = (tag: TagItem) => {
    setEditingTag(tag);
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
          <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
          <p className="text-gray-600">Manage content tags and categories</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
          disabled={!canCreate}
          title={!canCreate ? tooltip : ""}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tag
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Tags Grid */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTags.map((tag) => (
            <div key={tag._id} className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: tag.isActive ? "#10B981" : "#6B7280",
                    }}></div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {tag.name}
                  </h3>
                </div>
                <span className="text-sm text-gray-500">
                  {tag.usageCount} items
                </span>
              </div>
              <p className="text-gray-600 mb-4">{tag.description.en}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(tag.createdAt).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTag(tag)}
                    className="text-indigo-600 hover:text-indigo-900"
                    disabled={!canEdit}
                    title={!canEdit ? tooltip : ""}>
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTag(tag._id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={!canDelete}
                    title={!canDelete ? tooltip : ""}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tag Forms */}
      <TagForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateTag}
        isLoading={createTagMutation.isLoading}
      />

      <TagForm
        isOpen={!!editingTag}
        onClose={() => setEditingTag(null)}
        onSubmit={handleUpdateTag}
        initialData={
          editingTag
            ? {
                name: editingTag.name,
                slug: editingTag.slug,
                description: editingTag.description,
                isActive: editingTag.isActive,
              }
            : undefined
        }
        isLoading={updateTagMutation.isLoading}
      />
    </div>
  );
}
