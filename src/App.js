import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Recommendation from "./components/Recommendation";
import { getMovies } from "./slices/AllMoviesSlice";
import { getGenres } from "./slices/AllGenresSlice";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import MovieDetailView from "./components/MovieDetailView";
import SearchMovieDetail from "./components/SearchMovieDetail";

const baseUrl = process.env.REACT_APP_BASE_URL;
const appName = process.env.REACT_APP_APP_NAME;
const apiUrl = process.env.REACT_APP_API_URL;
const genreUrl = process.env.REACT_APP_GENRE_URL;
const movieUrl = process.env.REACT_APP_MOVIE_URL;
const apiKey = process.env.REACT_APP_APIkEY;
function App() {
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  const selectedGenresLocalStorage = JSON.parse(
    localStorage.getItem("selectedGenres")
  );

  useEffect(() => {
   getUserIPAndTrack();
  }, [])
  
  const getUserIPAndTrack = async () => {
    try {
      const res = await fetch(`${apiUrl}`);
      if (!res.ok) return;

      const data = await res.json();

      const dataInfo = {
        ip: data?.ip,
        appName: appName,
        countryName: data?.country_name,
        countryCode: data?.country_code,
      };

      await axios.post(`${baseUrl}/app/tracking`, dataInfo);
      console.log("IP successfully posted");
      window.localStorage.setItem("visitedOnce", JSON.stringify("true"));
    } catch (error) {
      console.error("Tracking error:", error);
    }
  };


  let listOfIds = parseInt(selectedGenresLocalStorage?.toString());
  const MOVIE_URL = `${movieUrl}${apiKey}&with_genres=${listOfIds}`;

  useEffect(() => {
    axios
      .get(MOVIE_URL)
      .then((data) => {
        dispatch(getMovies(data.data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [MOVIE_URL, dispatch, selectedGenresLocalStorage, reload]);

  useEffect(() => {
    axios
      .get(genreUrl)
      .then((response) => {
        const genreMap = {};
        response.data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        dispatch(getGenres(genreMap));
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  }, [dispatch, reload]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<HomePage reload={reload} setReload={setReload} />}
        />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/moviedetailview/:id" element={<MovieDetailView />} />
        <Route path="/searchmoviedetail/:id" element={<SearchMovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
