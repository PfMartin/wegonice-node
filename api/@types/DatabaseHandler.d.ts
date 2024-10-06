import { Author, DbCreateAuthor, DbPatchAuthor } from '../model/author';

type DbResponse<T> = Promise<{ data: T | null; error: string }>;

interface DatabaseHandler {
  getAllAuthors(): DbResponse<Author[]>;
  getAuthorById(): DbResponse<Author>;
  createAuthor(author: DbCreateAuthor): DbResponse<string>;
  patchAuthorById(id: string, authorPatch: DbPatchAuthor): DbResponse<string>;
  deleteAuthorById(id: string): DbResponse<string>;
}
