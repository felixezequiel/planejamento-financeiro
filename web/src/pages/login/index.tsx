import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  TranslateLogin,
  TranslatedText,
} from "@/app/controller/translate/translate.type";

export default function Login({
  translatedText,
}: TranslatedText<TranslateLogin>) {
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
