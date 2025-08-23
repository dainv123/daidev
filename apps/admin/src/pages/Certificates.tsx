import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { certificatesAPI } from "../services/api";
import { Plus, Edit, Trash2, Search, Eye } from "lucide-react";
import { CertificateForm } from "../components/forms/CertificateForm";
import { usePermission } from "../hooks/usePermission";

// Standardize interface to match API
interface Certificate {
  _id: string;
  name: { en: string; vi: string };
  issuer: { en: string; vi: string };
  description: { en: string; vi: string };
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  imageUrl: string;
  certificateUrl: string;
  isPublished: boolean;
  createdAt: string;
}

export function Certificates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCertificate, setEditingCertificate] =
    useState<Certificate | null>(null);
  const queryClient = useQueryClient();
  const { canCreate, canEdit, canDelete, tooltip } = usePermission();

  const { data: certificates, isLoading } = useQuery<Certificate[]>({
    queryKey: ["certificates"],
    queryFn: certificatesAPI.getAll,
  });

  const deleteCertificateMutation = useMutation({
    mutationFn: async (certificateId: string) => {
      await certificatesAPI.delete(certificateId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });

  const createCertificateMutation = useMutation({
    mutationFn: async (data: any) => {
      await certificatesAPI.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      setShowAddModal(false);
    },
  });

  const updateCertificateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await certificatesAPI.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      setEditingCertificate(null);
    },
  });

  const filteredCertificates = Array.isArray(certificates)
    ? certificates.filter(
        (cert) =>
          (typeof cert.name?.en === "string" &&
            cert.name.en.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (typeof cert.name?.vi === "string" &&
            cert.name.vi.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleDeleteCertificate = (certificateId: string) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      deleteCertificateMutation.mutate(certificateId);
    }
  };

  const handleCreateCertificate = (data: any) => {
    createCertificateMutation.mutate(data);
  };

  const handleUpdateCertificate = (data: any) => {
    if (editingCertificate) {
      updateCertificateMutation.mutate({ id: editingCertificate._id, data });
    }
  };

  const handleEditCertificate = (cert: Certificate) => {
    setEditingCertificate(cert);
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
          <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-600">Manage certificates and achievements</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
          disabled={!canCreate}
          title={!canCreate ? tooltip : ""}>
          <Plus className="h-4 w-4 mr-2" />
          Add Certificate
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search certificates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div key={cert._id} className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <Eye className="h-16 w-16 text-gray-400" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {cert.name.en}
                  </h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      cert.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                    {cert.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">Issuer: {cert.issuer.en}</p>
                <p className="text-gray-600 mb-2">
                  Date: {new Date(cert.issueDate).toLocaleDateString()}
                </p>
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mb-2 block">
                  View Certificate
                </a>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {new Date(cert.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCertificate(cert)}
                      className="text-indigo-600 hover:text-indigo-900"
                      disabled={!canEdit}
                      title={!canEdit ? tooltip : ""}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCertificate(cert._id)}
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

      {/* Certificate Forms */}
      <CertificateForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateCertificate}
        isLoading={createCertificateMutation.isLoading}
      />

      <CertificateForm
        isOpen={!!editingCertificate}
        onClose={() => setEditingCertificate(null)}
        onSubmit={handleUpdateCertificate}
        initialData={
          editingCertificate
            ? {
                name: {
                  en: editingCertificate.name?.en || "",
                  vi: editingCertificate.name?.vi || "",
                },
                description: {
                  en: editingCertificate.description?.en || "",
                  vi: editingCertificate.description?.vi || "",
                },
                issuer: {
                  en: editingCertificate.issuer?.en || "",
                  vi: editingCertificate.issuer?.vi || "",
                },
                issueDate: editingCertificate.issueDate?.slice(0, 10) || "",
                expiryDate: editingCertificate.expiryDate?.slice(0, 10) || "",
                credentialId: editingCertificate.credentialId || "",
                credentialUrl: editingCertificate.certificateUrl || "",
                imageUrl: editingCertificate.image || "",
                isActive: editingCertificate.isPublished ?? true,
              }
            : undefined
        }
        isLoading={updateCertificateMutation.isLoading}
      />
    </div>
  );
}
