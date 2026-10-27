<template>
    <div class="card card-small blog-comments" style="position: inherit; height: 100%;">
      <div class="card-header border-bottom">
        <div class="justify-content-center align-items-center">
          <h6 class="m-0">popup Toko</h6>
  
          <div class="popup-table mb-3">
            <vs-table>
              <template #thead>
                <vs-tr>
                  <vs-th> Gambar </vs-th>
                  <vs-th> Aksi </vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr v-for="item in data" :key="item.id_popup">
                  <vs-td> {{item.nama_popup}} </vs-td>
                  <vs-td>
                    <vs-button danger v-if="item.status == 1" @click="togglepopup(item.id_popup, item.status)">Matikan</vs-button>
                    <vs-button success v-else-if="item.status == 0" @click="togglepopup(item.id_popup, item.status)">Hidupkan</vs-button>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
  
          <div class="input-group mb-3">
            <input type="file" class="form-control" id="filepopup" v-on:change="addpopup()"/>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        data: [],
        form:{
          popup : null
        }
      };
    },
  
    methods: {
      addpopup() {
        this.loading = false;
  
        this.form.popup = document.getElementById("filepopup").files[0];
  
        var formData = new FormData();
        formData.append("file_popup", this.form.popup);
  
        return new Promise((resolve, reject) => {
          axios
            .post("popup", formData, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:
                  "Bearer " + localStorage.getItem("admin_access_token"),
              },
            })
            .then((response) => {
              this.openNotification(
                6000,
                "top-right",
                "success",
                "Berhasil",
                response.data.message
              );
  
              this.getData();
              this.form.popup = null
            })
            .catch((error) => {
              this.openNotification(
                6000,
                "top-right",
                "danger",
                "Gagal",
                error.response.data.message
              );
              reject(error);
              this.loading = false;
            });
        });
      },
  
      getData() {
        this.loading = true;
  
        axios
          .get("popup/all", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization:
                "Bearer " + localStorage.getItem("admin_access_token"),
            },
          })
          .then((response) => {
            this.data = response.data.data.popup;
            console.log(response);
          })
          .catch((error) => console.log(error))
          .finally(() => (this.loading = false));
      },
  
      togglepopup(id, status) {
        this.loading = true;
  
        if(status == 1){
          var url = 'popup/deactivate/'+id
        } else if(status == 0){
          var url = 'popup/activate/'+id
        }
  
        axios
          .get(url, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization:
                "Bearer " + localStorage.getItem("admin_access_token"),
            },
          })
          .then((response) => {
            this.openNotification(
              6000,
              "top-right",
              "success",
              "Berhasil",
              response.data.message
            );
  
            this.getData();
          })
          .catch((error) => console.log(error))
          .finally(() => (this.loading = false));
      },
    },
    mounted() {
      this.getData();
    },
  };
  </script>  