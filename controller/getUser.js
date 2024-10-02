const getUser = (req,res) => {
    const id = req.params.email;
    console.log(id);
res.send('hit get user')
}
module.exports = getUser;