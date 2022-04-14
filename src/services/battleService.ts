import * as fightersRepository from "../repositories/fightersRepository.js"
import getUserStars from "../utils/getUserStars.js";

export async function doBattle({firstUser, secondUser}){
    const firstUserStars = await getUserStars(firstUser);
    const secondUserStars = await getUserStars(secondUser);
    
    initializeUserInDB(firstUser)
    initializeUserInDB(secondUser)
    
    if(firstUserStars > secondUserStars) return userWin(firstUser, secondUser)
    if(secondUserStars > firstUserStars) return userWin(secondUser, firstUser)

    return draw(firstUser, secondUser)
}

async function initializeUserInDB(user: string){
    const firstUserInfo = await fightersRepository.find("username", user)
    if(!firstUserInfo) fightersRepository.insert(user)
}

async function userWin(winner: string, loser:string){
    fightersRepository.update(winner, "wins")
    fightersRepository.update(loser, "losses")
    
    return {
        winner,
        loser,
        draw: false
    }
}

async function draw(firstUser: string, secondUser: string){
    fightersRepository.update(firstUser, "draws")
    fightersRepository.update(secondUser, "draws")

    return {
        winner: null,
        loser: null,
        draw: true
    }
}