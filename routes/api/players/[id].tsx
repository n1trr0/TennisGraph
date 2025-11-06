import { define } from "../../../utils.ts";
import PlayerFromId from "../../../queries/PlayerFromId.ts";

export default define.handlers({
  async GET(ctx) {
    const { id } = ctx.params;

    try {
      const player = await PlayerFromId(id);

      if (!player) {
        return new Response(JSON.stringify({ error: 'Jugador no encontrado' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(player), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (_err) {
      console.error('Error:', _err);
      return new Response(JSON.stringify({ error: 'Error al obtener el jugador' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
});
