'use strict';

const axios = require('axios');
const githubApiUrl = 'https://api.github.com';

module.exports = class GithubProvider {

    async getUserRepositories(username) {
        try {
            const response = await axios.get(`${githubApiUrl}/users/${username}/repos`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    async getRepositoryBranches(username, repository) {
        try {
            const response = await axios.get(`${githubApiUrl}/repos/${username}/${repository}/branches`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

}