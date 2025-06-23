import { IoLogoGithub } from "react-icons/io";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-div py-0 mt-auto d-flex align-items-center justify-content-between">
      <div className="text-center flex-grow-1 d-flex justify-content-end">
        <p className="mb-0 text-white">© {currentYear} SensorFix. Todos os direitos reservados.</p>
      </div>
      <div className="px-3 flex-grow-1 d-flex justify-content-start" id="githubIcon">
        <a
          className="text-white"
          href="https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti2-3740100-sensorfix"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoGithub size={24} />
        </a>
      </div>
    </footer>
  );
}
