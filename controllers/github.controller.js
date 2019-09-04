'use strict';

const githubRouter = require('express').Router();
const GithubService = require('./../services/github.service');

module.exports = () => {

    githubRouter.get('/', async (req, res) => {
        try {
            const githubService = new GithubService();
            let response = await githubService.getUserRepositoriesWithBranches(req.query.username);
            res.status(200).send(response);
        } catch (error) {
            res.status(404).send({
                "status": 404,
                "message": `${error}`
            });
        }
    });

    return githubRouter;
};