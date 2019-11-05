
// in order to return multiple root elements in one component, we can use a higher order wrapper or convert the returned value as a list of JSX

const Aux = props => (props.children)

export default Aux;