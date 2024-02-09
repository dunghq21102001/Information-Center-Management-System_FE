<template>
  <div class="w-full pb-10">
    <FormSchema
      v-if="rolesFetched"
      :schema="userSchema"
      btn-name="Add"
      @form-submitted="handleAddUser"
    />
  </div>
</template>
<script>
import FormSchema from "../../components/FormSchema.vue";
import schemaConfig from "../../common/config/schemaConfig";
import API_ROLE from "../../API/API_ROLE";
import { useSystemStore } from "../../stores/System";
import API_USER from "../../API/API_USER";
import swal from "../../common/swal";
import { useAuthStore } from "../../stores/Auth";
export default {
  props: {},
  setup() {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    return { systemStore, authStore };
  },
  components: { FormSchema },
  data() {
    return {
      userSchema: [],
      rolesFetched: false,
    };
  },
  computed: {},
  created() {
    this.fetchRoles();
  },
  methods: {
    handleAddUser(formData) {
      this.systemStore.setChangeLoading(true);
      formData["PasswordHash"] = "string";
      API_USER.postUser(formData)
        .then((res) => {
          this.systemStore.setChangeLoading(false);
          swal.success("New user created successfully!");
        })
        .catch((err) => {
          this.systemStore.setChangeLoading(false);
        });
    },
    fetchRoles() {
      if (this.authStore.getAuth?.roleName == "Staff") {
        this.rolesFetched = true;
        this.userSchema = schemaConfig.userSchema(
          ["Male", "Female"],
          [
            {
              id: "d5fa55c7-315d-4634-9c73-08dbbc3f3a54",
              name: "Parent",
            },
          ]
        );
      } else {
      this.systemStore.setChangeLoading(true);
        API_ROLE.getRoles()
          .then((res) => {
            this.systemStore.setChangeLoading(false);
            this.rolesFetched = true;
            this.userSchema = schemaConfig.userSchema(
              ["Male", "Female"],
              res.data
            );
          })
          .catch((err) => {
            this.systemStore.setChangeLoading(false);
          });
      }
    },
  },
};
</script>
