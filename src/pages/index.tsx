import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Home(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    history.push('/docs/misti/docs');
  }, [history]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
