import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'pie-chart',
  shadow: true
})
export class AppDashboard {
  render() {

    return (
          <svg class="chart" />
      );
  }
}
