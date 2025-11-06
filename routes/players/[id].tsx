import { define } from "../../utils.ts";
import PlayerFromId from "../../queries/PlayerFromId.ts";
import PlayerInfoBox from "../../components/PlayerInfoBox.tsx";
import PlayerRankingBox from "../../components/PlayerRankingBox.tsx";
import PlayerRankingFromId from "../../queries/PlayerRankingFromId.ts";

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

    return {data :{ player, playerRanking}}
  },
});

export default define.page<typeof handler>(function PlayerPage(props) {


  return (
    <div class="min-h-screen bg-gray-50 py-12 px-4" style={{ marginTop: '2rem' }}>
      <div class="mx-auto" style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <PlayerInfoBox player={props.data.player} />
        <PlayerRankingBox ranking={props.data.playerRanking} />
      </div>
    </div>
  );
});
