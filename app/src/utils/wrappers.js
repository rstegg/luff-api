import { connect } from 'react-redux'

export const Reducer = g =>
({
  fold: g,
  contramap: f =>
    Reducer((state, action) => g(state, f(action))),
  map: f =>
    Reducer((state, action) => f(g(state, action))),
  concat: o =>
    Reducer((state, action) => o.fold(g(state, action), action))
})

export const Component = g =>
({
  fold: g,
  contramap: f =>
    Component(x => g(f(x))),
  concat: o =>
    Component(x => <div>{g(x)} {o.fold(x)}</div>)
})


export const classToFn = C =>
	(props) => <C {...props} />

export const Hoc = g =>
({
  fold: g,
  concat: o =>
    Hoc(x => g(o.fold(x)))
})

export const ConnectedComponent =
  ( component, actions, state ) =>
({
  fold: component(actions(state)),
  concat: o =>
    ConnectedComponent(
      (c,a,s) => component(actions(state)).concat(c(a(s)))
    ),
})

//component(actions(state))
