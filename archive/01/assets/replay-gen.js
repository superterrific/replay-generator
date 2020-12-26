//update total amount of replays
let totalReplays = 660;

const app = new Vue({
  el: '#app',
    data: {
        items: []
    },
    mounted: function(){
       this.loadItems();
    },

    methods: {
        loadItems: function(){
            let self = this
            let app_id = "apprRsVLcovhDTKr8";
            let app_key = "keyKvL1yJCWSr0N0U"; // read only key
			      let rando = Math.floor(Math.random() * totalReplays + 1);
            this.items = []

            axios.get("https://api.airtable.com/v0/"+app_id+"/Replays?filterByFormula=ID="+rando+"", {
                  headers: { Authorization: "Bearer "+app_key }
                })
                .then(function(response){
                  self.items = response.data.records
                })
                .catch(function(error){
                console.log(error);
            })
        }
    },

    // template
    template: `
    <main id="RRG">
      <div v-for="item in items" class="shadow">
      <!-- replay -->
        <div class="video-responsive">
          <iframe :src="'https://www.youtube-nocookie.com/embed/' + item['fields']['replay-id']" title="Random replay from YouTube" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      <!-- /replay -->

      <!-- race info -->
      <div class="card rounded-0 p-0 border-iframe">
        <div class="card-body">

          <div v-if="item['fields']['Warning']" class="alert alert-danger rounded-0 mb-3" role="alert"><svg class="icon-1-5x mr-1"><title>Warning</title><use xlink:href="#warning"></use></svg> This replay contains footage of an accident where horses and their riders may have been injured</div>

          <!-- flex container -->
          <div class="d-flex flex-wrap justify-content-between">
            <!-- flex container for race info -->
            <div>
              <div class="mb-3">
                <h2 class="mb-0">{{ item['fields']['year'] }} {{ item['fields']['race-name'] }}</h2>
                <div class="small text-gray">{{ item['fields']['track'] }} <span v-if="item['fields']['announcer']"> <span class="ml-1 mr-1 text-pipe">|</span>  Announcer: {{ item['fields']['announcer'] }}</span></div>
              </div>
              <div class="mb-2">
                <h3 class="mb-0">{{ item['fields']['winner'] }}</h3>
                <div class="small text-gray">Jockey: {{ item['fields']['jockey'] }} <span class="ml-1 mr-1 text-pipe">|</span> Trainer: {{ item['fields']['trainer'] }} <span v-if="item['fields']['chart-link']"> <span class="ml-1 mr-1 text-pipe">|</span> <a :href="item['fields']['chart-link']"  rel="noopener noreferrer" target="_blank" class="mr-1">Equibase Chart <svg class="icon-sm"><title>Equibase chart opens in a new window</title><use xlink:href="#external"></use></svg></a></span></div>
              </div>
              <!-- DH winner -->
              <span v-if="item['fields']['DH winner']">
                <h4 class="mb-0">{{ item['fields']['DH winner'] }}</h4>
                <div class="small text-gray">Jockey: {{ item['fields']['DH jockey'] }} <span class="ml-1 mr-1 text-pipe">|</span> Trainer: {{ item['fields']['DH trainer'] }}
              </span>
              <!-- /DH winner -->
            </div>
            <!-- /flex container for race info -->
            <!-- flex container for reload -->
            <div class="align-right">
              <button @click="loadItems" id="load-replay" onclick="clicky.log('#load-replay', 'Loaded a new replay');" class="btn btn-blue-light rounded-0">Gimme Another Replay!</button>

            </div>
            <!-- /flex container for reload -->
          </div>
          <!-- /flex container -->
        </div>
      </div>
      <!-- /race info -->
      </div>
    </div>
  </main>
      `
});

// display total amount of replays
document.getElementById("total-replays").textContent = totalReplays;
