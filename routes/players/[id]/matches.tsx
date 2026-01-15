import PlayerNavBar from "../../../components/PlayerNavBar.tsx";
import PlayerMatchList from "../../../components/PlayerMatchList.tsx";
import PlayerFromId from "../../../queries/PlayerFromId.ts";
import PlayerMatchesFromId from "../../../queries/PlayerMatchesFromId.ts";
import { define } from "../../../utils.ts";


export const handler = define.handlers({
  async GET(ctx) {
    const { id } = ctx.params;

    console.log('Buscando jugador con ID:', id);

    const player = await PlayerFromId(id);

    if (!player) {
      console.error('Jugador no encontrado');
      return new Response('Jugador no encontrado', { status: 404 });
    }

    console.log('Player data:', player);

    const matches = await PlayerMatchesFromId(id);

    return {data :{ player, matches: matches || [] }}
  },
});

export default define.page<typeof handler>(function MatchesPage(props) {
    const { player, matches } = props.data;

    return (
        <div class="min-h-screen bg-gray-50 py-12 px-4" style={{ marginTop: '2rem' }}>
        <div class="mx-auto" style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <PlayerNavBar playerId={player.id} activePage="matches" />
            <PlayerMatchList matches={matches} playerId={player.id} />
        </div>
        </div>
    );
});
