const TokenModel = require('../models/token')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const axios=require('axios')

const apiKey = 'AIzaSyBMSDKOx10HTqla5jl9c6xr5v3nFEcmuY0';
const cx='d608bfa0de7774f70';
const baseUrl = 'https://www.googleapis.com/customsearch/v1';
exports.findToken = async (req, res) => {
    const token = req.query.token
    await TokenModel.findOne({token:token})
    .then(async result=>{
        const name = result.name
        const username = result.username
        const email = result.email
        const password = result.password
        await UserModel.create({name:name,username:username,email:email,password:password})
        await TokenModel.deleteOne({token:token})
    })
    .catch(err=>{console.log(err)})

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Created Successfully</title>
            <style>
                /* Add your CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                }
                .container {
                    width: 50%;
                    margin: auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    text-align: center;
                }
                h1 {
                    color: #4CAF50;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Account Created Successfully</h1>
                <!-- You can add more content or customize the design here -->
            </div>
        </body>
        </html>
    `;

    await res.send(htmlContent)
}


exports.verify = async (req,res)=>{
    const token = req.params.token
    console.log(token);
    if(!token)res.status(401).json("The token was not available")
    else{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err){res.status(404).json("Token is wrong");}
            else res.status(200).json("Already logged in")
        })
    }
}




exports.User = async(req,res)=>{
    try {
        const token = req.params.token
        if (!token) {
            res.status(401).json('JWT token not found')
        }
        else{
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const username = decodedToken.username
            res.status(200).json({ username:username })
        }
    } catch (error) {
        res.status(404).json('Invalid JWT token')
    }
}



exports.getUser = async(req,res)=>{
    try {
        const username = req.body.username

        const user = await UserModel.findOne({ username:username })

        if (!user) {
            res.status(404).json("User not found")
        }
        else res.status(200).json({
            name: user.name,
            username: user.username,
            email: user.email
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

exports.getFromNewsApi = async (req, res) => {
    console.log("hi bhai")
    const data = req.query.search;
    console.log("query hoilo "+data)
    console.log(data);
    try {
        const apiKey = '5441761a651446d9b88a1a57dafccd20';
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(data)}&apiKey=${apiKey}`;

        const response = await axios.get(apiUrl);
        console.log(response)
        if (response.data.articles && response.data.articles.length > 0) {
            // Extract relevant information from the articles
            const articles = response.data.articles.map(article => ({
                title: article.title,
                description: article.content, // Use article.content for full description
                source: article.source.name,
                link: article.url,
                imageUrl: article.urlToImage,
            }));

            res.status(200).json(articles);
        } else {
            res.status(500).json({
                message:"No article found"
            });
        }
    } catch (error) {
        console.error('Error fetching news articles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

exports.getFromGoogleApi = async (req, res) => {
    const keyword=req.query.search
    console.log("came here");
    try {
        const url = `${baseUrl}?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(keyword)}`;
    
        const response = await axios.get(url);
        console.log(response+" ggpi");
        if (response.data.items && response.data.items.length > 0) {
            const article2 = response.data.items.map(item => ({
                title: item.title,
                link: item.link,
                url: item.snippet,
                source: 'Google Custom Search'
            }));
            res.status(200).json(article2);
        } 
    } catch (error) {
        console.error('Error fetching search results:', error);
    }

}

