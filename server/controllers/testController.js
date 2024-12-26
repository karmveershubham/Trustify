 const testController=(req,res)=>{
   try {
    res.status(200).send({
        message:"test router",
        success:true
    })
   } catch (error) {
    console.log(error)
   } 
}
module.exports={testController}