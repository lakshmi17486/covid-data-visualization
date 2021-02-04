<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col">
        <h1 class="text-center">COVID-19 DATA</h1>
      </div>
    </div>
    <div class="row mt-5" v-if="arrPositive.length > 0">
      <div class="col">
        <h2 class="text-center">Positive</h2>
        <line-chart
          :chartData="arrPositive"
          :options="chartOptions"
          label="Positive"
        />
      </div>
    </div>

    <div class="row mt-5" v-if="arrHospitalized.length > 0">
      <div class="col">
        <h2 class="text-center">Hospitalized</h2>
        <line-chart
          :chartData="arrHospitalized"
          :options="chartOptions"
          label="Hospitalized"
        />
      </div>
    </div>
    <div class="row mt-5" v-if="arrInIcu.length > 0">
      <div class="col">
        <h2 class="text-center">In ICU</h2>
        <line-chart
          :chartData="arrInIcu"
          :options="chartOptions"
          label="In ICU"
        />
      </div>
    </div>

    <div class="row mt-5" v-if="arrOnVentilators.length > 0">
      <div class="col">
        <h2 class="text-center">On Ventilators</h2>
        <line-chart
          :chartData="arrOnVentilators"
          :options="chartOptions"
          label="On Ventilators"
        />
      </div>
    </div>

    <div class="row mt-5" v-if="arrRecovered.length > 0">
      <div class="col">
        <h2 class="text-center">Recovered</h2>
        <line-chart
          :chartData="arrRecovered"
          :options="chartOptions"
          label="Recovered"
        />
      </div>
    </div>

    <div class="row mt-5 mb-5">
      <div class="col">
        <h2 class="text-center">Deaths</h2>
        <line-chart
          v-if="arrDeaths.length > 0"
          :chartData="arrDeaths"
          :options="chartOptions"
          label="Deaths"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

import LineChart from "./components/LineChart";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      arrPositive: [],
      arrHospitalized: [],
      arrInIcu: [],
      arrOnVentilators: [],
      arrRecovered: [],
      arrDeaths: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async created() {
    let url = "https://api.covidtracking.com/v1/us/daily.json";
    await axios
      .get(url)
      .then((res) => {
        const data = res.data;
        data.forEach((d) => {
          const date = moment(d.date, "YYYYMMDD").format("MM/DD");
          const {
            positive,
            hospitalizedCurrently,
            inIcuCurrently,
            onVentilatorCurrently,
            recovered,
            death,
          } = d;

          this.arrPositive.push({ date, total: positive });
          this.arrHospitalized.push({ date, total: hospitalizedCurrently });
          this.arrInIcu.push({ date, total: inIcuCurrently });
          this.arrOnVentilators.push({ date, total: onVentilatorCurrently });
          this.arrRecovered.push({ date, total: recovered });
          this.arrDeaths.push({ date, total: death });
        });
      })
      .catch((e) => {
        console.log("Somethig went wrong" + e);
      });
  },
};
</script>

