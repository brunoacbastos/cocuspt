'use strict';

const GithubProvider = require('./../providers/github.provider');

module.exports = class GithubService {

    constructor() {
        this.githubProvider = new GithubProvider();
    }

    async getUserRepositoriesWithBranches(username) {
        await this.validateUsername(username);
        let repositoriesList = await this.getUserRepositoriesList(username);
        let repositoriesListWithBranches = await this.getRepositoriesBranches(repositoriesList, username);
        return repositoriesListWithBranches;
    }


    async getRepositoriesBranches(repositoriesList, username) {
        let result = [];
        for (let index = 0; index < repositoriesList.length; index++) {
            const repository = repositoriesList[index];
            let branches = await this.githubProvider.getRepositoryBranches(username, repository.repository_name);
            let branchesList = branches.map((value) => {
                return {
                    name: value.name,
                    commit: value.commit.sha
                };
            });
            result.push({
                ...repository,
                branches: branchesList
            });
        }
        return result;
    }

    async getUserRepositoriesList(username) {
        let repositories = await this.githubProvider.getUserRepositories(username);
        await this.validateGithubUsername(repositories);
        let repositoriesList = repositories.map((value) => {
            return {
                repository_name: value.name,
                owner_login: value.owner.login
            };
        });
        return repositoriesList;
    }

    async validateGithubUsername(repositories) {
        if (repositories.response && repositories.response.status && repositories.response.status !== 200)
            throw new Error('Invalid Username');
    }

    async validateUsername(username) {
        if (username == null || username.length === 0)
            throw new Error('Invalid Username');
    }
}