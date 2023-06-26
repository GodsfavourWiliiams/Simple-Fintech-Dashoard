/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Tooltip,
  Legend,
} from "@syncfusion/ej2-react-charts";
import { AxisModel, ValueType } from "@syncfusion/ej2-react-charts";

const colorMappingData = [
  [
    { x: "Jan", y: 1 },
    { x: "Feb", y: 2.5 },
    { x: "Mar", y: 3 },
    { x: "Apr", y: 4.5 },
    { x: "May", y: 5.1 },
    { x: "June", y: 6.5 },
    { x: "July", y: 7.4 },
    { x: "Aug", y: 6.9 },
    { x: "Sep", y: 5.8 },
    { x: "Oct", y: 3.1 },
    { x: "Nov", y: 2.5 },
    { x: "Dec", y: 1.9 },
  ],
];

const ColorMappingPrimaryXAxis: AxisModel = {
  valueType: "Category" as ValueType,
  majorGridLines: { width: 0 },
};

const ColorMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: "{value}k",
  maximum: 8,
  minimum: 0,
  majorUnit: 2,
  minorTicksPerInterval: 0,
};

const ColorMapping = () => {
  return (
    <div className="p-5 bg-white rounded-lg">
      <div className="flex items-center justify-between py-5">
        <h1 className="font-medium">Statistics</h1>
        <select name="" className="bg-[#F5F5F5] p-3 rounded-md">
          <option value="">2021</option>
          <option value="">2020</option>
          <option value="">2019</option>
          <option value="">2018</option>
        </select>
      </div>
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={ColorMappingPrimaryXAxis}
          primaryYAxis={ColorMappingPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          legendSettings={{ mode: "Range", background: "white" }}
          tooltip={{ enable: true }}
          background={"#fff"}
          highlightColor="#000 000">
          <Inject services={[ColumnSeries, Tooltip, Category, Legend]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={colorMappingData[0]}
              name=""
              xName="x"
              yName="y"
              type="Column"
              bearFillColor="none"
              cornerRadius={{
                topLeft: 10,
                topRight: 10,
              }}
              fill="#F5F7F9" // Specify the color here
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default ColorMapping;
