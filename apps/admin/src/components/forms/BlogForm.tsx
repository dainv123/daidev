import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface BlogFormData {
  title: {
    en: string;
    vi: string;
  };
  content: {
    en: string;
    vi: string;
  };
  excerpt: {
    en: string;
    vi: string;
  };
  tags: string[];
  isPublished: boolean;
  coverImage?: string;
}

interface BlogFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BlogFormData) => void;
  initialData?: BlogFormData;
  isLoading?: boolean;
  availableTags?: Array<{ _id: string; name: string }>;
}

export const BlogForm: React.FC<BlogFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  availableTags = [],
}) => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: { en: "", vi: "" },
    content: { en: "", vi: "" },
    excerpt: { en: "", vi: "" },
    tags: [],
    isPublished: false,
    coverImage: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: { en: "", vi: "" },
        content: { en: "", vi: "" },
        excerpt: { en: "", vi: "" },
        tags: [],
        isPublished: false,
        coverImage: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    if (
      field === "title.en" ||
      field === "title.vi" ||
      field === "content.en" ||
      field === "content.vi" ||
      field === "excerpt.en" ||
      field === "excerpt.vi"
    ) {
      const [parent, lang] = field.split(".") as [string, "en" | "vi"];
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[
            parent as keyof Pick<BlogFormData, "title" | "content" | "excerpt">
          ],
          [lang]: value as string,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleTagChange = (tagId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagId],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.filter((id) => id !== tagId),
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {initialData ? "Edit Blog Post" : "Add New Blog Post"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Title English */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title.en}
                  onChange={(e) =>
                    handleInputChange("title.en", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter blog title in English"
                />
              </div>

              {/* Title Vietnamese */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (Vietnamese) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title.vi}
                  onChange={(e) =>
                    handleInputChange("title.vi", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter blog title in Vietnamese"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Excerpt English */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt (English) *
                </label>
                <textarea
                  required
                  value={formData.excerpt.en}
                  onChange={(e) =>
                    handleInputChange("excerpt.en", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter excerpt in English"
                />
              </div>

              {/* Excerpt Vietnamese */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt (Vietnamese) *
                </label>
                <textarea
                  required
                  value={formData.excerpt.vi}
                  onChange={(e) =>
                    handleInputChange("excerpt.vi", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter excerpt in Vietnamese"
                />
              </div>
            </div>

            {/* Content English */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content (English) *
              </label>
              <textarea
                required
                value={formData.content.en}
                onChange={(e) =>
                  handleInputChange("content.en", e.target.value)
                }
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blog content in English"
              />
            </div>

            {/* Content Vietnamese */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content (Vietnamese) *
              </label>
              <textarea
                required
                value={formData.content.vi}
                onChange={(e) =>
                  handleInputChange("content.vi", e.target.value)
                }
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blog content in Vietnamese"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                {availableTags.map((tag) => (
                  <label key={tag._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag._id)}
                      onChange={(e) =>
                        handleTagChange(tag._id, e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{tag.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image URL
              </label>
              <input
                type="text"
                value={formData.coverImage || ""}
                onChange={(e) =>
                  handleInputChange("coverImage", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/cover-image.jpg"
              />
            </div>

            {/* Published Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) =>
                  handleInputChange("isPublished", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isPublished"
                className="ml-2 block text-sm text-gray-900">
                Published
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
