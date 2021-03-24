import { Octokit } from '@octokit/rest';

import Store from '@/store';

const unauthorizedOctokit = new Octokit({});
let authorizedOctokit: Octokit;

function octokit() {
  // @ts-ignore property style access
  const token = Store?.getters?.['user/githubToken'];

  if (!token) {
    return unauthorizedOctokit;
  }

  if (!authorizedOctokit) {
    authorizedOctokit = new Octokit({ auth: token });
  }

  return authorizedOctokit;
}

export default octokit;
