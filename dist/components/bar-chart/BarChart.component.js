var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
var BarChartComponent = (function () {
    function BarChartComponent(elementRef) {
        var _this = this;
        this.ready = new EventEmitter();
        this.barChart = require('britecharts/dist/umd/bar.min');
        this.d3Selection = require('d3-selection');
        this.miniTooltip = require('britecharts/dist/umd/miniTooltip.min');
        this.colors = require('britecharts/dist/umd/colors.min');
        Observable.fromEvent(window, 'resize')
            .debounceTime(250)
            .subscribe(function () {
            _this.redrawChart();
        });
        this.el = elementRef.nativeElement;
    }
    BarChartComponent.prototype.ngOnInit = function () {
        this.drawChart();
    };
    BarChartComponent.prototype.drawChart = function () {
        var _this = this;
        this.bar = this.barChart();
        this.tooltip = this.miniTooltip();
        var barContainer = this.d3Selection.select(this.el).select('.bar-chart-container'), containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false;
        if (containerWidth) {
            this.bar.width(containerWidth);
            this.bar.shouldReverseColorList(false);
            for (var option in this.chartConfig["properties"]) {
                if (this.bar.hasOwnProperty(option) && option != 'colorSchema') {
                    this.bar[option](this.chartConfig["properties"][option]);
                }
            }
            var showTooltip = false;
            if (this.chartConfig.hasOwnProperty('showTooltip') && this.chartConfig['showTooltip'] === true) {
                showTooltip = true;
                this.bar.on('customMouseOver', this.tooltip.show);
                this.bar.on('customMouseMove', this.tooltip.update);
                this.bar.on('customMouseOut', this.tooltip.hide);
            }
            if (this.chartConfig.hasOwnProperty('colors')) {
                if (this.chartConfig['colors'].hasOwnProperty('colorSchema')) {
                    if (this.colors.colorSchemas.hasOwnProperty(this.chartConfig['colors']['colorSchema'])) {
                        this.bar.colorSchema(this.colors.colorSchemas[this.chartConfig['colors']['colorSchema']]);
                    }
                }
                else if (this.chartConfig['colors'].hasOwnProperty('customSchema')) {
                    this.bar.colorSchema(this.chartConfig['colors']['customSchema']);
                }
            }
            barContainer.datum(this.data).call(this.bar);
            if (this.chartConfig.hasOwnProperty('click')) {
                this.d3Selection.select(this.el).selectAll('.bar-chart .bar').on("click", function (ev) { return _this.chartConfig['click'](ev); });
            }
            this.tooltipContainer = this.d3Selection.select(this.el).select('.bar-chart-container .metadata-group');
            this.tooltipContainer.datum(this.data).call(this.tooltip);
            this.ready.emit(true);
        }
    };
    BarChartComponent.prototype.redrawChart = function () {
        this.d3Selection.select(this.el).selectAll('.bar-chart').remove();
        this.drawChart();
    };
    return BarChartComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarChartComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], BarChartComponent.prototype, "chartConfig", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BarChartComponent.prototype, "ready", void 0);
BarChartComponent = __decorate([
    Component({
        selector: 'ngx-bc-barchart',
        template: "<div class=\"bar-chart-container\"></div> "
    }),
    __metadata("design:paramtypes", [ElementRef])
], BarChartComponent);
export { BarChartComponent };
//# sourceMappingURL=/home/martin/proyectos/ngx-britecharts/src/components/bar-chart/BarChart.component.js.map