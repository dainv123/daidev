import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ThemeFormData {
  title: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  tags: string[];
  isPublished: boolean;
  previewImage?: string;
  name: string;
}

interface ThemeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ThemeFormData) => void;
  initialData?: ThemeFormData;
  isLoading?: boolean;
  availableTags?: Array<{ _id: string; name: string }>;
}

export const ThemeForm: React.FC<ThemeFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  availableTags = [],
}) => {
  const [formData, setFormData] = useState<ThemeFormData>({
    title: { en: "", vi: "" },
    description: { en: "", vi: "" },
    tags: [],
    isPublished: false,
    previewImage: "",
    name: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: { en: "", vi: "" },
        description: { en: "", vi: "" },
        tags: [],
        isPublished: false,
        previewImage: "",
        name: "",
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
      field === "description.en" ||
      field === "description.vi"
    ) {
      const [parent, lang] = field.split(".") as [string, "en" | "vi"];
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof Pick<ThemeFormData, "title" | "description">],
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
      <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {initialData ? "Edit Theme" : "Add New Theme"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="my-theme"
              />
            </div>

            {/* Title English */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title (English) *
              </label>
              <input
                type="text"
                required
                value={formData.title.en}
                onChange={(e) => handleInputChange("title.en", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter theme title in English"
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
                onChange={(e) => handleInputChange("title.vi", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter theme title in Vietnamese"
              />
            </div>

            {/* Description English */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (English) *
              </label>
              <textarea
                required
                value={formData.description.en}
                onChange={(e) =>
                  handleInputChange("description.en", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter description in English"
              />
            </div>

            {/* Description Vietnamese */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Vietnamese) *
              </label>
              <textarea
                required
                value={formData.description.vi}
                onChange={(e) =>
                  handleInputChange("description.vi", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter description in Vietnamese"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
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

            {/* Preview Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preview Image URL
              </label>
              <input
                type="text"
                value={formData.previewImage || ""}
                onChange={(e) =>
                  handleInputChange("previewImage", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
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
