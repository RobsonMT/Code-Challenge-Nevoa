import Link from "next/link";
import Logo from "./Logo";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [token, setToken] = useState<string | null>();

  const handleLogout = () => {
    return localStorage.removeItem("token");
  };

  useEffect(() => {
    return setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div className="p-6 lg:px-8 py-2 flex justify-between align-middle border border-blue-200">
      <Logo />
      <div className="flex gap-6">
        <div className="inline-flex mt-4">
          <Link href={"/register"}>Registrar</Link>
        </div>
        {token ? (
          <div className="inline-flex gap-2 mt-4">
            <Link href={"/"} onClick={handleLogout}>
              Logout
            </Link>
            <FaArrowRightLong size={25} />
          </div>
        ) : (
          <div className="inline-flex gap-2 mt-4">
            <Link href={"/login"}>Login</Link>
            <FaArrowRightLong size={25} />
          </div>
        )}
      </div>
    </div>
  );
}
