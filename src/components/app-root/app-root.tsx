import { Component, State, h } from "@stencil/core";

const themes = {
  main: {
    "--main-color": "#5851ff",
    "--bg-color": "#f1f8fe",
  },
  secondary: {
    "--main-color": "pink",
    "--bg-color": "yellow",
  },
};

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
  shadow: true,
})
export class AppRoot {
  @State() changedTheme: boolean = false;

  render() {
    return (
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="app-home" exact={true} />
            <stencil-route url="/profile/:name" component="app-profile" />
          </stencil-route-switch>
        </stencil-router>
        <footer>
          <button
            onClick={() => {
              this.changedTheme = !this.changedTheme;
              const themeToSet = this.changedTheme
                ? themes.secondary
                : themes.main;
              document.documentElement.style.setProperty(
                "--main-color",
                themeToSet["--main-color"]
              );
              document.documentElement.style.setProperty(
                "--bg-color",
                themeToSet["--bg-color"]
              );
            }}
          >
            Toggle theme
          </button>
        </footer>
      </main>
    );
  }
}
