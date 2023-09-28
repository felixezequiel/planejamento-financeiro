import {
  TranslateHome,
  TranslatedText,
} from "@/app/controller/translate/translate.type";
import { Card, Typography } from "@material-tailwind/react";

export default function Home({
  translatedText,
}: TranslatedText<TranslateHome>) {
  console.log("translatedText:", translatedText);

  return (
    <Card shadow={false} color="transparent">
      <Typography variant="h1" color="gray">
        {translatedText.TITLE_HOME}
      </Typography>

      <Typography color="gray" className="mt-1 font-normal">
        {translatedText.DESCRIPTION_HOME}
      </Typography>
    </Card>
  );
}
