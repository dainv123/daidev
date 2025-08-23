import React, { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import { imagesAPI } from "../../services/api";

interface ImageFormData {
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  category: string;
  tags: string[];
  isActive: boolean;
}

interface ImageFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ImageFormData) => void;
  initialData?: ImageFormData;
  isLoading?: boolean;
}

export const ImageForm: React.FC<ImageFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ImageFormData>({
    title: "",
    description: "",
    imageUrl: "",
    altText: "",
    category: "",
    tags: [],
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // Add state to store upload metadata
  const [imageMeta, setImageMeta] = useState<{
    url?: string;
    filename?: string;
    mimetype?: string;
    size?: number;
  }>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        altText: "",
        category: "",
        tags: [],
        isActive: true,
      });
    }
  }, [initialData, isOpen]);

  // Rewrite handleSubmit: pass full metadata to imagesAPI.create
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !imageMeta.url ||
      !imageMeta.filename ||
      !imageMeta.mimetype ||
      !imageMeta.size
    ) {
      setUploadError("Bạn phải upload ảnh trước khi lưu metadata!");
      return;
    }
    await imagesAPI.create({
      url: imageMeta.url,
      filename: imageMeta.filename,
      mimetype: imageMeta.mimetype,
      size: imageMeta.size,
      type: formData.category,
      title: formData.title,
      description: formData.description,
      altText: formData.altText,
      isActive: formData.isActive,
      tags: formData.tags,
    });
    // You can call onSubmit(formData) if you want a callback
  };

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Upload handler: only upload file when selected, do not send other text fields
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const res = (await imagesAPI?.upload)
        ? await imagesAPI.upload(file)
        : (
            await axios.post(
              "/api/v1/images/upload",
              (() => {
                const f = new FormData();
                f.append("file", file);
                return f;
              })(),
              { headers: { "Content-Type": "multipart/form-data" } }
            )
          ).data.data;
      // Save upload metadata to state
      setImageMeta({
        url: res.url,
        filename: res.filename,
        mimetype: res.mimetype,
        size: res.size,
      });
      setFormData((prev) => ({ ...prev, imageUrl: res.url }));
    } catch (err: any) {
      setUploadError("Upload failed. Please try again.");
      console.error("Image upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {initialData ? "Edit Image" : "Add New Image"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter image title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter image description"
              />
            </div>

            {/* Image URL & Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL *
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) =>
                    handleInputChange("imageUrl", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                  id="image-upload-input"
                />
                <label htmlFor="image-upload-input">
                  <span
                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    style={{ height: "100%", display: "block" }}>
                    <Upload className="h-4 w-4" />
                  </span>
                </label>
              </div>
              {uploading && (
                <div className="text-xs text-blue-600 mt-1">Uploading...</div>
              )}
              {uploadError && (
                <div className="text-xs text-red-600 mt-1">{uploadError}</div>
              )}
            </div>

            {/* Image Preview */}
            {formData.imageUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preview
                </label>
                <div className="border border-gray-300 rounded-md p-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="max-w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Alt Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text *
              </label>
              <input
                type="text"
                required
                value={formData.altText}
                onChange={(e) => handleInputChange("altText", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter alt text for accessibility"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select category</option>
                <option value="certificates">Certificates</option>
                <option value="themes">Themes</option>
                <option value="blogs">Blogs</option>
                <option value="gallery">Gallery</option>
                <option value="avatars">Avatars</option>
                <option value="icons">Icons</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                onKeyDown={handleTagInput}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Press Enter to add tags"
              />
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-blue-600 hover:text-blue-800">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  handleInputChange("isActive", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isActive"
                className="ml-2 block text-sm text-gray-900">
                Active
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
