<template>
  <div>
    <div
      v-if="theprocess!=null"
      class="banner"
    >{{$t('input_labels.edit_process')}} - {{this.title}}</div>
    <div
      v-else
      class="banner"
    >{{$t('input_labels.add_new_process')}}</div>

    <div id="div-1">
      <q-card class="container">
          <div class="form-help"> {{$t("help.form")}} {{this.$defaultLangString}} </div>
        <q-tab-panels
          v-model="langTab"
          class="  "
          animated
        >
          <q-tab-panel
            v-for="language in languages"
            :key="language.lang"
            :name="language.name"
          >
            <div
              class=" q-pa-xsm "
              id="div-2"
            >
            <HelpLabel
            :fieldLabel="$t('input_labels.process_name')"
            :helpLabel="$t('help.process_name')"
            class="div-3" />
           
              <q-input
                dense
                data-cy="title_input"
                bg-color="grey-3"
                standout
                outlined
                maxlength="50"
                counter
                :readonly="!(edit_process.translations.filter(filterTranslationModel(language.lang))[0].translationState==0)||!(language.lang===activeLanguage)"
                :rules="[ val => val.length <= 50 || 'Please use maximum 5 characters']"
                v-model="edit_process.translations.filter(filterTranslationModel(language.lang))[0].process"
              />
            </div>

            <div
              id="div-4"
              class=""
            >
             <HelpLabel
            :fieldLabel="$t('input_labels.process_description')"
            :helpLabel="$t('help.process_description')"
            class="div-5" />
            
              <GlossaryEditor
                data-cy="description_input"
                class="desc-editor "
                style="width:100%; text-align:left"
                :readonly="!(edit_process.translations.filter(filterTranslationModel(language.lang))[0].translationState==0)||!(language.lang===activeLanguage)"
                v-model="edit_process.translations.filter(filterTranslationModel(language.lang))[0].description"
                :lang="language.lang"
                ref="editor"
              />

            </div>
            <div style="text-align:right;padding-left: 150px;padding-right: 150px;">
              <TranslateStateButton
                v-model="edit_process.translations.filter(filterTranslationModel(language.lang))[0].translationState"
                :isForDefaultLanguage="language.lang===activeLanguage"
                :objectId="edit_process.id"
                :readonly="!(language.lang===activeLanguage)"
                @micado-change="(id) => {
                  changeTranslationState(edit_process, id.state)
                }"
                @return-to-edit="(id) => {
                  changeTranslationState(edit_process, id.state)
                  deleteTranslationProd(edit_process.id)
                  edit_process.published = false
                }"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
         <div style="padding-left:166px; padding-right:166px">
        <hr id="hr-2">
        <q-tabs
          v-model="langTab"
          dense
          active-color="accent"
          indicator-color="accent"
          align="justify"
          narrow-indicator
        >
          <q-tab
            v-for="language in languages"
            :key="language.lang"
            :name="language.name"
            :label="language.name"
          />
        </q-tabs>
        
        <hr id="hr-2">
         </div>
        <div
          class=" q-pa-xsm row div-6"
        >
        <HelpLabel
            :fieldLabel="$t('input_labels.generated_docs')"
            :helpLabel="$t('help.generated_docs')"
            class="tag"
            style="padding-bottom:15px" />
          <q-select
            data-cy="add_produced_doc"
            filled
            dense
            clearable
            :readonly="edit_process.published == true"
            v-model="edit_process.producedDoc"
            @add="addDoc($event)"
            @remove="removeDoc($event)"
            @clear="clearAllDocs()"
            multiple
            emit-value
            map-options
            :options="this.docOptions"
            class="select"
          />
        </div>
        <div  class=" q-pa-xsm row div-6">
          <div class="col-6 tag">
            <HelpLabel
            :fieldLabel="$t('input_labels.user_tags')"
            :helpLabel="$t('help.user_tags')"
            class="tag" />
            
          </div>
          <div class="col-6 tag">
            <HelpLabel
            :fieldLabel="$t('input_labels.topic_tags')"
            :helpLabel="$t('help.topic_tags')"
            class="tag" />
          </div> 
        </div>
        <div
          class="q-pa-xsm row"
          id="div-7"
        >
          <div class="col-6 div-8">
            <q-select
              filled
              dense
              :readonly="edit_process.published == true"
              data-cy="add_user"
              clearable
              v-model="edit_process.applicableUsers"
              @add="addUserTag($event)"
              @remove="removeUserTag($event)"
              @clear="clearAllUsers()"
              multiple
              emit-value
              map-options
              :options="this.u_tags"
              class="select"
            />
            <q-chip
              v-for="tag in selected_u_tags"
              dense
              :key="tag"
            >{{tag}}</q-chip>
          </div>

          <div class="col-6 div-9">
            <q-select
              filled
              data-cy="add_topic"
              dense
              :readonly="edit_process.published == true"
              clearable
              v-model="edit_process.processTopics"
              @add="addTopicTag($event)"
              @remove="removeTopicTag($event)"
              @clear="clearAllTopics()"
              multiple
              emit-value
              map-options
              :options="this.t_tags"
              class="select"
            />
            <q-chip
              v-for="tag in selected_t_tags"
              dense
              :key="tag"
            >{{tag}}</q-chip>
          </div>
        </div>
         <div class=" q-pa-xsm row div-6" style="padding-bottom:20px">
        <div class="col-2" style="min-width:130px; max-width:130px">
          <HelpLabel
            :fieldLabel="$t('input_labels.is_published')"
            :helpLabel ="$t('help.is_published')"
            class="tag"
          />
        </div>
        <div class="col" style="padding-top:2px; text-align:left">
          <q-toggle
            v-model="edit_process.published"
            :disable="edit_process.translations.filter(filterTranslationModel(this.activeLanguage))[0].translationState < 2"
            @input="isPublished($event, edit_process.id)"
            color="accent"
          />
        </div>
      </div>
      <div style="padding-left:166px; padding-right:166px">
       
        
        <hr id="hr-2">
        <CommentList 
        style="text-align:left;"
        :selected_process_comments="selected_process_comments"/>
      </div>
        <div id="div-10">
          <div class="q-pa-md q-gutter-md col-4 div-11">
            <q-btn
            :data-cy="'back_to_process'.concat(theprocessid)"
              class="delete-button"
              no-caps
              rounded
              :label="$t('button.back')"
              unelevated
              style=""
              to="/guided_process_editor"
            />
            <q-btn
            :data-cy="'manageprocess'.concat(theprocessid)"
              color="secondary"
              no-caps
              rounded
              :label="$t('button.manage_steps')"
              unelevated
              :disable="this.disabled || edit_process.published"
              class="button"
              @click="manageProcess()"
            />

            <q-btn
            :data-cy="'saveprocess'.concat(theprocessid)"
              color="accent"
              no-caps
              rounded
              :disable="edit_process.published"
              :label="$t('button.save')"
              unelevated
              class="button"
              @click="savingProcess(edit_process)"
            />

          </div>
        </div>
      </q-card>

    </div>
  </div>
</template>

<script>
import editEntityMixin from '../mixin/editEntityMixin'
import GlossaryEditor from 'components/GlossaryEditor'
import storeMappingMixin from '../mixin/storeMappingMixin'
import translatedButtonMixin from '../mixin/translatedButtonMixin'
import CommentList from 'components/CommentList'
import HelpLabel from 'components/HelpLabel'


export default {
  name: 'PageIndex',
  mixins: [editEntityMixin,
    translatedButtonMixin,
    storeMappingMixin({
      getters: {
        processes: 'flows/processes',
        topic: 'topic/topic_published',
        user: 'user_type/user',
        documents: 'document_type/document_types',
        steps: 'steps/steps',
        process_comments: 'comments/process_comments',
        comments: 'comments/comments',
      }, actions: {
        saveProcess: 'flows/saveProcess',
        fetchFlows: 'flows/fetchFlows',
        editProcess: 'flows/editProcess',
        fetchTopic: 'topic/fetchTopic',
        fetchUserType: 'user_type/fetchUserType',
        fetchDocumentType: 'document_type/fetchDocumentType',
        fetchCommentsByProcess: 'comments/fetchCommentsByProcess',
        fetchSteps: 'steps/fetchSteps',
        updatePublished: 'flows/updatePublished',
        saveTranslationProd: 'flows/saveTranslationProd',
        deleteTranslationProd: 'flows/deleteTranslationProd',
        saveStepTranslationProd: 'steps/saveTranslationProd',
        deleteStepTranslationProd: 'steps/deleteTranslationProd',
        fetchComments: 'comments/fetchComments'
      }
    })],
  props: ["theprocessid"],
  components: {
    GlossaryEditor,CommentList,HelpLabel
  },
  data () {
    return {
      theprocess: null,
      id: this.$route.params.id,
      is_new: true,
      edit_process: { id: -1, applicableUsers: [], translations: [], processTopics: [], link: "", published:false },
      u_tags: [

      ],
      selected_u_tags: [],
      t_tags: [
      ],
      selected_t_tags: [],
      docOptions: [],
      selectedDocs: [],
      selected_process_comments:[], 
      publishedOrig:false
    }
  },
  computed: {
    title () {
      return this.theprocess.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].process
    },

    disabled () {
      if (this.theprocessid != null) {
        return false
      }
      else {
        return true
      }
    }

  },
  methods: {
    test(value){
      console.log(value)
    },
    manageProcess () {
      this.$router.push({ name: 'editstep', params: { processId: this.theprocessid } })
    },
    addDoc (value) {
      console.log(value)

      var doc = this.documents.filter((a_doc) => {
        return a_doc.id == value.value
      })[0]
      var the_doc_transl = doc.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document
      this.selectedDocs.push(the_doc_transl)

    },
    removeDoc (value) {
      console.log(value)
      var idx = this.selectedDocs.indexOf(value)
      this.selectedDocs.splice(value.index, 1)
    },
    clearAllDocs () {
      this.selectedDocs = []
    },
    addUserTag (value) {
      console.log(value)

      var the_user = this.user.filter((a_user) => {
        return a_user.id == value.value
      })[0]
      var the_user_transl = the_user.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType
      this.selected_u_tags.push(the_user_transl)

    },
    removeUserTag (value) {
      console.log(value)
      var idx = this.selected_u_tags.indexOf(value)
      this.selected_u_tags.splice(value.index, 1)
    },
    clearAllUsers () {
      this.selected_u_tags = []
    },
    addTopicTag (value) {
      console.log(value)

      var the_topic = this.topic.filter((a_topic) => {
        return a_topic.id == value.value
      })[0]
      var the_topic_transl = the_topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic
      this.selected_t_tags.push(the_topic_transl)

    },
    removeTopicTag (value) {
      console.log(value)

      this.selected_t_tags.splice(value.index, 1)
    },
    clearAllTopics () {
      this.selected_t_tags = []
    },
   isPublished(event,value){
     console.log("event ")
      console.log(event)
      console.log("user id")
      console.log(value)
      var publishing_process =  this.processes.filter((doc)=>{
        return doc.id == value
      })[0]
      console.log("i am doc to publish")
      console.log(publishing_process)
      var publishing_steps = this.steps.filter((step)=>{
        return step.idProcess == value
      }) 
      console.log("i am steps to publish")
      console.log(publishing_steps)
      if( event == true){
        this.$q.notify({
        type: 'warning',
        message: 'Warning: Publishing the process will make it visible on the migrant app and no changes will be possible before unpublishing. Proceed?',
        actions: [
          { label: 'Yes', color: 'accent', handler: () => { 
            this.updatePublished({process:publishing_process, published:event})
            this.saveTranslationProd(value)
            this.saveStepTranslationProd(publishing_steps)
            setTimeout(() => { this.$router.push({ path: '/guided_process_editor' }) }, 300); } },
          { label: 'No', color: 'red', handler: () => { 
            this.edit_process.published = false } }
        ]
      })
       
      }
      else{
        this.$q.notify({
        type: 'warning',
        message: 'Warning: Unpublishing the process will delete all existing translations. Proceed?',
        actions: [
          { label: 'Yes', color: 'accent', handler: () => { 
            this.updatePublished({process:publishing_process, published:event})
            this.deleteTranslationProd(value)
            this.deleteStepTranslationProd(publishing_steps)}},
          { label: 'No', color: 'red', handler: () => { 
            this.edit_process.published = true } }
        ]
      })
       
      }
     },
    /*isPublished(value){
       console.log(value)
      var publishing_process =  value
      console.log("i am process to publish")
      console.log(publishing_process)
      var publishing_steps = this.steps.filter((step)=>{
        return step.idProcess == value.id
      }) 
      console.log("i am steps to publish")
      console.log(publishing_steps)
      
      if( value.published == true){
        this.updatePublished({process:publishing_process, published: value.published})
        this.saveTranslationProd(value.id)
        this.saveStepTranslationProd(publishing_steps)

      }
      else{
        this.updatePublished({process:publishing_process, published: value.published})
      }
     },*/
    async savingProcess (value) {
      let workingProcess = JSON.parse(JSON.stringify(this.edit_process))

      if (this.is_new) {
        console.log(workingProcess)
        await this.saveProcess({process:workingProcess, defaultLang:this.$defaultLang})
        console.log(this.$store.state.flows)
        console.log(this.edit_process.id)
      }
      else {
        await this.editProcess({process:value,defaultLang:this.$defaultLang })
        console.log("i am ublished orig")
        console.log(this.publishedOrig)
        console.log("i am published of the form")
        console.log(value.published)
        /*if(value.published != this.publishedOrig){
          this.isPublished(value)
        }*/
        console.log("I am this is new")
        console.log(this.is_new)
        console.log(value)
        console.log(this.edit_process)
        console.log(this.$store.state.flows)
      }
      setTimeout(() => { this.$router.push({ path: '/guided_process_editor' }) }, 500);
      
    },

    createShell () {
      this.edit_process = { id: -1, applicableUsers: [], translations: [], processTopics: [], producedDoc: [], link: "", published:false }
      this.languages.forEach(l => {
        this.edit_process.translations.push({ id: -1, lang: l.lang, process: '', description: '', published: false, translationDate: null, translationState: 0 })
      })
    },
    mergeProcess (process) {
      console.log("MERGING")
      console.log(process)
      this.edit_process.id = process.id
      this.edit_process.link = process.link
      //this.edit_process.published = process.published
      //this.edit_process.publicationDate = process.publicationDate
      this.edit_process.applicableUsersOrig = []
      this.edit_process.processTopicsOrig = []
      this.edit_process.published = process.published
      process.translations.forEach(pr => {
        console.log(pr)

        for (var i = 0; i < this.edit_process.translations.length; i++) {
          if (this.edit_process.translations[i].lang == pr.lang) {
            this.edit_process.translations.splice(i, 1)
            this.edit_process.translations.push(JSON.parse(JSON.stringify(pr)))
            break
          }
        }
      })
      console.log("pre-topics foreach")
      if (process.producedDoc != null) {
        process.producedDoc.forEach(the_doc => {
          this.edit_process.producedDoc.push(the_doc.idDocument)

          var the_doc = this.documents.filter((a_doc) => {
            return a_doc.id == the_doc.idDocument
          })[0]
          var the_doc_transl = the_doc.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document
          this.selectedDocs.push(the_doc_transl)
        })
      }
      // here we have to cycle on topics and use the processTopics data to set the chosen ones
      if (process.processTopics != null) {
        process.processTopics.forEach(the_topic => {
          this.edit_process.processTopics.push(the_topic.idTopic)

          var the_topic = this.topic.filter((a_topic) => {
            return a_topic.id == the_topic.idTopic
          })[0]
          console.log(the_topic)
          var the_topic_transl = the_topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic
          this.selected_t_tags.push(the_topic_transl)
        })
      }

      if (process.applicableUsers != null) {
        process.applicableUsers.forEach(the_user => {
          this.edit_process.applicableUsers.push(the_user.idUserTypes)

          var the_user = this.user.filter((a_user) => {
            return a_user.id == the_user.idUserTypes
          })[0]
          var the_user_transl = the_user.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType
          this.selected_u_tags.push(the_user_transl)

        })
      }

      console.log("THE MERGED OBJECT")
      console.log(this.edit_process)




    }
  },
  async created () {
    console.log(this.$defaultLang)
    console.log(this.$defaultLangString)
    this.createShell()
     this.fetchSteps()
      .then(steps => {
        this.loading = false
        console.log(this.steps)
      })
    await this.fetchFlows()
      .then(flows => {
        console.log(this.processes)
        console.log(this.theprocessid)
        this.loading = false
        var temp = this.processes.filter((current_process) => {
          return current_process.id == this.theprocessid
        })[0]
        console.log(temp)
        this.theprocess = temp
        if(temp != null){
          this.publishedOrig = this.theprocess.published
        }
        console.log("I am the process")
        console.log(this.theprocess)
      })
    await this.fetchTopic()
      .then((topics) => {
        console.log(topics)
         var published_topics = topics.filter((top)=>{return top.published == true})
        published_topics.forEach(topic => {
          var the_topic = { label: topic.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].topic, value: topic.id }
          this.t_tags.push(the_topic)
        })

      })
    await this.fetchUserType()
      .then(user_type => {
        console.log(user_type)
        var published_user_type= user_type.filter((top)=>{return top.published == true})
        published_user_type.forEach(ut => {
          var the_user = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].userType, value: ut.id }
          this.u_tags.push(the_user)
        })
      })
    await this.fetchDocumentType()
      .then(docs => {
        console.log(docs)
        var published_docs= docs.filter((top)=>{return top.published == true})
        published_docs.forEach(ut => {
          var doc = { label: ut.translations.filter(this.filterTranslationModel(this.activeLanguage))[0].document, value: ut.id }
          this.docOptions.push(doc)
        })
        console.log(this.docOptions)
      })
    console.log("THEPROCESS:")
    console.log(this.theprocess)
    
    if (this.theprocess != null) {
      this.fetchComments().then((commentlist)=>{
      console.log(commentlist)
      this.fetchCommentsByProcess(this.theprocessid).then((the_comments)=>{
        the_comments.forEach((comment) =>{
                  console.log("INSIDE FOREACH")
                  console.log(comment)
                  for(var i = 0; i < this.comments.length; i++){
                    console.log("INSIDE FOR")
                    if(comment.idcomment == this.comments[i].id){
                      console.log("INSIDE IF")
                      this.selected_process_comments.push(this.comments[i])
                      console.log(this.selected_process_comments)
                    }
                  }
                    })
      })
    })
    
      this.is_new = false
      this.mergeProcess(this.theprocess)
      console.log(this.edit_process)
      console.log
      
    }
    // }
  }

}
</script>
<style scoped>
.delete-button {
  background-color: white;
  color: black;
  border: 1px solid #c71f40;
  width: 150px;
  border-radius: 2px;
}
.button {
  width: 150px;
  border-radius: 2px;
}
.banner {
  font-style: normal;
  height: 72px;
  text-align: center;
  padding-top: 15px;
  font-weight: bold;
  font-size: 30px;
  line-height: 41px;
  color: white;
  background-color: #ff7c44;
}
.container {
  display: inline-block;
  margin-bottom: 1px;
  width: 80%;
}
.tag {
  text-align: left;
  font-size: 15px;
}
#div-1 {
  text-align: center;
  padding-top: 40px;
}
#div-2 {
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 150px;
  padding-right: 150px;
}
#div-3 {
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  padding-bottom: 15px;
}
#div-4 {
  padding-bottom: 5px;
  padding-left: 150px;
  padding-right: 150px;
}
#div-5 {
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 15px;
}
.div-6 {
  padding-top: 20px;
  padding-left: 166px;
  padding-right: 150px;
}
#div-7 {
  padding-left: 150px;
  padding-right: 150px;
}
.div-8 {
  padding-left: 16px;
  padding-top: 15px;
}
.select {
  width: 100%;
  padding-right:16px
}
.div-9 {
  padding-left:16px;
  
  padding-top: 15px;
}
#hr-1 {
  width: 85%;
  border: 0.999px solid #dadada;
  margin-top: 90px;
}
#hr-2 {
  width: 100%;
  border: 0.999px solid #dadada;
}
#div-10 {
  padding-top:30px;
  text-align: left;
  padding-left: 150px;
}
.div-11 {
  display: inline-block;
}
.left{
  text-align: left;
}
.desc-editor .editor-options {
  width: 100%;
  margin-bottom:10px
}
.form-help{
  padding-top:30px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
}
</style>
