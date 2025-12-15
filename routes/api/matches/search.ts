import { define } from "../../../utils.ts";
import { supabase } from "../../../supabase.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const url = new URL(ctx.req.url);
    const surfaces = url.searchParams.get('surfaces')?.split(',').filter(Boolean) || [];
    const round = url.searchParams.get('round') || null;
    const bestOf = url.searchParams.get('bestOf') || null;

    try {
      let query = supabase
        .from('matches')
        .select(`
          *, 
          tournaments!inner(tourney_name, surface, year),
          winner:players!winner_id(name_full),
          loser:players!loser_id(name_full)
        `)
        .order('tournaments(year)', { ascending: false })
        .limit(50);

      // Filtrar por superficies si se especifican
      if (surfaces.length > 0) {
        query = query.in('tournaments.surface', surfaces);
      }

      // Filtrar por ronda si se especifica
      if (round) {
        query = query.eq('round', round);
      }

      // Filtrar por best_of si se especifica
      if (bestOf) {
        query = query.eq('best_of', parseInt(bestOf));
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(data || []), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Error:', err);
      return new Response(JSON.stringify({ error: 'Error al buscar partidos' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
});
