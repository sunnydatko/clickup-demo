import * as fromData from '../actions/column.actions';
import { Column } from '../../interfaces/column.interface';

export interface DataState {
  columns: Column[];
  loading: boolean;
  error: any;
}

export const initialState: DataState = {
  columns: [],
  loading: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: fromData.ActionsUnion
): DataState {
  switch (action.type) {
    case fromData.ActionTypes.LoadColumnsBegin: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case fromData.ActionTypes.LoadColumnsSuccess: {
      return {
        ...state,
        loading: false,
        columns: action.payload.data,
      };
    }

    case fromData.ActionTypes.LoadColumnsFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    case fromData.ActionTypes.SaveColumnsBegin: {
      return {
        ...state,
        loading: true,
        columns: action.payload.data,
      };
    }

    case fromData.ActionTypes.SaveColumnsSuccess: {
      return {
        ...state,
        loading: false,
        columns: action.payload.data,
      };
    }

    case fromData.ActionTypes.SaveColumnsFailure: {
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

export const getColumns = (state: DataState) => state.columns;
