import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';
import { tryInsertSeeds } from '@/services/apis/seed';

(async () => {
  await tryInsertSeeds();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
})();
