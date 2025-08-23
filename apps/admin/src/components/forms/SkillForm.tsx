import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const defaultForm = {
  name: { en: "", vi: "" },
  level: { en: "", vi: "" },
  icon: "",
  stars: 0,
  isActive: true,
};

const LEVEL_OPTIONS = [
  { en: "Beginner", vi: "Sơ cấp" },
  { en: "Intermediate", vi: "Trung cấp" },
  { en: "Advanced", vi: "Nâng cao" },
  { en: "Expert", vi: "Chuyên gia" },
];

export const SkillForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (initialData) setFormData(initialData);
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
              {initialData ? "Edit Skill" : "Add New Skill"}
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
                Name (EN)
              </label>
              <input
                type="text"
                required
                value={formData.name.en}
                onChange={(e) => handleChange("name", e.target.value, "en")}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name (VI)
              </label>
              <input
                type="text"
                required
                value={formData.name.vi}
                onChange={(e) => handleChange("name", e.target.value, "vi")}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level (EN)
              </label>
              <select
                required
                value={formData.level.en}
                onChange={(e) => handleChange("level", e.target.value, "en")}
                className="w-full px-3 py-2 border rounded-md">
                <option value="">Select level</option>
                {LEVEL_OPTIONS.map((opt) => (
                  <option key={opt.en} value={opt.en}>
                    {opt.en}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level (VI)
              </label>
              <select
                required
                value={formData.level.vi}
                onChange={(e) => handleChange("level", e.target.value, "vi")}
                className="w-full px-3 py-2 border rounded-md">
                <option value="">Chọn cấp độ</option>
                {LEVEL_OPTIONS.map((opt) => (
                  <option key={opt.vi} value={opt.vi}>
                    {opt.vi}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (class)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => handleChange("icon", e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stars
              </label>
              <input
                type="number"
                min={0}
                max={5}
                value={formData.stars}
                onChange={(e) => handleChange("stars", Number(e.target.value))}
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
