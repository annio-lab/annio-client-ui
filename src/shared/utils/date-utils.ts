// @flow
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import formatISO from 'date-fns/formatISO';
import * as _ from 'lodash';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';

export const DATE_FORMAT = 'dd-MM-yyyy';

export const MAP_LOCALES: any = {
  en: enUS,
  es,
};

export function parseDate(str: string, format = DATE_FORMAT, locale?: Locale): Date | undefined {
  if (str.length !== format.length) {
    return undefined;
  }
  const parsed = dateFnsParse(str, format, new Date(), { locale });

  if (!!parsed) {
    return parsed;
  }

  return undefined;
}

export function formatISODate(date: Date | string | undefined) {
  if (_.isString(date)) date = parseDate(date);

  if (!date) return date;

  return formatISO(date, { representation: 'date' });
}

export function formatDate(date: string, format = DATE_FORMAT, locale = 'en') {
  if (!date) return '';

  return dateFnsFormat(new Date(date), format, { locale: MAP_LOCALES[locale] });
}

export function parseTime(time: string, format = 'h:mm aa', locale: Locale) {
  if (!time) return null;

  return dateFnsParse(time, format, new Date(), { locale });
}

export function formatTime(time: string, format = 'h:mm aa', locale: Locale) {
  if (!time) return null;

  return dateFnsFormat(new Date(time), format, { locale });
}
