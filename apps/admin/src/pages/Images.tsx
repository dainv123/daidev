import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { imagesAPI } from "../services/api";
import { Plus, Edit, Trash2, Search, Image as ImageIcon } from "lucide-react";
import { ImageForm } from "../components/forms/ImageForm";

interface Image {
  id: string;
  filename: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
}

export function Images() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const queryClient = useQueryClient();
  const [signedUrls, setSignedUrls] = useState<{ [id: string]: string }>({});

  const { data: images, isLoading } = useQuery<Image[]>({
    queryKey: ["images"],
    queryFn: imagesAPI.getAll,
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (imageId: string) => {
      await imagesAPI.delete(imageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });

  const createImageMutation = useMutation({
    mutationFn: async (data: any) => {
      await imagesAPI.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      setShowAddModal(false);
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await imagesAPI.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
      setEditingImage(null);
    },
  });

  const filteredImages = useMemo(
    () =>
      images?.filter((image) =>
        image.filename.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [],
    [images, searchTerm]
  );

  useEffect(() => {
    if (!filteredImages.length) return;
    let isMounted = true;
    const fetchUrls = async () => {
      const urlMap: { [id: string]: string } = {};
      await Promise.all(
        filteredImages.map(async (img) => {
          try {
            urlMap[img._id] = await imagesAPI.getSignedUrl(img._id);
          } catch {
            urlMap[img._id] = img.url; // fallback
          }
        })
      );
      if (isMounted) setSignedUrls(urlMap);
    };
    fetchUrls();
    return () => {
      isMounted = false;
    };
  }, [filteredImages]);

  const handleDeleteImage = (imageId: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      deleteImageMutation.mutate(imageId);
    }
  };

  const handleCreateImage = (data: any) => {
    createImageMutation.mutate(data);
  };

  const handleUpdateImage = (data: any) => {
    if (editingImage) {
      updateImageMutation.mutate({ id: editingImage._id, data });
    }
  };

  const handleEditImage = (image: Image) => {
    setEditingImage(image);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
          <h1 className="text-2xl font-bold text-gray-900">Images</h1>
          <p className="text-gray-600">
            Manage uploaded images and media files
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Images Grid */}
      <div className="card">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div key={image._id} className="border rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img
                  src={signedUrls[image._id] || image.url}
                  alt={image.filename}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {image.filename}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(image.size)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(image.uploadedAt).toLocaleDateString()}
                </p>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleEditImage(image)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image._id)}
                    className="text-red-600 hover:text-red-900 text-sm">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Forms */}
      <ImageForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateImage}
        isLoading={createImageMutation.isLoading}
      />

      <ImageForm
        isOpen={!!editingImage}
        onClose={() => setEditingImage(null)}
        onSubmit={handleUpdateImage}
        initialData={
          editingImage
            ? {
                title: editingImage.filename,
                description: "",
                imageUrl: editingImage.url,
                altText: editingImage.filename,
                category: "",
                tags: [],
                isActive: true,
              }
            : undefined
        }
        isLoading={updateImageMutation.isLoading}
      />
    </div>
  );
}
