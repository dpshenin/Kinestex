
import React from 'react';
import { Header } from './components/Header';
import { DashboardReport } from './components/DashboardReport';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <DashboardReport />
      </main>
    </>
  );
};

export default App;
