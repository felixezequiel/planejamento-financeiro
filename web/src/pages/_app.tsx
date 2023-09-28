import "../app/globals.css";
import { AppContext, AppProps } from "next/app";
import { TranslateController } from "@/app/controller/translate/translateController";
import { TranslateText } from "@/app/controller/translate/translate.type";

export const getInitialPropsTranslate = async ({
  ctx: { req, pathname },
}: AppContext) => {
  if (!req || pathname === "/_error") return { error: true };

  const acceptLanguage = req.headers["accept-language"];
  const langPrefer = acceptLanguage?.split(",")[0] || "en";

  const translateController = new TranslateController(pathname);

  try {
    const { translatedText } = await translateController.translate(langPrefer);

    console.log("translatedText:", translatedText);

    return { translatedText };
  } catch (error) {
    console.error("Translation error:", error);

    return { error: true };
  }
};

function MyApp({
  Component,
  pageProps,
  translatedText,
  error,
}: AppProps & TranslateText & { error?: boolean }) {
  if (error) return <p>Error...</p>;

  return <Component {...pageProps} translatedText={translatedText} />;
}

MyApp.getInitialProps = getInitialPropsTranslate;

export default MyApp;
