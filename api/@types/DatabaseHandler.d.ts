import { Author, DbCreateAuthor, DbPatchAuthor } from '../model/author';

type DbResponse<T> = Promise<{ data: T | null; error: string }>;

interface DatabaseHandler {
  getAllAuthors(): DbResponse<Author[]>;
  getAuthorById(id: string): DbResponse<Author>;
  createAuthor(author: DbCreateAuthor): DbResponse<string>;
  patchAuthorById(id: string, authorPatch: DbPatchAuthor): DbResponse<number>;
  deleteAuthorById(id: string): DbResponse<number>;
}
