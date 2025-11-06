import "../assets/stats.css";
import type { Player } from "../types/player.ts";

interface PlayerInfoBoxProps {
    player: Player;
}

export default function PlayerInfoBox({ player }: PlayerInfoBoxProps) {
    // Calcular edad desde la fecha de nacimiento
    const calculateAge = (dob: Date) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // Convertir código de mano a versión extendida
    const getHandName = (hand: string) => {
        const handMap: Record<string, string> = {
            'R': 'Right',
            'L': 'Left',
            'U': 'Unknown'
        };
        return handMap[hand] || hand;
    };

    const age = calculateAge(player.dob);
    const birthDate = new Date(player.dob).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    const handName = getHandName(player.hand);

    return(
        <div class="container-panel">

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={player.name_full}>
                    {player.name_full}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Name</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={player.ioc3}>
                    {player.ioc3}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Country</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${age} years`}>
                    {age} years
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">{birthDate}</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={`${player.height} cm`}>
                    {player.height} cm
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Height</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title={handName}>
                    {handName}
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Hand</div>
            </div>

            <div class="flex flex-col items-center">
                <div class="whitespace-nowrap truncate text-center w-full font-semibold" title="TBD">
                    TBD
                </div>
                <div class="font-light text-sm whitespace-nowrap opacity-80">Ranking</div>
            </div>

        </div>
    )
}
