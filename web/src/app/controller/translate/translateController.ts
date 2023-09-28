import TranslateHomeController from "./home";
import TranslateLoginController from "./login";
import { TextCompletionObject, TranslateText } from "./translate.type";

type ConfigTranslate = Record<string, TranslateText>;

type PathTranslate = keyof ConfigTranslate;

const config: ConfigTranslate = {
  '/login': new TranslateLoginController().content(),
  '/home': new TranslateHomeController().content()
}

export class TranslateController {
  constructor(public path: PathTranslate) { }

  private configRequest(content: TranslateText, targetLang: string) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Given the following JSON object, translate only the attribute values ​​of the following json: ${JSON.stringify(
          content.translatedText
        )} to ${targetLang}`,
        max_tokens: 4000,
        model: "gpt-3.5-turbo-instruct",
        temperature: 0,
      }),
    }
  }

  public async translate(targetLang: string): Promise<TranslateText> {
    const content = config[this.path];

    const response = await fetch("https://api.openai.com/v1/completions", this.configRequest(content, targetLang));

    const data: TextCompletionObject = await response.json();

    const [{ text }] = data.choices;

    console.log(text);

    return { translatedText: JSON.parse(text.replace(/\n+/g, "")) };
  }
}