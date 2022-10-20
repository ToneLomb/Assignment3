const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'lucas',
      password: 'admin',
      database: 'webassignment'
    }
  });


const getClubByFirstname = async (name) =>{
  try{
    const results = await knex('students').join('clubs','clubs.ClubID','=','students.ClubID').where({Firstname: name}).select('clubs.name');
    if(Object.keys(results).length != 0){
      respObj = {
            status: "success",
            data : results
      }
      return(respObj)
    }else{
      throw new Error("student is not in the database")
    }
  }catch(e){
      respObj = {
        status: "failed",
        data : 'Student is not in the database, try again'
      } 
      return respObj
    }
  }
    

const selectClubID = async (name) =>{
    const results = await knex('clubs').where({name: name}).select('ClubID', 'Name', 'Sport', 'SchoolID')
    return results;
}

const createClub = async (name,sport) => {
  try{
    const create = await knex('clubs').insert({Name: name, Sport: sport, SchoolID: 2});
    respObj = {
      status: "success",
      data: create
    }
    return respObj
  }catch(e){
    respObj = {
      status: "failed",
      data: "A club with this name already exists"
    }
    return respObj
  }
    
}

const updateStudent = async (ID,firstname,lastname,age,school)  =>{
    try{
      const query = await knex('students').where('StudentID','=',ID).update({Firstname: firstname, Lastname: lastname, age: age, SchoolID: school})
      if(query === 0){
        throw new Error("StudentID doesn't exist")
      }
      return {success: "true"}
    }catch(e){
      return{success: "false", reason: "Student or school ID doesn't exist, try again"}
    }
}

const deleteClub = async (ID) => {
    try{
      const query = await knex('clubs').where('ClubID','=',ID).del()
      if(query ===0){
        throw new Error("Club ID doesn't exist")
      }
      return {success: "true"}
    }catch(e){
      return{success: "false", reason: "Club ID doesn't exist, try again"}
    }
}

exports.deleteClub = deleteClub;
exports.updateStudent = updateStudent;
exports.createClub = createClub;
exports.selectClubID = selectClubID
exports.getClubByFirstname = getClubByFirstname;