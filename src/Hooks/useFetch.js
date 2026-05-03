import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data.results);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
}

export default useFetch;