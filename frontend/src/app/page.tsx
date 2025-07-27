"use client";

import NavBar from "@/components/Navbar";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { ICourse } from "@/interfaces";
import { api } from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsBookmarkCheck, BsBookmarkDash } from "react-icons/bs";
import { GiDuration } from "react-icons/gi";
import { TbFileDescription } from "react-icons/tb";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useAuthRedirect();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await api.get("/courses/public");
        setCourses(res.data);
      } catch (error) {
        console.error("Erro ao carregar cursos públicos:", error);
      }
    };

    fetchCursos();
  }, []);

  return (
    <main>
      <NavBar />
      <div className="p-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Catálogo de Cursos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 hover:cursor-pointer">
          {courses.map((course: ICourse) => (
            <div
              key={course.id}
              className="border border-blue-200 p-4 rounded shadow flex"
            >
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
          ))}
        </div>
      </div>
    </main>
  );
}
