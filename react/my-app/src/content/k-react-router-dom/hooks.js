import { useContext } from "react";
import RouterContext from "./Context";

function useRouterContext() {
  return useContext(RouterContext)
}

export function useRouteMatch() {
  return useRouterContext().match
}

export function useHistory() {
  return useRouterContext().history
}

export function useLocation() {
  return useRouterContext().location
}

export function useParams() {
  let match = useRouteMatch()
  return match ? match.params : {}
}