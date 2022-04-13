import * as fightersRepository from "../repositories/fightersRepository.js"

export default async function checkUsersExistence(users: any){
    const firstUserInfo = await fightersRepository.find("username", users.firstUser)
    if(!firstUserInfo) fightersRepository.insert(users.firstUser)
    const secondUserInfo = await fightersRepository.find("username", users.secondUser)
    if(!secondUserInfo) fightersRepository.insert(users.secondUser)
}