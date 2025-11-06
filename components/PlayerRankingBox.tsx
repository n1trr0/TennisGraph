import "../assets/stats.css";
import type { PlayerRanking } from "../types/playerRanking.ts";

interface PlayerRankingBoxProps {
    ranking: PlayerRanking;
}

export default function PlayerRankingBox({ ranking }: PlayerRankingBoxProps) {
    return(
        <div class="container-panel">

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`#${ranking.best_rank || 'N/A'}`}>
                    #{ranking.best_rank || 'N/A'}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Best Rank</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${ranking.weeks_top_1}`}>
                    {ranking.weeks_top_1}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Weeks #1</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${ranking.weeks_top_10}`}>
                    {ranking.weeks_top_10}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Weeks Top 10</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${ranking.weeks_top_25}`}>
                    {ranking.weeks_top_25}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Weeks Top 25</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${ranking.weeks_top_50}`}>
                    {ranking.weeks_top_50}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Weeks Top 50</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${ranking.weeks_top_100}`}>
                    {ranking.weeks_top_100}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Weeks Top 100</div>
            </div>

        </div>
    )
}
