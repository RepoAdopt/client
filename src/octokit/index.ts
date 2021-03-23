import { Octokit } from '@octokit/rest';

import Store from '@/store';

// @ts-ignore property style access
const octokit = new Octokit({ auth: process.env.VUE_APP_TOKEN });

export default octokit;
