export const fetchCountries = async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,idd,cca2,flag"
  );

  const data = await res.json();

  return data
    .map((c) => ({
      name: c.name.common,
      flag: c.flag,
      iso: c.cca2,
      code: (c.idd.root || "") + (c.idd.suffixes ? c.idd.suffixes[0] : ""),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};