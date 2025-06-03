import { createContext } from "react";
import enMessages from './en.json'
import esMessages from './es.json'

interface LanguageContextProps{
    locale: string;
    messages: Record<string,string>;
    changeLanguage: (lang:string)=> void;
}

export const menssageMap:{[key:string]:Record<string,string>} = {
    en: enMessages,
    es: esMessages,
};

export const LanguageContext = createContext<LanguageContextProps>({
    locale: 'en',
    messages: enMessages,
    changeLanguage: ()=>{}
});