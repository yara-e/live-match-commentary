import { useState } from 'react';
import { MatchList } from './components/MatchList';
import { MatchDetails } from './components/MatchDetails';
import type { Match } from './types';

 
function App() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
    
      <nav className="bg-blue-600 text-white p-4 shadow-md z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-bold text-lg md:text-xl">SportsLive ⚡</span>
          {selectedMatch && (
            <button 
              onClick={() => setSelectedMatch(null)}
              className="md:hidden text-xs bg-blue-700 px-3 py-1 rounded"
            >
              Close Match
            </button>
          )}
        </div>
      </nav>

       
      <main className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
        
        
        <div className={`flex-1 overflow-y-auto border-r transition-all duration-300 
          ${selectedMatch ? 'hidden md:block md:w-1/2 lg:w-3/5' : 'w-full'}`}>
          <MatchList onSelectMatch={(match) => setSelectedMatch(match)} />
        </div>
 
        {selectedMatch && (
          <div className="fixed inset-0 z-30 bg-white md:relative md:inset-auto md:z-10 md:w-1/2 lg:w-2/5 md:flex flex-col border-l shadow-2xl md:shadow-none animate-in slide-in-from-right">
            <MatchDetails 
              match={selectedMatch} 
              onBack={() => setSelectedMatch(null)} 
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;