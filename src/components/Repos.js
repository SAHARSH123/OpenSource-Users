import React, { useContext } from "react";
import styled from "styled-components";
import OpenSourceContext from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = useContext(OpenSourceContext);

  const languages = repos.reduce((total, rep) => {
    let { language } = rep;
    if (language) {
      if (!total[language]) {
        total[language] = 1;
        return total;
      } else {
        total[language] = total[language] + 1;
        return total;
      }
    } else return total;
  }, {});

  const langArr = [];
  for (let key in languages) {
    langArr.push({ label: key, value: languages[key] });
  }
  const chartData = langArr.slice(0, 5);
  chartData.sort((a, b) => b.value - a.value);
  return (
    // <ExampleChart chartData={chartData} />
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D chartData={chartData} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 3fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
