import { z } from 'zod';

const firstNameSchema = z.string().describe('First name of the author');
const lastNameSchema = z.string().describe('Last name of the author');
const nameAliasSchema = z.string().describe('Name of the author is known for');
const userIdSchema = z
  .string()
  .describe('Id of the user, who created the author');
const websiteUrlSchema = z
  .string()
  .describe('URL to the website of the author');
const instagramUrlSchema = z
  .string()
  .describe('URL to the instagram profile of the author');
const youTubeUrlSchema = z
  .string()
  .describe('URL to the youTube channel of the author');
const nameUnionSchema = z.union([
  z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
  }),
  z.object({
    alias: nameAliasSchema,
  }),
  z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    alias: nameAliasSchema,
  }),
]);
const createdAtSchema = z.date().describe('Date when the author was created');
const updatedAtSchema = z.date().describe('Date when the author was updated');

export const createAuthorSchema = z.object({
  name: nameUnionSchema,
  websiteUrl: websiteUrlSchema.optional(),
  instagramUrl: instagramUrlSchema.optional(),
  youTubeUrl: youTubeUrlSchema.optional(),
});

export const dbCreateAuthorSchema = z.object({
  name: nameUnionSchema,
  websiteUrl: websiteUrlSchema.optional(),
  instagramUrl: instagramUrlSchema.optional(),
  youTubeUrl: youTubeUrlSchema.optional(),
  userId: userIdSchema,
  createdAt: createdAtSchema,
  udpatedAt: updatedAtSchema,
});

export const patchAuthorSchema = z.object({
  name: z
    .object({
      firstName: firstNameSchema.optional(),
      lastName: lastNameSchema.optional(),
      alias: nameAliasSchema.optional(),
    })
    .optional(),
  websiteUrl: websiteUrlSchema.optional(),
  instagramUrl: instagramUrlSchema.optional(),
  youTubeUrl: youTubeUrlSchema.optional(),
});

export const dbPatchAuthorSchema = z.object({
  name: z
    .object({
      firstName: firstNameSchema.optional(),
      lastName: lastNameSchema.optional(),
      alias: nameAliasSchema.optional(),
    })
    .optional(),
  websiteUrl: websiteUrlSchema.optional(),
  instagramUrl: instagramUrlSchema.optional(),
  youTubeUrl: youTubeUrlSchema.optional(),
  updatedAt: updatedAtSchema,
});

export interface Author extends z.infer<typeof createAuthorSchema> {
  _id: string;
}
