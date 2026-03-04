import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "ar"];

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locale || !locales.includes(locale as string)) {
        locale = "en";
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
