import { AppTable } from "./app-table";
import { newSpecPage } from "@stencil/core/testing";

describe("app-table", () => {
  it("renders with no data", async () => {
    const page = await newSpecPage({
      components: [AppTable],
      html: `<app-table></app-table>`,
    });

    expect(page).not.toBeNull();
  });
});
