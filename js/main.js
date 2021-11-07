//update total amount of replays
let totalReplays = 890;

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
    }
  });

document.getElementById("total-replays").textContent = totalReplays;
