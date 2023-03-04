import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Link, Container, Typography, Divider, Stack, Button } from "@mui/material";
// hooks
// import {
//   Button,
//   Card,
//   Descriptions,
//   Divider,
//   Drawer,
//   InputNumber,
//   Modal,
//   notification,
//   Row,
//   Select,
//   Space,
//   Tooltip,
//   Typography,
// } from "antd";
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
import Iconify from "../components/iconify";
// sections
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Navigate } from "react-router-dom";
// import { challenge, authenticate } from "../api";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const API_URL = "https://api.lens.dev";

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export const challenge = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`;

export const authenticate = gql`
  mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {
    authenticate(request: { address: $address, signature: $signature }) {
      accessToken
      refreshToken
    }
  }
`;

function LoginButton() {
  /* local state variables to hold user's address and access token */
  const [token, setToken] = useState();

  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  async function login() {
    try {
      /* first request the challenge from the API server */
      const challengeInfo = await client.query({
        query: challenge,
        variables: { address },
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      /* ask the user to sign a message with the challenge info returned from the server */
      const signature = await signer.signMessage(challengeInfo.data.challenge.text);
      /* authenticate the user */
      const authData = await client.mutate({
        mutation: authenticate,
        variables: {
          address,
          signature,
        },
      });
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      const {
        data: {
          authenticate: { accessToken },
        },
      } = authData;
      console.log({ accessToken });
      setToken(accessToken);
    } catch (err) {
      console.log("Error signing in: ", err);
    }
  }

  return (
    <div>
      {/* if the user has not yet connected their wallet, show a connect button */}
      {!address && (
        <Button variant="contained" onClick={connect(connectors[0])}>
          Connect Wallet
        </Button>
      )}
      {/* if the user has connected their wallet but has not yet authenticated, show them a login Button */}
      {address && !token && (
        <Button variant="contained" onClick={login}>
          Login with LENS
        </Button>
      )}
      {/* once the user has authenticated, show them a success message */}
      {address && token && <Navigate to="/dashboard/app" />}
    </div>
  );
}

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>

            <Stack direction="row" spacing={2}>
              <LoginButton />
            </Stack>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
