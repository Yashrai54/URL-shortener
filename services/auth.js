const uuidtousermap=new Map();

function setUser(id,user){
    uuidtousermap.set(id,user)
}
function getUser(id){
    return uuidtousermap.get(id)
}
module.exports={setUser,getUser}