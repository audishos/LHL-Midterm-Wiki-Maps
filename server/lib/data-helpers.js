module.exports = function makeDataHelpers(knex){
  return {
    getMaps: function(){
      knex('maps').select()
      .then((results) =>{
        console.log(results);
      })
      .catch((e) => e)
    }
  }
}