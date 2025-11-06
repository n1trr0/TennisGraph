import { define } from "../../utils.ts";
import PlayerFromId from "../../queries/PlayerFromId.ts";
import PlayerInfoBox from "../../components/PlayerInfoBox.tsx";

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

    return { data : player };
  },
});

export default define.page<typeof handler>(function PlayerPage(props) {
  const player = props.data;

  if (!player) {
    return (
      <div class="min-h-screen bg-gray-50 py-12 px-4">
        <div class="text-center text-red-600">Jugador no encontrado</div>
      </div>
    );
  }

  return (
    <div class="min-h-screen bg-gray-50 py-12 px-4" style={{ marginTop: '2rem' }}>
      <div class="mx-auto" style={{ maxWidth: '700px' }}>
        <PlayerInfoBox player={player} />
      </div>
    </div>
  );
});
