<style>
  .theme--light.v-input:not(.v-input--is-disabled) input{
    color:#fff;
  }
  input, select, textarea{
    color: #ffffff;
}
textarea:focus, input:focus{
    outline: none;
}
  </style>
<template>
  <v-container fluid fill-height pa-0>
    <!-- Word not found alert -->
    <v-row align="center" justify="center">
      <v-col cols="12" lg="6" md="6" class="d-flex flex-column justify-center align-center">
        <v-alert
          :value="alert"
          type="info"
          max-width=200
        >
          {{ alertText }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row dense no-gutters align="center" justify="center">
      <v-col cols="12" class="d-flex flex-column justify-center align-center">
        <v-card
          :width="cardWidth"
          align="center"
        >
          <v-card-text>
            <div
              v-for="ans in answers"
              :key=ans.id
            >
              <v-container fluid>
                <v-row
                  class="text-center justify-center"
                  dense
                >

                  <v-col
                    v-for="i in 5"
                    :key=i
                    cols="2"
                    class="pt-0 ma-0"
                  >
                    <v-btn
                      :height="lHeight"
                      :width="lWidth"
                      class="text-h4 pt-1 ma-0"
                      :color="ans.colors[i-1]"
                      tabindex="-1"
                      :id="'ch-' + ans.id + '-' + i"
                      small
                      :outlined="ans.outlined[i-1]"
                    >
                     {{ getCharF(ans.id, i - 1).toUpperCase() }}
                    </v-btn>

                  </v-col>

                </v-row>
              </v-container>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-container fluid>
              <v-row
                class="text-center justify-center"
                dense
              >
                <v-col
                  cols="1"
                  class="pt-2 ma-0"
                  v-for="l in qRow"
                  :key=l
                >
                  <v-card
                    height="40"
                    width="40"
                    class="text-h6 pt-1 ma-0"
                    :color="used[l]"
                    tabindex="-1"
                    id=l
                    @click="doType(l)"
                  >
                   {{l.toUpperCase()}}
                  </v-card>
                </v-col>
              </v-row>
              <v-row
                class="text-center justify-center"
                dense
              >

                <v-col
                  cols="1"
                  class="pt-5 ma-0"
                  v-for="l in aRow"
                  :key=l
                >
                  <v-card
                    height="40"
                    width="40"
                    class="text-h6 pt-1 ma-0"
                    :color="used[l]"
                    tabindex="-1"
                    id=l
                    @click="doType(l)"
                  >
                   {{l.toUpperCase()}}
                  </v-card>
                </v-col>
              </v-row>
              <v-row
                class="text-center justify-center"
                dense
              >
                <v-col
                  cols="2"
                  class="pt-5 ma-0"
                >
                  <v-card
                    height="40"
                    width="50"
                    class="text-caption pt-2 ma-0"
                    color="grey lighten-3"
                    tabindex="-1"
                    id="return"
                    @click="doType('return')"
                  >
                    ENTER
                  </v-card>
                </v-col>
                <v-col
                  cols="1"
                  class="pt-5 ma-0"
                  v-for="l in zRow"
                  :key=l
                >
                  <v-card
                    height="40"
                    width="40"
                    class="text-h5 pt-1 ma-0"
                    :color="used[l]"
                    tabindex="-1"
                    id=l
                    @click="doType(l)"
                  >
                   {{l.toUpperCase()}}
                  </v-card>
                </v-col>
                <v-col
                  cols="2"
                  class="pt-5 ma-0"
                >
                  <v-card
                    height="40"
                    width="40"
                    class="text-h5 pa-0 ma-0"
                    color="grey lighten-3"
                    tabindex="-1"
                    id="bs"
                    @click="doType('bs')"
                  >
                    <v-icon>
                      mdi-backspace
                    </v-icon>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>

    </v-row>

    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="youWon"
    >
      <v-card>
        <v-card-text>
          <div
            class="text-h2"
          >
            You Won!
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="green"
            text
            @click="youWon = false"
          >
            Close
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="youLost"
    >
      <v-card>
        <v-card-text>
          <div
            class="text-h2"
          >
            Sorry, the word was {{ word }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="green"
            text
            @click="youLost = false"
          >
            Close
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
//const wordsFile = require('@/assets/sgb-words.txt')

export default {
  name: 'WordSage',
  data () {
    return {
      locked: false,
      youWon: false,
      youLost: false,
      alert: false,
      alertText: "",
      word: "found",
      answerColors: {},
      used: {},
      answers: [
        {
          id: 0,
          word: "",
          colors: [
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
          ],
          outlined: [
            false,
            false,
            false,
            false,
            false
          ],
          disabled: false,
          input: "aField0"
        },
        {
          id: 1,
          word: "",
          colors: [
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
          ],
          outlined: [
            false,
            false,
            false,
            false,
            false
          ],
          disabled: true,
          input: "aField1"
        },
        {
          id: 2,
          word: "",
          colors: [
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
          ],
          outlined: [
            false,
            false,
            false,
            false,
            false
          ],
          disabled: true,
          input: "aField2"
        },
        {
          id: 3,
          word: "",
          colors: [
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
          ],
          outlined: [
            false,
            false,
            false,
            false,
            false
          ],
          disabled: true,
          input: "aField3"
        },
        {
          id: 4,
          word: "",
          colors: [
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
          ],
          outlined: [
            false,
            false,
            false,
            false,
            false
          ],
          disabled: true,
          input: "aField4"
        },
        {
          id: 5,
          word: "",
          colors: [
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
            "grey lighten-3",
          ],
          outlined: [
            false,
            false,
            false,
            false,
            false
          ],
          disabled: true,
          input: "aField5"
        },

      ],
      words: [],
      qRow: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      aRow: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      zRow: ["z", "x", "c", "v", "b", "n", "m"],
      activeAnswer: 0,
      daysFromStart: 0
    }
  },
  methods: {
    getCharF (n, c) {
      //get the word at answer n and the letter at space c
      if (this.answers[n].word.length > c) {
        return this.answers[n].word[c]
      }
      else { return "" }
    },
    doType (l) {
      if (this.locked) {
        return
      }

      if (l === 'bs') {
        //if bs then remove last character
        var data = this.answers[this.activeAnswer].word
        this.answers[this.activeAnswer].word = data.substring(0, data.length - 1)
      }
      else if (l === "return") {
        this.aChange(this.activeAnswer)
      }
      else {
        if (this.answers[this.activeAnswer].word.length < 5) {
          this.answers[this.activeAnswer].word += l.toLowerCase()
        }
      }
      //const input = document.getElementById('aField' + this.activeAnswer)
      //input.focus()
    },
    aChange (n) {
      console.log("doing aChange")
      var data = null
      //set data to the active answer and make sure its lower case
      data = this.answers[n].word.toLowerCase()
      this.answers[n].word = data

      //make sure answer has the correct number of characters
      //if not return the focus to the active input
      console.log(data)
      if (data.length < 5) {
        console.log("too short")
        this.alert = true
        this.alertText = "Not enough letters"
        //const input = document.getElementById('aField' + n)
        //console.log(input)
        //input.focus()
      }
      else {
        console.log("just right")

        //make sure input is a real word
        if (!this.words.includes(data)) {
          this.alert = true
          this.alertText = "Word not in list"
          //const input = document.getElementById('aField' + this.activeAnswer)
          //input.focus()
          return
        }

        //disable input because this guess is complete
        console.log(this.answers[n])
        this.answers[n].disabled = true
        //const input = document.getElementById('aField' + n)
        //input.hidden = true

        //setup green counter
        var greens = 0

        var usedLetters = ""

        for (let i = 0; i < data.length; i++) {
          let tooMany = false

          //see how many times a letter is in this.word
          var re = new RegExp(this.word[i], 'g')
          var occurrence = (this.word.match(re) || []).length
          //console.log('how many ' + this.word[i] + ' ' + occurrence)

          //see how many times we have seen this letter already
          var re2 = new RegExp(data[i], 'g')
          var usedOccurrence = (usedLetters.match(re2) || []).length

          //test if characters are in the word
          if (this.word.includes(data[i])) {
            if (usedOccurrence > occurrence) { tooMany = true}

            //console.log('contains ' + data[i])
            //test if position matches, that would be green
            if (this.word[i] === data[i]) {
              if (tooMany) {
                for (let x=0; x < usedLetters.length; x++) {
                  if (usedLetters[x] == this.word[i]) {
                    this.answers[n].colors[x] = "grey"
                  }
                }
              }
              console.log('and position matches')
              this.answers[n].colors[i] = "green"
              this.used[data[i]] = "green"
              greens += 1

            }
            else {
              if (tooMany) {
                //console.log("too many is true")
                //console.log(occurrence)
                //console.log(usedOccurrence)
                this.answers[n].colors[i] = "grey"
              }
              else {
                //possiton must not match, that would be orange
                console.log('and position does not match')
                 //this.$refs.dialog.animateClick()
                 //id="'ch-' + ans.id + '-' + i"
                //document.getElementById("ch-" + n + "-" + i).animateClick()
                this.answers[n].colors[i] = "orange"
              }
              //make sure we haven't already set this to green
              if (this.used[data[i]] !== "green") {
                this.used[data[i]] = "orange"
              }
            }
          }
          else {
            //character not in word.  Set keyboard to grey
            this.answers[n].colors[i] = "grey"
            this.used[data[i]] = "grey"
          }
          usedLetters += data[i]

        }

        if (greens == 5) {
          //disable all the answer inputs
          for (let a=0; a<=5; a++){
            this.answers[a].disabled = true
          }
          this.locked = true
          this.youWon = true
        }
        else {
          this.$forceUpdate()
          let nextNum = n + 1

          if (nextNum <= 5) {
            this.answers[nextNum].disabled = false
            this.activeAnswer = n + 1
          }
          else {
            this.locked = true
            this.youLost = true
          }
        }
      }
    }
  },
  computed: {
    lWidth: function () {
      console.log(window.innerWidth)

      return 35
    },
    lHeight: function () {
      console.log(window.innerHeight)
      var thisHeight = (window.innerHeight * .45)/7
      if (thisHeight > 55) {
        return 55
      }
      else {
        return thisHeight
      }
    },
    cardWidth: function () {
      if (window.innerWidth > 600) {
        return 500
      }
      else {
        return 400
      }
    }
  },
  watch: {
    alert: function (data) {
      if (data) {
        setTimeout(() => {  this.alert = false }, 2000);
      }
    }
  },
  beforeMount: function () {
    console.log("setting up game")
    let vm = this
    //set keyboard keys with color.  Convert int to its string.
    for (let k = 97; k < 123; k++) {
      var str = String.fromCharCode(k)
      vm.used[str] = "grey lighten-3"
    }
    var today = new Date()
    console.log(today)
    var startDate = new Date("01/01/2022")
    console.log(startDate)
    var timeFromStart = today.getTime() - startDate.getTime()
    vm.daysFromStart = Math.trunc(timeFromStart / (1000 * 3600 * 24))
    console.log(vm.daysFromStart)
  },
  mounted: function () {
    this.locked = false
    const wordsFile = require('@/assets/words.json')
    this.words = wordsFile

    var routeSplit = this.$route.path.split('/')
    if (routeSplit.length > 2) {
      if (routeSplit[2]) {
        if (routeSplit[2] == 'random' || Number(routeSplit[2] == 'NaN')) {
          this.word = this.words[Math.floor(Math.random() * this.words.length)]
        }
        else {
          if (Number(routeSplit[2]) > this.daysFromStart) {
            this.word = this.words[Number(this.daysFromStart)]
          }
          else {
            this.word = this.words[Number(routeSplit[2])]
          }
        }
      }
      else {
        this.word = this.words[Number(this.daysFromStart)]
      }
    }
    else {
      this.word = this.words[Number(this.daysFromStart)]
    }
    console.log(this.word)
    window.addEventListener("keyup", function(e) {
      //console.log(e)
      if (e.keyCode == 8) {
        //console.log("bs")
        this.doType("bs")
      }
      else if (e.keyCode == 13) {
        //console.log("return")
        this.doType("return")
      }
    }.bind(this));
    window.addEventListener("keypress", function(e) {
      //console.log(e)
      if (e.keyCode != 13 && e.keyCode != 8) {
        //console.log(String.fromCharCode(e.keyCode))
        this.doType(String.fromCharCode(e.keyCode))
      }
    }.bind(this));
  }
}
</script>
