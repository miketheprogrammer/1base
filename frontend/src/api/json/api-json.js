import Rx from 'rxjs';

const API_URL = 'http://localhost:3000/api';
const HEADERS = {
  Accept: 'application/json'
};

const buildRxRequest = (httpMethod, apiMethod, params) => {
  httpMethod = httpMethod.toUpperCase();
  const request = {
    method: httpMethod,
    url: API_URL + apiMethod,
    body: params,
    headers: HEADERS,
  }
  /*
  * @param {string|Object} request Can be one of the following:
*   A string of the URL to make the Ajax call.
*   An object with the following properties
*   - url: URL of the request
*   - body: The body of the request
*   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
*   - async: Whether the request is async
*   - headers: Optional headers
*   - crossDomain: true if a cross domain request, else false
*   - createXHR: a function to override if you need to use an alternate
*   XMLHttpRequest implementation.
*   - resultSelector: a function to use to alter the output value type of
*   the Observable. Gets {@link AjaxResponse} as an argument.
  */
  return Rx.Observable
          .ajax(request).map(({response}) => response)
          .catch((err) => Rx.Observable.of(err.response))
}

export default {
  get: apiMethod => buildRxRequest('get', apiMethod),
  post: (apiMethod, params) => buildRxRequest('post', apiMethod, params)
};
