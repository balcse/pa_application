<template>
  <div class="q-pa-md">
    <h5>{{$t('data_settings.settings')}}</h5>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{$t('data_settings.feature_settings')}}</div>
      </q-card-section>
      <q-card-section>
        <FeaturesElement
          v-for="afeature in workingFeatures"
          :feature="afeature"
          :key="afeature.id"
        />
        <q-btn
          color="accent"
          glossy
          label="Save"
          @click="saveFeatures"
        />
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{$t('data_settings.pa_logo')}}</div>
      </q-card-section>
      <q-card-section>
        <croppa
          v-model="myCroppa"
          :width="150"
          :height="150"
          :quality="1"
        ></croppa>
        <q-btn
          color="accent"
          glossy
          label="Save"
          @click="saveLogo"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import storeMappingMixin from '../../mixin/storeMappingMixin'
import FeaturesElement from '../../components/settings/FeaturesElement'
//import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
export default {
  name: "FunctionConfiguration",
  data () {
    return {
      group: ["FEAT_SERVICES"],
      workingFeatures: [],
      myCroppa: {}
    }
  },
  mixins: [
    storeMappingMixin({
      getters: {
        features: 'features/features'
      }, actions: {
        fetchFeatures: 'features/fetchFeatures',
        updateAllFeatures: 'features/updateAllFeatures',
        updateSetting: 'settings/updateSetting'
      }
    })],
  components: {
    FeaturesElement
  },
  computed: {

  },
  methods: {
    saveFeatures () {
      console.log(this.workingFeatures)
      /*
      const agent = new https.Agent({
        rejectUnauthorized: false
      });

      axios
        .post(
          "https://api.micadoproject.eu/db/v01/migrant_app_config",
          {
            id: 1,
            features: this.features
          },
          {
            //             httpsAgent: agent ,
            headers: {
              Prefer: "resolution=merge-duplicates",
              "Content-Type": "application/json",
              Authorization:
                "Bearer " +
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlpqUm1ZVE13TlRKak9XVTVNbUl6TWpnek5ESTNZMkl5TW1JeVkyRXpNamRoWmpWaU1qYzBaZz09In0.eyJhdWQiOiJodHRwOlwvXC9vcmcud3NvMi5hcGltZ3RcL2dhdGV3YXkiLCJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6ImFkbWluIiwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJNaWdyYW50QXBwbGljYXRpb24iLCJpZCI6MSwidXVpZCI6bnVsbH0sInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9nYXRld2F5Lm1pY2Fkb3Byb2plY3QuZXU6NDQzXC9vYXV0aDJcL3Rva2VuIiwidGllckluZm8iOnsiQnJvbnplIjp7InN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6bnVsbH19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlBvc3RnUkVTVEFQSSIsImNvbnRleHQiOiJcL2RiXC92MDEiLCJwdWJsaXNoZXIiOiJhZG1pbiIsInZlcnNpb24iOiJ2MDEiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn1dLCJjb25zdW1lcktleSI6InZabFNMbTFnYzVOMzIxbnRIN2Ztd2tONTNvVWEiLCJleHAiOjM3MzAyOTc0MzgsImlhdCI6MTU4MjgxMzc5MSwianRpIjoiYmYyMjBiYjMtNjY3MC00OTA5LWI4OTctOTY2ZDVhZDdhN2M0In0.GORnM7Hfflrv8iNFbBOZoLg7475tnLaXwY2f88My_qVCAupJxqPihM901E5GNQUsL2I7PW9_ymbCPJki0FuaIhdXk4ovso11ghjWDkVH9fUoMm_FElNynOlWp7gPDwtXbS5sNI2nZHflvUmc9IYG70XJG6tWhg4hI8bW0sNr03gkQOjQzbUqSqHb__J_oLJye1IGi657oJUtXnVLSDfRHOKl7w8SATrSiR_K57SkT4xGmpLqYGmbXsoWFJT-FHe1-WVrGBvwk2kqZfjgjDUoUedrDR0F9T_YrVIuPtruGqR4gJGWBuXPciOSHYsGu12Oxg3zC1FwoptN0NA2AZ-oTg" //the token is a variable which holds the token
            }
          }
        )
        .then(console.log("posted"))
        .catch(function (err) {
          // Run into big problems when I get an error
          console.log("Got an error calling API manager: ", err);
          response => [];
        });
        */
      this.updateAllFeatures(this.workingFeatures)
      console.log("posted")
      this.workingFeatures = JSON.parse(JSON.stringify(this.features))
    },
    saveLogo () {
      console.log(this.myCroppa.generateDataUrl())
      let setting = { key: "pa_logo", value: this.myCroppa.generateDataUrl() }
      this.updateSetting(setting)
        .then((result) => {
          console.log(result)
          //       window.location.reload()
        })
    }

  },
  created () {
    console.log("created")
    console.log(this.features)
    this.workingFeatures = JSON.parse(JSON.stringify(this.features))
    /*
    this.fetchFeatures()
      .then(features => {
        //        this.loading = false
        console.log("got features")
        console.log(this.features)
      });
      */

  }
}
</script>
