"use client";

import { ICourse } from "@/interfaces";
import React, { useEffect, useState } from "react";

interface EditCourseModalProps {
  isOpen: boolean;
  course: ICourse;
  onClose: () => void;
  onSave: (updatedCourse: ICourse) => Promise<void>;
}

export default function EditCourseModal({
  isOpen,
  course,
  onClose,
  onSave,
}: EditCourseModalProps) {
  const [formData, setFormData] = useState<ICourse | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (course) {
      setFormData(course);
      setError(null);
    }
  }, [course]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    if (!formData || !formData.id) {
      setError("Dados do curso inválidos.");
      return;
    }

    try {
      setIsSaving(true);
      await onSave(formData);
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Erro ao salvar curso.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Editar Curso</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
          className="w-full border rounded p-2 mb-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border rounded p-2 mb-2"
        />

        <input
          name="image"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="URL da imagem"
          className="w-full border rounded p-2 mb-2"
        />

        <input
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duração"
          className="w-full border rounded p-2 mb-2"
        />

        <select
          className="w-full border p-2 rounded"
          value={formData.status ? "true" : "false"}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value === "true" ? true : false,
            })
          }
        >
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hover:cursor-pointer"
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
