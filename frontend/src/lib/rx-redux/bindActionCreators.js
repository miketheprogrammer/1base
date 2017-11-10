export default function bindActionCreators(actionCreators, dispatch) {
  // console.log(actionCreators, dispatch);
  return Object.keys(actionCreators).reduce((result, key) => {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      result[key] = (...args) => {
        // console.log('dispatching actionCreator', actionCreator(...args))
        // console.log(dispatch.toString());
        dispatch(actionCreator(...args), 'lalala');
      }
    }

    return result;
  }, {});
}
