import { define } from "../../../utils.ts";
import PlayerRankingFromId from "../../../queries/PlayerRankingFromId.ts";

export default define.handlers({
  async GET(ctx) {
    const { id } = ctx.params;

    const playerRanking = await PlayerRankingFromId(id);

    if (!playerRanking) {
      return new Response(JSON.stringify({ error: 'Error al obtener rankings del jugador' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(playerRanking), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  },
});
