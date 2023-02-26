import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  "The Graph Webinar ",
  "South Beach Workshop",
  "Intro to Trading Webinar",
  "ETHMiami Hackathon",
  "BNB Guest Speaking",
  "Intro to Crypto Workshop",
  "The Graph Guest Speaking",
  "Zoom Freak 2",
  "Hardhat 101 Webinar",
  "Introduction to Solidity Webinar",
  "The Graph Workshop",
];
const PRODUCT_COLOR = ["#00AB55", "#000000", "#FFFFFF", "#FFC0CB", "#FF4842", "#1890FF", "#94D82D", "#FFC107"];

// ----------------------------------------------------------------------

const products = [...Array(PRODUCT_NAME.length)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `https://avatars.githubusercontent.com/u/6250754?s=200&v=4`,
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    // priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    // colors:
    //   (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
    //   (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
    //   (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
    //   (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
    //   (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
    //   (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
    //   PRODUCT_COLOR,
    // status: sample(["sale", "new", "", ""]),
  };
});

export default products;
