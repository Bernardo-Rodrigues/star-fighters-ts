import * as fightersRepository from "../repositories/fightersRepository.js"
import axios from "axios";

export interface Users {
    firstUser: string;
    secondUser: string;
}

async function doBattle({firstUser, secondUser}: Users){
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

function userWin(winner: string, loser:string){
    fightersRepository.update(winner, "wins")
    fightersRepository.update(loser, "losses")
    
    return {
        winner,
        loser,
        draw: false
    }
}

function draw(firstUser: string, secondUser: string){
    fightersRepository.update(firstUser, "draws")
    fightersRepository.update(secondUser, "draws")

    return {
        winner: null,
        loser: null,
        draw: true
    }
}

async function getUserStars(user: string){
    const { data: userRepos} = await axios.get(`https://api.github.com/users/${user}/repos`)
    const userStars: number = userRepos.reduce( (acc: any, cur: any) => acc + cur?.stargazers_count, 0)

    return userStars
}

export default {
    doBattle
}