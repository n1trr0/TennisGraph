import PlayerNavBar from "../../../components/PlayerNavBar.tsx";
import PlayerFromId from "../../../queries/PlayerFromId.ts";
import PlayerTrophyDetailsFromId from "../../../queries/PlayerTrophyDetailsFromId.ts";
import { define } from "../../../utils.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const { id } = ctx.params;

        const player = await PlayerFromId(id);

        if (!player) {
            return new Response('Player not found', { status: 404 });
        }

        const trophies = await PlayerTrophyDetailsFromId(id);
        console.log(trophies);
        return { data: { player, trophies: trophies || [] } };
    },
});

export default define.page<typeof handler>(function TrophiesPage(props) {
  const { player, trophies } = props.data;

  // Group trophies by tournament name
  const groupedTrophies = trophies.reduce((acc, trophy) => {
    const key = trophy.tourney_name;
    if (!acc[key]) {
      acc[key] = {
        name: trophy.tourney_name,
        level: trophy.level,
        years: []
      };
    }
    acc[key].years.push(trophy.year);
    return acc;
  }, {} as Record<string, { name: string; level: string; years: number[] }>);

  // Convert to array and sort years within each trophy
  const trophyList = Object.values(groupedTrophies).map(trophy => ({
    ...trophy,
    years: trophy.years.sort((a, b) => a - b)
  }));

  // Define level order and sort
  const levelOrder: Record<string, number> = {
    'Grand Slam': 1,
    'Masters 1000': 2,
    'ATP 500': 3,
    'ATP 250': 4,
    'Olympics': 5,
    'ATP Finals': 6
  };

  const sortedTrophies = trophyList.sort((a, b) => {
    const orderA = levelOrder[a.level] || 99;
    const orderB = levelOrder[b.level] || 99;
    
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    
    return a.name.localeCompare(b.name);
  });

  // Group by level for display
  const trophiesByLevel = sortedTrophies.reduce((acc, trophy) => {
    if (!acc[trophy.level]) {
      acc[trophy.level] = [];
    }
    acc[trophy.level].push(trophy);
    return acc;
  }, {} as Record<string, typeof trophyList>);

  const levelDisplay: Record<string, string> = {
    'Grand Slam': 'Grand Slams',
    'Masters 1000': 'Masters 1000',
    'ATP 500': 'ATP 500',
    'ATP 250': 'ATP 250',
    'Olympics': 'Olympics',
    'ATP Finals': 'ATP Finals'
  };

  return (
    <div class="min-h-screen bg-gray-50 py-12 px-4" style={{ marginTop: '2rem' }}>
      <div class="mx-auto" style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <PlayerNavBar playerId={player.id} activePage="trophies" />
        
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #ebebeb',
          borderRadius: '1rem',
          padding: '1.5rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Career Titles
          </h2>

          {trophies.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No titles found</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {Object.entries(levelOrder).map(([level, _]) => {
                const levelTrophies = trophiesByLevel[level];
                if (!levelTrophies || levelTrophies.length === 0) return null;

                return (
                  <div key={level}>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      marginBottom: '1rem',
                      color: '#333',
                      borderBottom: '2px solid #ebebeb',
                      paddingBottom: '0.5rem'
                    }}>
                      {levelDisplay[level]}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {levelTrophies.map((trophy, idx) => (
                        <div 
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            backgroundColor: '#f9fafb',
                            borderRadius: '0.5rem',
                            border: '1px solid #ebebeb'
                          }}
                        >
                          <span style={{ 
                            fontWeight: '600', 
                            color: '#666',
                            minWidth: '30px'
                          }}>
                            x{trophy.years.length}
                          </span>
                          <span style={{ 
                            fontWeight: '500',
                            color: '#333',
                            flex: 1
                          }}>
                            {trophy.name}
                          </span>
                          <span style={{ 
                            fontSize: '0.85rem',
                            color: '#666'
                          }}>
                            ({trophy.years.join(', ')})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
