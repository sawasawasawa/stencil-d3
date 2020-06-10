import { Element, Component, Prop, h, Watch } from "@stencil/core";
import * as d3 from "d3";
import { mergeWithFirstEqualZero } from "./helpers";

@Component({
  tag: "pie-chart",
})
export class PieChart {
  @Prop() data: string = "[]";
  @Prop() label: string = "[]";
  @Prop() width?: number = 400;
  @Prop() height?: number = 450;
  @Prop() radius?: number = 170;
  @Element() element: HTMLElement;

  @Watch("data")
  dataDidChangeHandler() {
    this.updateChart();
  }

  getSvg() {
    return this.element.querySelector(".chart");
  }

  async componentDidLoad() {
    const { width, height } = this;
    const svgElement = this.getSvg();
    var svg = d3
      .select(svgElement)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.append("g").attr("class", "slices");

    this.updateChart();
  }

  updateChart() {
    const data = d3.entries(JSON.parse(this.data));
    const svg = d3.select(this.getSvg());

    var pie = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      });

    var arc = d3
      .arc()
      .outerRadius(this.radius * 1.0)
      .innerRadius(this.radius * 0.0);

    var key = function (d) {
      return d.data.key;
    };

    var color = d3.scaleOrdinal(d3.schemePastel1).domain(data);

    var arcGenerator = d3.arc().innerRadius(0).outerRadius(this.radius);

    const update = (data) => {
      var duration = 500;

      var oldData = d3
        .select(this.getSvg())
        .selectAll("path")
        .data()
        .map(function (d) {
          return d.data;
        });

      if (oldData.length == 0) oldData = data;

      var was = mergeWithFirstEqualZero(data, oldData);
      var is = mergeWithFirstEqualZero(oldData, data);

      // Update arcs
      var slice = svg.select(".slices").selectAll("path").data(pie(was), key);

      slice
        .enter()
        .insert("path")
        .attr("class", "slice")
        .style("fill", function (d) {
          return color(d.data.key);
        });

      slice = svg.select(".slices").selectAll("path").data(pie(is), key);

      slice
        .transition()
        .duration(duration)
        .attrTween("d", function (d) {
          var interpolate = d3.interpolate(this._current, d);
          var _this = this;
          return function (t) {
            _this._current = interpolate(t);
            return arc(_this._current);
          };
        });

      slice = svg.select(".slices").selectAll("path").data(pie(data), key);

      slice.exit().transition().delay(duration).duration(0).remove();

      svg.select(".slices").selectAll("text").data([], key).exit().remove();

      // Update arcs
      var label = svg.select(".slices").selectAll("text").data(pie(data), key);
      label
        .enter()
        .append("text")
        .attr("class", "label")

        .attr("transform", function (d) {
          console.log("_____ ", d, arcGenerator.centroid(d));
          return "translate(" + arcGenerator.centroid(d) + ")";
        })
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("text-anchor", "middle")
        .style("font-size", 17)
        .style("opacity", 1)
        .text(function (d) {
          return d.data.key.replace("Total", "");
        });

      svg.selectAll(".chart-label").remove();

      svg
        .append("text")
        .attr("class", "chart-label")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("fill", "var(--main-color)")
        .attr("y", 20)
        .attr("transform", `translate(${this.width / 2}, 0)`)
        .attr("dy", ".35em")
        .text(this.label);
    };
    update(data);
  }

  render() {
    return <svg class="chart" data-testid={"pie-chart"} />;
  }
}
