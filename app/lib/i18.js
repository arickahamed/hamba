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
                    multiQuestion: "Do you have people from another sam?",
                    yes: "Yes",
                    no: "No",
                    samNumber: "How many sam (1-4)",
                    next: "Next",
                    invalidSam: "Sam must be between 1 and 4",
                    invalidContributors: "Contributors must be 1-7",
                    invalidTotalContributors: "Total contributors must be 1-7",
                    maxContributors: "Max contributors is 7",
                    fillAllFields: "Fill all fields correctly",
                    invalidMeat: "Enter valid meat",
                    invalidKolija: "Enter valid kolija",
                    invalidTel: "Enter valid tel"
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
                    sam: "ছাম",
                    multiQuestion: "আপনার দলে কি অন্য সামের মানুষ আছে?",
                    yes: "হ্যাঁ",
                    no: "না",
                    samNumber: "কতটি সাম (১-৪)",
                    next: "পরবর্তী",
                    invalidSam: "সামের সংখ্যা ১ থেকে ৪ এর মধ্যে হতে হবে",
                    invalidContributors: "অংশগ্রহণকারীর সংখ্যা ১ থেকে ৭ এর মধ্যে হতে হবে",
                    invalidTotalContributors: "মোট অংশগ্রহণকারী ১ থেকে ৭ এর মধ্যে হতে হবে",
                    maxContributors: "সর্বোচ্চ ৭ জন অংশগ্রহণকারী হতে পারবে",
                    fillAllFields: "সব তথ্য সঠিকভাবে পূরণ করুন",
                    invalidMeat: "সঠিক মাংসের পরিমাণ দিন",
                    invalidKolija: "সঠিক কলিজার পরিমাণ দিন",
                    invalidTel: "সঠিক তেলের পরিমাণ দিন"
                },
            },
        },
    });

export default i18n;