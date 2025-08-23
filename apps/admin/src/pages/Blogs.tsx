import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogsAPI, tagsAPI } from "../services/api";
import { Plus, Edit, Trash2, Search, Eye, Palette } from "lucide-react";
import { BlogForm } from "../components/forms/BlogForm";
import { usePermission } from "../hooks/usePermission";

// Standardize interface to match API
interface Blog {
  _id: string;
  title: { en: string; vi: string };
  excerpt: { en: string; vi: string };
  content: { en: string; vi: string };
  isPublished: boolean;
  coverImage?: string;
  tags?: string[];
  category?: string;
  createdAt: string;
}

export function Blogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const queryClient = useQueryClient();
  const { canCreate, canEdit, canDelete, tooltip } = usePermission();

  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: blogsAPI.getAll,
  });

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: tagsAPI.getAll,
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (blogId: string) => {
      await blogsAPI.delete(blogId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const createBlogMutation = useMutation({
    mutationFn: async (data: any) => {
      await blogsAPI.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setShowAddModal(false);
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await blogsAPI.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setEditingBlog(null);
    },
  });

  const filteredBlogs = Array.isArray(blogs)
    ? blogs.filter(
        (blog) =>
          blog.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.title?.vi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof blog.excerpt?.en === "string" &&
            blog.excerpt.en.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (typeof blog.excerpt?.vi === "string" &&
            blog.excerpt.vi.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleDeleteBlog = (blogId: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlogMutation.mutate(blogId);
    }
  };

  const handleCreateBlog = (data: any) => {
    createBlogMutation.mutate(data);
  };

  const handleUpdateBlog = (data: any) => {
    if (editingBlog) {
      updateBlogMutation.mutate({ id: editingBlog._id, data });
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
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
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-600">Manage blog posts and articles</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
          disabled={!canCreate}
          title={!canCreate ? tooltip : ""}>
          <Plus className="h-4 w-4 mr-2" />
          Add Blog
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog._id} className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {blog.coverImage ? (
                  <img
                    src={blog.coverImage}
                    alt={blog.title?.en || "Blog"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Palette className="h-16 w-16 text-gray-400" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {blog.title?.en || blog.title?.vi || "Blog"}
                  </h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      blog.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {blog.excerpt?.en || blog.excerpt?.vi}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="text-indigo-600 hover:text-indigo-900"
                      disabled={!canEdit}
                      title={!canEdit ? tooltip : ""}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={!canDelete}
                      title={!canDelete ? tooltip : ""}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Forms */}
      <BlogForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateBlog}
        isLoading={createBlogMutation.isLoading}
        availableTags={tags || []}
      />

      <BlogForm
        isOpen={!!editingBlog}
        onClose={() => setEditingBlog(null)}
        onSubmit={handleUpdateBlog}
        initialData={
          editingBlog
            ? {
                title: editingBlog.title,
                excerpt: editingBlog.excerpt,
                content: editingBlog.content,
                tags: Array.isArray(editingBlog.tags)
                  ? editingBlog.tags.map((t: any) =>
                      typeof t === "string" ? t : t._id
                    )
                  : [],
                isPublished: editingBlog.isPublished,
                coverImage: editingBlog.coverImage,
              }
            : undefined
        }
        isLoading={updateBlogMutation.isLoading}
        availableTags={tags || []}
      />
    </div>
  );
}
