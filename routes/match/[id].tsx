import { define } from "../../utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const matchId = ctx.params.id;
    
    const response = await fetch(`${ctx.url.origin}/api/matches/${matchId}`);
    const match = await response.json();

    if (!match || match.error) {
      return new Response('Match not found', { status: 404 });
    }

    return { data: { match } };
  }
});

export default define.page<typeof handler>(function MatchDetailPage(props) {
  // Extraemos los datos del partido
  const { match } = props.data;
  const tournament = match.tournaments;
  const winner = match.winner;
  const loser = match.loser;

  const formatLabel = (name: string, seed?: number | null, entry?: string | null) => {
    if (seed !== null && seed !== undefined) return `${name} (${seed})`;
    if (entry) return `${name} (${entry})`;
    return name;
  };

  const calculateStats = (w1stIn?: number | null, w1stWon?: number | null, w2ndWon?: number | null, wsvpt?: number | null) => {
    if (!w1stIn || !w1stWon || !w2ndWon || !wsvpt) return null;
    
    const firstServePercentage = ((w1stIn / wsvpt) * 100).toFixed(1);
    const firstServeWonPercentage = ((w1stWon / w1stIn) * 100).toFixed(1);
    const secondServeWonPercentage = w2ndWon && (wsvpt - w1stIn) > 0 
      ? ((w2ndWon / (wsvpt - w1stIn)) * 100).toFixed(1) 
      : '0.0';
    
    return {
      firstServePercentage,
      firstServeWonPercentage,
      secondServeWonPercentage
    };
  };

  const winnerStats = calculateStats(match.w_1stIn, match.w_1stWon, match.w_2ndWon, match.w_svpt);
  const loserStats = calculateStats(match.l_1stIn, match.l_1stWon, match.l_2ndWon, match.l_svpt);

  return (
    <div class="min-h-screen bg-gray-50 py-12 px-4">
      <div class="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Información del Torneo */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #ebebeb',
          borderRadius: '9999px',
          padding: '1rem 2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {tournament.tourney_name}
          </h1>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            {tournament.year} • {tournament.surface} • {match.round}
          </div>
        </div>

        {/* Resultado del Partido */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #ebebeb',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {winner.ioc2 && (
                  <span class={`fi fi-${winner.ioc2.toLowerCase()}`} style={{ fontSize: '1.5rem' }}></span>
                )}
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {formatLabel(winner.name_full, match.winner_seed, match.winner_entry)}
                </span>
              </div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', minWidth: '150px', textAlign: 'center' }}>
              {match.score}
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #ebebeb' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {loser.ioc2 && (
                  <span class={`fi fi-${loser.ioc2.toLowerCase()}`} style={{ fontSize: '1.5rem' }}></span>
                )}
                <span style={{ fontSize: '1.25rem' }}>
                  {formatLabel(loser.name_full, match.loser_seed, match.loser_entry)}
                </span>
              </div>
            </div>
            <div style={{ minWidth: '150px' }}></div>
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #ebebeb', display: 'flex', gap: '1rem', justifyContent: 'center', fontSize: '0.9rem', color: '#666' }}>
            <span>Best of {match.best_of}</span>
            {match.minutes && <span>• {match.minutes} min</span>}
          </div>
        </div>

        {/* Estadísticas del Partido */}
        {(match.w_ace !== null || match.l_ace !== null) && (
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #ebebeb',
            borderRadius: '1rem',
            padding: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
              Statistics
            </h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {/* Aces */}
              {match.w_ace !== null && match.l_ace !== null && (
                <div class="stat-row">
                  <span class="stat-value">{match.w_ace}</span>
                  <span class="stat-label">Aces</span>
                  <span class="stat-value">{match.l_ace}</span>
                </div>
              )}

              {/* Dobles Faltas */}
              {match.w_df !== null && match.l_df !== null && (
                <div class="stat-row">
                  <span class="stat-value">{match.w_df}</span>
                  <span class="stat-label">Double Faults</span>
                  <span class="stat-value">{match.l_df}</span>
                </div>
              )}

              {/* Primer Servicio */}
              {winnerStats && loserStats && (
                <>
                  <div class="stat-row">
                    <span class="stat-value">{winnerStats.firstServePercentage}%</span>
                    <span class="stat-label">1st Serve</span>
                    <span class="stat-value">{loserStats.firstServePercentage}%</span>
                  </div>

                  <div class="stat-row">
                    <span class="stat-value">{winnerStats.firstServeWonPercentage}%</span>
                    <span class="stat-label">1st Serve Points Won</span>
                    <span class="stat-value">{loserStats.firstServeWonPercentage}%</span>
                  </div>

                  <div class="stat-row">
                    <span class="stat-value">{winnerStats.secondServeWonPercentage}%</span>
                    <span class="stat-label">2nd Serve Points Won</span>
                    <span class="stat-value">{loserStats.secondServeWonPercentage}%</span>
                  </div>
                </>
              )}

              {/* Break Points */}
              {match.w_bpSaved !== null && match.w_bpFaced !== null && match.l_bpSaved !== null && match.l_bpFaced !== null && (
                <div class="stat-row">
                  <span class="stat-value">{match.w_bpSaved}/{match.w_bpFaced}</span>
                  <span class="stat-label">Break Points Saved</span>
                  <span class="stat-value">{match.l_bpSaved}/{match.l_bpFaced}</span>
                </div>
              )}

              {/* Juegos de Servicio */}
              {match.w_SvGms !== null && match.l_SvGms !== null && (
                <div class="stat-row">
                  <span class="stat-value">{match.w_SvGms}</span>
                  <span class="stat-label">Service Games</span>
                  <span class="stat-value">{match.l_SvGms}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
