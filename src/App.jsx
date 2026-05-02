import React, { useState, useEffect } from 'react';
import dictionary from './roleplayDictionary.json';

function App() {
  const [level, setLevel] = useState('Elementary');
  const [isSpinning, setIsSpinning] = useState(false);
  const [scenario, setScenario] = useState(null);
  const [spinDisplay, setSpinDisplay] = useState({ character: '', setting: '', conflict: '' });

  // Handle Level Change
  const handleLevelChange = (e) => {
    setLevel(e.target.value);
    setScenario(null); // Reset scenario when level changes
    setSpinDisplay({ character: '', setting: '', conflict: '' });
  };

  // The Spin Logic
  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setScenario(null);

    const currentDict = dictionary[level];
    
    // Spinning animation effect: update rapidly
    let intervalId = setInterval(() => {
      setSpinDisplay({
        character: currentDict.Characters[Math.floor(Math.random() * currentDict.Characters.length)],
        setting: currentDict.Settings[Math.floor(Math.random() * currentDict.Settings.length)],
        conflict: currentDict.Conflicts[Math.floor(Math.random() * currentDict.Conflicts.length)]
      });
    }, 100);

    // Stop after 2 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      
      const finalCharacter = currentDict.Characters[Math.floor(Math.random() * currentDict.Characters.length)];
      const finalSetting = currentDict.Settings[Math.floor(Math.random() * currentDict.Settings.length)];
      const finalConflict = currentDict.Conflicts[Math.floor(Math.random() * currentDict.Conflicts.length)];
      
      setScenario({
        character: finalCharacter,
        setting: finalSetting,
        conflict: finalConflict
      });
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-between p-6">
      
      {/* Header */}
      <header className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center mt-4 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 md:mb-0 text-center tracking-tight">
          Roleplay Spinner
        </h1>
        
        <div className="flex items-center space-x-3">
          <label htmlFor="level" className="text-lg font-medium text-gray-300">Level:</label>
          <select 
            id="level"
            value={level} 
            onChange={handleLevelChange}
            disabled={isSpinning}
            className="bg-gray-700 text-white text-lg font-semibold py-2 px-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer disabled:opacity-50 transition-all shadow-inner"
          >
            <option value="Elementary">Elementary</option>
            <option value="Middle School">Middle School</option>
            <option value="High School">High School</option>
          </select>
        </div>
      </header>

      {/* Main Display Area */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-5xl my-10 space-y-8">
        
        {/* Placeholder / Empty State */}
        {!isSpinning && !scenario && (
          <div className="text-center p-12 bg-gray-800 rounded-3xl border border-gray-700 shadow-2xl w-full max-w-2xl">
            <h2 className="text-3xl font-bold text-gray-400">Ready to Spin!</h2>
            <p className="text-gray-500 mt-4 text-lg">Click the button below to generate a scenario.</p>
          </div>
        )}

        {/* Spinning / Result State */}
        {(isSpinning || scenario) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            
            {/* Character Card */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-3xl shadow-xl border border-blue-600 flex flex-col items-center justify-center min-h-[250px] transform transition-transform hover:scale-105">
              <h3 className="text-blue-300 uppercase tracking-widest text-sm font-bold mb-4">Character</h3>
              <p className={`text-3xl md:text-4xl font-black text-center ${isSpinning ? 'slot-machine-text' : 'text-white'}`}>
                {isSpinning ? spinDisplay.character : scenario?.character}
              </p>
            </div>

            {/* Setting Card */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-8 rounded-3xl shadow-xl border border-emerald-600 flex flex-col items-center justify-center min-h-[250px] transform transition-transform hover:scale-105">
              <h3 className="text-emerald-300 uppercase tracking-widest text-sm font-bold mb-4">Setting</h3>
              <p className={`text-3xl md:text-4xl font-black text-center ${isSpinning ? 'slot-machine-text' : 'text-white'}`}>
                {isSpinning ? spinDisplay.setting : scenario?.setting}
              </p>
            </div>

            {/* Conflict Card */}
            <div className="bg-gradient-to-br from-rose-900 to-rose-800 p-8 rounded-3xl shadow-xl border border-rose-600 flex flex-col items-center justify-center min-h-[250px] transform transition-transform hover:scale-105">
              <h3 className="text-rose-300 uppercase tracking-widest text-sm font-bold mb-4">Conflict</h3>
              <p className={`text-3xl md:text-4xl font-black text-center ${isSpinning ? 'slot-machine-text' : 'text-white'}`}>
                {isSpinning ? spinDisplay.conflict : scenario?.conflict}
              </p>
            </div>

          </div>
        )}
      </main>

      {/* Controls */}
      <footer className="w-full pb-10 flex justify-center">
        <button 
          onClick={handleSpin}
          disabled={isSpinning}
          className={`
            relative overflow-hidden group
            px-16 py-6 rounded-full text-4xl font-black tracking-widest text-white shadow-2xl
            transition-all duration-300 ease-in-out transform hover:-translate-y-2
            ${isSpinning 
              ? 'bg-gray-600 cursor-not-allowed opacity-50 scale-95 hover:translate-y-0' 
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 hover:shadow-pink-500/50'
            }
          `}
        >
          <span className="relative z-10">{isSpinning ? 'SPINNING...' : 'SPIN!'}</span>
          {!isSpinning && (
            <div className="absolute inset-0 h-full w-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          )}
        </button>
      </footer>

    </div>
  );
}

export default App;
