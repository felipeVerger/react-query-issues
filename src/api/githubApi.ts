import axios from "axios";


export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})
