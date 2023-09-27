import "../../app/globals.css";
import TranslateLoginController from "@/app/controller/translate/login";
import {
  TextCompletionObject,
  TranslateContent,
  TranslateLogin,
} from "@/app/controller/translate/translate.type";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export const getStaticProps = (async () => {
  const content = new TranslateLoginController().content();

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `Translate the values from this object '${JSON.stringify(
        content
      )}' to el`,
      max_tokens: 4000,
      model: "gpt-3.5-turbo-instruct",
      temperature: 0,
    }),
  });

  const data: TextCompletionObject = await response.json();

  const [{ text }] = data.choices;

  const translatedText = JSON.parse(
    text.replace("\n", "")
  ) as TranslateContent<TranslateLogin>;

  return { props: { translatedText } };
}) satisfies GetStaticProps<{
  translatedText: TranslateContent<TranslateLogin>;
}>;

export default function Login({
  translatedText,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        {translatedText.SIGN_UP}
      </Typography>

      <Typography color="gray" className="mt-1 font-normal">
        {translatedText.SIGN_UP_LEGEND}
      </Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label={translatedText.NAME} />
          <Input size="lg" label={translatedText.EMAIL} />
          <Input type="password" size="lg" label={translatedText.PASSWORD} />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                {translatedText.TERMS_AND_CONDITIONS}
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth>
          {translatedText.REGISTER}
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          {translatedText.ALREADY_HAVE_AN_ACCOUNT + " "}
          <a href="#" className="font-medium text-gray-900">
            {translatedText.SIGN_IN}
          </a>
        </Typography>
      </form>
    </Card>
  );
}
