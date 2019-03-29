<script>
import service from '@/utils/request.js'

export default {
  name: 'ConnectToPostgreSQL',
  components: {
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      baseURL: 'http://194.58.100.161:3000'
    }
  },
  mounted() {
    this.getObjectData(this.query)
  },
  methods: {
    getObjectData: function(query) {
      service({
        method: 'post',
        url: '/select',
        data: {
          typeObject: 'object',
          nameObject: query
          // nameObject: 'public.test'
        }
      })
        .then(res => {
          console.log('res', res.data[0])
          this.convertInputArray(res.data[0])
          return res.data[0]
        })
        .catch(err => {
          console.log('err = ', err)
        })
    }
  }
}
</script>
