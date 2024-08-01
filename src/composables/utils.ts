import Validate from '@/types/validate';

export const validateUrl = (url: string): RegExpMatchArray | true => {
  if (!url) return true;
  const expression = 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)';
  const regex = new RegExp(expression);

  return url.match(regex);
};

export const validateText = (text: string): Validate => {
  if (!text) return true;
  if (text.length > 0) return true;

  return 'Text field cannot be empty';
}