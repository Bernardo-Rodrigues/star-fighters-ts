import * as fightersRepository from "../repositories/fightersRepository.js"
import checkUsersExistence from "../utils/checkUsersExistence.js";
import getStars from "../utils/getStars.js";

export async function doBattle(users: any){
    const [ firstUserStars, secondUserStars ] = await getStars(users);
    checkUsersExistence(users);
    
    if(firstUserStars > secondUserStars) {
        fightersRepository.update(users.firstUser, "wins")
        fightersRepository.update(users.secondUser, "losses")
        
        return {
            winner: users.firstUser,
            loser: users.secondUser,
            draw: false
        }
    }
    if(secondUserStars > firstUserStars) {
        fightersRepository.update(users.firstUser, "losses")
        fightersRepository.update(users.secondUser, "wins")

        return {
            winner: users.secondUser,
            loser: users.firstUser,
            draw: false
        }
    }

    fightersRepository.update(users.firstUser, "draws")
    fightersRepository.update(users.secondUser, "draws")

    return {
        winner: null,
        loser: null,
        draw: true
    }
}