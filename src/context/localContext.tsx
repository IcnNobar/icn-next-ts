import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { apiRequest } from "@/pages/api/api";
import { Backdrop, CircularProgress } from "@mui/material";
import {
  API_BASE_URL,
  ENDPOINTS,
  HTTP_METHODS,
} from "@/pages/api/apiConstants";

// Define types for local, lang, and translations
type LocalType = "jo" | "us" | "ae" | "sa"; // Add other local types as needed
type LangType = "ar" | "en"; // Language types (Arabic, English)
type Translations = { [key: string]: string } | null; // Translations object type

// Define the context's value shape
interface LocalContextType {
  translation: (tran: string) => string;
  toggleLanguage: () => void;
  lang: LangType;
  local: LocalType;
  setLocal: React.Dispatch<React.SetStateAction<LocalType>>;
  setLang: React.Dispatch<React.SetStateAction<LangType>>;
  changeLocal: (newLocal: LocalType) => void;
}

// Create the context with the default value
export const LocalContext = createContext<LocalContextType | undefined>(
  undefined
);

// Custom hook for translations
export const useTranslation = () => {
  const context = useContext(LocalContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LocalProvider");
  }
  return context;
};

// TranslationProvider props type
interface TranslationProviderProps {
  children: ReactNode;
  initialLocal?: LocalType;
  initialLang?: LangType;
}

// Translation and Local Provider combined
export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  initialLocal = "jo",
  initialLang = "ar", // Default language to Arabic
}) => {
  const router = useRouter();
  const { query } = router;

  const pathLocal = Array.isArray(query?.local) ? query.local[0] : "jo";

  const pathLang = Array.isArray(query?.local) ? query.local[1] : "ar";

  const [local, setLocal] = useState<LocalType>(
    (pathLocal as LocalType) || initialLocal
  );
  const [lang, setLang] = useState<LangType>(
    (pathLang as LangType) || initialLang
  );
  const [translations, setTranslations] = useState<Translations>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        try {
          const path = window.location.pathname;

          // Split the path into segments based on the '/' character
          const segments = path.split("/");

          const localCountry = segments[1] || "jo";
          const localLang = segments[2] || "ar";

          localStorage.setItem("lang", localLang);
          localStorage.setItem("local", localCountry);
        } catch (error) {
          localStorage.setItem("lang", "ar");
          localStorage.setItem("local", "sa");
        }
      }

      /*  try {
          const response = await apiRequest(ENDPOINTS.translation.getTranslation, HTTP_METHODS.GET);
          setTranslations(response);
        } catch (error) {
          console.error("Error fetching translations:", error);
        } */
    };

    fetchData();
  }, [lang, local]);

  const toggleLanguage = () => {
    const newLang: LangType = lang === "ar" ? "en" : "ar";
    setLang(newLang);
  };

  const changeLocal = (newLocal: LocalType) => {
    setLocal(newLocal); // Change the country (local) code
  };

  const translation = (tran: string) => {
    if (translations) {
      const trimmedTranslation = tran.trim();
      const replacedTranslation = trimmedTranslation
        .replace(/\s+/g, "_")
        .toLowerCase();
      const result = translations?.[replacedTranslation] ?? trimmedTranslation;

      return result;
    } else {
      return tran;
    }
  };

  if (!loading) {
    return (
      <>
        <Backdrop open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  return (
    <LocalContext.Provider
      value={{
        translation,
        toggleLanguage,
        lang,
        local,
        setLocal,
        setLang,
        changeLocal,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
};
