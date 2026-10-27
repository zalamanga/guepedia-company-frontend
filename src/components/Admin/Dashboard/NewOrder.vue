<template>
  <div id="new-order">
    <div class="row">
      <!-- Discussions Component -->
      <div class="col-lg-12 col-md-12 col-sm-12 mb-4">
        <div class="card card-small blog-comments">
          <div class="card-header border-bottom">
            <h6 class="m-0">Pesanan Store Baru</h6>
          </div>
          <div class="p-0">
            <div class="blog-comments__item d-flex p-3">
              <div class="blog-comments__avatar mr-3">
                <img src="images/avatars/1.jpg" alt="User avatar" />
              </div>
              <div class="blog-comments__content">
                <div class="blog-comments__meta text-muted">
                  <a class="text-secondary" href="#">James Johnson</a> on
                  <a class="text-secondary" href="#">Hello World!</a>
                  <span class="text-muted">– 3 days ago</span>
                </div>
                <p class="m-0 my-1 mb-2 text-muted">
                  Well, the way they make shows is, they make one show ...
                </p>
                <div class="blog-comments__actions">
                  <div class="btn-group btn-group-sm">
                    <button type="button" class="btn btn-white">
                      <span class="text-success">
                        <i class="material-icons">check</i>
                      </span>
                      Terima
                    </button>
                    <button type="button" class="btn btn-white">
                      <span class="text-danger">
                        <i class="material-icons">clear</i>
                      </span>
                      Tolak
                    </button>
                    <button type="button" class="btn btn-white">
                      <span class="text-light">
                        <i class="material-icons">more_vert</i>
                      </span>
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer border-top">
            <div class="row">
              <div class="col text-center view-report">
                <button type="submit" class="btn btn-white">
                  Lihat Semua Pesanan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Discussions Component -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      axios
        .get("notifications", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("admin_access_token"),
          },
        })
        .then((response) => {
          this.data = response.data.data.data;
        })
        .catch((error) => console.log(error))
        .finally(() => (this.loading = false));
    },
  },
};
</script>