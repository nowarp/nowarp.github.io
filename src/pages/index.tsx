import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

const HomePage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/tools/misti');
  }, [history]);

  return null;
};

export default HomePage;
