import axios from "axios";
import * as fightersRepository from "../repositories/fightersRepository.js"

export async function doBattle(users: any){
    const { data: firstUserRepos} = await axios.get(`https://api.github.com/users/${users.firstUser}/repos`)
    const firstUserStars = firstUserRepos.reduce( (acc: any, cur: any) => acc + cur?.stargazers_count, 0)
    const { data: secondUserRepos} = await axios.get(`https://api.github.com/users/${users.secondUser}/repos`)
    const secondUserStars = secondUserRepos.reduce( (acc: any, cur: any) => acc + cur?.stargazers_count, 0)

    const firstUserInfo = await fightersRepository.find("username", users.firstUser)
    if(!firstUserInfo) fightersRepository.insert(users.firstUser)
    const secondUserInfo = await fightersRepository.find("username", users.secondUser)
    if(!secondUserInfo) fightersRepository.insert(users.secondUser)
    
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
        winner: "",
        loser: "",
        draw: true
    }
}