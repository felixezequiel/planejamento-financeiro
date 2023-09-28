export interface TranslateHome {
  TITLE_HOME: string;
  DESCRIPTION_HOME: string;
}
export interface TranslateLogin {
  SIGN_UP: string
  SIGN_UP_LEGEND: string

  NAME: string
  EMAIL: string

  PASSWORD: string

  TERMS_AND_CONDITIONS: string
  REGISTER: string

  ALREADY_HAVE_AN_ACCOUNT: string
  SIGN_IN: string
}

export interface TextCompletionObject {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs: null;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface TranslatedText<T> {
  translatedText: T
}

export type TranslateText = TranslatedText<TranslateLogin> | TranslatedText<TranslateHome>


export type TranslateContent<T> = {
  [key in keyof T]: string
}

export interface TranslateConfigure<T> {
  content(): TranslateText
}