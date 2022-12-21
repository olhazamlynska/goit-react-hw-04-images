import { useState, useEffect } from 'react';
import * as API from 'services/pixabayAPI';
import toast, { Toaster } from 'react-hot-toast';

import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Searchbar } from 'components/Searchbar/Searchbar';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totallHits, setTotallHits] = useState(null);

  const handleSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      toast.error('Please, enter search data');
      return;
    }

    if (query === searchQuery) {
      toast.warn('You have the same search. Please try another word');
      return;
    }

    setImages([]);
    setQuery(searchQuery);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const imageMaper = hits => {
    return hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    async function fetchImages() {
      try {
        setIsLoading(true);

        const { hits, totallHits } = await API.fetchImg(query, page);
        const pictures = imageMaper(hits);

        setImages(prevState => [...prevState, ...pictures]);
        setTotallHits(totallHits);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [page, query]);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>Something went wrong, try again!</p>}
      {isLoading && <Loader />}

      {images && <ImageGallery images={images} />}
      {images.length > 0 && totallHits - page * 12 && (
        <Button onClick={loadMore} />
      )}
      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  );
}
