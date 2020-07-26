import * as fromData from '../actions/users.actions';
import { User } from '../../interfaces/user.interface';

export interface DataState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: DataState = {
  users: [],
  loading: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: fromData.ActionsUnion
): DataState {
  switch (action.type) {
    case fromData.ActionTypes.LoadUsersBegin: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case fromData.ActionTypes.LoadUsersSuccess: {
      return {
        ...state,
        loading: false,
        users: action.payload.data,
      };
    }

    case fromData.ActionTypes.LoadUsersFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    default: {
      return state;
    }
  }
}

export const getUsers = (state: DataState) => state.users;
