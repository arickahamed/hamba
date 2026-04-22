const toBengaliNumber = (num, lang) => {
    if (lang !== "bn") return num;

    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    return num
        .toString()
        .split("")
        .map((d) => (bnDigits[d] !== undefined ? bnDigits[d] : d))
        .join("");
};

export default toBengaliNumber;