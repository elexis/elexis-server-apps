import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'

Vue.use(AsyncComputed, {
  useRawError: true,
  errorHandler (err) {
    console.log('An error occurred!')
    console.log('The error message was: ' + err.msg)
    console.log('And the stack trace was:')
    console.log(err.stack)
  }}
)