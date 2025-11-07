import { define } from "../../utils.ts";
import PlayerFromId from "../../queries/PlayerFromId.ts";
import PlayerInfoBox from "../../components/PlayerInfoBox.tsx";
import PlayerRankingBox from "../../components/PlayerRankingBox.tsx";
import PlayerRankingFromId from "../../queries/PlayerRankingFromId.ts";
import PlayerTrophiesFromId from "../../queries/PlayerTrophiesFromId.ts";
import PlayerTrophiesBox from "../../components/PlayerTrophiesBox.tsx";
import PlayerNavBar from "../../components/PlayerNavBar.tsx";

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


    const playerRanking = await PlayerRankingFromId(id);

    if (!playerRanking) {
      console.error('Ranking no encontrado');
      return new Response('Ranking no encontrado', { status: 404 });
    }
    console.log('Ranking data:', playerRanking);

    const playerTrophies = await PlayerTrophiesFromId(id);

    if (!playerTrophies) {
      console.error('Títulos no encontrados');
      return new Response('Títulos no encontrados', { status: 404 });
    }
    console.log('Títulos data:', playerTrophies);

    return {data :{ player, playerRanking, playerTrophies }}
  },
});

export default define.page<typeof handler>(function PlayerPage(props) {


  return (
    <div class="min-h-screen bg-gray-50 py-12 px-4" style={{ marginTop: '2rem' }}>
      <div class="mx-auto" style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <PlayerNavBar playerId={props.data.player.id} activePage="overview" />
        <PlayerInfoBox player={props.data.player} />
        <PlayerRankingBox ranking={props.data.playerRanking} />
        <PlayerTrophiesBox trophies={props.data.playerTrophies} />
      </div>
    </div>
  );
});
