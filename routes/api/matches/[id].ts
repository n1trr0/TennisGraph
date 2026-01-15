import { define } from "../../../utils.ts";
import { supabase } from "../../../supabase.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const matchId = ctx.params.id;

    try {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *, 
          tournaments!inner(tourney_name, surface, year),
          winner:players!winner_id(name_full, ioc2),
          loser:players!loser_id(name_full, ioc2)
        `)
        .eq('match_id', matchId)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!data) {
        return new Response(JSON.stringify({ error: 'Partido no encontrado' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Error:', err);
      return new Response(JSON.stringify({ error: 'Error al buscar el partido' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
});
