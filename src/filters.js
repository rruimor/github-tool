import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDateTime', value => {
  if (!value) return ''
  return moment(String(value)).format('MM/DD/YYYY hh:mm')
})

Vue.filter('asTimeAgo', value => {
  if (!value) return ''
  return moment(String(value)).fromNow()
})

// export default Filters