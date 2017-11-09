export default function connectAction(action$, store) {
  action$.subscribe(
    (action) => {
      store.dispatch(action);
    },
    (err) => {
      store.dispatcher$.error(err);
    },
    () => {
      store.dispatcher$.complete();
    }
  );
}
