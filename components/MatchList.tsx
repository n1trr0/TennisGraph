import type { Matches } from "../types/matches.ts";

interface MatchListProps {
    matches: Matches[];
}

export default function MatchList({ matches }: MatchListProps) {
    if (matches.length === 0) {
        return (
            <div class="no-results">
                <p>No se encontraron partidos. Prueba con otros filtros.</p>
            </div>
        );
    }

    return (
        <div class="matches-list">
            {matches.map((match) => {
                const tournament = (match.tournaments as unknown as { tourney_name: string; surface: string; year: number });
                
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
                                <span class="player-label">Ganador</span>
                                <span class="score">{match.score}</span>
                            </div>
                            <div class="player-row loser">
                                <span class="player-label">Perdedor</span>
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
    );
}
