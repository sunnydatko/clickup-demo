import * as fromData from '../actions/sort.actions';
import { SortData } from '../../interfaces/sort.interface';
import { SortService } from '../../services/sort/sort.service';

export interface DataState {
  sortData: SortData[];
  loading: boolean;
  error: any;
}

export const initialState: DataState = {
  sortData: [],
  loading: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: fromData.ActionsUnion
): DataState {
  switch (action.type) {
    case fromData.ActionTypes.LoadSortBegin: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }

    case fromData.ActionTypes.LoadSortSuccess: {
      return {
        ...state,
        loading: false,
        sortData: action.payload.data,
      };
    }

    case fromData.ActionTypes.LoadSortFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    case fromData.ActionTypes.SaveSortBegin: {
      return {
        ...state,
        loading: true,
        error: action.payload.data,
      };
    }

    case fromData.ActionTypes.SaveSortSuccess: {
      return {
        ...state,
        loading: false,
        sortData: action.payload.data,
      };
    }

    case fromData.ActionTypes.SaveSortFailure: {
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

export const getSortData = (state: DataState) => state.sortData;
