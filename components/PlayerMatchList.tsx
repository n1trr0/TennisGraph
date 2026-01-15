import type { Matches } from "../types/matches.ts";

interface PlayerMatchListProps {
    matches: Matches[];
    playerId: string;
}

export default function PlayerMatchList({ matches, playerId }: PlayerMatchListProps) {
    const formatLabel = (name: string, seed?: number | null, entry?: string | null) => {
        if (seed !== null && seed !== undefined) return `${name} (${seed})`;
        if (entry) return `${name} (${entry})`;
        return name;
    };

    const getRoundOrder = (round: string): number => {
        const roundOrder: { [key: string]: number } = {
            'F': 1,
            'SF': 2,
            'QF': 3,
            'R16': 4,
            'R32': 5,
            'R64': 6,
            'R128': 7,
            'RR': 8
        };
        return roundOrder[round] || 99;
    };

    // Sort matches by year (desc), tournament name, then round order
    const sortedMatches = [...matches].sort((a, b) => {
        const tournamentA = a.tournaments as unknown as { tourney_name: string; surface: string; year: number };
        const tournamentB = b.tournaments as unknown as { tourney_name: string; surface: string; year: number };
        
        // First by year (descending)
        if (tournamentA.year !== tournamentB.year) {
            return tournamentB.year - tournamentA.year;
        }
        
        // Then by tournament name
        if (tournamentA.tourney_name !== tournamentB.tourney_name) {
            return tournamentA.tourney_name.localeCompare(tournamentB.tourney_name);
        }
        
        // Finally by round order (F before SF before QF, etc.)
        return getRoundOrder(a.round) - getRoundOrder(b.round);
    });

    if (matches.length === 0) {
        return (
            <div style={{
                backgroundColor: '#fff',
                border: '1px solid #ebebeb',
                borderRadius: '1rem',
                padding: '1.5rem'
            }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                    Recent Matches
                </h2>
                <p style={{ textAlign: 'center', color: '#666' }}>No matches found</p>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: '#fff',
            border: '1px solid #ebebeb',
            borderRadius: '1rem',
            padding: '1.5rem'
        }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                Recent Matches
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sortedMatches.map((match) => {
                    const tournament = match.tournaments as unknown as { tourney_name: string; surface: string; year: number };
                    const winner = match.winner as unknown as { name_full: string; ioc2: string };
                    const loser = match.loser as unknown as { name_full: string; ioc2: string };
                    const isWinner = match.winner_id === playerId;

                    return (
                        <a 
                            key={match.match_id} 
                            href={`/match/${match.match_id}`}
                            style={{
                                display: 'block',
                                textDecoration: 'none',
                                color: 'inherit',
                                backgroundColor: isWinner ? '#f0f9ff' : '#fef2f2',
                                border: '1px solid #ebebeb',
                                borderRadius: '0.5rem',
                                padding: '1rem',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#333' }}>
                                    {tournament.tourney_name}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#666' }}>
                                    {tournament.year} • {tournament.surface}
                                </span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: isWinner ? '600' : '400' }}>
                                    {formatLabel(winner.name_full, match.winner_seed, match.winner_entry)}
                                </span>
                                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                                    {match.score}
                                </span>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: !isWinner ? '600' : '400' }}>
                                    {formatLabel(loser.name_full, match.loser_seed, match.loser_entry)}
                                </span>
                            </div>

                            <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: '#666' }}>
                                <span>{match.round}</span>
                                <span>•</span>
                                <span>Best of {match.best_of}</span>
                                {match.minutes && (
                                    <>
                                        <span>•</span>
                                        <span>{match.minutes} min</span>
                                    </>
                                )}
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
