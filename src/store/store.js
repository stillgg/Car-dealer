import thunk from "redux-thunk"
import {applyMiddleware, compose, createStore} from "redux"
import {rootReducer} from "./reducers/rootReducer"

const saveState = (state) => {
    try {
        // Convert the state to a JSON string
        const serialisedState = JSON.stringify(state)

        // Save the serialised state to localStorage against the key 'app_state'
        window.localStorage.setItem('car-dealer_state', serialisedState)
    } catch (err) {
        // Log errors here, or ignore
    }
}

/**
 * Add a change listener to the store, and invoke our saveState function defined above.
 */

const loadState = () => {
    try {
        // Load the data saved in localStorage, against the key 'app_state'
        const serialisedState = window.localStorage.getItem('car-dealer_state')

        // Passing undefined to createStore will result in our app getting the default state
        // If no data is saved, return undefined
        if (!serialisedState) return undefined

        // De-serialise the saved state, and return it.
        return JSON.parse(serialisedState)
    } catch (err) {
        // Return undefined if localStorage is not available,
        // or data could not be de-serialised,
        // or there was some other error
        return undefined
    }
}

/**
 * This is where you create the app store
 */
const oldState = loadState()

export const store = createStore(
    rootReducer,
    oldState,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

store.subscribe(() => {
    saveState(store.getState())
})
