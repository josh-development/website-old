import { Router, useRoutes } from 'solid-app-router';
import { routes } from './constants/routes';

export default function App() {
  const Routes = useRoutes(routes);

  return (
    <Router
      children={
        <div class="font-medium bg-white">
          <Routes />
        </div>
      }
    />
  );
}
