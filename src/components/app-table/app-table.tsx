import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "app-table",
  styleUrl: "app-table.css",
  shadow: true,
})
export class AppTable {
  @Prop() labels: string;
  @Prop() data: string = "[]";
  @Prop() onRowClick: (DataRow) => void;

  @Prop({ mutable: true }) selectedElement?: {
    Country: string;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
  };
  @Prop({ mutable: true }) countriesShowedCount: number = 5;

  render() {
    return (
      <table class={"app-table"}>
        <thead>
          <th>Country</th>
          <th>Total confirmed</th>
          <th>Total deaths</th>
          <th>Total recovered</th>
        </thead>
        <tbody>
          {JSON.parse(this.data).map((row) => (
            <tr onClick={() => this.onRowClick(row)}>
              <td>{row.Country}</td>
              <td>{row.TotalConfirmed}</td>
              <td>{row.TotalDeaths}</td>
              <td>{row.TotalRecovered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
