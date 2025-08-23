import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const defaultForm = {
  school: { en: "", vi: "" },
  degree: { en: "", vi: "" },
  field: { en: "", vi: "" },
  startDate: "",
  endDate: "",
  description: { en: "", vi: "" },
  isActive: true,
};

export const EducationForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (initialData) setFormData({ ...defaultForm, ...initialData });
    else setFormData(defaultForm);
  }, [initialData, isOpen]);

  const handleChange = (field, value, lang) => {
    if (lang) {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {initialData ? "Edit Education" : "Add New Education"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
            className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School (EN)
              </label>
              <input
                type="text"
                required
                value={formData.school.en}
                onChange={(e) => handleChange("school", e.target.value, "en")}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School (VI)
              </label>
              <input
                type="text"
                required
                value={formData.school.vi}
                onChange={(e) => handleChange("school", e.target.value, "vi")}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree (EN)
              </label>
              <input
                type="text"
                required
                value={formData.degree.en}
                onChange={(e) => handleChange("degree", e.target.value, "en")}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree (VI)
              </label>
              <input
                type="text"
                required
                value={formData.degree.vi}
                onChange={(e) => handleChange("degree", e.target.value, "vi")}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field (EN)
              </label>
              <input
                type="text"
                value={formData.field.en}
                onChange={(e) => handleChange("field", e.target.value, "en")}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field (VI)
              </label>
              <input
                type="text"
                value={formData.field.vi}
                onChange={(e) => handleChange("field", e.target.value, "vi")}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={
                  formData.startDate ? formData.startDate.substring(0, 10) : ""
                }
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={
                  formData.endDate ? formData.endDate.substring(0, 10) : ""
                }
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (EN)
              </label>
              <textarea
                required
                value={formData.description.en}
                onChange={(e) =>
                  handleChange("description", e.target.value, "en")
                }
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (VI)
              </label>
              <textarea
                required
                value={formData.description.vi}
                onChange={(e) =>
                  handleChange("description", e.target.value, "vi")
                }
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
                className="h-4 w-4"
              />
              <label
                htmlFor="isActive"
                className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md disabled:opacity-50">
                {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
