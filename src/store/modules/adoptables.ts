import { Octokit } from '@octokit/rest';

interface Adoptable {
  repository: string;
  description: string;
  readme: string;
}

interface State {
  adoptables: Array<Adoptable>;
}

const octakit = new Octokit({ auth: '7447e40a9ca166610010544a2fafbb6dc10ca015' });

const state = () => ({
  adoptables: [],
});

const getters = {
  adoptables: (state: State) => {
    return state.adoptables;
  },
};

const actions = {
  load(root: { commit: (mutation: string, params: any) => void }) {
    const repo = {
      repository: 'RepoAdopt/client',
      readme: '',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit condimentum est nec malesuada. Donec sollicitudin interdum turpis, vel mattis metus sodales sit amet.',
    };

    const repos = [repo];

    repos.forEach((adoptable) => {
      const [owner, repo] = adoptable.repository.split('/', 2);

      octakit.repos
        .getContent({ owner, repo, path: 'README.md' })
        .then((res) => {
					// TODO When fixed remove ignore
          // @ts-ignore: Unreachable code error
          if (!res?.data?.content) {
            return;
          }

          // @ts-ignore: Unreachable code error
          const readme = atob(res.data.content);

          adoptable.readme = readme;

          console.log(adoptable);

          root.commit('addAdoptable', { adoptables: adoptable });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  },
};

const mutations = {
  addAdoptable(state: State, params: { adoptables: Array<Adoptable> | Adoptable }) {
    const { adoptables } = params;

    if (Array.isArray(adoptables)) {
      state.adoptables.push(...adoptables);
    } else {
      state.adoptables.push(adoptables);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
