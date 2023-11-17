<template>
  <div class="w-[50%]">
    <FormSchema :schema="test" />
  </div>
</template>

<script>
import swal from '../common/swal'
import FormSchema from '../components/FormSchema.vue';
export default {
  components: {
    FormSchema
  },
  data() {
    return {
      test: [
        {
          $formkit: 'group',
          config: { outerClass: 'form-custom' },
          children: [
            {
              $formkit: 'text',
              name: 'email',
              label: 'Email',
              // help: 'This will be used for your account.',
              validation: 'required|email',
              placeholder: 'abcd@gmail.com',
            },
            {
              $formkit: 'password',
              name: 'password',
              label: 'Password',
              validation: 'required|length:5,16',
            },
            {
              $formkit: 'password',
              name: 'password_confirm',
              label: 'Confirm password',
              validation: 'required|confirm',
              validationLabel: 'password confirmation',
            },
          ]
        }
      ]
    }
  },
  methods: {
  }
}
</script>
<style scoped>
</style>