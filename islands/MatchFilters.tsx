import { useState } from "preact/hooks";
import type { Matches } from "../types/matches.ts";

export default function MatchFilters() {
    const [surfaces, setSurfaces] = useState<string[]>([]);
    const [round, setRound] = useState<string>('');
    const [bestOf, setBestOf] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState<Matches[]>([]);

    const formatLabel = (name?: string, seed?: number | null, entry?: string | null) => {
        if (seed !== null && seed !== undefined) return `${name ?? ''} (${seed})`;
        if (entry) return `${name ?? ''} (${entry})`;
        return name ?? '';
    };

    const toggleSurface = (surface: string) => {
        if (surfaces.includes(surface)) {
            setSurfaces(surfaces.filter(s => s !== surface));
        } else {
            setSurfaces([...surfaces, surface]);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (surfaces.length > 0) {
                params.append('surfaces', surfaces.join(','));
            }
            if (round) {
                params.append('round', round);
            }
            if (bestOf) {
                params.append('bestOf', bestOf);
            }
            if (year) {
                params.append('year', year);
            }

            const response = await fetch(`/api/matches/search?${params.toString()}`);
            const data = await response.json();
            setMatches(data);
        } catch (error) {
            console.error('Error fetching matches:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div class="filters-container">
                {/* Filtro de Superficie */}
                <div class="filter-group">
                    <h3>Superficie</h3>
                    <div class="button-group">
                        <button 
                            class={surfaces.includes('Hard') ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => toggleSurface('Hard')}
                        >
                            Dura
                        </button>
                        <button 
                            class={surfaces.includes('Clay') ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => toggleSurface('Clay')}
                        >
                            Tierra
                        </button>
                        <button 
                            class={surfaces.includes('Grass') ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => toggleSurface('Grass')}
                        >
                            Hierba
                        </button>
                    </div>
                </div>

                {/* Filtro de Ronda */}
                <div class="filter-group">
                    <h3>Ronda</h3>
                    <select 
                        class="filter-select" 
                        value={round} 
                        onChange={(e) => setRound((e.target as HTMLSelectElement).value)}
                    >
                        <option value="">Todas</option>
                        <option value="F">Final</option>
                        <option value="SF">Semifinal</option>
                        <option value="QF">Cuartos de Final</option>
                        <option value="R16">Octavos de Final</option>
                        <option value="R32">R32</option>
                        <option value="R64">R64</option>
                        <option value="R128">R128</option>
                    </select>
                </div>

                {/* Filtro de Año */}
                <div class="filter-group">
                    <h3>Año</h3>
                    <select 
                        class="filter-select" 
                        value={year} 
                        onChange={(e) => setYear((e.target as HTMLSelectElement).value)}
                    >
                        <option value="">Todos</option>
                        {Array.from({ length: 26 }, (_, i) => 2025 - i).map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {/* Filtro de Best of */}
                <div class="filter-group">
                    <h3>Formato</h3>
                    <div class="button-group">
                        <button 
                            class={bestOf === '' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setBestOf('')}
                        >
                            Todos
                        </button>
                        <button 
                            class={bestOf === '3' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setBestOf('3')}
                        >
                            Best of 3
                        </button>
                        <button 
                            class={bestOf === '5' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setBestOf('5')}
                        >
                            Best of 5
                        </button>
                    </div>
                </div>

                {/* Botón de Búsqueda */}
                <button 
                    class="search-btn" 
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Buscando...' : 'Buscar Partidos'}
                </button>
            </div>

            {/* Resultados */}
            <div style={{ marginTop: '2rem' }}>
                {matches.length === 0 ? (
                    loading ? null : (
                        <div class="no-results">
                            <p>No se encontraron partidos. Prueba con otros filtros.</p>
                        </div>
                    )
                ) : (
                    <div class="matches-list">
                        {matches.map((match) => {
                            const tournament = (match.tournaments as unknown as { tourney_name: string; surface: string; year: number });
                            const winner = (match.winner as unknown as { name_full: string });
                            const loser = (match.loser as unknown as { name_full: string });
                            
                            return (
                                <div key={match.match_id} class="match-card">
                                    <div class="match-header">
                                        <span class="tournament-name">{tournament?.tourney_name}</span>
                                        <span class="match-details">
                                            {tournament?.year} • {tournament?.surface} • {match.round}
                                        </span>
                                    </div>
                                    <div class="match-score">
                                        <div class="player-row winner">
                                            <span class="player-label">{formatLabel(winner?.name_full, match.winner_seed, match.winner_entry) || 'Ganador'}</span>
                                            <span class="score">{match.score}</span>
                                        </div>
                                        <div class="player-row loser">
                                            <span class="player-label">{formatLabel(loser?.name_full, match.loser_seed, match.loser_entry) || 'Perdedor'}</span>
                                        </div>
                                    </div>
                                    <div class="match-footer">
                                        <span>Best of {match.best_of}</span>
                                        {match.minutes && <span>{match.minutes} min</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
