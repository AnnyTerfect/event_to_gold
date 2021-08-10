<template>
  <v-container>
    <v-row
      no-gutters
      class="my-2 white flex-column-reverse flex-md-row"
      primary
    >
      <v-col 
        :md="selectedItem != undefined ? 8 : 12"
        :xs="12"
        class="pr-0 pb-0"
        :style="selectedItem == undefined ? { transition: '500ms', transitionDelay: '500ms' } : {}"
      >
        <v-card-title class="grey lighten-4">
          <v-icon large>mdi-magnify</v-icon><span class="text-h5">发现热点</span>
        </v-card-title>

        <v-list>
          <v-list-item-group v-model="selectedItem">
            <v-row
              v-for="(item, i) in items"
              :key="i"
              no-gutters
              :id="'detail' + String(i)"
            >
              <v-list-item
                :class="{
                  'grey': true,
                  'lighten-3': i % 2 != 0,
                  'lighten-4': i % 2 == 0,
                  'lighten-1 primary white--text': selectedItem == i, 
                }"
              >
                <v-list-item-icon>
                  <v-icon
                    v-text="'mdi-numeric-' + String(i + 1) + ''"
                    :color="selectedItem == i ? 'white' : 'black'"
                  ></v-icon>
                </v-list-item-icon>

                
                <v-list-item-content>
                  <v-list-item-title
                    class="text-wrap"
                  >
                    {{ item.title }}
                    <v-icon
                      color="red"
                      v-if="i < 5"
                    >mdi-fire</v-icon>
                    <v-menu
                      transition="scroll-y-transition"
                      offset-y
                      style="width: 80%"
                      max-width="400px"
                      class="overflow-y-auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          v-on="on"
                          v-bind="attrs"
                        >
                          详情
                        </v-btn>
                      </template>

                      <v-responsive max-height="400" class="overflow-y-auto">
                        <v-container
                          class="text-wrap white overflow-y-auto"
                        >
                          <h4 class="text-h6">
                            {{ item.title }}
                          </h4>
                          <div v-html="item.content"></div>
                        </v-container>
                      </v-responsive>
                    </v-menu>
                  </v-list-item-title>
                </v-list-item-content>

                  
              </v-list-item>
            </v-row>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-slide-x-transition>
        <v-col
          :md="4"
          :sm="12"
          class="pa-0 grey lighten-5"
          v-for="item in detailbyday(selectedItem)"
          :key="item.title"
        >
          <v-container>
            <v-row justify="center">
              <v-col cols="12">
                <v-responsive :aspect-ratio="4/3">
                  <v-chart
                    class="mx-auto full"
                    :options="getLine()"
                    ref="mychart1"
                  />
                </v-responsive>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12">
                <v-responsive :aspect-ratio="4/3">
                  <vue-word-cloud
                    style="width: 100%; height: 200px"
                    :words="item.wordsdata"
                    :color="([, weight]) => weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo'"
                    font-family="Roboto"
                    :enter-animation="enterAnimation"
                    :leave-animation="enterAnimation"
                    ref="wc"
                  />
                </v-responsive>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-slide-x-transition>
    </v-row>
  </v-container>
</template>

<style scoped>
  .full {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  export default {
    data: () => ({
      selectedItem: undefined,
      items: [
        {
          action: 'mdi-numeric-1-circle-outline',
          title: '金康新能源获政府投资 部分产品使用"东风赛力斯"品牌',
          content: [
            '4月23日，小康股份(8.220,-0.26,-3.07%)(SH601127)发布公告称，公司与重庆两江新区管理委员会（以下简称“两江新区管委会”）、东风汽车(4.000,-0.07,-1.72%)集团有限公司（以下简称“东风公司”）共同签订《关于共建中高端新能源汽车项目的协议》，为推动金康新能源快速落地发展。',
            '公告称，东风公司与小康股份同意以金康新能源作为双方在中高端新能源整车板块的合作平台。同时，为支持东风公司和小康股份基于金康新能源的进一步深化合作重庆市人民政府及两江新区管委会将指定主体或基金共同成立 SPV（以下简称“SPV”），由SPV向金康新能源投资20亿元，增资后SPV 预计将持有金康新能源 28.74%的股权。',
            '小康股份表示，各方将发挥各自的资源优势，在政策、融资、生产、管理、销售等方面为金康新能源提供支持，将金康新能源打造成为全球智能汽车品牌企业。', '其中，东风公司或其控股子公司将协助金康新能源加强现代化企业管理，提升金康新能源的战略规划能力，强化金康新能源的品牌建设和规范运营能力；小康股份将在中高端新能源汽车板块的资源（包括不限于研发、采购、生产、营销等）投入金康新能源；而SPV 投资金康新能源的股权所形成的涉及经营管理方面的权利有条件授权委托东风公司行使；两江新区管委会支持、推动金康新能源通过 IPO 等方式在科创板等证券市场实现独立上市。'
          ].join('<br>'),
          wordsdata: [
            ['新能源', 15],
            ['投资', 10],
            ['小康股份', 8],
          ],
        },
        {
          action: 'mdi-silverware-fork-knife',
          title: '高瓴资本760亿美股持仓调整：清仓英伟达新进台积电，增持阿里巴巴、拼多多',
          content: [
            '8月15日，高瓴资本（Hillhouse Capital Advisors. LTD）在美国证券交易委员会（SEC）网站上公布了2020年二季度美股持仓。', 
            '数据显示，高瓴资本在美股持有74家公司的股票，以生物医疗、互联网科技为主要布局领域，持有市值达到109.4亿美元（约合人民币760亿元）。',
            '截至2020年二季度末，在高瓴资本的美股持仓中，前十大重仓股分别是：ZOOM（ZM.US）、爱奇艺（IQ.US）、百济神州（BGNE.US）、阿里巴巴（BABA.US）、拼多多（PDD.US）、优步（UBER.US）、好未来（TAL.US）、京东（JD.US）、哔哩哔哩（BILI.US）、泰邦生物（CBPO.US），中概股占据前十大重仓股中的八个席位。',
            'Zoom是高瓴资本第一大重仓股，截至第二季度末持股数量为685.7万，较一季度末的619.4万增持66.25万股。2020年上半年，新冠肺炎疫情带来远程办公需求，在线视频会议服务商Zoom迎来风口，疫情期间最大涨幅超过240%，使得高瓴资本对Zoom的持股市值从一季度的9.05亿美元激增至17.39亿美元。'
          ].join('<br>'),
          wordsdata: [
            ['高瓴资本', 15],
            ['持仓', 10],
            ['疫情', 8],
          ],
        },
        {
          action: 'mdi-school',
          title: '王兴领投，理想汽车C轮融资5.3亿美元 ',
          content: [
            '8月16日，理想汽车宣布完成5.3亿美元C轮融资。本轮融资由美团创始人王兴领投，投后估值约为29.3亿美元。至此，理想汽车累计融资额达到15.75亿美元。',
            '理想汽车首款产品增程式智能电动车理想ONE将于9月起在全国13个城市陆续开启用户试驾活动。10月，理想汽车将启动理想ONE的正式量产。11月将开始用户交付。',
            '理想ONE于今年年初获得生产资质，同时常州制造基地已经全部建成并进入小批量试生产阶段。',
            '4月10日，增程式智能电动车理想ONE正式公布售价并开始接受预订。理想ONE只提供一款顶配车型，标配42项豪华配置和38项主被动安全配置，补贴后全国统一零售价32.8万元。4月16日，Baby Blue限量版珍珠漆理想ONE亮相上海车展，将在2020年第一季度开启交付。\n2019年5月1日，理想首批零售中心开业，覆盖北京、上海、广州、深圳和天津共5个城市。年内拓展至14家，覆盖全国13个城市。'
          ].join('<br>'),
          wordsdata: [
            ['理想汽车', 15],
            ['王兴', 10],
            ['融资', 8],
          ],
        },
        {
          action: 'mdi-bottle-tonic-plus',
          title: '獐子岛：上半年净利润亏损2359万元 董事罗伟新对半年报存在异议',
          content: [
            '中证网讯（记者 宋维东）獐子岛（002069）8月23日晚发布2019年半年报。报告期内，公司实现营业收入12.88亿元，同比下降8.53%；归属于上市公司股东的净利润亏损2358.97万元，上年同期盈利1464.66万元。值得注意的是，公司董事罗伟新对半年报存在异议，理由是“上市公司提交的文件材料，结合我的专业背景，本人尚不足以对本次拟议事项形成完整、专业、严谨的判断，出于为广大中小股民负责的态度，本人对本次半年度报告投出弃权票”。'
          ].join('<br>'),
          wordsdata: [
            ['獐子岛', 15],
            ['罗新伟', 10],
            ['半年报', 8],
          ],
        },
        {
          action: 'mdi-content-cut',
          title: '科创板速度再创纪录！中芯国际上市申请受理9天后就拿到了上市委会议的“准考证”。',
          content: [
            '6月10日下午，上海证券交易所官网显示，上交所科创板股票上市委员会定于6月19日上午9时，召开2020年第47次上市委员会审议会议，会上将审议中芯国际集成电路制造有限公司（中芯国际）的科创板首发上市申请。',
            '这距离中芯国际的科创板上市申请获得正式受理，仅仅过去18天。由此，中芯国际也成为科创板迄今为止审核速度最快的一家申报企业。',
            '6月1日，中芯国际的科创板上市申请获得正式受理；仅仅3天之后的6月4日，上交所科创板股票审核中心发出第一份问询函，这也创下科创板的最快速度纪录；同样是3天之后的6月7日，中芯国际问询答复公布，内容超过200页，这也创下科创板审核问询的最快回复记录。',
            '如果顺利过会，中芯国际下一步将在证监会层面进行注册程序。根据科创板业务规则，如果不计审核问询及回复时间，证监会的注册时间最长不超过20个工作日。',
            '市场人士预计，如果一切顺利，中芯国际将有望在7月份登陆科创板，创下科创板有史以来的最快申报上市纪录。',
            '中芯国际是全球领先的集成电路晶圆代工企业之一，也是中国大陆技术最先进、规模最大、配套服务最完善、跨国经营的专业晶圆代工企业，主要为客户提供0.35微米至14纳米多种技术节点、不同工艺平台的集成电路晶圆代工及配套服务。'
          ].join('<br>'),
          wordsdata: [
            ['中兴国际', 15],
            ['科创板', 10],
            ['集成电路', 8],
          ],
        },
        {
          action: 'mdi-tag',
          title: '贵州茅台：李静仁接任李保芳代行公司总经理职责',
          content: [
            '经济日报-中国经济网北京7月2日讯 贵州茅台今日发布第二届董事会 2019年度第三次会议决议公告。该公告显示，经董事会会议审议并通过，李保芳不再代行公司总经理职责，何英姿不再担任公司副总经理、财务总监职务，李静仁代行公司总经理职责，聘任刘刚担任公司副总经理、财务总监职务。',
            '据上述公告信息显示：李静仁，男，汉族，籍贯浙江建德，1964年1月出生，1981年4月参加工作，1986年1月加入中国共产党，研究生学历，注册会计师、注册税务师、注册资产评估师、全国企业法律顾问，现任中国贵州茅台酒厂（集团）有限责任公司党委副书记、副董事长、总经理、总会计师，贵州茅台酒股份有限公司董事、代行总经理职责。刘刚，男，汉族，籍贯河南滑县，1970年4月出生，1992年7月参加工作，2003年4月加入中国共产党，大学本科学历，高级经济师，现任贵州茅台酒股份有限公司副总经理、财务总监。',
          ].join('<br>'),
          wordsdata: [
            ['贵州茅台', 15],
            ['李静仁', 10],
          ],
        },
        {
          action: 'mdi-tag',
          title: '中航科工：收购中航直升机取得重大进展 享受行业增长红利',
          content: [
            '招商证券(17.240,0.23,1.35%)指出，收购中航直升机取得重大进展，资产整合加速。我国军用直升机增长空间大，公司将享受行业增长红利。配股方案获空客增持，国际开放合作进一步增强。航空工业集团成为国有资本投资公司试点企业，公司旗舰地位有望发挥。2019年上半年，公司实现收入180.58亿元，同比增长23.49%，实现净利润6.41，同比增长7.3%。预测2019-2021年公司归母净利润分别为14.71亿、16.90亿和19.16亿人民币，中航科工目前市值217亿人民币，对应估值分别为15、13和11倍，维持“强烈推荐-A”评级。',
          ].join('<br>'),
          wordsdata: [
            ['中航科工', 15],
            ['中航直升机', 10],
            ['军用直升机', 8],
          ],
        },
        {
          action: 'mdi-tag',
          title: '前内华达州副州长出任FF独立董事，贾跃亭个破产重组投票顺利',
          content: [
            '据证券时报，前内华达州副州长兼财长Brian Krolicki正式出任Faraday Future（FF）独立董事。近日，FF已获得美国联邦政府超900万美金现金援助，前玛莎拉蒂高管高孟雄加盟。FF方面表示，这将对FF的股权融资、产品交付、IPO产生巨大推动作用。此外，贾跃亭的个人破产重组投票也进展顺利，多家大型投行投出赞成票，支持比例高达90%以上。',
          ].join('<br>'),
          wordsdata: [
            ['贾跃亭', 15],
            ['独立董事', 10],
            ['FF', 8],
          ],
        },
        {
          action: 'mdi-tag',
          title: '传台积电和富士康有可能收购Arm',
          content: [
            '近期软银计划出售旗下全资子公司Arm的消息，吸引了整个半导体行业的关注，因为这并不仅仅是关于Arm一家公司的命运，更关乎整个Arm生态圈未来的发展。因为Arm是全球科技行业的关键参与者，提供全球90%以上的移动芯片使用的架构。包括苹果、高通、三星、华为，以及几乎所有的芯片设计产生商，如果要为其移动设备设计处理器芯片，都需要Arm的知识产权。',
            '虽然近日有传闻称NVIDIA正在与软银接洽，计划以超过320亿美元收购Arm，但是，外界普遍认为，被NVIDIA收购会影响到Arm的中立性，会迫使一些Arm的客户转向Arm的竞争对手。',
            'Arm创始人Hermann Hauser近日也发声表示：“Arm业务模式的基本支柱之一，就是可以卖给任何人。软银不是一家芯片公司，所以保持了Arm的中立性。Arm的大部分授权企业都是NVIDIA的竞争对手，如果它成为NVIDIA的一部分，他们肯定会寻找Arm的替代品。”',
          ].join('<br>'),
          wordsdata: [
            ['Arm', 15],
            ['台积电', 10],
            ['富士康', 8],
          ],
        },
        {
          action: 'mdi-tag',
          title: '旷视创始人印奇：投资旷视意味着和“技术信仰者”同行',
          content: [
            '8月26日，旷视科技正式向港交所提交上市申请，旷视创始人印奇向投资人发布公开信，他表示：“投资旷视意味着和我们这些‘技术信仰者’同行，一起见证和推动这场伟大的人工智能科技革命。”',
            '印奇称，人工智能在今天看起来是个热门领域，但是在旷视成立之初的2011年，却是不折不 扣的“寒冬”。对于人工智能公司将“永不言弃”，希望与那些同样具备长远眼光和商业韬略的投资者同行。旷视将专注核心竞争力“深度学习”的研究，稳健开展商业化，深耕每个垂直领域。',
            '旷视科技由印奇、唐文斌和杨沐于2011年10月8日创立，三位创始人本科均毕业于清华大学计算机科学实验班（也就是俗称的“姚班”），创始人团队平均年龄仅31岁，旷视科技若IPO成功，将成为国内人工智能企业第一股。印奇、唐文斌和杨沐三人持股分别为8.21%、5.9%、2.72%。',
            '以下为印奇公开信全文：',
            '尊敬的投资者：感谢您对旷视一直以来的关注，也感谢您在百忙之中阅读我们的文件及本信函。投资旷视意味着和我们这些“技术信仰者”同行，一起见证和推动这场伟大的人工智能科技革命。我们坚信，人工智能将使世界变得更加美好。在此，我想就如何构建一个可持 续、负责任、有价值的人工智能生态，谈谈我的思考。',
          ].join('<br>'),
          wordsdata: [
            ['旷视科技', 15],
            ['印奇', 10],
            ['人工智能', 8],
          ],
        },
      ],

      cards: [
        {
          title: 'Pre-fab homes', 
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
        },
        {
          title: 'Favorite road trips', 
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
        },
        {
          title: 'Best airlines', 
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'
        },
        { title: 'Best airlines',
          src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'
        },
        {
          title: 'Pre-fab homes', 
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
        },
        {
          title: 'Favorite road trips', 
          src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
        },
      ],      
    }),
    computed: {
      enterAnimation: () => ({
        opacity: 0,
        transform: 'scale3d(0.3, 0.3, 0.3)',
      })
    },
    methods: {
      getLine: function () {
        let points = [], y = 0
        for (let i = 0; i < 24; i++) {
          y = Math.floor(Math.random() * (100 - y)) + y + Math.floor(Math.random() * 5)
          points.push(y)
        }
        let hours = [], h = new Date().getHours()
        for (let i = 0; i < 24; i++) {
          hours.push(String((h + 24 - 23 + i) % 24) + ':00')
        }

        return {
          title: {
            text: '热度走势'
          },
          xAxis: {
            type: "category",
            data: hours
          },
          yAxis: {
            type: "value"
          },
          color: '#ff9800',
          series: [
            {
              data: points,
              type: "line",
              smooth: true
            }
          ],
          grid: {
            top: '15%',
            left: '0',
            right: '5%', 
            bottom: '0',
            containLabel: true
          },
        }
      },
      detailbyday: function (day) {
        return day != undefined ? [this.items[day]] : []
      },
    },
    mounted: function () {
    }
  }
</script>