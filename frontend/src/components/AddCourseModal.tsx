"use client";

import { INewCourseData } from "@/interfaces";
import { useState } from "react";

type AddCourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: INewCourseData) => Promise<void>;
};

export default function AddCourseModal({
  isOpen,
  onClose,
  onSave,
}: AddCourseModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    duration: "",
    status: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "status") {
      setFormData((prev) => ({ ...prev, status: value === "active" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.duration) {
      return alert("Todos os campos são obrigatórios");
    }

    onSave({
      ...formData,
      duration: formData.duration,
    });

    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      duration: "",
      status: true,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Adicionar Novo Curso</h2>

        <div className="space-y-4">
          <input
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="imageUrl"
            placeholder="URL da imagem"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="duration"
            placeholder="Duração"
            type="text"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <select
            name="status"
            value={formData.status ? "active" : "inactive"}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
