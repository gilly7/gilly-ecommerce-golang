import React from "react";
import { VictoryPie } from "victory";

export const Charts = ({ data }) => {
  //   const data = [
  //     { quarter: 1, earnings: 13000 },
  //     { quarter: 2, earnings: 16500 },
  //     { quarter: 3, earnings: 14250 },
  //     { quarter: 4, earnings: 19000 },
  //   ];

  const hoodies = (product) => {
    return product.product == "Hoodies";
  };
  const tShirts = (product) => {
    return product.product == "T-Shirt";
  };
  const shorts = (product) => {
    return product.product == "shorts";
  };

  var hoodQuantity = data.filter(hoodies);
  var shirtQuantity = data.filter(tShirts);
  var shortsQuantity = data.filter(shorts);

  const graphData = [
    {
      quarter: "Hoodies",
      quantity: hoodQuantity.length,
    },
    {
      quarter: "T-Shirts",
      quantity: shirtQuantity.length,
    },
    {
      quarter: "Biker-Shorts",
      quantity: shortsQuantity.length,
    },
  ];

  return (
    <div className = "flex flex-row w-full">
      <div className = "w-1/4">
        <h1>This is data Statistically given</h1>
      </div>
      <div className = "flex flex-grow flex-row justify-between">
        <div>
          <VictoryPie
            data={graphData}
            cornerRadius={10}
            innerRadius={90}
            // data accessor for x values
            x="quarter"
            // data accessor for y values
            y="quantity"
          />
        </div>
        <div>
          <VictoryPie
            data={graphData}
            cornerRadius={20}
            innerRadius={70}
            // data accessor for x values
            x="quarter"
            // data accessor for y values
            y="quantity"
          />
        </div>
      </div>
    </div>
  );
};
