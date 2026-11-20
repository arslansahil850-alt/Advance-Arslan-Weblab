import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorPage } from "../../pages/ErrorPage";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    return;
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage code={500} onReset={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}
