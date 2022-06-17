import { useState } from 'react';
import Slider from '../common/Slider';
import Loader from '../common/Loader';

function Gallery() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = () => {
    console.log('Content Load Finish');
    setIsLoading(false);
  };

  window.addEventListener('load', handleLoad);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {/* <Header /> */}
      {/* <Sidebar /> */}
      <Slider />
      {/* <Footer /> */}
    </>
  );
}

export default Gallery;
