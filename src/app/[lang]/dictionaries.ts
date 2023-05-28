import "server-only";

const dictionaries: Record<string, () => Promise<{}>> = {
  en: () => import("@dictionaries/en.json").then((module) => module.default),
  fr: () => import("@dictionaries/fr.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
