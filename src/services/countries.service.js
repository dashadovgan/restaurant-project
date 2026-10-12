// Если внешний API недоступен, форма всё равно позволяет выбрать основные страны
const FALLBACK_COUNTRIES = [
  { name: "Ukraine", flag: "🇺🇦", iso: "UA", code: "+380" },
  { name: "United Kingdom", flag: "🇬🇧", iso: "GB", code: "+44" },
  { name: "United States", flag: "🇺🇸", iso: "US", code: "+1" },
];

export const fetchCountries = async () => {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,idd,cca2,flag"
    );
    if (!res.ok) throw new Error(`Countries request failed: ${res.status}`);

    const data = await res.json();

    return data
      .map((c) => ({
        name: c.name.common,
        flag: c.flag,
        iso: c.cca2,
        code: (c.idd.root || "") + (c.idd.suffixes ? c.idd.suffixes[0] : ""),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.warn("Failed to load countries, using fallback list", error);
    return FALLBACK_COUNTRIES;
  }
};
