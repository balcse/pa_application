<template>
  <q-card class="container"  :hidden="showAddForm" >
    <div>
     <h5 class="title"> {{$t('input_labels.new_intervention')}} </h5>
      <q-card-section
        
        class="card"
      >
        <div class="div-1">
          <div class="div-2">
            <div class=" q-pa-xsm row div-3">
              <div class=" q-pa-xsm col-3">
                <HelpLabel
                :fieldLabel="$t('input_labels.title')"
                :helpLabel ="$t('help.intervention_title')"
                class="header"
                style="padding-top:10px;font-size:16px"
                />
              </div>
              <div class="col-9 div-4">
                <q-input
                  maxlength="100"
                  counter
                  dense
                  bg-color="white"
                  standout
                  outlined
                  v-model="model.title"
                />
              </div>
            </div>

            <div class=" q-pa-xsm row div-5">
              <div class=" q-pa-xsm col-3">
                 <HelpLabel
                  :fieldLabel="$t('input_labels.description')"
                  :helpLabel ="$t('help.intervention_description')"
                  class="header"
                  style="padding-top:10px;font-size:16px"
                  />
              </div>
              <div class="col-9 div-4">
                <q-input
                  dense
                  type="textarea"
                  bg-color="white"
                  standout
                  outlined
                  v-model="model.description"
                />
              </div>
            </div>

            <div class=" q-pa-xsm row div-5">
              <div class=" q-pa-xsm col-3">
                <HelpLabel
                :fieldLabel="$t('input_labels.type')"
                :helpLabel ="$t('help.intervention_assigned_type')"
                class="header-2"
                style="font-size:16px"
                />

              </div>
              <div class=" q-pa-md col-9 div-6">
                <q-select
                  filled
                  dense
                  clearable
                  emit-value
                  map-options
                  v-model="model.interventionType"
                  :options="intervention_categories"
                  bg-color="white"
                  :label="$t('input_labels.intervention_type')"
                  class="width"
                />
              </div>
            </div>
          </div>

          <div class="q-gutter-sm">

          </div>
          <div class="center" style="padding-top:30px">
            <q-btn
            :data-cy="'cancelintervention'"
              class="delete-button"
              unelevated
              no-caps
              :label="$t('button.cancel')"
              @click="cancelIntervention($event)"
            />
            <q-btn
              class="button"
              :data-cy="'saveintervention'"
              unelevated
              no-caps
              color="accent"
              :label="$t('button.add_intervention')"
              :id="the_intervention_plan.id"
              @click="saveIntervention($event, model)"
            />
          </div>
        </div>
      </q-card-section>
      <br>
    </div>

    <br>
  </q-card>
</template>

<script>
import HelpLabel from './HelpLabel'

export default {
  name: "AddIntervention",
  data () {
    return {

    }
  },
  components: {},
  props: ["hideAdd", "model", "the_processes_list", "the_intervention_plan", "intervention_categories", "showAddForm"],
  components:{HelpLabel},
  computed: {

  },
  mounted () { },
  methods: {
    saveIntervention (event, value) {
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(value)
      this.$emit('saveIntervention', value)

    },
    cancelIntervention (event) {
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('cancelIntervention')

    },
    addIntervention (event) {
      let targetId = event.currentTarget.id
      console.log("I am")
      console.log(targetId)
      this.$emit('addIntervention')
    }

  },
  created () {

  }
}
</script>
<style scoped>
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  margin-top: 15px;
  border-radius: 2px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.button {
  margin-top: 15px;
  border-radius: 2px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.container {
  background-color: #FFF2EC;
  width: 900px;
  margin-top:30px
}
.card {
  padding-left: 0px;
  padding-right: 0px;
  padding-top:0px;
  padding-bottom:0px;
  width:900px
}
.div-1 {
  background-color: #FFF2EC;
  padding-left: 0px;
  padding-right: 0px;
  width:900px
}
.div-2 {
  display: inline-block;
  width: 900px;
  border-width: 2px;
  margin-bottom: 1px;
}
.div-3 {
  text-align: center;
  padding-left: 30px;
}
.header {
  text-align: left;
  margin-bottom: 0px;
  font-size: 15pt;
}
.div-4 {
  margin: auto;
  display: block;
  margin-bottom: 0px;
  padding-right: 30px;
  padding-top: 10px;
}
.div-5 {
  text-align: center;
  padding-left: 30px;
}
.center {
  text-align: center;
}
.header-2 {
  
  margin-bottom: 0px;
  margin-top: 14px;
  padding-top: 22px;
  font-size: 15pt;
  padding-left: 30px;
}
.div-6 {
  margin-top: 14px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  padding-left:0px;
  padding-top:0px
}
.width {
  width: 622px;
}
.title{
  padding-left:30px; 
  font-size:25px; 
  padding-top:40px;
  font-weight: 600;
font-size: 25px;
}
</style>
