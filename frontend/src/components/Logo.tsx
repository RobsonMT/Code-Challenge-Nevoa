import Image from "next/image";
import logoCurso from "../../public/logo-curso.png";

export default function Logo() {
  return (
    <Image src={logoCurso} alt="Picture of the author" width={50} height={30} />
  );
}
