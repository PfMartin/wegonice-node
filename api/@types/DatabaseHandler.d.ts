import { Author } from '../model/author';

interface DatabaseHandler {
  getAllAuthors(): Author[];
}
