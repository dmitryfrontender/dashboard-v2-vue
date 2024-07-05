<script setup lang="ts">
import { routes } from '@/router/routes';
import SlideContainer from '@/components/SlideContainer.vue';
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import CustomInput from '@/components/form/CustomInput.vue';
import FormOutput from '@/components/form/FormOutput.vue';
import SlideTitle from '@/components/SlideTitle.vue';

const formValues = reactive({
  firstName: '',
  lastName: '',
  contact: {
    email: ''
  }
});
const form = useVuelidate(
  {
    firstName: { required },
    lastName: { required },
    contact: {
      email: { required, email }
    }
  },
  formValues
);
</script>

<template>
  <SlideContainer
    :prev-link="routes.home"
    :next-link="routes.virtualizationExample"
  >
    <div class="flex flex-col gap-10 w-full h-full px-10 justify-center">
      <SlideTitle>Form Example</SlideTitle>
      <div class="flex gap-8 w-full justify-around flex-col items-center lg:flex-row text-1xl">
        <div class="w-72">
          {<br />
          &nbsp;&nbsp;firstName: <CustomInput v-model="form.firstName.$model" />,<br />
          &nbsp;&nbsp;lastName:<CustomInput v-model="form.lastName.$model" />,<br />
          &nbsp;&nbsp;contact: {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;email: <CustomInput v-model="form.contact.email.$model" />,<br />
          &nbsp;&nbsp;}<br />
          }
        </div>
        <div class="w-72">
          {<br />
          &nbsp;&nbsp;firstName: <FormOutput
            :errors="form.firstName.$errors"
            :value="formValues.firstName"
          />,<br />
          &nbsp;&nbsp;lastName: <FormOutput
            :errors="form.lastName.$errors"
            :value="formValues.lastName"
          />,<br />
          &nbsp;&nbsp;contact: {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;email: <FormOutput
            :errors="form.contact.email.$errors"
            :value="formValues.contact.email"
          />,<br />
          &nbsp;&nbsp;}<br />
          }
        </div>
      </div>
    </div>
  </SlideContainer>
</template>
