export const getCountryFlag = (countryName = "") => {
  const countryMap = {
    india: "IN",
    canada: "CA",
    usa: "US",
    "united states": "US",
    "united states of america": "US",
    uk: "GB",
    "united kingdom": "GB",
    germany: "DE",
    france: "FR",
    australia: "AU",
    japan: "JP",
    china: "CN",
    brazil: "BR",
    mexico: "MX",
    uae: "AE",
    "united arab emirates": "AE",
    saudi: "SA",
    "saudi arabia": "SA",
  };

  const code = countryMap[countryName.toLowerCase().trim()];

  if (!code) return "🌍";

  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
};

export const getTrafficCount = (item) => {
  return item?._sum?.count || 0;
};