import { PlayerTrophies } from "../types/playerTrophies.ts";

interface PlayerTrophiesBoxProps {
    trophies: PlayerTrophies;
}

export default function PlayerTrophiesBox({ trophies }: PlayerTrophiesBoxProps) {
    return(
        <div class="container-panel">

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`#${trophies.grand_slams || '0'}`}>
                    {trophies.grand_slams || '0'}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Grand Slams</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${trophies.masters_1000 || '0'}`}>
                    {trophies.masters_1000 || '0'}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Masters 1000</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${trophies.atp_500 || '0'}`}>
                    {trophies.atp_500 || '0'}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">ATP 500</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${trophies.atp_250 || '0'}`}>
                    {trophies.atp_250 || '0'}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">ATP 250</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${trophies.olympic_golds || '0'}`}>
                    {trophies.olympic_golds || '0'}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Olympic Golds</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${ trophies.olympic_golds + trophies.olympic_silvers + trophies.olympic_bronzes || '0'}`}>
                    {trophies.olympic_golds + trophies.olympic_silvers + trophies.olympic_bronzes || '0'}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Olympic Medals</div>
            </div>
        </div>
    )
}
