import { ReactNode,useState } from "react";
import { LanguageContext, menssageMap } from "./languageContenxt";
import logger from "../services/logging";

interface LanguageProviderProps{
    children:ReactNode;
}

export const LanguageProvider:React.FC<LanguageProviderProps> = ({children}) => {
    const initialLocale = navigator.language.startsWith('es') ? 'es' : 'en';
    const [locale, setLocale] = useState<string>(initialLocale);
    const changeLanguage = (lang:string)=>{
        setLocale(lang);
        logger.info("se ejecuta changelanguage");
        //console.log("se ejecuta changelanguage");
    }

    return(
        <LanguageContext.Provider value={{locale,messages:menssageMap[locale], changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};