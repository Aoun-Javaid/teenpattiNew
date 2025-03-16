

// const BASE_URL = 'http://101.0.20.58:5011';

// const BASE_URL = 'https://universestudio.online';
const BASE_URL = 'https://v2.universestudio.online'



// const BASE_URL = '';
export const BASE_URL_WS = "https://universestudio.online";

export const CONFIG = {
  SiteName:'Universe',
  siteKey:'',
  socketurl: BASE_URL + '',

  // casino Socekt Urls
  // CasinoSocketUrl: '',
  CasinoSocketUrl: 'wss://casino.betever365.com/',
  casninoTableURL: 'universe_casino_77',
  virtualTableURL: 'universe_casino_88',

  bannersList : BASE_URL + "/v2/operator/banners/bannersList",
  bannersListTime: 120,
  NavigationList: BASE_URL + "/v2/operator/navigation/NavigationList",
  NavigationListTime:120,
  tablesList: BASE_URL + "/v2/operator/navigation/tablesList",
  tablesListTime:120,
  userBalance: BASE_URL + "/v2/operator/user/userBalance",
  userGetStackURL: BASE_URL + "/v2/operator/user/userStake",
  updateUserBetStake: BASE_URL + "/v2/operator/user/updateUserStake",
  myBets: BASE_URL + "/v2/casino/myBets",
  allBets: BASE_URL + "/v2/casino/allBets",
  highRollers: BASE_URL + "/v2/casino/highRollers",
  providersNavigations: BASE_URL + "/v2/operator/navigation/providersNavigations",
  providersNavigationsTime:120,

  // casino urls
  getCasinoResultURL: BASE_URL + '/v2/operator/user/latestResults',
  videoStreamURL: BASE_URL + '/v2/operator/user/eventStreaming',
  getRulesOfMarketURL: BASE_URL + '/v2/operator/user/eventRules',

  asianCasinoPlacebetURL: BASE_URL + "/v2/operator/user/casinoPlaceBet",
  virtualCasinoPlacebetURL: BASE_URL + "/casinoapp/exchange/users/casino/placebet",
  getUserBalanceURL: BASE_URL + "/v2/operator/user/userBalance",
  getAllMarketplURL: BASE_URL + '/v2/operator/user/userBetProfitLoss',

  authlaunch: BASE_URL + "/v2/operator/auth",
};



export const STACK_VALUE = [
  {
    stakeName: '1000',
    stakeAmount: '1000'
  },
  {
    stakeName: '5000',
    stakeAmount: '5000'
  },
  {
    stakeName: '10000',
    stakeAmount: '10000'
  },
  {
    stakeName: '25000',
    stakeAmount: '25000'
  },
  {
    stakeName: '50000',
    stakeAmount: '50000'
  },
  {
    stakeName: '100000',
    stakeAmount: '100000'
  },
  {
    stakeName: '200000',
    stakeAmount: '200000'
  },
  {
    stakeName: '500000',
    stakeAmount: '500000'
  },
];
