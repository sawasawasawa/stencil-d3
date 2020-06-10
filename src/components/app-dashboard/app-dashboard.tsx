import { Component, Prop, h, State } from "@stencil/core";
import { countryData } from "./localData";
import pick from "lodash/pick";
export type DataRow = {
  Country: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
};
@Component({
  tag: "app-dashboard",
  styleUrl: "app-dashboard.css",
  shadow: false,
})
export class AppDashboard {
  @Prop() dataUrl: string = "https://api.covid19api.com/summary";
  @Prop() countriesShowedCount: number = 5;
  @State() selectedElement?: DataRow;
  @State() displayShowMore: boolean = true;
  @State() data: DataRow[] = [];

  async componentDidLoad() {
    try {
      let response = await fetch(this.dataUrl, { mode: "no-cors" });
      let json = await response.json();
      this.data = json.Countries;
    } catch (e) {
      console.log("Failed to load data from:", this.dataUrl);
      console.log("_____ Loading static data");
      this.data = countryData.Countries;
    }
  }

  getTableData() {
    return JSON.stringify(this.getDisplayedRows());
  }

  getPieChartData() {
    return JSON.stringify(
      pick(this.selectedElement, [
        "TotalConfirmed",
        "TotalDeaths",
        "TotalRecovered",
      ])
    );
  }

  getPieChartLabel(): string {
    return `${this.selectedElement.Country} / Overview`;
  }

  getDisplayedRows() {
    return this.displayShowMore
      ? this.data.slice(0, this.countriesShowedCount)
      : this.data;
  }

  toggleDisplayMore() {
    this.displayShowMore = !this.displayShowMore;
  }

  selectElement(row) {
    this.selectedElement = row;
  }

  render() {
    return (
      <div class={"dashboard"}>
        <div class={"dashboard__left"}>
          <h1>Covid summary</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <app-table
            data={this.getTableData()}
            onRowClick={(row) => this.selectElement(row)}
          ></app-table>

          {
            <button
              onClick={() => {
                this.toggleDisplayMore();
              }}
            >
              Show {this.displayShowMore ? "more" : "less"}
            </button>
          }
        </div>

        <div class={"dashboard__right"}>
          {this.selectedElement ? (
            <div class={"dashboard__right--sticky"}>
              <pie-chart
                label={this.getPieChartLabel()}
                data={this.getPieChartData()}
              ></pie-chart>
              <button
                onClick={() => {
                  this.selectedElement = null;
                }}
                class={"primary"}
              >
                Clear Selected Country
              </button>
            </div>
          ) : (
            <span class={"dashboard__right__prompt"}>
              Click on a country row to see chart
            </span>
          )}
        </div>
      </div>
    );
  }
}
