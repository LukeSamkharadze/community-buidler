import PropTypes from "prop-types";
// @mui
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../../components/label";
import { ColorPreview } from "../../../components/color-utils";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const StyledLogoImg = styled("img")({
  width: 24,
  height: 24,
  objectFit: "cover",
  borderRadius: "50%",
  display: "inline-block",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {/* {status && (
          <Label
            variant="filled"
            color={(status === "sale" && "error") || "info"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )} */}
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          {/* <ColorPreview colors={['#00AB55']} /> */}
          <StyledLogoImg src="https://w7.pngwing.com/pngs/538/660/png-transparent-cryptocurrency-wallet-computer-icons-coin-coin-trademark-orange-logo-thumbnail.png"></StyledLogoImg>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "text.disabled",
                textDecoration: "line-through",
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {/* <Stack direction='row' alignItems='center' >

            </Stack> */}
            {price}
            {/* {fCurrency(price)} */}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
