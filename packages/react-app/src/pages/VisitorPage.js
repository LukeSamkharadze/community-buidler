import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { Navigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
// components
import Iconify from "../components/iconify";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";
import { Grid, Link, Container, Typography, Divider, Stack, Button, Input } from "@mui/material";
import { useCallback, useState } from "react";
import { useAccount, WagmiConfig, useSigner, useNetwork } from "wagmi";
import { useContract } from "wagmi";
import contractConfig from "../contracts/hardhat_contracts.json";
import { ethers } from "ethers";
// ----------------------------------------------------------------------

export default function VisitorPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { connector, address } = useAccount();
  const { data: signer, isError } = useSigner();
  const { chain } = useNetwork();

  const [eventId, setEventId] = useState("");

  const CommunityBuilder = useContract({
    address: contractConfig[chain.id][0].contracts.CommunityBuilder.address,
    abi: contractConfig[chain.id][0].contracts.CommunityBuilder.abi,
    signerOrProvider: signer,
  });

  const checkIn = useCallback(async () => {
    setIsLoading(true);

    try {
      CommunityBuilder.JoinEvent(eventId);
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  }, [CommunityBuilder, eventId]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        {/* Material input for event id */}
        <Input placeholder="Event ID" onChange={o => setEventId(o.target.value)} />
        <br />
        <br />

        <Button variant="contained" disabled={isLoading} onClick={checkIn}>
          Check in
        </Button>
      </Container>
    </>
  );
}
