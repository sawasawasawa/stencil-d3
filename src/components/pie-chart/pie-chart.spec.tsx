import { newSpecPage } from "@stencil/core/testing";
import { PieChart } from "./pie-chart";

describe("", function () {
  it("should build", () => {
    expect(new PieChart()).toBeTruthy();
  });
  it("should render svg component", async () => {
    const page = await newSpecPage({
      components: [PieChart],
      html: `<pie-chart></pie-chart>`,
    });

    await page.waitForChanges();

    const chart = page.root.querySelector('svg[data-testid="pie-chart"]');
    expect(chart).not.toBeNull();
  });
});
