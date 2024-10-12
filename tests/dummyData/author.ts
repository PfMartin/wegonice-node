import { getRandomBoolean, getRandomString } from '../util';

import { DbCreateAuthor } from '../../api/model/author';

export const getRandomAuthor = (): DbCreateAuthor => {
  const randomNameObject = getRandomBoolean()
    ? { firstName: getRandomString(8), lastName: getRandomString(8) }
    : { alias: getRandomString(10) };

  return {
    name: randomNameObject,
    userId: getRandomString(16),
    websiteUrl: getRandomString(6),
    youTubeUrl: getRandomString(6),
    instagramUrl: getRandomString(6),
  };
};
