<template>
  <div>
    <span v-if="loading">Loading...</span>
    <edit-element
      v-if="!loading"
      :elem="elem"
      :save_item_fn="saveEventItem"
      :pagetitle="pagetitle"
      :categories="eventCategories"
      categories_enabled
      topics_enabled
      :topics="topics"
      user_types_enabled
      :user_types="user_types"
      is_event
      :title_max_length="255"
    />
  </div>
</template>

<script>
import EditElement from 'components/EditElement'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditEventElement',
  components: {
    'edit-element': EditElement
  },
  data() {
    return {
      loading: true
    }
  },
  props: {
    elem: {
      type: Object
    },
    pagetitle: {
      type: String
    },
    topics: {
      type: Array
    },
    user_types: {
      type: Array
    }
  },
  methods: {
    ...mapActions('event_category', ['fetchEventCategory']),
    saveEventItem(translations) {
      this.$emit('save', translations)
    }
  },
  computed: {
    ...mapGetters('event_category', ['eventCategories'])
  },
  created() {
    this.loading = true
    this.fetchEventCategory().then(() => {
      this.loading = false
    }).catch((err) => {
      this.$q.notify({
        type: 'negative',
        message: `Error while fetching event categories: ${err}`
      })
    })
  }
}
</script>

<style lang="scss" scoped></style>
