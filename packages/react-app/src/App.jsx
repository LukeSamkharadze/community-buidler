import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// ----------------------------------------------------------------------

const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
