import { useState, useEffect } from 'preact/hooks';
import type { Player } from '../types/player.ts';

export default function PlayerSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [_isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const searchPlayers = async () => {
      if (!searchQuery.trim()) {
        setPlayers([]);
        return;
      }

      try {
        const response = await fetch(`/api/players/search?q=${encodeURIComponent(searchQuery)}`);
        
        if (!response.ok) throw new Error('Error en la búsqueda');
        
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        console.error(err);
      }
    };

    const timeoutId = setTimeout(searchPlayers, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e: Event) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-6xl px-4">
      <form onSubmit={handleSearch} className="relative mb-8" style={{ minWidth: '300px' }}>
        <input
          type="text"
          value={searchQuery}
          onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Buscar jugador..."
          className="w-full px-6 py-5 text-2xl bg-white border-2 border-gray-800 rounded-xl focus:outline-none focus:border-blue-600 transition-colors shadow-lg"
          style={{ minWidth: '300px' }}
        />
      </form>

      {players.length > 0 && (
        <div className="space-y-3">
          {players.map((player) => (
            <a
              key={player.id}
              href={`/players/${player.id}`}
              className="block bg-white border-2 border-gray-800 hover:border-blue-600 rounded-xl px-6 py-4 transition-all hover:shadow-lg"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {player.ioc2 && (
                    <span className={`fi fi-${player.ioc2.toLowerCase()} text-2xl`}></span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">
                    {player.name_full}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
