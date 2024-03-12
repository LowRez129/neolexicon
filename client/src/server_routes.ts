const DOMAIN = 'http://localhost:5000'//'https://neolexicon.onrender.com'

// default route
const SIGN_IN = `${DOMAIN}/sign-in`;
const LOGIN = `${DOMAIN}/login`;
const LOGOUT = `${DOMAIN}/logout`;
const SEARCH = `${DOMAIN}/search`;
const SEARCH_USER = `${DOMAIN}/search/user`;
const SEARCH_USER_POST = `${DOMAIN}/search/user/post`;
const default_route = {SIGN_IN, LOGIN, LOGOUT, SEARCH, SEARCH_USER, SEARCH_USER_POST};

// user route
const REQUIRE_AUTH =`${DOMAIN}/user/require-auth`;
const USER_POST = `${DOMAIN}/user/post`;
const USER_SEARCH = `${DOMAIN}/user/search`;
const USER_PUT = `${DOMAIN}/user/put`;
const USER_DELETE = `${DOMAIN}/user/delete`;
const user_route = {REQUIRE_AUTH, USER_POST, USER_SEARCH, USER_PUT, USER_DELETE};

export {default_route, user_route};