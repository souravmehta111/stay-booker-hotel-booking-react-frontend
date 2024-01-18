import Navbar from '../../components/gloabal-navbar/navbar';
import HeroCover from './components/hero-cover/HeroCover';
import PopularLocations from './components/popular-locations/popular-locations';
import { networkAdapter } from '../../services/NetworkAdapter';
import { useState, useEffect } from 'react';
import ResultsContainer from '../../components/results-container/results-container';

const Home = () => {
  const [popularDestinationsData, setPopularDestinationsData] = useState([]);
  const [hotelsResults, setHotelsResults] = useState([]);
  useEffect(() => {
    const getPopularDestinationsData = async () => {
      const popularDestinationsResponse = await networkAdapter.get(
        '/api/popularDestinations'
      );
      const hotelsResultsResponse =
        await networkAdapter.get('/api/nearbyHotels');
      if (popularDestinationsResponse) {
        setPopularDestinationsData(popularDestinationsResponse.data.elements);
      }
      if (hotelsResultsResponse) {
        setHotelsResults(hotelsResultsResponse.data.elements);
      }
    };
    getPopularDestinationsData();
  }, []);

  return (
    <>
      <Navbar />
      <HeroCover />
      <div className="container mx-auto">
        <PopularLocations popularDestinationsData={popularDestinationsData} />
        <div className="my-4">
          <h2 className="text-3xl font-medium text-slate-700 text-center">
            Most searched in pune
          </h2>
          <ResultsContainer hotelsResults={hotelsResults} />
        </div>
      </div>
    </>
  );
};

export default Home;
