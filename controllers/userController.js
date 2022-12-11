const User = require("../models/user");
// const Slot = require("../models/slot");

exports.entry = function (req, res) {
    res.render("login", { condition: false, message: "" });
}

exports.login = async function(req,res) {
    const username = (req.body.username).trim();
    const password = req.body.password;

    await User.findOne({ username: username }, async function (err, foundUser) {
        if (err) {
            console.log("Error occured in finding user");
        } else {
            if (foundUser) {
                if(password === foundUser.password){
                    req.session.isAuth = true;
                    req.session.username = username;
                    res.redirect("/home");
                } else {
                    res.render("login", { condition: true, message: "Invalid Username/Password, If you haven't signed up please signup first" });
                }
            } else {
                // console.log("User not found");
                res.render("login", { condition: true, message: "Invalid Username/Password, If you haven't signed up please signup first" });
            }
        }
    }).clone().catch(function(err){ console.log(err)});
}

exports.signup = async function(req,res) {
    const username = (req.body.username).trim();
    const password = req.body.password;

    await User.findOne({ username: username }, async function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                res.render("login", { condition: true, message: "Username already in use" });
            } else {
                const signUpUser = new User({
                    username: username,
                    password: password,
                    age: 0,
                    batch1: 0,
                    batch2: 0,
                    amount: 0
                });

                try {
                    signUpUser.save();
                    req.session.isAuth = true;
                    req.session.username = username;
                    // console.log(signUpUser);
                    res.redirect("home");
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }).clone().catch(function (err) { console.log(err) });
}

exports.home = async function(req,res) {
    // console.log(req.session.username);
    await User.findOne({username:req.session.username}, async function(err,foundUser){
        if(err){
            console.log("error");
        }else{
            // console.log(founduser.username);
            if(foundUser.batch1 === 0){
                res.render("home",{condition:true, name: req.session.username, batch1:foundUser.batch1, batch2: foundUser.batch2, amount: foundUser.amount});
            }else{
                res.render("home",{condition:false, name: req.session.username, batch1:foundUser.batch1, batch2: foundUser.batch2, amount: foundUser.amount});
            }
        }
    }).clone().catch(function(err){ console.log(err)});
}

exports.join_get = function(req,res){
    res.render("join",{condition: 0, message: ""});
}

exports.get_batch = async function(req,res){
    var one=10;
    var two=10;
    var three=10;
    var four=10;

    var one1=10;
    var two1=10;
    var three1=10;
    var four1=10;
            
    await User.find({},async function(err,user){
        if(err){
            console.log(err);
        }else{
            // console.log(user);
            await user.map(async function(users){
                // console.log(users.batch1);
                // console.log(users.batch2);
                // console.log(users);
                if(users.batch1 === 1){
                    one=one-1;
                }
                if(users.batch1 === 2){
                    two=two-1;
                }
                if(users.batch1 === 3){
                    three=three-1;
                }
                if(users.batch1 === 4){
                    four=four-1;
                }
                if(users.batch2 === 1){
                    one1--;
                }
                if(users.batch2 === 2){
                    two1--;
                }
                if(users.batch2 === 3){
                    three1--;
                }
                if(users.batch2 === 4){
                    four1--;
                }
            })
            res.render("batch",{condition:false,message:"",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
        }
    }).clone().catch(function(err){ console.log(err)});

    // console.log(one);
    // console.log(one1);

    
}

exports.batch = async function(req,res){
    
    // await User.findOne({username:(req.body.username).trim()},async function(err,foundUser){
    //     if(err){
    //         console.log(err);
    //     }else{
            var username=req.session.username;
            var age=req.body.age;

            var one=10;
                            var two=10;
                            var three=10;
                            var four=10;
            
                            var one1=10;
                            var two1=10;
                            var three1=10;
                            var four1=10;
            
                            await User.find({},function(err,user){
                                if(err){
                                    console.log(err);
                                }else{
                                    user.map(users => {
                                        // console.log(users.batch1);
                                        if(users.batch1 === 1){
                                            one=one-1;
                                        }
                                        if(users.batch1 === 2){
                                            two=two-1;
                                        }
                                        if(users.batch1 === 3){
                                            three=three-1;
                                        }
                                        if(users.batch1 === 4){
                                            four=four-1;
                                        }
                                        if(users.batch2 === 1){
                                            one1--;
                                        }
                                        if(users.batch2 === 2){
                                            two1--;
                                        }
                                        if(users.batch2 === 3){
                                            three1--;
                                        }
                                        if(users.batch2 === 4){
                                            four1--;
                                        }
                                    });
                                }
                            }).clone().catch(function(err){ console.log(err)});

            if(req.session.username === req.body.username){
                await User.findOneAndUpdate({username:username},{$set: {age:age}},async function(err,foundUser){
                    if(err){
                        console.log(err);
                    }else{
                        if(age>=18 && age<=65){
                            res.render("batch",{condition:false,message:"",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
                        }else{
                            res.render("join",{condition: 2, message: "Person from age 18 till 65 are eligible for this Yoga class"});
                        }
                    }
                }).clone().catch(function(err){ console.log(err)});
            }else{
                res.render("join",{condition:1,message:"User not found, Enter correct username"});
            }
    //     }
    // }).clone().catch(function(err){ console.log(err)});
    
}

exports.batch_select = async function(req,res){
    var username=req.session.username;
    var batch1=req.body.selectBatch;
    
    var one=10;
    var two=10;
    var three=10;
    var four=10;

    var one1=10;
    var two1=10;
    var three1=10;
    var four1=10;
            
    await User.find({},function(err,user){
        if(err){
            console.log(err);
        }else{
            user.map(users => {
                // console.log(users.batch1);
                if(users.batch1 === 1){
                    one=one-1;
                }
                if(users.batch1 === 2){
                    two=two-1;
                }
                if(users.batch1 === 3){
                    three=three-1;
                }
                if(users.batch1 === 4){
                    four=four-1;
                }
                if(users.batch2 === 1){
                    one1--;
                }
                if(users.batch2 === 2){
                    two1--;
                }
                if(users.batch2 === 3){
                    three1--;
                }
                if(users.batch2 === 4){
                    four1--;
                }
            })
        }
    }).clone().catch(function(err){ console.log(err)});

    // console.log(batch1);
    // console.log(username);

    if(batch1 === "1"){
        if(one>0){
            await User.findOne({username:username},async function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                    // console.log(foundUser.batch1);
                    if(foundUser.batch1 === 0){
                        var A=foundUser.amount;
                        A=A+500;
                        await User.findOneAndUpdate({username:username},{$set:{batch1:batch1,amount:A}},function(err,done){
                            if(err){
                                console.log(err);
                            }else{
                                if(done){
                                    // console.log(done.batch1);
                                    res.render("home",{condition:false, name: req.session.username, batch1:batch1, batch2: done.batch2, amount: A});
                                }
                            }
                        }).clone().catch(function(err){ console.log(err)});
                    }else{
                        res.render("batch",{condition:true,message:"Batch for this current month cannot be changed, you can change the batch for next month",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
                    }
                }
            }).clone().catch(function(err){ console.log(err)});;
        }else{
            res.render("batch",{condition:true,message:"Slots for this batch are not available",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
        }
    }else if(batch1 === "2"){
        if(two>0){
            await User.findOne({username:username},async function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                    if(foundUser.batch1 === 0){
                        var A=foundUser.amount;
                        A=A+500;
                        await User.findOneAndUpdate({username:username},{$set:{batch1:batch1,amount:A}},function(err,done){
                            if(err){
                                console.log(err);
                            }else{
                                if(done){
                                    res.render("home",{condition:false, name: req.session.username, batch1:batch1, batch2: done.batch2, amount: A});
                                }
                            }
                        }).clone().catch(function(err){ console.log(err)});
                    }else{
                        res.render("batch",{condition:true,message:"Batch for this current month cannot be changed, you can change the batch for next month",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
                    }
                }
            }).clone().catch(function(err){ console.log(err)});;
        }else{
            res.render("batch",{condition:true,message:"Slots for this batch are not available",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
        }
    }else if(batch1 === "3"){
        if(three>0){
            await User.findOne({username:username},async function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                    if(foundUser.batch1 === 0){
                        var A=foundUser.amount;
                        A=A+500;
                        await User.findOneAndUpdate({username:username},{$set:{batch1:batch1,amount:A}},function(err,done){
                            if(err){
                                console.log(err);
                            }else{
                                if(done){
                                    res.render("home",{condition:false, name: req.session.username, batch1:batch1, batch2: done.batch2, amount: A});
                                }
                            }
                        }).clone().catch(function(err){ console.log(err)});
                    }else{
                        res.render("batch",{condition:true,message:"Batch for this current month cannot be changed, you can change the batch for next month",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
                    }
                }
            }).clone().catch(function(err){ console.log(err)});;
        }else{
            res.render("batch",{condition:true,message:"Slots for this batch are not available",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
        }
    }else if(batch1 === "4"){
        if(four>0){
            await User.findOne({username:username},async function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                    if(foundUser.batch1 === 0){
                        var A=foundUser.amount;
                        A=A+500;
                        await User.findOneAndUpdate({username:username},{$set:{batch1:batch1,amount:A}},function(err,done){
                            if(err){
                                console.log(err);
                            }else{
                                if(done){
                                    res.render("home",{condition:false, name: req.session.username, batch1:batch1, batch2: done.batch2, amount: A});
                                }
                            }
                        }).clone().catch(function(err){ console.log(err)});
                    }else{
                        res.render("batch",{condition:true,message:"Batch for this current month cannot be changed, you can change the batch for next month",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
                    }
                }
            }).clone().catch(function(err){ console.log(err)});;
        }else{
            res.render("batch",{condition:true,message:"Slots for this batch are not available",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
        }
    }else{
        res.render("batch",{condition:true,message:"Enter batch between 1 and 4 inclusive",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
    }
}

exports.batch_change = async function(req,res){
    var username=req.session.username;
    var batch2=req.body.changeBatch;

    var one=10;
    var two=10;
    var three=10;
    var four=10;

    var one1=10;
    var two1=10;
    var three1=10;
    var four1=10;
            
    await User.find({},function(err,user){
        if(err){
            console.log(err);
        }else{
            user.map(users => {
                // console.log(users.batch1);
                if(users.batch1 === 1){
                    one=one-1;
                }
                if(users.batch1 === 2){
                    two=two-1;
                }
                if(users.batch1 === 3){
                    three=three-1;
                }
                if(users.batch1 === 4){
                    four=four-1;
                }
                if(users.batch2 === 1){
                    one1--;
                }
                if(users.batch2 === 2){
                    two1--;
                }
                if(users.batch2 === 3){
                    three1--;
                }
                if(users.batch2 === 4){
                    four1--;
                }
            })
        }
    }).clone().catch(function(err){ console.log(err)});

    if(batch2 === "1"){
        if(one1>0){
            await User.findOne({username:username},async function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                    if(foundUser){
                        if(foundUser.batch2 === 0){
                            var A=foundUser.amount;
                            A=A+500;
                            await User.findOneAndUpdate({username:username},{$set:{batch2:batch2,amount:A}},function(err,done){
                                if(err){
                                    console.log(err);
                                }else{
                                    if(done){
                                        res.render("home",{condition:false, name: req.session.username, batch1:done.batch1, batch2: batch2, amount: A});
                                    }
                                }
                            }).clone().catch(function(err){ console.log(err)});
                        }else{
                            await User.findOneAndUpdate({username:username},{$set:{batch2:batch2}},function(err,done){
                                if(err){
                                    console.log(err);
                                }else{
                                    if(done){
                                        res.render("home",{condition:false, name: req.session.username, batch1:done.batch1, batch2: batch2, amount: done.amount});
                                    }
                                }
                            }).clone().catch(function(err){ console.log(err)});
                        }
                    }
                }
            }).clone().catch(function(err){ console.log(err)});
            
        }else{
            res.render("batch",{condition:true,message:"Slots for this batch are not available",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
        }
    }else if(batch2 === "2"){
        if(two1>0){
            await User.findOne({username:username},async function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                    if(foundUser){
                        if(foundUser.batch2 === 0){
                            var A=foundUser.amount;
                            A=A+500;
                            await User.findOneAndUpdate({username:username},{$set:{batch2:batch2,amount:A}},function(err,done){
                                if(err){
                                    console.log(err);
                                }else{
                                    if(done){
                                        res.render("home",{condition:false, name: req.session.username, batch1:done.batch1, batch2: batch2, amount: A});
                                    }
                                }
                            }).clone().catch(function(err){ console.log(err)});
                        }else{
                            await User.findOneAndUpdate({username:username},{$set:{batch2:batch2}},function(err,done){
                                if(err){
                                    console.log(err);
                                }else{
                                    if(done){
                                        res.render("home",{condition:false, name: req.session.username, batch1:done.batch1, batch2: batch2, amount: done.amount});
                                    }
                                }
                            }).clone().catch(function(err){ console.log(err)});
                        }
                    }
                }
            }).clone().catch(function(err){ console.log(err)});
        }else{
            res.render("batch",{condition:true,message:"Slots for this batch are not available",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
        }
    }else if(batch2 === "3"){
        if(three1>0){
            await User.findOne({username:username},async function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                    if(foundUser){
                        if(foundUser.batch2 === 0){
                            var A=foundUser.amount;
                            A=A+500;
                            await User.findOneAndUpdate({username:username},{$set:{batch2:batch2,amount:A}},function(err,done){
                                if(err){
                                    console.log(err);
                                }else{
                                    if(done){
                                        res.render("home",{condition:false, name: req.session.username, batch1:done.batch1, batch2: batch2, amount: A});
                                    }
                                }
                            }).clone().catch(function(err){ console.log(err)});
                        }else{
                            await User.findOneAndUpdate({username:username},{$set:{batch2:batch2}},function(err,done){
                                if(err){
                                    console.log(err);
                                }else{
                                    if(done){
                                        res.render("home",{condition:false, name: req.session.username, batch1:done.batch1, batch2: batch2, amount: done.amount});
                                    }
                                }
                            }).clone().catch(function(err){ console.log(err)});
                        }
                    }
                }
            }).clone().catch(function(err){ console.log(err)});
        }else{
            res.render("batch",{condition:true,message:"Slots for this batch are not available",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
        }
    }else if(batch2 === "4"){
        if(four1>0){
            await User.findOne({username:username},async function(err,foundUser){
                if(err){
                    console.log(err);
                }else{
                    if(foundUser){
                        if(foundUser.batch2 === 0){
                            var A=foundUser.amount;
                            A=A+500;
                            // console.log(A);
                            await User.findOneAndUpdate({username:username},{$set:{batch2:batch2,amount:A}},function(err,done){
                                if(err){
                                    console.log(err);
                                }else{
                                    if(done){
                                        res.render("home",{condition:false, name: req.session.username, batch1:done.batch1, batch2: batch2, amount: A});
                                    }
                                }
                            }).clone().catch(function(err){ console.log(err)});
                        }else{
                            await User.findOneAndUpdate({username:username},{$set:{batch2:batch2}},function(err,done){
                                if(err){
                                    console.log(err);
                                }else{
                                    if(done){
                                        res.render("home",{condition:false, name: req.session.username, batch1:done.batch1, batch2: batch2, amount: done.amount});
                                    }
                                }
                            }).clone().catch(function(err){ console.log(err)});
                        }
                    }
                }
            }).clone().catch(function(err){ console.log(err)});
        }else{
            res.render("batch",{condition:true,message:"Slots for this batch are not available",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
        }
    }else{
        res.render("batch",{condition:true,message:"Enter batch between 1 and 4 inclusive",slot1:one,slot2:two,slot3:three,slot4:four,slot11:one1,slot22:two1,slot33:three1,slot44:four1});
    }
}

exports.signout = function (req, res) {
    req.session.destroy(err => {
        console.log(err);
    });
    res.redirect("/");
}