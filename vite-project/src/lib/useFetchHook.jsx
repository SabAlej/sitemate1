import { useState, useEffect } from 'react';

const useFetch = (url, method, body, id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      try {
        const response = await fetch(
          id
            ? `http://localhost:3000/${url}${id}`
            : `http://localhost:3000/${url}`,
          options
        );
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [url, method, body, id]);

  return { data, loading, error };
};

export default useFetch;
