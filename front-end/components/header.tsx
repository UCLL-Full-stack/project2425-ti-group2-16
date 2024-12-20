import Link from "next/link";
import { useState, useEffect } from "react";
import Language from "./Language";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }
  }, []);

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {" "}
        {t("app.title")}
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          {t("header.home")}
        </Link>
        {!loggedInUser && (
          <>
            <Link href="/login" className="nav-link px-4 fs-5 text-white">
              {t("header.login")}
            </Link>
            <Link href="/register" className="nav-link px-4 fs-5 text-white">
              {t("header.register")}
            </Link>
          </>
        )}
        {loggedInUser && (
          <>
            <Link href="/groups" className="nav-link px-4 fs-5 text-white">
              {t("header.groups")}
            </Link>
            <Link href="/logout" className="nav-link px-4 fs-5 text-white">
              {t("header.logout")}
            </Link>
            <Link href="/profile" className="nav-link px-4 fs-5 text-white">
              {t("header.loggedIn")} {JSON.parse(loggedInUser).username}
            </Link>
          </>
        )}
        <Language />
      </nav>
    </header>
  );
};

export default Header;
