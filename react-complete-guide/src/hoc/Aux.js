
// in order to return multiple root elements in one component, we can use a higher order wrapper or convert the returned value as a list of JSX
// The builtin component React.Fragment works just like this under the hood
const Aux = props => (props.children)

export default Aux;