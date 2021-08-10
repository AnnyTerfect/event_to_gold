<template>
  <div>
    <v-card color="grey">
      <v-responsive
        min-height="300"
        max-height="600"
        :aspect-ratio="2/1"
        ref="slide"
      >
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          height="100%"
        >
          <v-carousel-item
            v-for="(carItem, i) in carItems"
            :key="i"
          >
            <v-img
              :src="carItem.src"
              class="bg"
              @load="carItem.loading = false;"
              :style="{ opacity: 1 - carItem.loading, transition: 'opacity 500ms', filter: 'brightness(' + String(brightness) +  ')'}"
            >
            </v-img>

            <v-fade-transition>
              <v-overlay
                absolute
                :value="carItem.loading"
              >
                <v-progress-circular
                  indeterminate
                  size="64"
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-overlay>
            </v-fade-transition>
          </v-carousel-item>
        </v-carousel>
      </v-responsive>
    </v-card>

    <v-fade-transition>
      <v-responsive>
        <v-container v-if="showGraph">
          <span class="text-h5">从金融文档到知识图谱</span>
          <v-chart
            :options="relation"
            style="width: 100%; min-height: 500px;"
            ref="chart"
          >
          </v-chart>
        </v-container>
      </v-responsive>
    </v-fade-transition>
    
    <v-container>
      <v-row justify="center" align="center">
        <v-col class="text-center mb-1">
          <span class="text-lg-h4 text-h5">最新热点</span>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :lg="3"
          :md="6"
          :sm="6"
          :xs="12"
        >
          <v-card color="gray">
            <v-img
              dark
              transition="true"
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              {{ card.subtitle }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div> {{ card.content }} </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="orange"
                text
                :to="'/hot'"
              >
                查看详情
              </v-btn>

              <v-btn
                color="orange"
                text
                :to="'/hot'"
              >
                更多热点
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-footer
      color="primary lighten-1"
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="primary lighten-2 py-4 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>FreeLunch</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
  export default {
    data: () => ({
      carItems: [
        { src: require('../assets/stock.jpg'), loading: true },
        { src: require('../assets/hk.jpg'), loading: true },
        { src: require('../assets/ny.jpg'), loading: true },
      ],
      loadings: [true, true, true],
      loading: true,
      cards: [
        {
          title: "金康新能源获政府投资 部分产品使用“东风赛力斯”品牌", 
          src: require('../assets/home_card1.png'),
          subtitle: '',
          content: '4月23日，小康股份(8.220,-0.26,-3.07%)(SH601127)发布公告称，公司与重庆两江新区管理委员会（以下简称“两江...'
        },
        {
          title: '高瓴资本760亿美股持仓调整：清仓英伟达新进台积电，增持阿里巴巴、拼多多',
          src: require('../assets/home_card2.png'),
          subtitle: '',
          content: '8月15日，高瓴资本（Hillhouse Capital Advisors. LTD）在美国证券交易委员会（SEC）网站上公布了2020年二季...'
        },
        {
          title: '王兴领投，理想汽车C轮融资5.3亿美元', 
          src: require('../assets/home_card3.png'),
          subtitle: '',
          content: '8月16日，理想汽车宣布完成5.3亿美元C轮融资。本轮融资由美团创始人王兴领投，投后估值约为29.3亿美元。至此...'
        },
        { title: '獐子岛：上半年净利润亏损2359万元 董事罗伟新对半年报存在异议',
          src: require('../assets/home_card4.png'),
          subtitle: '',
          content: '中证网讯（记者 宋维东）獐子岛（002069）8月23日晚发布2019年半年报。报告期内，公司实现营业收入...'
        },
      ],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
      typing: true,
      brightness: 1,
      showGraph: false,
      isActive: false,
    }),
    computed: {
      relation: () => {
        var categories = [
          { name: "人物" },
          { name: "公司" },
          { name: "活动" },
          { name: "队伍" },
        ];
        let option = {
          // 图的标题
          // 提示框的配置
          tooltip: {
              formatter: function (x) {
                return x.data.des;
              }
          },
          legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {
                return a.name;
            })
          }],
          series: [{
            type: 'graph', // 类型:关系图
            layout: 'force', //图的布局，类型为力导图
            symbolSize: 40, // 调整节点的大小
            //roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 10],
            force: {
                repulsion: 2500,
                edgeLength: [10, 50]
            },
            draggable: true,
            lineStyle: {
                normal: {
                    width: 2,
                    color: '#4b565b',
                }
            },
            edgeLabel: {
                normal: {
                    show: true,
                    formatter: function (x) {
                        return x.data.name;
                    },
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {}
                }
            },
 
            data: [{
                name: '创新工场',
                des: '创新工场是一家致力于早期阶段投资，并提供全方位创业培育的投资机构与创业平台',
                symbolSize: 120,
                category: 1,
            }, {
                name: 'DeeCamp',
                des: 'DeeCamp旨在提升高校AI人才在行业应用中的实践案例经验，同时推进产学研深度结合的公益性质AI训练营',
                symbolSize: 80,
                category: 2,
            }, {
                name: 'FreeLunch队',
                des: '赛道4.1金融文档事件抽取',
                symbolSize: 80,
                category: 3,
            }, {
                name: 'A公司',
                des: '北京A技术股份有限公司',
                symbolSize: 80,
                category: 1,
            }, {
                name: 'B公司',
                des: '南京B科技有限公司',
                symbolSize: 80,
                category: 1,
            }, {
                name: '李开复',
                symbolSize: 120,
                category: 0,
            },],
            links: [{
                source: '李开复',
                target: '创新工场',
                name: '创办',
            }, {
                source: '创新工场',
                target: 'DeeCamp',
                name: '发起',
            }, {
                source: '创新工场',
                target: 'FreeLunch队',
                name: '投资',
            }, {
                source: '创新工场',
                target: 'A公司',
                name: '参股',
            }, {
                source: '创新工场',
                target: 'B公司',
                name: '监事',
            }],
            categories: categories,
          }]
        }
        return option
      }
    },
    methods: {
      submit: function () {
        this.typing = false
      },
      press: function (event) {
        if (event.key == 'Enter') {
          this.submit()
        }
      },
      sum: function (arr) {
        var s = 0;
        arr.forEach(function(val) {
            s += val;
        }, 0);
      
        return s;
      },
      handleScroll: function () {
        this.brightness = 1 - (window.scrollY / this.$refs.slide.$el.scrollHeight) * 1.2
        this.brightness = this.brightness >= 0 ? this.brightness : 0

      },
      handleResize: function () {
        this.$refs.chart.resize()
      },
    },
    mounted: function () {
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
      this.showGraph = window.innerHeight > this.$refs.slide.$el.clientHeight * 0.8
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('scroll', this.handleResize)
    },
  }
</script>

<style scoped>
  .bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .fade-in {
    opacity: 0;
    transition: 0.3s all ease-out;
    transform: scale(0.8);
  }
</style>