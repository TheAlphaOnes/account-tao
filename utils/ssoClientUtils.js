// Store tokens
const setLocalStorageToken = async (accessToken, refreshToken, username) => {
  await removeLocalStorageToken();
  localStorage.setItem("tao_access_token", accessToken);
  localStorage.setItem("tao_refresh_token", refreshToken);
  localStorage.setItem("tao_username", username);
};

// Get tokens
const getLocalStorageToken = async () => {
  return {
    accessToken: localStorage.getItem("tao_access_token"),
    refreshToken: localStorage.getItem("tao_refresh_token"),
    username: localStorage.getItem("tao_username"),
  };
};

// Check if tokens exist
const isLocalStorageToken = async () => {
  return (
    localStorage.getItem("tao_access_token") !== null &&
    localStorage.getItem("tao_refresh_token") !== null &&
    localStorage.getItem("tao_username") !== null
  );
};

const removeLocalStorageToken = async () => {
  localStorage.removeItem("tao_access_token");
  localStorage.removeItem("tao_refresh_token");
  localStorage.removeItem("tao_username");
};

const validateAuthToken = async (TAO_AUTH_TOKEN ,TAO_AUTH_URL) => {
  const serverURL = await getAuthServerUrl(TAO_AUTH_URL);
  const tao_auth_token = TAO_AUTH_TOKEN;
  const tokens = await getLocalStorageToken();

  const url = `${serverURL}/api/sso/validate?app=${location.origin}&taoAuth=${tao_auth_token}&accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
  const options = { method: "GET" };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data?.status === 504) {
      // console.log(data, "validate");
      return undefined;
    } else {
      // console.log(data.isValid, "validate", data);
      return data.isValid;
    }
  } catch (error) {
    console.error(error);
  }
};

const refreshAuthToken = async (TAO_AUTH_TOKEN,TAO_AUTH_URL) => {
  const serverURL = await getAuthServerUrl(TAO_AUTH_URL);
  const tao_auth_token = TAO_AUTH_TOKEN;
  const tokens = await getLocalStorageToken();

  const url = `${serverURL}/api/sso/refresh?app=${location.origin}&taoAuth=${tao_auth_token}&accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`;
  const options = { method: "GET" };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data
  } catch (error) {
    console.error(error);
  }
};

const isUserLoggedin = async (TAO_AUTH_TOKEN,TAO_AUTH_CALLBACK,TAO_AUTH_URL) => {
  const isUser = await isLocalStorageToken();
  // console.log(isUser, "isUser");

  if (isUser) {

    const isValid = await validateAuthToken(TAO_AUTH_TOKEN,TAO_AUTH_URL);

    if (isValid === false) {

      const tokensData =  await refreshAuthToken(TAO_AUTH_TOKEN,TAO_AUTH_URL)

      await setLocalStorageToken(tokensData.accessToken,tokensData.refreshToken,tokensData.username)

      return true

    } else if (isValid === undefined) {
      await removeLocalStorageToken()
      await redirectToTaoSSO(TAO_AUTH_TOKEN  ,TAO_AUTH_CALLBACK ,TAO_AUTH_URL)
    }

    return true

  } else {
      return false

  }
};





const logOutUser = async () => {
  await removeLocalStorageToken();
  // window.location.reload();
};

const redirectToTaoSSO = async (TAO_AUTH_TOKEN  ,TAO_AUTH_CALLBACK ,TAO_AUTH_URL ) => {
  const callbackUriPart = TAO_AUTH_CALLBACK;

  const nextUrl = await cleanNextUrl(callbackUriPart);

  const tao_auth_token = TAO_AUTH_TOKEN;

  const serverURL = await getAuthServerUrl(TAO_AUTH_URL);

  window.location.href = `${serverURL}/api/sso/generate?app=${location.origin}&taoAuth=${tao_auth_token}&next=${location.origin}/${nextUrl}`;
};

const getAuthServerUrl = async (TAO_AUTH_URL ) => {
  var url = TAO_AUTH_URL;

  const cleanURL = url.endsWith("/") ? url.slice(0, -1) : url;

  return cleanURL;
};

const cleanNextUrl = async (params) => {
  var cleanURL = params.endsWith("/") ? params.slice(0, -1) : params;
  cleanURL = cleanURL.startsWith("/") ? cleanURL.slice(1) : cleanURL;

  return cleanURL;
};

export {
  redirectToTaoSSO,
  isUserLoggedin,
  logOutUser,
  setLocalStorageToken,
  validateAuthToken,
  refreshAuthToken,
  isLocalStorageToken,
  getLocalStorageToken
};
