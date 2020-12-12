import { useSelector, useDispatch } from "../k-react-redux";

export default function ReactReduxHookPage() {
  const count = useSelector(({ count }) => count);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>React-Redux Hook Page</h3>
      <h3>{count}</h3>
      <button onClick={() => dispatch({ type: "ADD" })}>ADD</button>
      <hr></hr>
    </div>
  );
}
