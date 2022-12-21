import * as API from 'services/pixabayAPI';
import toast, { Toaster } from 'react-hot-toast';

import { Component } from 'react';

import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { imgMaper } from 'utils/imagemapper';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    query: '',
    images: null,
    page: 1,
    isLoading: false,
    error: null,
    totalHits: null,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });

      try {
        const { hits, totalHits } = await API.fetchImg(
          this.state.query,
          this.state.page
        );

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...imgMaper(hits)],
            totalHits,
          };
        });

        if (totalHits === 0) {
          toast.error('There no images. Try again');
        }
        if (this.state.page === 1 && totalHits !== 0) {
          toast.success(`We found ${totalHits} images`);
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = query => {
    if (query.trim() === '') {
      return toast.error('Please, enter search data');
    }
    this.setState({ images: [], page: 1, query });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, error, totalHits, page } = this.state;
    const leftHits = totalHits - page * 12;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && (
          <p>Something went wrong, try again! Problem: {error.message}</p>
        )}
        {isLoading && <Loader />}

        {images && <ImageGallery images={images} />}
        {images && leftHits > 0 && <Button onClick={this.loadMore} />}
        <Toaster position="bottom-left" reverseOrder={false} />
      </>
    );
  }
}
