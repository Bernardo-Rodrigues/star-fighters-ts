import * as fightersRepository from "../repositories/fightersRepository.js"

export async function listRank(){
    const rank = fightersRepository.list()

    return rank
}