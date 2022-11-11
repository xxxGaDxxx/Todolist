import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {useMemo} from 'react';
import {useAppDispatch} from './UseAppDispatch';


export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch()

  return useMemo(() => {
    return bindActionCreators(actions, dispatch)
  }, [])
}
