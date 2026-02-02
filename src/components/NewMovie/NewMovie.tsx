import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const isValidUrl = (value: string) => {
  const p1 = '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?';
  const p2 = '[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)';
  const p3 = '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?';
  const p4 = '(?:[,.!/\\\\\\w]*))?)$';

  const pattern = new RegExp(p1 + p2 + p3 + p4);

  return pattern.test(value);
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0);

  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isButtonDisabled = (input: Movie) => {
    return (
      !input.title.trim() ||
      !input.imgUrl.trim() ||
      !isValidUrl(input.imgUrl) ||
      !input.imdbId.trim() ||
      !input.imdbUrl.trim() ||
      !isValidUrl(input.imdbUrl)
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onAdd({
      ...movie,
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setFormKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newTitle => setMovie({ ...movie, title: newTitle })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newDescription =>
          setMovie({ ...movie, description: newDescription })
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newImgUrl => setMovie({ ...movie, imgUrl: newImgUrl })}
        validate={isValidUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newImdbUrl => setMovie({ ...movie, imdbUrl: newImdbUrl })}
        validate={isValidUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newImdbId => setMovie({ ...movie, imdbId: newImdbId })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled(movie)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
