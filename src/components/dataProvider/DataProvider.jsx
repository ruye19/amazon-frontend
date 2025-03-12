import React, { createContext, useReducer } from "react";
import { Type } from "../../utility/action.type";
import { reducer, initialState } from "../../utility/Reducer";

// Create Context
export const DataContext = createContext();

// Data Provider Component
export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={[state, dispatch]}>
            {children}
        </DataContext.Provider>
    );
};

