import {Component, Prop, h} from '@stencil/core';
import { MatchResults } from '@stencil/router';
import json from "./localData";

@Component({
  tag: 'app-dashboard',
  // styleUrl: 'app-dashboard.css',
  shadow: true
})
export class AppDashboard {
  @Prop() match: MatchResults;
  @Prop({ mutable: true }) selected?: string = 'null';
  @Prop({ mutable: true }) countriesShowedCount: number = 5;

  render() {
    const countries = json.Countries;
    const displayShowMore = this.countriesShowedCount < countries.length
    const rows = displayShowMore ? countries.slice(0, this.countriesShowedCount) : countries

    return (
        <div class="app-profile">
          <h1>Covid summary</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <table>
            <thead>
            <th>Country</th>
            <th>Total confirmed</th>
            <th>Total deaths</th>

            <th>Total recovered</th>
            </thead>
            <tbody>
            {rows.map((c) => (
              <tr onClick={()=>this.selected=c.Country}>
                <td>{c.Country}</td>
                <td>{c.TotalConfirmed}</td>
                <td>{c.TotalDeaths}</td>
                <td>{c.TotalRecovered}</td>
              </tr>
            ))}
            </tbody>
          </table>
          {<button onClick={()=> this.countriesShowedCount = displayShowMore ? countries.length : 5}>Show {displayShowMore ? 'more' : 'less'}</button>}

          <svg class="chart" />

          <footer></footer>
        </div>
      );
  }
}
