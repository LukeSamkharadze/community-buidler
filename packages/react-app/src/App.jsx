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
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// ----------------------------------------------------------------------

const API_URL = "https://api.lens.dev";

export const apolloClient = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

const { chains, provider, webSocketProvider } = configureChains([polygon, polygonMumbai], [publicProvider()]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  provider,
  webSocketProvider,
});

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <WagmiConfig client={wagmiClient}>
              <Router />
            </WagmiConfig>
          </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
