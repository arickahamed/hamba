import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector) 
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: false,

        interpolation: {
            escapeValue: false,
        },

        resources: {
            en: {
                translation: {
                    title: "HambaVag",
                    add: "Add",
                    calculate: "Calculate",
                    name: "Name",
                    contributors: "Contributors",
                    totalMeat: "Total Meat (kg)",
                    totalKolija: "Total Kolija (kg)",
                    totalTel: "Total Tel (kg)",
                    perPersonMeat: "Meat per person (kg)",
                    perPersonKolija: "Kolija per person (kg)",
                    perPersonTel: "Tel per person (kg)",
                    sorkariMeat: "Sorkari Meat (kg)",
                    sorkariKolija: "Sorkari Kolija (kg)",
                    sorkariTel: "Sorkari Tel (kg)",
                    sam: "sam",
                },
            },
            bn: {
                translation: {
                    title: "হাম্বা ভাগ",
                    add: "যোগ করুন",
                    calculate: "হিসাব করুন",
                    name: "নাম",
                    contributors: "অংশগ্রহণকারী",
                    totalMeat: "মোট মাংস (কেজি)",
                    totalKolija: "মোট কলিজা (কেজি)",
                    totalTel: "মোট তেল (কেজি)",
                    perPersonMeat: "প্রতি জন মাংস (কেজি)",
                    perPersonKolija: "প্রতি জন কলিজা (কেজি)",
                    perPersonTel: "প্রতি জন তেল (কেজি)",
                    sorkariMeat: "সরকারি মাংস (কেজি)",
                    sorkariKolija: "সরকারি কলিজা (কেজি)",
                    sorkariTel: "সরকারি তেল (কেজি)",
                    sam: "ছাম"
                },
            },
        },
    });

export default i18n;