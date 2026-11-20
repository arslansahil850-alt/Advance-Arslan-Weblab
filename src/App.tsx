import { AppProviders } from "./app/providers";
import { AppRouter } from "./app/router";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { InitialLoader } from "./components/loaders/InitialLoader";

export default function App() {
  return (
    <AppProviders>
      <ErrorBoundary>
        <InitialLoader />
        <AppRouter />
      </ErrorBoundary>
    </AppProviders>
  );
}
