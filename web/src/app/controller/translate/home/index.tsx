import {
  TranslateConfigure,
  TranslateHome,
  TranslateText,
} from "../translate.type";

export default class TranslateHomeController
  implements TranslateConfigure<TranslateHome>
{
  public content(): TranslateText {
    return {
      translatedText: {
        TITLE_HOME: "Financial planning",
        DESCRIPTION_HOME: "We help you plan your finances simply and quickly.",
      },
    };
  }
}
