import * as fightersRepository from "../repositories/fightersRepository.js"

export async function listRank(){
    const rank = await fightersRepository.list()

    return rank
}