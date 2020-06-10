import { AppDashboard } from "./app-dashboard";
import { newSpecPage } from "@stencil/core/testing";

const fetchMock = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ Countries: mockData }),
  })
);

global.fetch = fetchMock;

describe("app-dashboard", () => {
  it("fetches data on load", async () => {
    await newSpecPage({
      components: [AppDashboard],
      html: `<app-dashboard></app-dashboard>`,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("getTableData returns stringified table data", async () => {
    const page = await newSpecPage({
      components: [AppDashboard],
      html: `<app-dashboard></app-dashboard>`,
    });
    expect(page.rootInstance.getTableData()).toEqual(JSON.stringify(mockData));
  });

  it("getPieChartData returns stringified chart data", async () => {
    const page = await newSpecPage({
      components: [AppDashboard],
      html: `<app-dashboard></app-dashboard>`,
    });

    page.rootInstance.selectElement(mockData[0]);

    expect(page.rootInstance.getPieChartData()).toEqual(
      JSON.stringify({
        TotalConfirmed: 890,
        TotalDeaths: 53,
        TotalRecovered: 765,
      })
    );
  });

  it("getPieChartLabel returns chart label", async () => {
    const page = await newSpecPage({
      components: [AppDashboard],
      html: `<app-dashboard></app-dashboard>`,
    });

    page.rootInstance.selectElement(mockData[0]);

    expect(page.rootInstance.getPieChartLabel()).toEqual(
      "Burkina Faso / Overview"
    );
  });
});

const mockData = [
  {
    Country: "Burkina Faso",
    CountryCode: "BF",
    Slug: "burkina-faso",
    NewConfirmed: 1,
    TotalConfirmed: 890,
    NewDeaths: 0,
    TotalDeaths: 53,
    NewRecovered: 0,
    TotalRecovered: 765,
    Date: "2020-06-09T10:17:36Z",
  },
  {
    Country: "Burundi",
    CountryCode: "BI",
    Slug: "burundi",
    NewConfirmed: 0,
    TotalConfirmed: 83,
    NewDeaths: 0,
    TotalDeaths: 1,
    NewRecovered: 0,
    TotalRecovered: 45,
    Date: "2020-06-09T10:17:36Z",
  },
];
