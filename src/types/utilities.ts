import { format } from "date-fns";
import locale from "date-fns/locale/nl";
import { upperFirst } from "lodash";

export const localeFormat = (date: Date | number, dateFormat: string): string =>
  format(date, dateFormat, { locale });

export const formatMoney = (value: number, fractionDigits = 2): string =>
  value.toLocaleString("nl-NL", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    style: "currency",
    currency: "EUR",
  });

function isUpperCase(letter: string): boolean {
  return !!letter.match(/[A-Z]/);
}

export function uncamel(camel: string) {
  return upperFirst(
    camel.replaceAll(/[A-Z]/g, (letter, position) => {
      const prevLetter = camel[position - 1];
      const prevIsUppercase = prevLetter ? isUpperCase(prevLetter) : false;
      const nextLetter = camel[position + 1];
      const nextIsUppercase = nextLetter ? isUpperCase(nextLetter) : false;
      if (
        position === 0 ||
        (prevIsUppercase && (!nextLetter || nextIsUppercase))
      ) {
        return letter;
      }
      return ` ${nextIsUppercase ? letter : letter.toLowerCase()}`;
    })
  );
}
