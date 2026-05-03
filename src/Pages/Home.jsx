import React from 'react';
import Navbar from '../Components/Navbar';
import Banner from '../Components/Banner';
import Row from '../Components/Row';
import Footer from '../Components/Footer';
import ContinueWatching from '../Components/ContinueWatching';
import ScreenTime from '../Components/ScreenTime';
import { requests } from '../Services/Api';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Banner />
      <div className="home__rows">
        <ScreenTime />
        <ContinueWatching />
        <Row title="🔥 Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="⭐ Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="💥 Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="😂 Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="👻 Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="💕 Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;