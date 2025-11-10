const express = require("express");
const router = express.Router();
const userreward = require("../Reward/reward");
const moment = require("moment-timezone");


// POST /reward
router.post("/reward", (req, res) => {
    const { userId, stockSymbol, quantity, timestamp } = req.body;
    if (!userId || !stockSymbol || !quantity) {
        return res.status(400).json({ error: "Missing fields" });
    }

    // Check if already exists
    const existingReward = userreward.find(
        (r) => r.userId === userId && r.stockSymbol === stockSymbol
    );

    if (existingReward) {
        existingReward.quantity += quantity;
        existingReward.timestamp = moment().tz("Asia/Kolkata").format();
        return res.status(200).json({
            message: "Shares added to existing reward",
            userreward,
        });
    } else {
        var single_stock_price = 200 + Math.floor(Math.random() * 200);
        userreward.push({ userId, stockSymbol, quantity, single_stock_price, timestamp: timestamp || moment().tz("Asia/Kolkata").format() });
        return res.status(201).json({ message: "Reward recorded", userreward });
    }
});


// GET /today-stocks/:userId
router.get("/today-stocks/:userId", (req, res) => {
    const { userId } = req.params;
    const todaysEarn = userreward.filter(
        (r) =>
            r.userId == userId &&
            moment(r.timestamp).tz("Asia/Kolkata").isSame(moment().tz("Asia/Kolkata"), "day")
    );

    if (todaysEarn.length > 0) {
        return res.status(200).json({
            message: "User Exist and these are today's rewarded stocks",
            todaysEarn,
        });
    } else {
        return res.status(400).json({ message: "No reward for this user today" });
    }
});



router.get("/historical-inr/:userId", (req, res) => {
    const { userId } = req.params;
    // IST date only
    const todaysdate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
    const totalEarn = userreward.filter(
        (r) =>
            r.userId == userId &&
            moment(r.timestamp).tz("Asia/Kolkata").format("YYYY-MM-DD") != todaysdate
    );

    if (totalEarn.length > 0) {
        var totalAmount = 0;
        for (var i = 0; i < totalEarn.length; ++i) {
            totalAmount += (totalEarn[i].quantity * totalEarn[i].single_stock_price);
        }
        return res.status(200).json({
            message: "User Exist and these are total rewarded stocks",
            TotalAmount: totalAmount,
        });
    } else {
        return res.status(400).json({ message: "No historical reward for this user" });
    }
})

router.get("/stats/:userId", (req, res) => {
    const { userId } = req.params;
    const todaysEarn = userreward.filter(
        (r) =>
            r.userId == userId &&
            moment(r.timestamp).tz("Asia/Kolkata").isSame(moment().tz("Asia/Kolkata"), "day")
    );
    const totalEarn = userreward.filter(
        (r) =>
            r.userId == userId
    );
    var Total_rewarded_today = 0;
    var Current_INR_of_portfolio = 0;
    //for finding the total reward stock quantity earn by user today
    for (var i = 0; i < todaysEarn.length; i++) {
        Total_rewarded_today += todaysEarn[i].quantity;
    }
    //for finding total INR value of user portfolio
    for (var i = 0; i < totalEarn.length; i++) {
        Current_INR_of_portfolio += (totalEarn[i].quantity * totalEarn[i].single_stock_price);
    }

    if (totalEarn.length > 0 || todaysEarn.length > 0) {
        return res.status(200).json({
            message: "User Status",
            Total_shares_rewarded_today: Total_rewarded_today,
            Current_INR_value_of_the_user_portfolio: Current_INR_of_portfolio,
        });
    } else {
        return res.status(400).json({ message: "User Not Found" });
    }

})

router.get("/portfolio/:userId", (req, res) => {
    const { userId } = req.params;
    const totalEarn = userreward.filter(
        (r) =>
            r.userId == userId
    );
    const finalAns = [];
    for(var i=0;i<totalEarn.length;i++){
        finalAns.push({
            [totalEarn[i].stockSymbol]: totalEarn[i].quantity * totalEarn[i].single_stock_price
        })
    }
    if(totalEarn.length>0){
        return res.status(200).json({
            finalAns,
        })
    }else{
        return res.status(400).json({ message: "User Not Found" });
    }


})

router.get("/userlist", (req, res) => {
    res.json(userreward);
})


module.exports = router;
