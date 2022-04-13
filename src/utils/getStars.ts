import axios from "axios";

export default async function getStars(users: any){
    const { data: firstUserRepos} = await axios.get(`https://api.github.com/users/${users.firstUser}/repos`)
    const firstUserStars = firstUserRepos.reduce( (acc: any, cur: any) => acc + cur?.stargazers_count, 0)
    
    const { data: secondUserRepos} = await axios.get(`https://api.github.com/users/${users.secondUser}/repos`)
    const secondUserStars = secondUserRepos.reduce( (acc: any, cur: any) => acc + cur?.stargazers_count, 0)

    return [ firstUserStars, secondUserStars ]
}