import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "en";

  return {
    locale,
    timeZone: "Asia/Kabul",
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});