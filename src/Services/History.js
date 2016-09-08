import { createHashHistory } from 'history';
import { useRouterHistory } from 'react-router';

// useRouterHistory creates a composable higher-order function
export default useRouterHistory(createHashHistory)({ queryKey: false });
