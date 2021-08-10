<template>
  <v-container>
    <v-row>
      <v-col :xs="12" :sm="12" :md="6" :lg="6">
        <v-card>
          <v-card-title>
            <v-icon>
              mdi-view-dashboard
            </v-icon>
            报表1
          </v-card-title>
          <v-divider/>
          <v-card-text class="pa-2">
            <v-chart
              class="mx-auto full"
              :options="polar"
              ref="mychart1"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :xs="12" :sm="12" :md="6" :lg="6">
        <v-card>
          <v-card-title>
            <v-icon>
              mdi-chart-areaspline
            </v-icon>
            报表2
          </v-card-title>
          <v-divider/>
          <v-card-text class="pa-2">
            <v-chart
              class="mx-auto full"
              :options="line"
              ref="mychart2"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :xs="12" :sm="12" :md="6" :lg="6">
        <v-card>
          <v-card-title>
            <v-icon>
              mdi-chart-areaspline
            </v-icon>
            报表3
          </v-card-title>
          <v-divider/>
          <v-card-text class="pa-2">
            <vue-word-cloud
              style="
                height: 480px;
                width: 100%;
              "
              :words="wordsdata"
              :color="([, weight]) => weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo'"
              font-family="Roboto"
              :enter-animation="enterAnimation"
              :leave-animation="leaveAnimation"
              ref="wc"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .full {
    width: 100%;
  }
</style>

<script>
  export default {
    data () {
      let points = []

      for (let i = 0; i <= 360; i++) {
          let t = i / 180 * Math.PI
          let r = Math.sin(2 * t) * Math.cos(2 * t)
          points.push([r, i])
      }

      return {
        polar: {
          legend: {
            data: ['line']
          },
          polar: {
            center: ['50%', '54%']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          angleAxis: {
            type: 'value',
            startAngle: 0
          },
          radiusAxis: {
            min: 0
          },
          series: [
            {
              coordinateSystem: 'polar',
              name: 'line',
              type: 'line',
              showSymbol: false,
              data: points
            }
          ],
          animationDuration: 2000
        },
        line: {
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              smooth: true
            }
          ]
        },
        wordsdata: [
          ['romance', 19], 
          ['horror', 3], 
          ['fantasy', 7], 
          ['adventure', 3]
        ],
        interval: undefined,
      }
    },
    computed: {
      words: function () {
        return this.wordsdata
      },
      enterAnimation: function() {
        return {
          opacity: 0,
          transform: 'scale3d(0.3,0.3,0.3)'
        }
      },
      leaveAnimation: function() {
        return {
          opacity: 0,
          transform: 'scale3d(0.3,0.3,0.3)'
        }
      },
    },
    mounted: function () {
      let _this = this
      window.addEventListener('resize', () => {
        _this.$refs.mychart1.resize()
        _this.$refs.mychart2.resize()
      })

      let l = this.words.length
      this.interval = setInterval(function () {
        let r = Math.floor(Math.random() * l)
        let t = _this.wordsdata[r]
        _this.wordsdata.splice(r, 1, [t[0], t[1] + 5])
        console.log(_this.wordsdata)
      }, 3000)
    },
    destroyed: function () {
      clearInterval(this.interval)
    }
  }
</script>  
