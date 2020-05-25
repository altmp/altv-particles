import { createStore } from "vuex";

interface ParticleInterface {
  id: number;
  dict: string;
  asset: string;
}

interface StateInterface {
  assetCount: number;
  particles: any;
  particleList: ParticleInterface[];
  queryList: ParticleInterface[];
}

const state: StateInterface = {
  assetCount: 0,
  particles: {},
  particleList: [],
  queryList: [],
};

const mutations = {
  setAssetCount(state, value) {
    state.assetCount = value;
  },
  setParticles(state, value) {
    state.particles = value;
  },
  setParticleList(state, value) {
    state.particleList = value;
  },
  setQueryList(state, value) {
    state.queryList = value;
  },
};

const actions = {
  async load(context) {
    const response = await fetch("/public/particles.json");

    const particles = await response.json();

    let curAssetIndex = 0;
    let assetCount = 0;
    const particleList = [];
    for (const dict in particles) {
      assetCount += particles[dict].length;

      for (let i = 0; i < particles[dict].length; ++i) {
        particleList.push({
          id: curAssetIndex,
          dict,
          asset: particles[dict][i],
        });

        curAssetIndex++;
      }
    }

    context.commit("setAssetCount", assetCount);
    context.commit("setParticles", particles);
    context.commit("setParticleList", particleList);
    context.commit("setQueryList", particleList);
  },

  async search(context, value) {
    if (!value) {
      context.commit("setQueryList", context.state.particleList);
      return;
    }

    const output = [];
    for (const particle of context.state.particleList) {
      if (particle.asset.includes(value)) {
        output.push(particle);
      }
    }

    context.commit("setQueryList", output);
  },

  async dict(context, value) {
    if (!value) {
      context.commit("setQueryList", context.state.particleList);
      return;
    }

    let curAssetIndex = 0;
    const output = [];

    for (const dict in context.state.particles) {
      // console.log(dict);
      for (let i = 0; i < context.state.particles[dict].length; ++i) {
        if (dict == value) {
          output.push({
            id: curAssetIndex,
            dict,
            asset: context.state.particles[dict][i],
          });
        }

        curAssetIndex++;
      }
    }

    context.commit("setQueryList", output);
  },
};

const store = createStore({
  state,
  mutations,
  actions,
});

export default store;
