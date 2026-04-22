"use client";
import "@/app/lib/i18";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "@/app/lib/bengaliNum";
import toBengaliNumber from "@/app/lib/bengaliNum";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [sam, setSam] = useState("");
  const [finalSam, setFinalSam] = useState(null);
  const [groups, setGroups] = useState([]);
  const [totalMeat, setTotalMeat] = useState("");
  const [totalKolija, setTotalKolija] = useState("");
  const [totalTel, setTotalTel] = useState("");
  const [result, setResult] = useState(null);
  
  const collectedSam = Number(sam);
  const isInvalidSam =
    isNaN(collectedSam) || collectedSam < 1 || collectedSam > 4;

  // STEP 1
  const handleSamSubmit = (e) => {
    e.preventDefault();
    if (isInvalidSam) {'please enter between 1 and 4'};

    const newGroups = Array.from({ length: collectedSam }, () => ({
      name: "",
      contributors: "",
    }));

    setGroups(newGroups);
    setFinalSam(collectedSam);
  };

  // HANDLE INPUT
  const handleChange = (index, field, value) => {
    const updated = [...groups];

    if (field === "contributors") {
      const num = Number(value);

      if (num > 7) {
        alert("Contributors cannot be more than 7");
        return;
      }
    }

    updated[index][field] = value;
    setGroups(updated);
  };

  // STEP 2: CALCULATE
  const handleCalculate = (e) => {
    e.preventDefault();

    const parsed = groups.map((g) => ({
      ...g,
      contributors: Number(g.contributors),
    }));

    // validation
    for (let g of parsed) {
      if (!g.name || g.contributors < 1) {
        alert("Fill all fields correctly");
        return;
      }
    }

    const totalContributors = parsed.reduce(
      (sum, g) => sum + g.contributors,
      0,
    );

    if (totalContributors > 7) {
      alert("Total contributors cannot exceed 7");
      return;
    }

    const Tm = Number(totalMeat);
    const Tk = Number(totalKolija);
    const Tt = Number(totalTel);

    if (isNaN(Tm) || Tm <= 0) {
      alert("Enter valid meat");
      return;
    }

    if (isNaN(Tk) || Tk < 0) {
      alert("Enter valid kolija");
      return;
    }

    if (isNaN(Tt) || Tt < 0) {
      alert("Enter valid tel");
      return;
    }

    const perShareMeat = Tm / totalContributors;
    const perShareKolija = Tk / totalContributors;
    const perShareTel = Tt / totalContributors;

    const max = Math.max(...parsed.map((g) => g.contributors));

    let sorkariApplied = false; // ✅ ensures only FIRST largest group

    const results = parsed.map((g) => {
      const totalMeatGroup = g.contributors * perShareMeat;
      const totalKolijaGroup = g.contributors * perShareKolija;
      const totalTelGroup = g.contributors * perShareTel;

      if (g.contributors === max && !sorkariApplied) {
        sorkariApplied = true;

        const sorkariMeat = totalMeatGroup / 3;
        const sorkariKolija = totalKolijaGroup / 3;
        const sorkariTel = totalTelGroup / 3;

        const remainingMeat = totalMeatGroup - sorkariMeat;
        const remainingKolija = totalKolijaGroup - sorkariKolija;
        const remainingTel = totalTelGroup - sorkariTel;

        return {
          ...g,
          isLargest: true,

          totalMeat: totalMeatGroup,
          totalKolija: totalKolijaGroup,
          totalTel: totalTelGroup,

          perPersonMeat: remainingMeat / g.contributors,
          perPersonKolija: remainingKolija / g.contributors,
          perPersonTel: remainingTel / g.contributors,

          sorkariMeat,
          sorkariKolija,
          sorkariTel,
        };
      } else {
        return {
          ...g,
          isLargest: false,

          totalMeat: totalMeatGroup,
          totalKolija: totalKolijaGroup,
          totalTel: totalTelGroup,

          perPersonMeat: perShareMeat,
          perPersonKolija: perShareKolija,
          perPersonTel: perShareTel,

          sorkariMeat: 0,
          sorkariKolija: 0,
          sorkariTel: 0,
        };
      }
    });

    setResult({ results });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <main className="w-[90%] md:w-[60%] lg:w-[40%] border p-5 rounded">
        <h1 className="text-3xl text-center font-bold mb-4">{t("title")}</h1>
        <div className="flex justify-end mb-4">
          <div
            onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "bn" : "en")
            }
            className="w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                i18n.language === "bn" ? "translate-x-8" : ""
              }`}
            />
          </div>

          <div className="ml-2 text-sm font-medium">
            {i18n.language === "en" ? "বাংলা" : "English"}
          </div>
        </div>

        {/* STEP 1 */}
        {finalSam === null && (
          <form onSubmit={handleSamSubmit} className="flex gap-2">
            <input
              type="number"
              placeholder={t(`people from different sam ?`)}
              value={sam}
              onChange={(e) => setSam(e.target.value)}
              className="border p-2 w-full"
            />

            <button
              disabled={isInvalidSam}
              className="bg-red-600 text-white px-4 rounded"
            >
              {t("add")}
            </button>
            
          </form>
        )}

        {/* STEP 2 */}
        {finalSam !== null && !result && (
          <form onSubmit={handleCalculate}>
            <p className="mb-3 font-semibold">
              {t("contributors")} ({finalSam})
            </p>

            {groups.map((g, i) => (
              <div key={i} className="mb-3 border p-3 rounded">
                <input
                  placeholder={t("name")}
                  value={g.name}
                  onChange={(e) => handleChange(i, "name", e.target.value)}
                  className="border p-2 w-full mb-2"
                />

                <input
                  type="number"
                  placeholder={t("contributors")}
                  value={g.contributors}
                  onChange={(e) =>
                    handleChange(i, "contributors", e.target.value)
                  }
                  className="border p-2 w-full"
                />
              </div>
            ))}

            <input
              type="number"
              placeholder={t("totalMeat")}
              value={totalMeat}
              onChange={(e) => setTotalMeat(e.target.value)}
              className="border p-2 w-full mt-2"
            />

            <input
              type="number"
              placeholder={t("totalKolija")}
              value={totalKolija}
              onChange={(e) => setTotalKolija(e.target.value)}
              className="border p-2 w-full mt-2"
            />

            <input
              type="number"
              placeholder={t("totalTel")}
              value={totalTel}
              onChange={(e) => setTotalTel(e.target.value)}
              className="border p-2 w-full mt-2"
            />

            <button className="bg-green-600 text-white w-full mt-3 p-2 rounded">
              {t("calculate")}
            </button>
          </form>
        )}

        {/* RESULT */}
        {result && (
          <div className="mt-4 border p-4 rounded bg-white">
            <p className="font-semibold mb-4 text-lg">
              {t("contributors")}: {toBengaliNumber(finalSam, i18n.language)}
            </p>

            {result.results.map((r, i) => (
              <div key={i} className="mb-4 border-b pb-4">
                <div className="flex items-center justify-around border-b border-dashed border-gray-500 mb-2">
                  <h2 className="font-bold text-md mb-2">
                    Sam {toBengaliNumber(i + 1, i18n.language)} ({r.name})
                  </h2>
                  <p className="font-semibold text-md mb-2">
                    → {t("contributors")}:{" "}
                    {toBengaliNumber(r.contributors, i18n.language)}
                  </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* LEFT SIDE */}
                  <div className="space-y-1">
                    {/* <p>
                      → {t("contributors")}:{" "}
                      {toBengaliNumber(r.contributors, i18n.language)}
                    </p> */}

                    <p>
                      → {t("totalMeat")}:{" "}
                      {toBengaliNumber(r.totalMeat.toFixed(2), i18n.language)}{" "}
                      kg
                    </p>

                    <p>
                      → {t("totalKolija")}:{" "}
                      {toBengaliNumber(r.totalKolija.toFixed(2), i18n.language)}{" "}
                      kg
                    </p>

                    <p>
                      → {t("totalTel")}:{" "}
                      {toBengaliNumber(r.totalTel.toFixed(2), i18n.language)} kg
                    </p>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="space-y-1">
                    <p>
                      → {t("perPersonMeat")}:{" "}
                      {toBengaliNumber(
                        r.perPersonMeat.toFixed(2),
                        i18n.language,
                      )}{" "}
                      kg
                    </p>

                    <p>
                      → {t("perPersonKolija")}:{" "}
                      {toBengaliNumber(
                        r.perPersonKolija.toFixed(2),
                        i18n.language,
                      )}{" "}
                      kg
                    </p>

                    <p>
                      → {t("perPersonTel")}:{" "}
                      {toBengaliNumber(
                        r.perPersonTel.toFixed(2),
                        i18n.language,
                      )}{" "}
                      kg
                    </p>

                    {/* SORKARI */}
                    {r.isLargest && (
                      <div className="mt-2 text-red-600 font-semibold">
                        <p>
                          → {t("sorkariMeat")}:{" "}
                          {toBengaliNumber(
                            r.sorkariMeat.toFixed(2),
                            i18n.language,
                          )}{" "}
                          kg
                        </p>
                        <p>
                          → {t("sorkariKolija")}:{" "}
                          {toBengaliNumber(
                            r.sorkariKolija.toFixed(2),
                            i18n.language,
                          )}{" "}
                          kg
                        </p>
                        <p>
                          → {t("sorkariTel")}:{" "}
                          {toBengaliNumber(
                            r.sorkariTel.toFixed(2),
                            i18n.language,
                          )}{" "}
                          kg
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
