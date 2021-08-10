<template>
  <v-container>
    <v-slide-x-transition mode="out-in">
      <v-card
        flat
        v-show="editing"
      >
        <v-card-title>
          <p class="my-2 text-h5">
            <v-icon large>mdi-file-document</v-icon>金融文档分析
          </p>
          <p class="text-h6 font-weight-light ">
            随着人类社会进入信息爆炸时代，如何从海量新闻、公告中高效地提取出有价值的金融信息，为投资者提供及时有效的参考决策依据，已经成为金融行业高速发展的重要瓶颈。事件抽取技术正是克服困境的关键突破口之一。此页面中的金融文档分析系统则是将事件抽取模型对接了进来，做到了开箱即用。
          </p>
        </v-card-title>

        <v-card-text>
          <h1 class="text-h6 font-weight-regular">文档内容</h1>
          <v-textarea
            clearable
            solo
            filled
            background-color="grey lighten-4"
            name="input-7-4"
            label="复制文档到此处"
            height="300"
            v-model="text"
          >
          </v-textarea>
          <v-row
            align="center"
            justify="center"
          >
            <v-col class="text-center">
              <v-btn
                :loading="loading"
                @click="submit"
                large
                color="primary lighten-1"
                class="text-subtitle-1"
              >
                提交
                <v-icon
                  right
                  dark
                >
                  mdi-android
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-slide-x-transition>

    <v-slide-x-transition mode="out-in">
      <v-card
        flat
        v-show="!editing"
      >
        <v-card-title>
          <p class="my-2 text-h5">
            <v-icon large>mdi-printer</v-icon>分析结果
          </p>
        </v-card-title>

        <v-card-text>
          <p class="text-h6">
            <span
              v-for="(label, index) in labels"
              :class="label.color"
              :key="index"
            >{{ label.char }}</span>
          </p>
          <div class="d-flex flex-row-reverse">
            <div
              style="height: 25px; width: 60px; border-radius: 4px;"
              class="red mr-1"
            >
            </div>
            <div style="line-height: 25px;">
              事件触发词
            </div>
            <div
              style="height: 25px; width: 60px; border-radius: 4px;"
              class="blue ml-2 mr-1"
            >
            </div>
            <div style="line-height: 25px;">
              事件参数
            </div>
          </div>
        </v-card-text>

        <v-container>
          <v-treeview
            activatable
            color="warning"
            :items="items"
          ></v-treeview>
        </v-container>

        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <v-spacer></v-spacer>
            <v-btn
              @click="edit"
              large
              color="primary lighten-1"
              class="text-subtitle-1"
            >
              再来一次
              <v-icon
                right
                dark
              >
                mdi-arrow-left-circle
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-card>
    </v-slide-x-transition>



    <v-dialog
      v-model="networkError"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          错误
        </v-card-title>

        <v-card-text>
          <v-icon color="red">mdi-alert</v-icon>网络连接错误，请检查网络状况后重试。
        </v-card-text>

        <v-card-text v-if="detail">
          错误详情：{{ errMsg }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            v-if="!detail"
            color="green darken-1"
            text
            @click="detail = true"
          >
            详情
          </v-btn>

          <v-btn
            v-if="detail"
            color="green darken-1"
            text
            @click="detail = false"
          >
            收起
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            重试
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dataError"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          错误
        </v-card-title>

        <v-card-text>
          <v-icon color="red">mdi-alert</v-icon>数据格式错误，请检查后重试。
        </v-card-text>

        <v-card-text v-if="detail">
          错误详情：{{ errMsg }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            v-if="!detail"
            color="green darken-1"
            text
            @click="detail = true"
          >
            详情
          </v-btn>

          <v-btn
            v-if="detail"
            color="green darken-1"
            text
            @click="detail = false"
          >
            收起
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            重试
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="timeout"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          错误
        </v-card-title>

        <v-card-text>
          <v-icon color="red">mdi-alert</v-icon>请求超时，请稍后重试。
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            重试
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import axios from 'axios'
  const FormData = require('form-data')

  export default {
    data: () => ({
      loading: false,
      editing: true,
      text: "2021年8月10日消息，据36氪报道，FreeLunch队宣布完成 500 万美元 Pre-A 轮融资，本轮融资由创新工厂独家投资，FreeLunch队宣布白勇先生已获委任为公司首席财务官。",
      items: [],
      labels: [],
      networkError: false,
      dataError: false,
      errMsg: '',
      detail: false,
      timeout: false,
    }),
    methods: {
      submit: function() {
        this.loading = true;
        let _this = this

        setTimeout(() => {
          if (_this.loading) {
            _this.loading = false
            _this.timeout = true
          }
        }, 20000)

        // let success = false

        const formData = new FormData()
        formData.append('title', '')
        formData.append('text', this.text)
        
        axios.post('/api/predict', formData)
        .then((res) => {
          _this.editing = false
          try {
            let data = res.data

            // render event text
            _this.labels = []
            for (let i = 0; i < data.text.length; i++) {
              if (data.text[i] && data.text[i] != ' ') {
                let label = { char: data.text[i], color: undefined }
                if (data.trigger_labels[i] && data.trigger_labels[i] != 'O')
                  label.color = 'red'
                if (data.role_labels[i] && data.role_labels[i] != 'O')
                  label.color = label.color ? 'purple' : 'blue'
                _this.labels.push(label)
              }
            }

            // render event list
            let events = data.events.event_list, id = 1
            if (events && events.length) {
              _this.items = []
              events.forEach((event) => {
                let item = {
                  id: id,
                  name: event.event_type,
                  children: [],
                }
                id++
                event.arguments.forEach((args) => {
                  item.children.push({
                    id: id,
                    name: `${args.role}: ${args.argument}`,
                  })
                  id++
                })
                _this.items.push(item)
              })
            }
            else {
              console.log('无事件')
              _this.items = [{ id: 1, name: '未发现任何事件' }]
            }
            _this.loading = false
          }
          catch(err) {
            console.log(err)
            this.errMsg = err
            this.dataError = true
            this.loading = false
          }

        })
        .catch((err) => {
          console.log(err)
          this.errMsg = err
          this.networkError = true
          this.loading = false
        })
      },
      edit: function() {
        this.editing = true
        this.close()
        // this.text = "";
      },
      close: function () {
        this.loading = false
        this.networkError = false
        this.dataError = false
        this.timeout = false
        this.editing = true
        this.errMsg = ''
        this.detail = false
      }
    },
  }
</script>