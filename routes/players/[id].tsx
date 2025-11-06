import { define } from "../../utils.ts";
import PlayerFromId from "../../queries/PlayerFromId.ts";

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

  return (
    <div class="min-h-screen bg-gray-50 py-12 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white border-2 border-gray-800 rounded-xl p-8 shadow-lg">
          <h1 class="text-4xl font-bold text-gray-900">
            {props.data.name}
          </h1>
        </div>
      </div>
    </div>
  );
});
