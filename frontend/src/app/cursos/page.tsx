"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import NavBar from "@/components/Navbar";
import Image from "next/image";
import { ICourse, INewCourseData } from "@/interfaces";
import { GiDuration } from "react-icons/gi";
import { BsBookmarkCheck, BsBookmarkDash } from "react-icons/bs";
import { TbFileDescription } from "react-icons/tb";
import EditCourseModal from "@/components/EditCourseModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import AddCourseModal from "@/components/AddCourseModal";

export default function Courses() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [token, setToken] = useState<string | null>(null);

  const handleAddCourse = async (data: INewCourseData) => {
    try {
      await api.post("/courses", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res = await api.get("/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (data: Partial<ICourse>) => {
    if (!selectedCourse) return;

    await api.put(`/courses/${selectedCourse.id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const res = await api.get("/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCourses(res.data);
    setEditModalOpen(false);
    setSelectedCourse(null);
  };

  const handleDelete = async () => {
    if (!selectedCourse) return;

    await api.delete(`/courses/${selectedCourse.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id));
    setDeleteModalOpen(false);
    setSelectedCourse(null);
  };

  const handleEditClick = (course: ICourse) => {
    setSelectedCourse(course); // isso vai disparar o useEffect acima
    setEditModalOpen(true);
  };

  const handleDeleteClick = (course: ICourse) => {
    setSelectedCourse(course); // SETA ANTES
    setDeleteModalOpen(true); // ABRE DEPOIS
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await api.get("/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(res.data);
      } catch (error) {
        console.error("Erro ao carregar cursos públicos:", error);
      }
    };

    fetchCursos();
  }, [token]);

  return (
    <main>
      <NavBar />
      <div className="p-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-3xl font-bold mb-4">Catálogo de Cursos</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-[200px] mt-6 flex justify-center rounded-md bg-blue-200 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer"
          >
            Adicionar Curso
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 hover:cursor-pointer">
          <AddCourseModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddCourse}
          />

          <EditCourseModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setEditModalOpen(false);
              setSelectedCourse(null); // opcional: limpa após fechar
            }}
            course={selectedCourse as ICourse}
            onSave={handleSave}
          />

          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onCancel={() => setDeleteModalOpen(false)}
            onConfirm={handleDelete}
          />
          {Boolean(courses) &&
            courses.map((course: ICourse) => (
              <div
                key={course.id}
                className="border border-blue-200 p-4 rounded shadow flex-col"
              >
                <div className="flex">
                  <Image
                    src={`${course.imageUrl}`}
                    alt={course.title}
                    width={150}
                    height={100}
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{course.title}</h2>

                    <div className="flex gap-1">
                      <TbFileDescription className="text-blue-200" size={20} />
                      <p>{course.description}</p>
                    </div>
                    <div className="flex gap-1">
                      <GiDuration className="text-blue-200" size={20} />
                      <p>{course.duration}</p>
                    </div>
                    <div className="flex gap-1">
                      {course.status ? (
                        <BsBookmarkCheck className="text-blue-200" size={20} />
                      ) : (
                        <BsBookmarkDash className="text-blue-200" size={20} />
                      )}
                      <p>{course.status ? "ativo" : "inativo"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    onClick={() => handleEditClick(course)}
                    className="mt-6 flex w-full justify-center rounded-md bg-blue-200 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    type="submit"
                    onClick={() => handleDeleteClick(course)}
                    className="mt-6 flex w-full justify-center rounded-md bg-blue-200 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
