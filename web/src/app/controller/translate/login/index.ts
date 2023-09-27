import { TranslateConfigure, TranslateContent, TranslateLogin } from "../translate.type";

export default class TranslateLoginController implements TranslateConfigure<TranslateLogin> {

  content(): TranslateContent<TranslateLogin> {
    return {
      SIGN_UP: "Sign up",
      SIGN_UP_LEGEND: "Sign up to get access to the platform",
      NAME: "Name",
      EMAIL: "Email",
      PASSWORD: "Password",
      TERMS_AND_CONDITIONS: "I agree with the terms and conditions",
      REGISTER: "Register",
      ALREADY_HAVE_AN_ACCOUNT: "Already have an account?",
      SIGN_IN: "Sign in"
    }
  }
}