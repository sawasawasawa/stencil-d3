import { Component, h } from "@stencil/core";

@Component({
  tag: "app-home",
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <app-dashboard />
      </div>
    );
  }
}
