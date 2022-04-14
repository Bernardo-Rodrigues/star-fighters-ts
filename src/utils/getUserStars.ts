import axios from "axios";

export default async function getUserStars(user: string){
    const { data: userRepos} = await axios.get(`https://api.github.com/users/${user}/repos`)
    const userStars = userRepos.reduce( (acc: any, cur: any) => acc + cur?.stargazers_count, 0)

    return userStars
}