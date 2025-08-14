"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface TodoItem {
  id: string;
  type: 'birthday' | 'transaction';
  title: string;
  description: string;
  isReminded: boolean;
  isWished: boolean;
}

interface DashboardState {
  todos: TodoItem[];
  selectedScheme: string | null;
  marketData: {
    nse: { value: number; change: number };
    bse: { value: number; change: number };
  };
}

type DashboardAction = 
  | { type: 'WISH_TODO'; id: string }
  | { type: 'REMIND_TODO'; id: string }
  | { type: 'SET_SELECTED_SCHEME'; scheme: string | null }
  | { type: 'UPDATE_MARKET_DATA'; data: any };

const initialState: DashboardState = {
  todos: [
    {
      id: '1',
      type: 'birthday',
      title: 'Birthday Alerts',
      description: 'Ramesh Shankar\'s birthday is tomorrow 23/11/2016. Don\'t Forget to Wish.',
      isReminded: false,
      isWished: false,
    },
    {
      id: '2',
      type: 'birthday',
      title: 'Birthday Alerts',
      description: 'Dinesh Kumar\'s birthday is tomorrow 23/11/2016. Don\'t Forget to Wish.',
      isReminded: false,
      isWished: false,
    },
    {
      id: '3',
      type: 'transaction',
      title: 'Pending Transaction',
      description: 'Trilka Sant\'s has a pending Switch Transaction',
      isReminded: false,
      isWished: false,
    },
    {
      id: '4',
      type: 'transaction',
      title: 'Pending Transaction',
      description: 'S.K. Paul has pending Redemption Transaction',
      isReminded: false,
      isWished: false,
    },
  ],
  selectedScheme: null,
  marketData: {
    nse: { value: 8625.70, change: -12.90 },
    bse: { value: 27930.21, change: 14.31 },
  },
};

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'WISH_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, isWished: true } : todo
        ),
      };
    case 'REMIND_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, isReminded: true } : todo
        ),
      };
    case 'SET_SELECTED_SCHEME':
      return {
        ...state,
        selectedScheme: action.scheme,
      };
    case 'UPDATE_MARKET_DATA':
      return {
        ...state,
        marketData: action.data,
      };
    default:
      return state;
  }
}

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
} | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}