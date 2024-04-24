import { encoded, translations } from "./data.js";

function decodeData(encoded, translations) {
  const uniqueIds = new Set();
  const decodedData = encoded.map((item) => {
    const decodedItem = {};
    Object.keys(item).forEach((key) => {
      if (
        key.endsWith("Id") &&
        !["groupId", "service", "formatSize", "ca"].includes(key)
      ) {
        if (item[key] !== null) uniqueIds.add(item[key]);

        decodedItem[key] = translations[item[key]] ?? item[key];
      } else {
        decodedItem[key] = item[key];
      }
    });
    return decodedItem;
  });

  return {
    decodedData,
    uniqueIds: Array.from(uniqueIds),
  };
}

const { decodedData, uniqueIds } = decodeData(encoded, translations);
console.log(decodedData);
console.log("Уникальные ID:", uniqueIds);
